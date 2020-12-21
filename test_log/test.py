'''
Save debug log on chain example
'''
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
        print('++++deploy time:', r['processed']['elapsed'])
    except chainapi.ChainException as e:
        print('+++deploy error:', e)

    if not hasattr(chainapi, 'count'):
        chainapi.count = 0
    chainapi.count += 1
    print(chainapi.count)

    args = 'hello,world'
    try:
        r = await uuosapi.push_action('hello', 'initlog', args, {'hello': 'active'})
        print(r['processed']['action_traces'][0]['console'])
        print(r['processed']['elapsed'])
    except chainapi.ChainException as e:
        print('+++error:', e)

    args = 'hello,world' + str(chainapi.count)
    try:
        r = await uuosapi.push_action('hello', 'sayhello', args, {'hello': 'active'})
        print(r['processed']['action_traces'][0]['console'])
    except chainapi.ChainException as e:
        print(e)

    r = await uuosapi.get_table_rows(False, 'hello', 'hello', 'log', '', '', 1)
    a = r['rows'][0]
    a = bytes.fromhex(a)

    total_logs = int.from_bytes(a[:4], 'little')
    pos = int.from_bytes(a[4:], 'little')

    lower_bound = uuosapi.n2s(0)
    upper_bound = uuosapi.n2s(11)
    r = await uuosapi.get_table_rows(False, 'hello', 'hello', 'log', lower_bound, upper_bound, 11)
    print('++++pos:', pos, len(r['rows']))
    for i in range(1, len(r['rows'])):
        row = r['rows'][pos]
        row = bytes.fromhex(row)
        last = row.find(b'\x00')
        print(row[:last].decode('utf8'))
        pos -= 1
        if pos < 1:
            pos = total_logs

async def run_test():
    try:
        await test()
    except Exception as e:
        print(e)

test_helper.run(run_test())
