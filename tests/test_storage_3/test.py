'''
This example shows how to store/load a 256-bit primary key data
'''
from uuoskit import chainapi, config, wallet
from uuoskit import test_helper


src, abi = test_helper.load_code()

test_account1 = test_helper.test_account1

async def run_test():
    if config.system_contract == 'eosio':
        print('This example only works on uuos network')
        return
    uuosapi = chainapi.ChainApiAsync(config.network_url)
    code = uuosapi.mp_compile(test_account1, src)

    r = await uuosapi.deploy_python_contract(test_account1, code, abi)

    args = 'hello,world'
    r = await uuosapi.exec(test_account1, args)
    test_helper.print_console(r)





