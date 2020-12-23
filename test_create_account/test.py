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
                    "key": "EOS6AjF6hvF7GSuSd4sCgfPKq5uWaXvGM2aQtEUCwmEHygQaqxBSV",
                    "weight": 1
                },
            ],
            "accounts": [{"permission":{"actor":test_account1,"permission": config.code_permission_name},"weight":1}],
            "waits": []
        }
    }

    return await uuosapi.push_action(config.system_contract, 'updateauth', a, {test_account1:'active'})



src, abi = test_helper.load_code()

# Replace the following default test account and test private key
# with your own. Because someone may use the same test account at the same time,
# that will cause conflict. If you don't have a test account,
# go to https://testnet.eos.io and get one.
test_account1 = 'wkpmdjdsztyu'
wallet.import_key('test', '5Jaz37nnxbpAiAGQEsyxtnGfCPTJFjX9Wn6zv7V41Ko6DXSqhd9')

test_account2 = test_helper.test_account2
#config.contract_deploy_type = 1

async def run_test():
    uuosapi = chainapi.ChainApiAsync(config.network_url)
    code = await uuosapi.compile(test_account1, src, vm_type=1)
    await update_code_auth(uuosapi)
    print(config.main_token_contract)
    try:
        r = await uuosapi.deploy_contract(test_account1, code, abi, vm_type=1)
    except chainapi.ChainException as e:
        print('+++deploy error:', e.error.message)
    
    memo = 'helloworld51-0003ff99995d1ec79e7662bc7ffa076aeceda00fb9540406091ad36bf8f2ec58d651'
    r = await uuosapi.transfer(test_account2, test_account1, 1.0, memo)
    console = r['processed']['action_traces'][0]['inline_traces'][1]['console']
    print(console)





