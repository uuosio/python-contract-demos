from uuoskit import chainapi, config, wallet
from uuoskit import test_helper


src, abi = test_helper.load_code()


test_account1 = test_helper.test_account1
test_account2 = test_helper.test_account2


'''
#include <eosio/print.hpp>
extern "C" void apply(uint64_t receiver, uint64_t first_receiver, uint64_t action) {
    if (receiver != first_receiver) {
        eosio::print("notify received");
    } else {
        eosio::print("hello,world");
    }
}
'''

# wasm code deploy to test_account2
wasm_code = b'\x00asm\x01\x00\x00\x00\x01\x1a\x05`\x01\x7f\x00`\x02\x7f\x7f\x00`\x03\x7f\x7f\x7f\x01\x7f`\x00\x00`\x03~~~\x00\x02.\x03\x03env\x06prints\x00\x00\x03env\x0ceosio_assert\x00\x01\x03env\x06memset\x00\x02\x03\x05\x04\x03\x03\x00\x04\x04\x05\x01p\x01\x01\x01\x05\x03\x01\x00\x01\x06\x16\x03\x7f\x01A\x80\xc0\x00\x0b\x7f\x00A\xac\xc0\x00\x0b\x7f\x00A\xac\xc0\x00\x0b\x07\t\x01\x05apply\x00\x06\nd\x04\x04\x00\x10\x04\x0b6\x01\x01\x7f#\x00A\x10k"\x00A\x006\x02\x0cA\x00 \x00(\x02\x0c(\x02\x00A\x07jAxq"\x006\x02\x84@A\x00 \x006\x02\x80@A\x00?\x006\x02\x8c@\x0b\x02\x00\x0b#\x00\x10\x03\x02@ \x00 \x01R\r\x00A\xa0\xc0\x00\x10\x00A\x00\x10\x05\x0f\x0bA\x90\xc0\x00\x10\x00A\x00\x10\x05\x0b\x0b4\x03\x00A\x90\xc0\x00\x0b\x10notify received\x00\x00A\xa0\xc0\x00\x0b\x0chello,world\x00\x00A\x00\x0b\x040 \x00\x00'


async def run_test():
    uuosapi = chainapi.ChainApiAsync(config.network_url)
    code1 = uuosapi.mp_compile(test_account1, src)

    try:
        r = await uuosapi.deploy_contract(test_account1, code1, abi, vm_type=1)
    except chainapi.ChainException as e:
        print('+++deploy error:', e.json['message'])

    try:
        r = await uuosapi.deploy_contract(test_account2, wasm_code, b'', vm_type=0)
    except chainapi.ChainException as e:
        print('+++deploy error2:', e.json['message'])

    args = uuosapi.s2b(test_account2)
    r = await uuosapi.exec(test_account1, args)
    print('+++1:', r['processed']['action_traces'][0]['console'])
    print('+++2:', r['processed']['action_traces'][0]['inline_traces'][0]['console'])
