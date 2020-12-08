from browser import aio
from uuoskit import chainapi, wallet
import ujson as json
abi = abi = {
    "version": "eosio::abi/1.1",
    "structs": [
        {
            "name": "account",
            "base": "",
            "fields": [
                {
                    "name": "balance",
                    "type": "asset"
                }
            ]
        },
        {
            "name": "close",
            "base": "",
            "fields": [
                {
                    "name": "owner",
                    "type": "name"
                },
                {
                    "name": "symbol",
                    "type": "symbol"
                }
            ]
        },
        {
            "name": "create",
            "base": "",
            "fields": [
                {
                    "name": "issuer",
                    "type": "name"
                },
                {
                    "name": "maximum_supply",
                    "type": "asset"
                }
            ]
        },
        {
            "name": "currency_stats",
            "base": "",
            "fields": [
                {
                    "name": "supply",
                    "type": "asset"
                },
                {
                    "name": "max_supply",
                    "type": "asset"
                },
                {
                    "name": "issuer",
                    "type": "name"
                }
            ]
        },
        {
            "name": "issue",
            "base": "",
            "fields": [
                {
                    "name": "to",
                    "type": "name"
                },
                {
                    "name": "quantity",
                    "type": "asset"
                },
                {
                    "name": "memo",
                    "type": "string"
                }
            ]
        },
        {
            "name": "open",
            "base": "",
            "fields": [
                {
                    "name": "owner",
                    "type": "name"
                },
                {
                    "name": "symbol",
                    "type": "symbol"
                },
                {
                    "name": "ram_payer",
                    "type": "name"
                }
            ]
        },
        {
            "name": "retire",
            "base": "",
            "fields": [
                {
                    "name": "quantity",
                    "type": "asset"
                },
                {
                    "name": "memo",
                    "type": "string"
                }
            ]
        },
        {
            "name": "transfer",
            "base": "",
            "fields": [
                {
                    "name": "from",
                    "type": "name"
                },
                {
                    "name": "to",
                    "type": "name"
                },
                {
                    "name": "quantity",
                    "type": "asset"
                },
                {
                    "name": "memo",
                    "type": "string"
                }
            ]
        }
    ],
    "types": [],
    "actions": [
        {
            "name": "close",
            "type": "close",
            "ricardian_contract": ""
        },
        {
            "name": "create",
            "type": "create",
            "ricardian_contract": ""
        },
        {
            "name": "issue",
            "type": "issue",
            "ricardian_contract": ""
        },
        {
            "name": "open",
            "type": "open",
            "ricardian_contract": ""
        },
        {
            "name": "retire",
            "type": "retire",
            "ricardian_contract": ""
        },
        {
            "name": "transfer",
            "type": "transfer",
            "ricardian_contract": ""
        }
    ],
    "tables": [
        {
            "name": "accounts",
            "type": "account",
            "index_type": "i64",
            "key_names": [],
            "key_types": []
        },
        {
            "name": "stat",
            "type": "currency_stats",
            "index_type": "i64",
            "key_names": [],
            "key_types": []
        }
    ],
    "ricardian_clauses": [],
    "variants": [],
    "abi_extensions": [],
    "error_messages": [],
    "abi_extensions": []
}

src = r'''
import chain
import time
import struct

TOKEN_SYMBOL = int.from_bytes(b'\x04TTT\x00\x00\x00\x00', 'little')

def apply(receiver, first_receiver, action):
    if not receiver == first_receiver:
        return
    if action == name('create'):
#        token_create( uint64_t issuer, int64_t maximum_supply, uint64_t sym)
        data = chain.read_action_data()
        issuer, maximum_supply, symbol = struct.unpack('QQQ', data)
        assert symbol == TOKEN_SYMBOL
        chain.token_create(issuer, maximum_supply, TOKEN_SYMBOL)
    elif action == name('issue'):
# void token_issue( uint64_t to, int64_t quantity, uint64_t sym, const char* memo, size_t size2 );
        data = chain.read_action_data()
        to, quantity, symbol = struct.unpack('QQQ', data[:24])
        assert TOKEN_SYMBOL == symbol
        chain.token_issue(to, quantity, TOKEN_SYMBOL, data[25:])
    elif action == name('transfer'):
# void token_transfer( uint64_t from, uint64_t to, int64_t quantity, uint64_t sym, const char* memo, size_t size2);
        data = chain.read_action_data()
        _from, to, quantity, symbol = struct.unpack('QQQQ', data[:32])
        assert TOKEN_SYMBOL == symbol
        chain.token_transfer(_from, to, quantity, TOKEN_SYMBOL, data[33:])
'''

async def test():
    wallet.create('test')
    wallet.import_key('test', '5JRYimgLBrRLCBAcjHUWCYRv3asNedTYYzVgmiU4q2ZVxMBiJXL')
    uuosapi = chainapi.ChainApi('http://127.0.0.1:8888')
    code = uuosapi.compile('hello', src)
    try:
        r = await uuosapi.deploy_contract('hello', code, abi, vmtype=1)
    except chainapi.ChainException as e:
        print('+++deploy error:', e.error.message)

    args = {
        'issuer':'hello',
        'maximum_supply':'1000.0000 TTT'
    }
    try:
        r = await uuosapi.push_action('hello', 'create', args, {'hello': 'active'})
        print(r.processed.action_traces[0].console)
    except chainapi.ChainException as e:
        msg = e.error.json.error.details[0].message
        print('+++create:', msg)

    args = {
        'to':'hello',
        'quantity':'10.0000 TTT',
        'memo':'issue 10 TTT to hello'
    }

    balance1 = await uuosapi.get_balance('hello', token_account='hello', token_name='TTT')
    try:
        r = await uuosapi.push_action('hello', 'issue', args, {'hello': 'active'})
        print(r.processed.action_traces[0].console)
    except chainapi.ChainException as e:
        print(e)
    balance2 = await uuosapi.get_balance('hello', token_account='hello', token_name='TTT')
    print(balance1, balance2)

    args = {
        'from':'hello',
        'to':'uuos',
        'quantity':'10.0000 TTT',
        'memo':'transfer 10 TTT to uuos'
    }

    balance1 = await uuosapi.get_balance('uuos', token_account='hello', token_name='TTT')
    try:
        r = await uuosapi.push_action('hello', 'transfer', args, {'hello': 'active'})
        print(r.processed.action_traces[0].console)
        print('+++transfer:', r.processed.elapsed)
    except chainapi.ChainException as e:
        print(e)
    balance2 = await uuosapi.get_balance('uuos', token_account='hello', token_name='TTT')
    print(balance1, balance2)

async def run_test():
    try:
        await test()
    except Exception as e:
        print(e)

aio.run(run_test())
