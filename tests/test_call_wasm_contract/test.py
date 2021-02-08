'''
Example for call wasm contract.
'''

from uuoskit import chainapi, config, wallet
from uuoskit import test_helper

wasm_abi = {
    "version": "eosio::abi/1.0",
    "types": [],
    "structs": [],
    "actions": [],
    "tables": [],
    "ricardian_clauses": [],
    "error_messages": [],
    "abi_extensions": []
}

'''c++ code
#include <eosio/eosio.hpp>
#include <eosio/action.hpp>
#include <eosio/print.hpp>

extern "C" {
    __attribute__((eosio_wasm_import))
    int call_contract_get_args(void* args, size_t size1);

    __attribute__((eosio_wasm_import))
    int call_contract_set_results(void* result, size_t size1);

    void apply( uint64_t receiver, uint64_t code, uint64_t action ) {
        if (receiver == code) {
            uint64_t args[2];
            int args_size = ::call_contract_get_args(&args, sizeof(args));
            eosio::print("+++++++++++call: arg size:", args_size, "\n");
            eosio::check(args_size == 16, "bad args size");
            if (args[0] == eosio::name("calltest1").value) {
                eosio::print("+++++++++++call: args[1]:", args[1], "\n");
                args[1] += 1;
                ::call_contract_set_results(&args[1], sizeof(uint64_t));
            }
        }
    }
}
'''
wasm_code = b'\x00asm\x01\x00\x00\x00\x01)\x08`\x02\x7f\x7f\x01\x7f`\x01\x7f\x00`\x01~\x00`\x02\x7f\x7f\x00`\x03\x7f\x7f\x7f\x01\x7f`\x00\x00`\x01\x7f\x01\x7f`\x03~~~\x00\x02\x86\x01\x07\x03env\x16call_contract_get_args\x00\x00\x03env\x06prints\x00\x01\x03env\x06printi\x00\x02\x03env\x0ceosio_assert\x00\x03\x03env\x07printui\x00\x02\x03env\x19call_contract_set_results\x00\x00\x03env\x06memset\x00\x04\x03\x07\x06\x05\x06\x05\x01\x07\x00\x04\x05\x01p\x01\x01\x01\x05\x03\x01\x00\x01\x06\x16\x03\x7f\x01A\x80\xc0\x00\x0b\x7f\x00A\xfc\xc1\x00\x0b\x7f\x00A\xfc\xc1\x00\x0b\x07\t\x01\x05apply\x00\x0b\n\xcc\x06\x06\x04\x00\x10\t\x0b\xad\x01\x01\x03\x7f \x00!\x01\x02@\x02@\x02@ \x00A\x03qE\r\x00 \x00-\x00\x00E\r\x01 \x00A\x01j!\x01\x03@ \x01A\x03qE\r\x01 \x01-\x00\x00!\x02 \x01A\x01j"\x03!\x01 \x02\r\x00\x0b \x03A\x7fj \x00k\x0f\x0b \x01A|j!\x01\x03@ \x01A\x04j"\x01(\x02\x00"\x02A\x7fs \x02A\xff\xfd\xfbwjqA\x80\x81\x82\x84xqE\r\x00\x0b \x02A\xff\x01qE\r\x01\x03@ \x01-\x00\x01!\x02 \x01A\x01j"\x03!\x01 \x02\r\x00\x0b \x03 \x00k\x0f\x0b \x00 \x00k\x0f\x0b \x01 \x00k\x0b6\x01\x01\x7f#\x00A\x10k"\x00A\x006\x02\x0cA\x00 \x00(\x02\x0c(\x02\x00A\x07jAxq"\x006\x02\x84@A\x00 \x006\x02\x80@A\x00?\x006\x02\x8c@\x0b\x02\x00\x0b\xc1\x01\x01\x02\x7f#\x00A0k"\x03$\x00\x10\x07\x02@ \x00 \x01R\r\x00 \x03A jA\x10\x10\x00!\x04A\x90\xc0\x00\x10\x01 \x04\xac\x10\x02A\xab\xc0\x00\x10\x01\x02@ \x04A\x10F\r\x00A\x00A\xad\xc0\x00\x10\x03\x0b \x03)\x03 !\x00 \x03A\xbb\xc0\x006\x02\x10 \x03A\xbb\xc0\x00\x10\x086\x02\x14 \x03 \x03)\x03\x107\x03\x08 \x03A\x18j \x03A\x08j\x10\x0c\x1a \x00B\x80\x80\xa0\xc8\xb1\x95\xc7\xd1\xc1\x00R\r\x00A\xc5\xc0\x00\x10\x01 \x03)\x03(\x10\x04A\xab\xc0\x00\x10\x01 \x03 \x03)\x03(B\x01|7\x03( \x03A jA\x08rA\x08\x10\x05\x1a\x0bA\x00\x10\n \x03A0j$\x00\x0b\x98\x03\x03\x02\x7f\x01~\x03\x7f \x00B\x007\x03\x00\x02@\x02@\x02@\x02@\x02@ \x01(\x02\x04"\x02A\x0eI\r\x00A\x00A\xdf\xc0\x00\x10\x03A\x0c!\x03\x0c\x01\x0b \x02E\r\x03 \x02A\x0c \x02A\x0cI\x1b"\x03E\r\x01\x0b \x00)\x03\x00!\x04 \x01(\x02\x00!\x05A\x00!\x06\x03@ \x00 \x04B\x05\x86"\x047\x03\x00\x02@\x02@ \x05 \x06j-\x00\x00"\x07A.G\r\x00A\x00!\x07\x0c\x01\x0b\x02@ \x07AOjA\xff\x01qA\x04K\r\x00 \x07APj!\x07\x0c\x01\x0b\x02@ \x07A\x9f\x7fjA\xff\x01qA\x19K\r\x00 \x07A\xa5\x7fj!\x07\x0c\x01\x0bA\x00!\x07A\x00A\xc8\xc1\x00\x10\x03 \x00)\x03\x00!\x04\x0b \x00 \x04 \x07\xadB\xff\x01\x83\x84"\x047\x03\x00 \x06A\x01j"\x06 \x03I\r\x00\x0c\x02\x0b\x0b \x00)\x03\x00!\x04A\x00!\x03\x0b \x00 \x04A\x0c \x03kA\x05lA\x04j\xad\x867\x03\x00 \x02A\rG\r\x00B\x00!\x04\x02@ \x01(\x02\x00-\x00\x0c"\x06A.F\r\x00\x02@ \x06AOjA\xff\x01qA\x04K\r\x00 \x06APj\xadB\xff\x01\x83!\x04\x0c\x01\x0b\x02@ \x06A\x9f\x7fjA\xff\x01qA\x1aO\r\x00 \x06A\xa5\x7fj"\x06\xadB\xff\x01\x83!\x04 \x06A\xff\x01qA\x10I\r\x01A\x00A\x85\xc1\x00\x10\x03\x0c\x01\x0bA\x00A\xc8\xc1\x00\x10\x03\x0b \x00 \x00)\x03\x00 \x04\x847\x03\x00\x0b \x00\x0b\x0b\xae\x02\t\x00A\x90\xc0\x00\x0b\x1b+++++++++++call: arg size:\x00\x00A\xab\xc0\x00\x0b\x02\n\x00\x00A\xad\xc0\x00\x0b\x0ebad args size\x00\x00A\xbb\xc0\x00\x0b\ncalltest1\x00\x00A\xc5\xc0\x00\x0b\x1a+++++++++++call: args[1]:\x00\x00A\xdf\xc0\x00\x0b&string is too long to be a valid name\x00\x00A\x85\xc1\x00\x0bCthirteenth character in name cannot be a letter that comes after j\x00\x00A\xc8\xc1\x00\x0b4character is not in allowed character set for names\x00\x00A\x00\x0b\x04\x00!\x00\x00'




src, abi = test_helper.load_code()

test_account1 = test_helper.test_account1

async def run_test():
    if config.system_contract == 'eosio':
        print('This example only works on uuos network')
        return
    uuosapi = chainapi.ChainApiAsync(config.network_url)
    code = uuosapi.mp_compile(test_account1, src)

    try:
        r = await uuosapi.deploy_contract(test_account2, wasm_code, wasm_abi, vm_type=0)
    except chainapi.ChainException as e:
        print('+++deploy error:', e.json['message'])

    r = await uuosapi.deploy_python_contract(test_account1, code, abi)

    args = 'hello,world'
    try:
        r = await uuosapi.push_action(test_account1, 'sayhello', args, {test_account1: 'active'})
        test_helper.print_console(r)
    except chainapi.ChainException as e:
        print('+++test error:', e)






