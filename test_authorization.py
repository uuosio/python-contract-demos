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
    print(receiver, first_receiver)
    if action == name('test1'):
        print(chain.has_auth('hello'))
        print(chain.has_auth('bob'))
        chain.require_auth('hello')
        chain.require_auth2('hello', 'active')
    elif action == name('test2'):
        print('hello')
        chain.require_auth2('hello', 'owner')
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
        msg = e.error.json.details[0].message
        print(msg)
        assert msg == "missing authority of hello/owner"
        # print(e)

async def run_test():
    try:
        await test()
    except Exception as e:
        print(e)

aio.run(run_test())
