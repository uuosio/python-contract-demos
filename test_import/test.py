from uuoskit import chainapi, config, wallet
from uuoskit import test_helper


src, abi = test_helper.load_code()
src1, src2 = src.split("'============='")
# Replace the following default test account and test private key
# with your own. Because someone may use the same test account at the same time,
# that will cause conflict. If you don't have a test account,
# go to https://testnet.eos.io and get one.
test_account1 = 'wkpmdjdsztyu'
wallet.import_key('test', '5Jaz37nnxbpAiAGQEsyxtnGfCPTJFjX9Wn6zv7V41Ko6DXSqhd9')


async def run_test():
    uuosapi = chainapi.ChainApiAsync(config.network_url)
    code2 = await uuosapi.compile('hello', src2, vm_type=1)
    r = await uuosapi.deploy_module(test_account1, 'hello', code2)

    # deploy_contract comes after deploy_module
    # if a module deployed used by contract has been changed
    # deploy_contract must call again to reflect the changes made in the module
    code = await uuosapi.compile(test_account1, src1, vm_type=1)

    r = await uuosapi.deploy_contract(test_account1, code, abi, vm_type=1)

    args = uuosapi.s2b(test_account1)
    r = await uuosapi.exec(test_account1, args)
    test_helper.print_console(r)

