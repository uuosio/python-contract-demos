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


test_account1 = test_helper.test_account1
test_account2 = test_helper.test_account2

wallet.import_key('test', '5JHRxntHapUryUetZgWdd3cg6BrpZLMJdqhhXnMaZiiT4qdJPhv')

async def run_test():
    uuosapi = chainapi.ChainApiAsync(config.network_url)
    code = uuosapi.mp_compile(test_account1, src)
    await update_code_auth(uuosapi)
    print(config.main_token_contract)

    r = await uuosapi.deploy_python_contract(test_account1, code, abi)
    
    memo = 'helloworld51-0003ff99995d1ec79e7662bc7ffa076aeceda00fb9540406091ad36bf8f2ec58d651'
    balance1 = await uuosapi.get_balance(test_account2)
    r = await uuosapi.transfer(test_account2, test_account1, 1.0, memo)
    balance2 = await uuosapi.get_balance(test_account2)
    print(balance1, balance2)
    console = r['processed']['action_traces'][0]['inline_traces'][1]['console']
    print('+++console:', console)
