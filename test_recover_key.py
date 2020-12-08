'''
example for recover_key and assert_recover_key
'''
from browser import aio
from uuoskit import chainapi, wallet
import ujson as json

abi = {
    "version": "eosio::abi/1.0",
    "types": [],
    "structs": [],
    "actions": [{
        "name": "sayhello",
        "type": "signature",
        "ricardian_contract": ""
    }],
    "tables": [],
    "ricardian_clauses": [],
    "error_messages": [],
    "abi_extensions": []
}

src = r'''
import chain
def apply(receiver, first_receiver, action):
    signature = chain.read_action_data()
    digest = chain.sha256('hello,world')
    pub_key = chain.recover_key(digest, signature)
    print(pub_key)
    # raw public key, no checksum, 34 bytes
    assert pub_key == b'\x00\x02\xa8\x91\xe0\xddW\x13.\xd6\x83\xbc\x87]\xac\xc9a\xc6\xfd]\xfa\xe6\x80\x0b\xc6\x18\x1a\xb6\x8b\xb8H%\x1eR'
    chain.assert_recover_key(digest, signature, pub_key)
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

    # signature of sha256 of 'hello,world'
    args = 'SIG_K1_KZ1AHkUJcdCnyogKcuymZ5Qc3bj2hqomZrkDHQgzuLhS37LyMYEFbYNuzcAB2wLTJjKN1koPR4aJQ3nxAegyVGVK9WqKsP'
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
