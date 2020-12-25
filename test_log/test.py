'''
Save debug log on chain example
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

async def show_log(uuosapi, old_state):
    a = None
    for i in range(5):
        r = await uuosapi.get_table_rows(False, config.python_contract, test_account1, 'log', '', '', 1)
        a = r['rows'][0]
        a = bytes.fromhex(a)
        if not old_state == a:
            break

    total_logs = int.from_bytes(a[:4], 'little')
    pos = int.from_bytes(a[4:], 'little')


    lower_bound = uuosapi.n2s(0)
    upper_bound = uuosapi.n2s(11)
    r = await uuosapi.get_table_rows(False, config.python_contract, test_account1, 'log', lower_bound, upper_bound, 11)

    print('+++cout:', chainapi.count)
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
    uuosapi = chainapi.ChainApiAsync(config.network_url)
    code = await uuosapi.compile(test_account1, src, vm_type=1)

    try:
        r = await uuosapi.deploy_contract(test_account1, code, abi, vm_type=1)
        print('++++deploy time:', r['processed']['elapsed'])
    except chainapi.ChainException as e:
        print('+++deploy error:', e)

    if not hasattr(chainapi, 'count'):
        chainapi.count = 0
    chainapi.count += 1
    r = await uuosapi.get_table_rows(False, config.python_contract, test_account1, 'log', '', '', 1)
    old_state = r['rows'][0]

    args = 'hello,world' + str(chainapi.count)
    r = await uuosapi.exec(test_account1, args)
    test_helper.print_console(r)

    await show_log(uuosapi, old_state)
