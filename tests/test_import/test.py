from uuoskit import chainapi, config, wallet
from uuoskit import test_helper


src, abi = test_helper.load_code()
src1, src2 = src.split("'============='")

test_account1 = test_helper.test_account1

async def run_test():
    uuosapi = chainapi.ChainApiAsync(config.network_url)
    code2 = uuosapi.mp_compile('hello', src2)
    r = await uuosapi.deploy_module(test_account1, 'hello', code2)

    # deploy_contract comes after deploy_module
    # if a module deployed used by contract has been changed
    # deploy_contract must call again to reflect the changes made in the module
    code = uuosapi.mp_compile(test_account1, src1)

    r = await uuosapi.deploy_python_contract(test_account1, code, abi)

    args = uuosapi.s2b(test_account1)
    r = await uuosapi.exec(test_account1, args)
    test_helper.print_console(r)

