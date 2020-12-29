modules = [
    ("Basic", [
        ("test_helloworld", "hello world"),
        ("test_name", "name object"),
        ("test_float128", "float128 object"),
        ("test_bytesio", "BytesIO example"),
        ("test_math", "math module"),
    ]),
    ("Chain apis", [
        ("test_assert", "assertion apis"),
        ("test_authorization", "authorization apis"),
        ("test_inline_action", "inline action"),
        ("test_require_recipient", "require_recipient"),
        ("test_block_info", "block information apis"),
    ]),
    ("Crypto", [
        ("test_hash", "hash functions"),
        ("test_recover_key", "recovery_key"),
    ]),
    ("Storage", [
        ("test_storage_1", "persistent storage 1"),
        ("test_storage_2", "persistent storage 2"),
        ("test_storage_3", "persistent storage 3"),
        ("test_storage_4", "persistent storage 4"),
        ("test_multi_index_1", "multi-index 1"),
        ("test_multi_index_2", "multi-index 2"),
        ("test_multi_index_3", "multi-index 3"),
    ]),
    ("Advanced", [
        ("test_call_wasm_contract", "call wasm contract"),
        ("test_token", "token example"),
        ("test_storage_5", "on chain chat room"),
        ("test_create_account", "create account on chain"),
        ("test_log", "on chain log"),
    ]),
]

classes = ["Basic", "Chain apis", "Crypto", "Storage", "Advanced"]

# <optgroup label="Swedish Cars">
# <option value="volvo">Volvo</option>
# <option value="saab">Saab</option>
# </optgroup>

if __name__ == '__main__':
    s = ''
    for label, options in modules:
        group_name = label
        s += f'<optgroup label="{group_name}">\n'
        for value, name in options:
            s += f'<option value="{value}">{name}</option>\n'
        s += '</optgroup>\n'
    print(s)
