from browser import aio
from uuoskit import chainapi, wallet
import ujson as json

abi = {
    "version": "eosio::abi/1.0",
    "types": [],
    "structs": [],
    "actions": [
        {
        "name": "test1",
        "type": "string",
        "ricardian_contract": ""
        },
        {
        "name": "test2",
        "type": "string",
        "ricardian_contract": ""
        },
        {
        "name": "test3",
        "type": "string",
        "ricardian_contract": ""
        }
    ],
    "tables": [],
    "ricardian_clauses": [],
    "error_messages": [],
    "abi_extensions": []
}

src = r'''
import chain
def apply(receiver, first_receiver, action):
    if action == name('test1'):
        chain.uuos_assert(receiver == first_receiver, 'oops, not work in notify')
        chain.eosio_assert_code(receiver == first_receiver, 123)
    elif action == name('test2'):
        assert False, 'exception raised'
    else:
        chain.uuos_assert(False, 'bad action')
'''

async def test():
    wallet.create('test')
    wallet.import_key('test', '5JRYimgLBrRLCBAcjHUWCYRv3asNedTYYzVgmiU4q2ZVxMBiJXL')
    uuosapi = chainapi.ChainApi('http://127.0.0.1:8888')
    code = uuosapi.compile('hello', src)

    try:
        r = await uuosapi.deploy_contract('hello', code, abi, vmtype=1)
    except chainapi.ChainException as e:
        print('+++deploy error:', e.error.message)

    args = 'hello,world'
    try:
        r = await uuosapi.push_action('hello', 'test1', args, {'hello': 'active'})
        print(r.processed.action_traces[0].console)
    except chainapi.ChainException as e:
        print(e)

    args = 'hello,world'
    try:
        r = await uuosapi.push_action('hello', 'test2', args, {'hello': 'active'})
        print(r.processed.action_traces[0].console)
    except chainapi.ChainException as e:
        msg = e.error.json.error.details[0].message
        print('+++test2:', msg)
        assert msg == "python vm execution error"

    args = 'hello,world'
    try:
        r = await uuosapi.push_action('hello', 'test3', args, {'hello': 'active'})
        print(r.processed.action_traces[0].console)
    except chainapi.ChainException as e:
        msg = e.error.json.error.details[0].message
        print(msg)
        assert msg == "assertion failure with message: bad action"


async def run_test():
    try:
        await test()
    except Exception as e:
        print(e)

aio.run(run_test())
