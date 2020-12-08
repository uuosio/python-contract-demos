import sys
from browser import aio
from uuoskit import chainapi, wallet, config
import ujson as json

abi = {
    "version": "eosio::abi/1.0",
    "types": [],
    "structs": [
        {
            "name": "sayhello",
            "base": "",
            "fields": [
                {"name":"hello", "type":"string"},
            ]
        },
        {
            "name": "testinline",
            "base": "",
            "fields": [
                {"name":"hello", "type":"string"},
            ]
        }
    ],
    "actions": [{
        "name": "sayhello",
        "type": "sayhello",
        "ricardian_contract": ""
    },
    {
        "name": "testinline",
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
    if action == name('testinline'):
        account = name('hello')
        action = name('sayhello')
        actor = name('hello')
        permission = name('active')
        data = b'hello,world'
        chain.send_inline(account, action, actor, permission, data)
        print('inline action sended')
    elif action == name('sayhello'):
        data = chain.read_action_data()
        print(data)
'''

async def update_code_auth(uuosapi):
    a = {
        "account": 'hello',
        "permission": "active",
        "parent": "owner",
        "auth": {
            "threshold": 1,
            "keys": [
                {
                    "key": "EOS6AjF6hvF7GSuSd4sCgfPKq5uWaXvGM2aQtEUCwmEHygQaqxBSV",
                    "weight": 1
                },
            ],
            "accounts": [{"permission":{"actor":'hello',"permission":"uuos.code"},"weight":1}],
            "waits": []
        }
    }

    return uuosapi.push_action(config.system_contract, 'updateauth', a, {'hello':'active'})

async def test():
    wallet.create('test')
    wallet.import_key('test', '5JRYimgLBrRLCBAcjHUWCYRv3asNedTYYzVgmiU4q2ZVxMBiJXL')
    uuosapi = chainapi.ChainApi('http://127.0.0.1:8888')
    code = uuosapi.compile('hello', src)

    try:
        r = await update_code_auth(uuosapi)
    except chainapi.ChainException as e:
        print('+++deploy error:', e.error.message)

    try:
        r = await uuosapi.deploy_contract('hello', code, abi, vmtype=1)
    except chainapi.ChainException as e:
        print('+++deploy error:', e.error.message)

    args = 'hello,world'
    try:
        r = await uuosapi.push_action('hello', 'testinline', args, {'hello': 'active'})
        print('+++testinline:', r.processed.action_traces[0].console)
        print('+++sayhello:', r.processed.action_traces[0].inline_traces[0].console)
        print('+++++++push_action elapsed:', r.processed.elapsed)
    except chainapi.ChainException as e:
        print(e)

async def run_test():
    try:
        await test()
    except Exception as e:
        print(e)

aio.run(run_test())

