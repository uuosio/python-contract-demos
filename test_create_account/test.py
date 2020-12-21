from uuoskit import chainapi, wallet, config

from uuoskit import test_helper
src, abi = test_helper.load_code()
import javascript

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

    return await uuosapi.push_action(config.system_contract, 'updateauth', a, {'hello':'active'})


async def test():
    wallet.create('test')
    wallet.import_key('test', '5JRYimgLBrRLCBAcjHUWCYRv3asNedTYYzVgmiU4q2ZVxMBiJXL')
    wallet.import_key('test', '5Jbb4wuwz8MAzTB9FJNmrVYGXo4ABb7wqPVoWGcZ6x8V2FwNeDo')
    uuosapi = chainapi.ChainApiAsync('http://127.0.0.1:8888')
    code = await uuosapi.compile('hello', src, vm_type=1)
    await update_code_auth(uuosapi)

    try:
        r = await uuosapi.deploy_contract('hello', code, abi, vm_type=1)
    except chainapi.ChainException as e:
        print('+++deploy error:', e.error.message)

    if 0:
        args = {
            'account':'helloworld52',
            'pub_key':'EOS8moVJwVaR8pb43KBi2HwmtbwebXmjSJUerfwbvFW41tEvYsfDE'
        }
        try:
            r = await uuosapi.push_action('hello', 'newaccount', args, {'hello': 'active'})
            print(r['processed']['action_traces'][0]['console'])
            print(r['processed']['elapsed'])
        except chainapi.ChainException as e:
            print(e)
    
    memo = 'helloworld53-0003ff99995d1ec79e7662bc7ffa076aeceda00fb9540406091ad36bf8f2ec58d651'
    r = await uuosapi.transfer('helloworld11', 'hello', 1.0, memo)
    console = r['processed']['action_traces'][0]['inline_traces'][1]['console']
    print(console)

async def run_test():
    try:
        await test()
    except Exception as e:
        print(e)

test_helper.run(run_test())
