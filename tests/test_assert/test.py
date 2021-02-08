from uuoskit import chainapi, config, wallet
from uuoskit import test_helper


src, abi = test_helper.load_code()


test_account1 = test_helper.test_account1
test_account2 = test_helper.test_account2

async def run_test():
    uuosapi = chainapi.ChainApiAsync(config.network_url)
    code = uuosapi.mp_compile(test_account1, src)

    r = await uuosapi.deploy_python_contract(test_account1, code, abi)

    args = b'hello,world'
    try:
        r = await uuosapi.push_action(test_account1, 'test1', args, {test_account1: 'active'})
        test_helper.print_console(r)
    except chainapi.ChainException as e:
        print('+++test1:', e)

    args = b'hello,world'
    try:
        r = await uuosapi.push_action(test_account1, 'test2', args, {test_account1: 'active'})
        test_helper.print_console(r)
    except chainapi.ChainException as e:
        print('+++test2: assertion failed as expected:', e)

    args = b'hello,world'
    try:
        r = await uuosapi.push_action(test_account1, 'test3', args, {test_account1: 'active'})
        test_helper.print_console(r)
    except chainapi.ChainException as e:
        print('+++test3, assertion raised:')
        msg = e.json['error']['details'][0]['message']
        print(msg)
        assert msg == "assertion failure with message: bad action"
