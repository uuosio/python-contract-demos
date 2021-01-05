'''
on chain chat room example
'''
from uuoskit import chainapi, config
from uuoskit import test_helper


src, abi = test_helper.load_code()

test_account1 = test_helper.test_account1

async def run_test():
    if config.system_contract == 'eosio':
        print('This example only works on uuos network currently')
        return
    uuosapi = chainapi.ChainApiAsync(config.network_url)
    code = uuosapi.mp_compile(test_account1, src)

    r = await uuosapi.deploy_python_contract(test_account1, code, abi, deploy_type=1)

    args = {'account':test_account1, 'group_name':'group1'}
    try:
        r = await uuosapi.push_action(test_account1, 'creategroup', args, {test_account1: 'active'})
        test_helper.print_console(r)
    except chainapi.ChainException as e:
        print('++++error:', e.error.json['error']['details'][1]['message'])
    
    if not hasattr(chainapi, 'count'):
        chainapi.count = 0
    chainapi.count += 1
    print('++++count:', chainapi.count)
    args = {'account':test_account1, 'group_name':'group1', 'msg':'hello,world' + str(chainapi.count)}
    try:
        r = await uuosapi.push_action(test_account1, 'chat', args, {test_account1: 'active'})
        test_helper.print_console(r)
        print(r['processed']['elapsed'])
    except chainapi.ChainException as e:
        print('++++chat error:', e)





