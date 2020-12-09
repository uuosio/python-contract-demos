from uuoskit import chainapi, wallet, config

from uuoskit import test_helper
src, abi = test_helper.load_code()

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
    uuosapi = chainapi.ChainApiAsync('http://127.0.0.1:8888')
    code = await uuosapi.compile('hello', src, vm_type=1)

    try:
        r = await update_code_auth(uuosapi)
    except chainapi.ChainException as e:
        print('+++deploy error:', e.error.message)

    try:
        r = await uuosapi.deploy_contract('hello', code, abi, vm_type=1)
    except chainapi.ChainException as e:
        print('+++deploy error:', e.error.message)

    args = 'hello,world'
    try:
        r = await uuosapi.push_action('hello', 'testinline', args, {'hello': 'active'})
        print('+++testinline:', r['processed']['action_traces'][0]['console'])
        print('+++sayhello:', r['processed']['action_traces'][0]['inline_traces'][0]['console'])
        print('+++++++push_action elapsed:', r['processed']['elapsed'])
    except chainapi.ChainException as e:
        print(e)

async def run_test():
    try:
        await test()
    except Exception as e:
        print(e)

test_helper.run(run_test())

