{
    "version": "eosio::abi/1.0",
    "types": [],
    "structs": [
        {
            "name": "chat_record",
            "base": "",
            "fields": [
                {
                    "name": "account",
                    "type": "name"
                },
                {
                    "name": "msg",
                    "type": "string"
                }
            ]
        },
        {
            "name": "chat",
            "base": "",
            "fields": [
                {
                    "name": "account",
                    "type": "name"
                },
                {
                    "name": "group_name",
                    "type": "name"
                },
                {
                    "name": "msg",
                    "type": "string"
                }
            ]
        },
        {
            "name": "chatgroup",
            "base": "",
            "fields": [
                {
                    "name": "account",
                    "type": "name"
                },
                {
                    "name": "group_name",
                    "type": "name"
                }
            ]
        }
    ],
    "actions": [{
        "name": "chat",
        "type": "chat",
        "ricardian_contract": ""
        },
        {
            "name": "creategroup",
            "type": "chatgroup",
            "ricardian_contract": ""
        }
    ],
    "tables": [
        {
            "name": "group2",
            "type": "chat_record",
            "index_type": "i64",
            "key_names": [],
            "key_types": []
        },
        {
            "name": "group1",
            "type": "chat_record",
            "index_type": "i64",
            "key_names": [],
            "key_types": []
        },
        {
            "name": "chatgroup",
            "type": "chatgroup",
            "index_type": "i64",
            "key_names": [],
            "key_types": []
        }
    ],
    "ricardian_clauses": [],
    "error_messages": [],
    "abi_extensions": []
}
