from uuoskit import chainapi, config, wallet
from uuoskit import test_helper

async def update_code_auth(uuosapi):
    a = {
        "account": test_account1,
        "permission": "active",
        "parent": "owner",
        "auth": {
            "threshold": 1,
            "keys": [
                {
                    "key": "EOS7sPDxfw5yx5SZgQcVb57zS1XeSWLNpQKhaGjjy2qe61BrAQ49o",
                    "weight": 1
                },
            ],
            "accounts": [{"permission":{"actor":test_account1,"permission": config.code_permission_name},"weight":1}],
            "waits": []
        }
    }

    return await uuosapi.push_action(config.system_contract, 'updateauth', a, {test_account1:'active'})


src, abi = test_helper.load_code()

test_account1 = test_helper.test_account1

async def run_test():
    uuosapi = chainapi.ChainApiAsync(config.network_url)
    code = uuosapi.mp_compile(test_account1, src)

    try:
        r = await update_code_auth(uuosapi)
    except chainapi.ChainException as e:
        print('+++update_code_auth error:', e)

    r = await uuosapi.deploy_python_contract(test_account1, code, abi)

    args = b'hello,world'
    r = await uuosapi.push_action(test_account1, 'testinline', args, {test_account1: 'active'})
    print('+++testinline:', r['processed']['action_traces'][0]['console'])
    print('+++sayhello:', r['processed']['action_traces'][0]['inline_traces'][0]['console'])
    print('+++++++push_action elapsed:', r['processed']['elapsed'])


