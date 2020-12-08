from browser import aio
from uuoskit import chainapi, wallet
import ujson as json

abi = {
    "version": "eosio::abi/1.0",
    "types": [],
    "structs": [],
    "actions": [{
        "name": "sayhello",
        "type": "string",
        "ricardian_contract": ""
    }],
    "tables": [],
    "ricardian_clauses": [],
    "error_messages": [],
    "abi_extensions": []
}

src = r'''
def apply(receiver, first_receiver, action):
    print('hello,world')
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

    args = b'hello,world'.hex()
    try:
        r = await uuosapi.push_action('hello', 'sayhello', args, {'hello': 'active'})
        print(r.processed.action_traces[0].console)
    except chainapi.ChainException as e:
        print(e)

async def run_test():
    try:
        await test()
    except Exception as e:
        print(e)

aio.run(run_test())
