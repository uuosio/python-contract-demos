load_code = None
run = None
from . import config
from . import wallet

test_account1 = 'helloworld11'
test_account2 = 'helloworld12'

def init(network='EOS_TESTNET', deploy_type=1):
#def init(network='UUOS_TESTNET', deploy_type=1):
    global test_account1
    global test_account2

    config.network = network

    wallet.create('test')
    # import active key for hello
    wallet.import_key('test', '5JRYimgLBrRLCBAcjHUWCYRv3asNedTYYzVgmiU4q2ZVxMBiJXL')
    # import active key for helloworld11
    wallet.import_key('test', '5Jbb4wuwz8MAzTB9FJNmrVYGXo4ABb7wqPVoWGcZ6x8V2FwNeDo')
    # active key of ceyelqpjeeia
    wallet.import_key('test', '5JfZz1kXF8TXsxQgwfsvZCUBeTQefYSsCLDSbSPmnbKQfFmtBny')

    # active key of ebvjmdibybgq
    wallet.import_key('test', '5KiVDjfHMHXzxrcLqZxGENrhCcCXBMSXP7paPbJWiMCDRMbStsF')

    if network == 'EOS_TESTNET':
        config.setup_eos_test_network()
        test_account1 = 'ceyelqpjeeia'
        test_account2 = 'ebvjmdibybgq'
    elif network == 'UUOS_TESTNET':
        config.setup_uuos_test_network()
        test_account1 = 'helloworld11'
        test_account2 = 'helloworld12'
    else:
        raise Exception(f'unknown network: {network}')
    config.contract_deploy_type = deploy_type

#    config.setup_local_test_network()
#    config.setup_local_uuos_test_network()

def init1():
    init(network='EOS_TESTNET', deploy_type=1)

def init2():
    init(network='UUOS_TESTNET', deploy_type=2)

def init3():
    init(network='UUOS_TESTNET', deploy_type=1)

def print_console(r):
    print('\n===================== CONSOLE OUTPUT BEGIN =====================\n')
    print(r['processed']['action_traces'][0]['console'])
    print('\n===================== CONSOLE OUTPUT END =====================\n')

try:
    from browser import window, aio
    editor = window.ace.edit("editor")
    editor_abi = window.ace.edit("editor_abi")

    def _load_code():
        abi = editor_abi.getValue()
        src = editor.getValue()
        return src, abi

    def _run(task):
        aio.run(task)

    load_code = _load_code
    run = _run

except Exception as e:
    import os
    import sys
    import asyncio

    def _load_code():
        with open('code.py', 'r') as f:
            code = f.read()
        with open('abi.py', 'r') as f:
            abi = f.read()
        return code, abi

    def _run(future):
        loop = asyncio.get_event_loop()
        loop.run_until_complete(future)

    load_code = _load_code
    run = _run

    sys.path.append('..')

    if os.path.exists('test.wallet'):
        os.remove('test.wallet')

