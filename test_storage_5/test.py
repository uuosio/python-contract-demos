'''
on chain chat room example
'''
from uuoskit import chainapi, wallet

from uuoskit import test_helper
src, abi = test_helper.load_code()

async def test():
    global g_index
    wallet.create('test')
    wallet.import_key('test', '5JRYimgLBrRLCBAcjHUWCYRv3asNedTYYzVgmiU4q2ZVxMBiJXL')
    uuosapi = chainapi.ChainApiAsync('http://127.0.0.1:8888')
    code = await uuosapi.compile('hello', src, vm_type=1)

    try:
        r = await uuosapi.deploy_contract('hello', code, abi, vm_type=1)
    except chainapi.ChainException as e:
        print('+++deploy error:', e)

    args = {'account':'hello', 'group_name':'group1'}
    try:
        r = await uuosapi.push_action('hello', 'creategroup', args, {'hello': 'active'})
        print(r['processed']['action_traces'][0]['console'])
    except chainapi.ChainException as e:
        print('++++error:', e.error.json['error']['details'][1]['message'])
    
    if not hasattr(chainapi, 'count'):
        chainapi.count = 0
    chainapi.count += 1
    print('++++count:', chainapi.count)
    args = {'account':'hello', 'group_name':'group1', 'msg':'hello,world' + str(chainapi.count)}
    try:
        r = await uuosapi.push_action('hello', 'chat', args, {'hello': 'active'})
        print(r['processed']['action_traces'][0]['console'])
        print(r['processed']['elapsed'])
    except chainapi.ChainException as e:
        print('++++chat error:', e)

async def run_test():
    try:
        await test()
    except Exception as e:
        print(e)

test_helper.run(run_test())
