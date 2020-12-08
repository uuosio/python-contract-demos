import time
from browser import aio, window
from browser.local_storage import storage
import javascript
from uuoskit import chainapi, wallet
import ujson as json

#traceback
abi = {
    "version": "eosio::abi/1.0",
    "types": [{
        "new_type_name": "account_name",
        "type": "name"
    }],
    "structs": [{
        "name": "transfer",
        "base": "",
        "fields": [
        {"name":"from", "type":"account_name"},
        {"name":"to", "type":"account_name"},
        {"name":"quantity", "type":"asset"},
        {"name":"memo", "type":"string"}
        ]
    }
    ],
    "actions": [{
        "name": "transfer",
        "type": "transfer",
        "ricardian_contract": ""
    },{
        "name": "sayhello",
        "type": "bytes",
        "ricardian_contract": ""
    }],
    "tables": [],
    "ricardian_clauses": [],
    "error_messages": [],
    "abi_extensions": []
}

src = r'''
import chain
def unpack_bytes(data):
    length = 0
    shift = 0
    i = 0
    for c in data:
        i += 1
        n = c & 0x7F
        length += (n << shift)
        if c & 0x80 == 0x00:
            break;
        shift += 7
    return data[i:i+length]

def apply(a, b, c):
    data = chain.read_action_data()
    data = unpack_bytes(data)
    print(data)
'''

import platform
async def test():
    wallet.create('test')
    wallet.import_key('test', '5JRYimgLBrRLCBAcjHUWCYRv3asNedTYYzVgmiU4q2ZVxMBiJXL')
    uuosapi = chainapi.ChainApi('http://127.0.0.1:8888')
    code = uuosapi.compile('hello', src)
    info = await uuosapi.get_info()

    try:
        r = await uuosapi.deploy_contract('hello', code, abi, vmtype=1)
#        print(javascript.JSON.stringify(r))
        print('+++++++deploy_contract elapsed:', r.processed.elapsed)
    except chainapi.ChainException as e:
        print('++++deploy_contract error:', e.error)
        # print(e.to_dict())
        # print(e.stack)

    args = b'hello,world'.hex()
    try:
        r = await uuosapi.push_action('hello', 'sayhello', args, {'hello': 'active'})
        print(r.processed.action_traces[0].console)
        print('+++++++elapsed:', r.processed.elapsed)
    except chainapi.ChainException as e:
        print(e)

async def run_test():
    try:
        await test()
    except Exception as e:
        print(e)
