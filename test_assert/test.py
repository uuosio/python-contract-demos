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


test_account2 = test_helper.test_account2

async def run_test():
    uuosapi = chainapi.ChainApiAsync(config.network_url)
    code = await uuosapi.compile(test_account1, src, vm_type=1)

    r = await uuosapi.deploy_contract(test_account1, code, abi, vm_type=1)

    args = 'hello,world'
    try:
        r = await uuosapi.push_action(test_account1, 'test1', args, {test_account1: 'active'})
        test_helper.print_console(r)
    except chainapi.ChainException as e:
        print('+++test1:', e)

    args = 'hello,world'
    try:
        r = await uuosapi.push_action(test_account1, 'test2', args, {test_account1: 'active'})
        test_helper.print_console(r)
    except chainapi.ChainException as e:
        print('+++test2: assertion failed as expected:', e)

    args = 'hello,world'
    try:
        r = await uuosapi.push_action(test_account1, 'test3', args, {test_account1: 'active'})
        test_helper.print_console(r)
    except chainapi.ChainException as e:
        print('+++test3, assertion raised:')
        msg = e.error['json']['error']['details'][0]['message']
        print(msg)
        assert msg == "assertion failure with message: bad action"






