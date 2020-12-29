system_contract = 'uuos'
main_token_contract = 'uuos.token'
main_token = 'UUOS'
python_contract = 'uuoscontract'
contract_deploy_type = 0
network_url = ''

code_permission_name = 'eosio.code'

network = 'EOS_TESTNET'

def config_network(_system_contract, _main_token_contract, _main_token):
    global system_contract
    global main_token
    global main_token_contract

    system_contract = _system_contract
    main_token_contract = _main_token_contract
    main_token = _main_token

def setup_uuos_network():
    global main_token
    global system_contract
    global main_token_contract
    global code_permission_name
    main_token = 'UUOS'
    system_contract = 'uuos'
    main_token_contract = 'uuos.token'
    network_url = 'http://127.0.0.1:8888'
    code_permission_name = 'uuos.code'

def setup_local_uuos_test_network():
    global main_token
    global system_contract
    global main_token_contract
    global python_contract
    global network_url
    global code_permission_name

    main_token = 'UUOS'
    system_contract = 'uuos'
    main_token_contract = 'uuos.token'
    python_contract = 'hello'
    network_url = 'http://127.0.0.1:8888'
    code_permission_name = 'uuos.code'

def setup_eos_network():
    global main_token
    global system_contract
    global main_token_contract
    global code_permission_name

    main_token = 'EOS'
    system_contract = 'eosio'
    main_token_contract = 'eosio.token'
    network_url = 'https://eos.greymass.com'
    code_permission_name = 'eosio.code'

def setup_eos_test_network():
    global main_token
    global system_contract
    global main_token_contract
    global python_contract
    global network_url
    global code_permission_name

    main_token = 'TNT'
    system_contract = 'eosio'
    main_token_contract = 'eosio.token'
    python_contract = 'ceyelqpjeeia'
    network_url = 'https://api.testnet.eos.io'
    code_permission_name = 'eosio.code'
