from uuoskit import chainapi, wallet

from uuoskit import test_helper
src, abi = test_helper.load_code()

async def test():
    wallet.create('test')
    wallet.import_key('test', '5JRYimgLBrRLCBAcjHUWCYRv3asNedTYYzVgmiU4q2ZVxMBiJXL')
    uuosapi = chainapi.ChainApiAsync('http://127.0.0.1:8888')
    code = await uuosapi.compile('hello', src, vm_type=1)

    try:
        r = await uuosapi.deploy_contract('hello', code, abi, vm_type=1)
    except chainapi.ChainException as e:
        print('+++deploy error:', e['error']['message'])

    args = 'hello,world'
    try:
        r = await uuosapi.push_action('hello', 'test1', args, {'hello': 'active'})
        print(r['processed']['action_traces'][0]['console'])
    except chainapi.ChainException as e:
        print(e)

    args = 'hello,world'
    try:
        r = await uuosapi.push_action('hello', 'test2', args, {'hello': 'active'})
        print(r['processed']['action_traces'][0]['console'])
    except chainapi.ChainException as e:
        msg = e['error']['json']['error']['details'][0]['message']
        print('+++test2:', msg)
        assert msg == "python vm execution error"

    args = 'hello,world'
    try:
        r = await uuosapi.push_action('hello', 'test3', args, {'hello': 'active'})
        print(r['processed']['action_traces'][0]['console'])
    except chainapi.ChainException as e:
        msg = e['error']['json']['error']['details'][0]['message']
        print(msg)
        assert msg == "assertion failure with message: bad action"


async def run_test():
    try:
        await test()
    except Exception as e:
        print(e)

test_helper.run(run_test())
