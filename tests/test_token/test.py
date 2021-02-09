from uuoskit import chainapi, config, wallet
from uuoskit import test_helper


src, abi = test_helper.load_code()

test_account1 = test_helper.test_account1
test_account2 = test_helper.test_account2

async def run_test():
    uuosapi = chainapi.ChainApiAsync(config.network_url)
    code = uuosapi.mp_compile(test_account1, src)

    await uuosapi.deploy_abi(test_account1, abi)

    try:
        r = await uuosapi.deploy_python_contract(test_account1, code, abi)
    except chainapi.ChainException as e:
        print('+++deploy error:', e.json['message'])

    args = {
        'issuer':test_account1,
        'maximum_supply':'1000.0000 TTT'
    }
    try:
        r = await uuosapi.push_action(test_account1, 'create', args, {test_account1: 'active'})
        test_helper.print_console(r)
    except chainapi.ChainException as e:
        print(e)
        msg = e.json['error']['details'][0]['message']
        print('+++create:', msg)

    args = {
        'to': test_account1,
        'quantity': '10.0000 TTT',
        'memo': f'issue 10 TTT to {test_account1}'
    }

    balance1 = await uuosapi.get_balance(test_account1, token_account=test_account1, token_name='TTT')
    try:
        r = await uuosapi.push_action(test_account1, 'issue', args, {test_account1: 'active'})
        test_helper.print_console(r)
    except chainapi.ChainException as e:
        print('+++issue error:', e)
    balance2 = await uuosapi.get_balance(test_account1, token_account=test_account1, token_name='TTT')
    print(balance1, balance2)

    args = {
        'from': test_account1,
        'to': test_account2,
        'quantity': '10.0000 TTT',
        'memo': f'transfer 10 TTT to {test_account2}'
    }
    print('++++++++++:', test_account1, test_account2)

    balance1 = await uuosapi.get_balance(test_account1, token_account=test_account1, token_name='TTT')
    r = await uuosapi.push_action(test_account1, 'transfer', args, {test_account1: 'active'})
    test_helper.print_console(r)
    print('+++transfer:', r['processed']['elapsed'])

    balance2 = await uuosapi.get_balance(test_account2, token_account=test_account1, token_name='TTT')
    print(balance1, balance2)
