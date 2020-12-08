from browser import aio
from uuoskit import chainapi, wallet
import ujson as json

import test_helper
src, abi = test_helper.load_code()

async def test():
    wallet.create('test')
    wallet.import_key('test', '5JRYimgLBrRLCBAcjHUWCYRv3asNedTYYzVgmiU4q2ZVxMBiJXL')
    uuosapi = chainapi.ChainApi('http://127.0.0.1:8888')
    code = uuosapi.compile('hello', src)
    try:
        r = await uuosapi.deploy_contract('hello', code, abi, vmtype=1)
    except chainapi.ChainException as e:
        print('+++deploy error:', e.error.message)

    args = {
        'issuer':'hello',
        'maximum_supply':'1000.0000 TTT'
    }
    try:
        r = await uuosapi.push_action('hello', 'create', args, {'hello': 'active'})
        print(r.processed.action_traces[0].console)
    except chainapi.ChainException as e:
        msg = e.error.json.error.details[0].message
        print('+++create:', msg)

    args = {
        'to':'hello',
        'quantity':'10.0000 TTT',
        'memo':'issue 10 TTT to hello'
    }

    balance1 = await uuosapi.get_balance('hello', token_account='hello', token_name='TTT')
    try:
        r = await uuosapi.push_action('hello', 'issue', args, {'hello': 'active'})
        print(r.processed.action_traces[0].console)
    except chainapi.ChainException as e:
        print(e)
    balance2 = await uuosapi.get_balance('hello', token_account='hello', token_name='TTT')
    print(balance1, balance2)

    args = {
        'from':'hello',
        'to':'uuos',
        'quantity':'10.0000 TTT',
        'memo':'transfer 10 TTT to uuos'
    }

    balance1 = await uuosapi.get_balance('uuos', token_account='hello', token_name='TTT')
    try:
        r = await uuosapi.push_action('hello', 'transfer', args, {'hello': 'active'})
        print(r.processed.action_traces[0].console)
        print('+++transfer:', r.processed.elapsed)
    except chainapi.ChainException as e:
        print(e)
    balance2 = await uuosapi.get_balance('uuos', token_account='hello', token_name='TTT')
    print(balance1, balance2)

async def run_test():
    try:
        await test()
    except Exception as e:
        print(e)

aio.run(run_test())
