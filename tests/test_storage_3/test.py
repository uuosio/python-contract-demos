'''
This example shows how to store/load a 256-bit primary key data
'''
from uuoskit import chainapi, config, wallet
from uuoskit import test_helper


src, abi = test_helper.load_code()

# Replace the following default test account and test private key
# with your own. Because someone may use the same test account at the same time,
# that will cause conflict. If you don't have a test account,
# go to https://testnet.eos.io and get one.
if config.network == 'EOS_TESTNET':
    test_account1 = 'wkpmdjdsztyu'
    wallet.import_key('test', '5Jaz37nnxbpAiAGQEsyxtnGfCPTJFjX9Wn6zv7V41Ko6DXSqhd9')
else:
    test_account1 = 'helloworld11'



async def run_test():
    if config.system_contract == 'eosio':
        print('This example only works on uuos network')
        return
    uuosapi = chainapi.ChainApiAsync(config.network_url)
    code = uuosapi.mp_compile(test_account1, src)

    r = await uuosapi.deploy_python_contract(test_account1, code, abi, deploy_type=1)

    args = 'hello,world'
    r = await uuosapi.exec(test_account1, args)
    test_helper.print_console(r)





