from browser import window
import javascript

from . import config
from . import wallet
from .chaincache import ChainCache
import json

class ChainException(Exception):
    def __init__(self, err):
        super().__init__(err)
        self.error = err

    def __str__(self):
        return javascript.JSON.stringify(self.error, None, ' ')

def jsobj2pyobj(fn):
    async def wrapper(self, *args, **kwargs):
        ret = await fn(self, *args, **kwargs)
        if isinstance(ret, ChainException):
            return ret
        # pyret = javascript.jsobj2pyobj(ret)
        if ret and 'error' in ret and ret['error']:
            # print(javascript.JSON.stringify(ret, None, ' '))
            raise ChainException(ret)
        return ret
    return wrapper

class ChainApiAsync():
    def __init__(self, node_url = 'http://127.0.0.1:8888', network='EOS'):
        self.node_url = node_url
        self.network = network
        
        self._rpc = window.eosjs_jsonrpc.JsonRpc.new(node_url)
        self.rpc = window.RpcWrapper.new(self._rpc)
        self.api = window.ApiWrapper.new(self._rpc, wallet.signatureProvider)
        self.db = ChainCache(self, network)

    def s2n(self, name):
        n = self.api.s2n(name)
        n = bytes.fromhex(n)
        return int.from_bytes(n, 'little')

    def s2b(self, account):
        n = self.s2n(account)
        _account = bytearray(8)
        for i in range(8):
            c = n & 0xff
            n >>= 8
            _account[i] = c
        return bytes(_account)

    def n2s(self, n):
        hex_str = ''
        for i in range(8):
            a = n & 0xff
            hex_str += '%02x' % (a, )
            n >>= 8
        return self.api.n2s(hex_str)

    def pack_signature(self, s):
        s = self.api.pack_signature(s)
        return bytes.fromhex(s)

    def set_public_key_prefix(self, prefix):
        pass

    def unpack_abi(self, abi):
        return self.api.rawAbiToJson(abi)

    def set_abi(self, account, abi):
        if isinstance(abi, dict):
            abi = json.dumps(abi)
        if isinstance(abi, str):
            abi = javascript.JSON.parse(abi)

        self.api.setCachedAbi(account, abi)

    def set_node(self, node_url):
        self.node_url = node_url
        self._rpc.endpoint = node_url

    async def get_chain_id(self):
        info = await self.get_info()
        return info.chain_id

    @jsobj2pyobj
    async def get_info(self):
        return await self.rpc.get_info()

    @staticmethod
    def mp_compile_to_frozen(contract, code):
        code = window.compile_src(code)
        if not code:
            raise Exception('compiler failed to compile code')

        code = bytes.fromhex(code)
        mpy_code = ((code, len(code)),)

        code_region = b''
        code_size_region = b''
        for code, size in mpy_code:
            code_region += code
            code_size_region += int.to_bytes(size, 4, 'little')

        name_region = b'main.mpy\x00'

        region_sizes = b''
        region_sizes += int.to_bytes(len(name_region), 4, 'little')
        region_sizes += int.to_bytes(len(code_size_region), 4, 'little')
        region_sizes += int.to_bytes(len(code_region), 4, 'little')

        header = int.to_bytes(5, 4, 'little')
        header += bytearray(60)
        frozen_code = header + region_sizes + name_region + code_size_region + code_region
        return frozen_code

    @staticmethod
    def mp_compile(contract, code):
        code = window.compile_src(code)
        if not code:
            raise Exception('compiler failed to compile code')

        code = bytes.fromhex(code)
        return code

    async def compile(self, contract, code, vm_type=1):
        assert vm_type == 1
        if config.contract_deploy_type == 0:
            return self.mp_compile_to_frozen(contract, code)
        else:
            return self.mp_compile(contract, code)

    @jsobj2pyobj
    async def push_action(self, contract, action, args, permissions, compress=0):
        print('+++push action:', contract, action)
        authorizations = []
        for actor in permissions:
            authorizations.append({
                'actor': actor,
                'permission': permissions[actor],
            })
        if isinstance(args, bytes):
            args = args.hex().upper()
            args = '0x' + args
        action = {
            'account': contract,
            'name': action,
            'authorization': authorizations,
            'data': args,
        }
        return await self.api.transact({
            'actions': [action]
        }, {
            'blocksBehind': 3,
            'expireSeconds': 60,
        })

    @jsobj2pyobj
    async def get_account(self, account):
        ret = await self.rpc.get_account(account)
        if 'error' in ret:
            return None
        return ret

    @jsobj2pyobj
    async def get_code(self, account):
        return await self.rpc.get_account(account)

    @jsobj2pyobj
    async def create_account(self, creator, account, owner_key, active_key, ram_bytes=0, stake_net=0.0, stake_cpu=0.0, sign=True):
        actions = []
        args = {
            'creator': creator,
            'name': account,
            'owner': {
                'threshold': 1,
                'keys': [{'key': owner_key, 'weight': 1}],
                'accounts': [],
                'waits': []
            },
            'active': {
                'threshold': 1,
                'keys': [{'key': active_key, 'weight': 1}],
                'accounts': [],
                'waits': []
            }
        }

        act = {
            'account': config.system_contract,
            'name': 'newaccount',
            'authorization': [{
                'actor': creator,
                'permission': 'active',
            }],
            'data': args,
        }
        actions.append(act)

        if ram_bytes:
            args = {'payer':creator, 'receiver':account, 'bytes':ram_bytes}
            act = {
                'account': config.system_contract,
                'name': 'buyrambytes',
                'authorization': [{
                    'actor': creator,
                    'permission': 'active',
                }],
                'data': args,
            }
            actions.append(act)

        if stake_net or stake_cpu:
            args = {
                'from': creator,
                'receiver': account,
                'stake_net_quantity': '%0.4f %s'%(stake_net, config.main_token),
                'stake_cpu_quantity': '%0.4f %s'%(stake_cpu, config.main_token),
                'transfer': 1
            }
            act = {
                'account': config.system_contract,
                'name': 'delegatebw',
                'authorization': [{
                    'actor': creator,
                    'permission': 'active',
                }],
                'data': args,
            }
            actions.append(act)
        return await self.api.transact({
            'actions': actions
        }, {
            'blocksBehind': 3,
            'expireSeconds': 60,
        })

    async def get_balance(self, account, token_account=None, token_name=None):
        if not token_name:
            token_name = config.main_token
        if not token_account:
            token_account = config.main_token_contract
        try:
            ret = await self.rpc.get_currency_balance(token_account, account, token_name)
            return float(ret[0].split(' ')[0])
        except Exception as e:
            return 0.0
        return 0.0

    async def transfer(self, _from, to, amount, memo='', token_account=None, token_name=None, permission='active'):
        if not token_account:
            token_account = config.main_token_contract
        if not token_name:
            token_name = config.main_token
        args = {"from":_from, "to":to, "quantity":'%.4f %s'%(amount, token_name), "memo":memo}
        return await self.push_action(token_account, 'transfer', args, {_from:permission})

    async def deploy_module(self, account, module_name, code):
        args = self.s2b(account) + self.s2b(module_name) + code
        if config.contract_deploy_type == 0 or config.contract_deploy_type == 2:
            contract = account
        else:
            contract = config.python_contract

        return await self.push_action(contract, 'setmodule', args, {account:'active'})

    async def deploy_contract(self, account, code, abi, vm_type=1, vm_version=0, sign=True, compress=0):
        print('+++deploy contract', account)
        if vm_type == 1:
            return await self.deploy_python_contract(account, code, abi, deploy_type=config.contract_deploy_type)

        return await self.deploy_contract_normal(account, code, abi, vm_type, vm_version, sign, compress)

        # if vm_type == 0 or config.contract_deploy_type == 0:
        #     return await self.deploy_contract_normal(account, code, abi, vm_type, vm_version, sign, compress)

        # return await self.deploy_contract_python(account, code, abi, vm_type, vm_version, sign, compress)

    @jsobj2pyobj
    async def deploy_python_contract(self, account, code, abi, deploy_type=1):
        actions = []

        python_contract = None
        if deploy_type == 1:
            python_contract = config.python_contract
        else:
            python_contract = account
            # args = {'account': account, 'vmtype':1, 'vmversion':0}
            # try:
            #     await self.push_action(config.system_contract, 'setvm', args, {account:'active'})
            # except:
            #     pass

            args = {"account": account,
                    "vmtype": 1,
                    "vmversion": 0,
                    "code": '00'
            }
            try:
                await self.push_action(config.system_contract, 'setcode', args, {account:'active'})
            except:
                pass

#        actions.append(setcode)

        print('+++deploy_contract_python:', python_contract)

        args = self.s2b(account) + code
        args = bytes(args)
        args = args.hex().upper()
        args = '0x' + args

        setcode = {
            'account': python_contract,
            'name': 'setcode',
            'authorization': [{
                'actor': account,
                'permission': 'active',
            }],
            'data': args,
        }

        actions.append(setcode)
        origin_abi = abi
        if isinstance(abi, dict):
            abi = self.api.jsonToRawAbi(abi)
            abi = self.api.array2hex(abi)
        elif isinstance(abi, str):
            abi = json.loads(abi)
            origin_abi = abi
            abi = self.api.jsonToRawAbi(abi)
            abi = self.api.array2hex(abi)
        elif isinstance(abi, bytes):
            abi = abi.hex()

        args = self.s2b(account).hex()
        args += abi
        args = '0x' + args
        setabi = {
            'account': python_contract,
            'name': 'setabi',
            'authorization': [{
                'actor': account,
                'permission': 'active',
            }],
            'data': args,
        }

        actions.append(setabi)

        ret = await self.api.transact({
            'actions': actions
        }, {
            'blocksBehind': 3,
            'expireSeconds': 60,
        })

        self.api.setCachedAbi(account, origin_abi)

        return ret

    async def deploy_contract_normal(self, account, code, abi, vm_type=0, vm_version=0, sign=True, compress=0):
        actions = []
        args = {"account": account,
                "vmtype": vm_type,
                "vmversion": vm_version,
                "code": code.hex()
        }
        setcode = {
            'account': config.system_contract,
            'name': 'setcode',
            'authorization': [{
                'actor': account,
                'permission': 'active',
            }],
            'data': args,
        }
        actions.append(setcode)

        if isinstance(abi, dict):
            abi = self.api.jsonToRawAbi(abi)
        elif isinstance(abi, str):
            abi = json.loads(abi)
            abi = self.api.jsonToRawAbi(abi)
        elif isinstance(abi, bytes):
            abi = abi.hex()

        args = {'account':account, 'abi':abi}
        setabi = {
            'account': config.system_contract,
            'name': 'setabi',
            'authorization': [{
                'actor': account,
                'permission': 'active',
            }],
            'data': args,
        }

        actions.append(setabi)

        ret = await self.api.transact({
            'actions': actions
        }, {
            'blocksBehind': 3,
            'expireSeconds': 60,
        })

        if 'error' in ret:
            if not ret['error']['json']['error']['what'] == 'Contract is already running this version of code':
                raise ChainException(ret.error)
        return ret

    @jsobj2pyobj
    async def pack_abi_type(self, account, typeName, data):
        return await self.api.serializeAbiType(account, typeName, data)

    @jsobj2pyobj
    async def unpack_abi_type(self, account, typeName, data):
        return await self.api.deserializeAbiType(account, typeName, data)

    @jsobj2pyobj
    async def deploy_py_code(self, account, code):
        args = self.s2b(account) + code
        args = bytes(args)
        args = args.hex().upper()
        args = '0x' + args

        actions = []
        setcode = {
            'account': config.python_contract,
            'name': 'setcode',
            'authorization': [{
                'actor': account,
                'permission': 'active',
            }],
            'data': args,
        }

        actions.append(setcode)

        ret = await self.api.transact({
            'actions': actions
        }, {
            'blocksBehind': 3,
            'expireSeconds': 60,
        })

        return ret

    @jsobj2pyobj
    async def deploy_abi(self, account, abi):
        print('++++deploy abi to ', account)
        actions = []
        origin_abi = abi
        if isinstance(abi, dict):
            abi = self.api.jsonToRawAbi(abi)
        elif isinstance(abi, str):
            abi = json.loads(abi)
            origin_abi = abi
            abi = self.api.jsonToRawAbi(abi)
        elif isinstance(abi, bytes):
            abi = abi.hex()

        args = {'account':account, 'abi':abi}
        setabi = {
            'account': config.system_contract,
            'name': 'setabi',
            'authorization': [{
                'actor': account,
                'permission': 'active',
            }],
            'data': args,
        }

        actions.append(setabi)

        ret = await self.api.transact({
            'actions': actions
        }, {
            'blocksBehind': 3,
            'expireSeconds': 60,
        })

        if not 'error' in ret:
            self.api.setCachedAbi(account, origin_abi)

        return ret

    async def exec(self, account, args, permissions = {}):
        if isinstance(args, str):
            args = args.encode('utf8')

        if not isinstance(args, bytes):
            args = str(args)
            args = args.encode('utf8')
        
        if not permissions:
            permissions = {account: 'active'}

        args = self.s2b(account) + args
        if config.contract_deploy_type == 1:
            return await self.push_action(config.python_contract, 'exec', args, permissions)
        else:
            return await self.push_action(account, 'exec', args, permissions)

    @jsobj2pyobj
    async def get_table_rows(self, json,
                    code,
                    scope,
                    table,
                    lower_bound='',
                    upper_bound='',
                    limit=10,
                    key_type='',
                    index_position=1,
                    encode_type='dec'):

        return await self.rpc.get_table_rows(json, code, scope, table,
                                lower_bound,
                                upper_bound,
                                index_position,
                                key_type,
                                limit,
                                False,
                                False                                
                            )

    @jsobj2pyobj
    async def python_contract_get_table_rows(self,
                    code,
                    scope,
                    table,
                    lower_bound='',
                    upper_bound='',
                    limit=10):
        args = {
            'code': code,
            'scope': scope,
            'table': table,
            'lowerbound': lower_bound,
            'upperbound': upper_bound,
            'limit': limit
        }
        try:
            r = await self.push_action(config.python_contract, 'gettablerows', args, {config.python_contract:'active'})
        except Exception as e:
            msg = e.error.error.json['error']['details'][0]['message']
            if msg.startswith('assertion failure with message: '):
                start = msg.rfind(': ')
                msg = msg[start + 2:]
                return msg

    @jsobj2pyobj
    async def get_producer_schedule(self):
        return await self.rpc.get_producer_schedule()

    @jsobj2pyobj
    async def get_producers(self, json = True, lowerBound = '', limit = 50):
        return await self.rpc.get_producers(json, lowerBound, limit)

async def hello():
    url = 'http://127.0.0.1:8888'
    defaultPrivateKey = "5JRYimgLBrRLCBAcjHUWCYRv3asNedTYYzVgmiU4q2ZVxMBiJXL"
    rpc = window.eosjs_jsonrpc.JsonRpc.new(url)
    signatureProvider = window.eosjs_jssig.JsSignatureProvider.new([defaultPrivateKey])
    api = window.eosjs_api.Api.new({ 'rpc':rpc, 'signatureProvider':signatureProvider })
    r = await rpc.get_info()
    print(r)

    print(get_chain_id)

    action = {
        'account': 'uuos.token',
        'name': 'transfer',
        'authorization': [{
            'actor': 'hello',
            'permission': 'active',
        }],
        'data': {
            'from': 'hello',
            'to': 'uuos',
            'quantity': '0.0001 UUOS',
            'memo': '',
        },
    }
    result = await api.transact({
        'actions': [action]
    }, {
        'blocksBehind': 3,
        'expireSeconds': 60,
    })

    balance = await rpc.get_currency_balance('uuos.token', 'uuos', 'UUOS')
    print(balance)

    balance = await rpc.get_currency_balance('uuos.token', 'hello', 'UUOS')
    print(balance)


#print(javascript.py2js(on_get_info))

