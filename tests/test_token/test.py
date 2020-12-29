from uuoskit import chainapi, config, wallet
from uuoskit import test_helper


src, abi = test_helper.load_code()

test_account1 = test_helper.test_account1
test_account2 = test_helper.test_account2

async def run_test():
    uuosapi = chainapi.ChainApiAsync(config.network_url)
    code = await uuosapi.compile(config.python_contract, src, vm_type=1)

    if config.contract_deploy_type == 1:
        uuosapi.deploy_abi(config.python_contract, abi)

    try:
        r = await uuosapi.deploy_contract(config.python_contract, code, abi, vm_type=1)
    except chainapi.ChainException as e:
        print('+++deploy error:', e.error.message)

    args = {
        'issuer':test_account1,
        'maximum_supply':'1000.0000 TTT'
    }
    try:
        r = await uuosapi.push_action(config.python_contract, 'create', args, {test_account1: 'active'})
        test_helper.print_console(r)
    except chainapi.ChainException as e:
        msg = e.error.json.error.details[0].message
        print('+++create:', msg)

    args = {
        'to': test_account1,
        'quantity': '10.0000 TTT',
        'memo': f'issue 10 TTT to {test_account1}'
    }

    balance1 = await uuosapi.get_balance(config.python_contract, token_account=config.python_contract, token_name='TTT')
    try:
        r = await uuosapi.push_action(config.python_contract, 'issue', args, {test_account1: 'active'})
        test_helper.print_console(r)
    except chainapi.ChainException as e:
        print('+++issue error:', e)
    balance2 = await uuosapi.get_balance(config.python_contract, token_account=config.python_contract, token_name='TTT')
    print(balance1, balance2)

    args = {
        'from': config.python_contract,
        'to': test_account2,
        'quantity': '10.0000 TTT',
        'memo': f'transfer 10 TTT to {test_account2}'
    }
    print('++++++++++:', config.python_contract, test_account2)

    balance1 = await uuosapi.get_balance(config.python_contract, token_account=config.python_contract, token_name='TTT')
    r = await uuosapi.push_action(config.python_contract, 'transfer', args, {config.python_contract: 'active'})
    test_helper.print_console(r)
    print('+++transfer:', r['processed']['elapsed'])

    balance2 = await uuosapi.get_balance(test_account2, token_account=config.python_contract, token_name='TTT')
    print(balance1, balance2)
