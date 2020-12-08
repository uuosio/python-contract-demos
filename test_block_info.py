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
import time
def apply(receiver, first_receiver, action):
    print(time.time())
    print(chain.current_time())
    print(chain.is_account('hello'), chain.is_account('none'))
    print(chain.tapos_block_num())
    print(chain.tapos_block_prefix())
    print(chain.expiration())
    
    print(chain.read_transaction())

#    _type - 0 for context free action, 1 for action
#    index - the index of the requested action
#    get_action(_type, index)

    print(chain.get_action(1, 0))
    print(chain.get_action(0, 0))
    
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


async def run_test():
    try:
        await test()
    except Exception as e:
        print(e)

aio.run(run_test())
