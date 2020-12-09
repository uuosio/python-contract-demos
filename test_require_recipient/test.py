from uuoskit import chainapi, wallet

from uuoskit import test_helper
src, abi = test_helper.load_code()
src1, src2 = src.split('#*code separator*#')

async def test():
    wallet.create('test')
    # import active key for hello
    wallet.import_key('test', '5JRYimgLBrRLCBAcjHUWCYRv3asNedTYYzVgmiU4q2ZVxMBiJXL')
    # import active key for helloworld11
    wallet.import_key('test', '5Jbb4wuwz8MAzTB9FJNmrVYGXo4ABb7wqPVoWGcZ6x8V2FwNeDo')
    uuosapi = chainapi.ChainApiAsync('http://127.0.0.1:8888')

    code1 = await uuosapi.compile('hello', src1)
    code2 = await uuosapi.compile('hello', src2)

    try:
        r = await uuosapi.deploy_contract('hello', code1, abi, vm_type=1)
    except chainapi.ChainException as e:
        print('+++deploy error:', e.error.message)

    try:
        r = await uuosapi.deploy_contract('helloworld11', code2, abi, vm_type=1)
    except chainapi.ChainException as e:
        print('+++deploy error:', e.error.message)

    args = 'hello,world'
    try:
        r = await uuosapi.push_action('hello', 'sayhello', args, {'hello': 'active'})
        print(r['processed']['action_traces'][0]['console'])
        print(r['processed']['action_traces'][0]['inline_traces'][0]['console'])
    except chainapi.ChainException as e:
        print(e)

async def run_test():
    try:
        await test()
    except Exception as e:
        print(e)

test_helper.run(run_test())
