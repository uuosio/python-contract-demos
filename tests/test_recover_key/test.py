'''
Example for recover_key and assert_recover_key
'''
from uuoskit import chainapi, config, wallet
from uuoskit import test_helper


src, abi = test_helper.load_code()

test_account1 = test_helper.test_account1


async def run_test():
    uuosapi = chainapi.ChainApiAsync(config.network_url)
    code = uuosapi.mp_compile(test_account1, src)

    r = await uuosapi.deploy_python_contract(test_account1, code, abi)

    # signature of sha256 of 'hello,world'
    args = 'SIG_K1_KZ1AHkUJcdCnyogKcuymZ5Qc3bj2hqomZrkDHQgzuLhS37LyMYEFbYNuzcAB2wLTJjKN1koPR4aJQ3nxAegyVGVK9WqKsP'
    args = uuosapi.pack_signature(args)
    r = await uuosapi.exec(test_account1, args)
    test_helper.print_console(r)

