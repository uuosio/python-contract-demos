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

src1 = r'''
import chain
def apply(receiver, first_receiver, action):
    print('send notify:')
    chain.require_recipient(name('helloworld11'))
'''

src2 = r'''
import chain
def apply(receiver, first_receiver, action):
    if receiver != first_receiver:
        data = chain.read_action_data()
        print('on notify:', receiver, first_receiver, action, data)
'''

async def test():
    wallet.create('test')
    # import active key for hello
    wallet.import_key('test', '5JRYimgLBrRLCBAcjHUWCYRv3asNedTYYzVgmiU4q2ZVxMBiJXL')
    # import active key for helloworld11
    wallet.import_key('test', '5Jbb4wuwz8MAzTB9FJNmrVYGXo4ABb7wqPVoWGcZ6x8V2FwNeDo')
    uuosapi = chainapi.ChainApi('http://127.0.0.1:8888')

    code1 = uuosapi.compile('hello', src1)
    code2 = uuosapi.compile('hello', src2)

    try:
        r = await uuosapi.deploy_contract('hello', code1, abi, vmtype=1)
    except chainapi.ChainException as e:
        print('+++deploy error:', e.error.message)

    try:
        r = await uuosapi.deploy_contract('helloworld11', code2, abi, vmtype=1)
    except chainapi.ChainException as e:
        print('+++deploy error:', e.error.message)

    args = 'hello,world'
    try:
        r = await uuosapi.push_action('hello', 'sayhello', args, {'hello': 'active'})
        print(r.processed.action_traces[0].console)
        print(r.processed.action_traces[0].inline_traces[0].console)
    except chainapi.ChainException as e:
        print(e)

async def run_test():
    try:
        await test()
    except Exception as e:
        print(e)

aio.run(run_test())
