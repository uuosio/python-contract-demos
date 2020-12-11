import db
import struct
import chain

class ChatGroup(object):
    def __init__(self, group_name, count=0):
        self.count = count
        self.group_name = group_name

    def pack(self):
        group_name = int.to_bytes(self.group_name, 8, 'little')
        count = int.to_bytes(self.count, 8, 'little')
        return group_name + count

    @classmethod
    def unpack(cls, data):
        group_name, count = data[:8], data[8:]
        group_name = int.from_bytes(group_name, 'little')
        count = int.from_bytes(count, 'little')
        return cls(group_name, count)

    def get_primary_key(self):
        return self.group_name

    def __repr__(self):
        return (self.index, self.account, self.msg)

    def __str__(self):
        data = (self.index, self.account, self.msg)
        return json.dumps(data)


class ChatMessage(object):
    def __init__(self, account, msg):
        self.index = 0
        self.account = account
        self.msg = msg
        self.payer = account

    def pack(self):
        account = int.to_bytes(self.account, 8, 'little')
        return account + self.msg

    @classmethod
    def unpack(cls, data):
        account, msg = data[:8], data[8:]
        account = int.from_bytes(account, 'little')
        return cls(account, msg)

    def get_primary_key(self):
        return self.index

    def __repr__(self):
        return (self.index, self.account, self.msg)

    def __str__(self):
        data = (self.index, self.account, self.msg)
        return json.dumps(data)

self_contract = name('hello')

chat_group_db = db.ChainDBKey64(self_contract, self_contract, name('groups'), ChatGroup)

def apply(receiver, first_receiver, action):
    if action == name('creategroup'):
        data = chain.read_action_data()

        account = int.from_bytes(data[:8], 'little')
        group_name = int.from_bytes(data[8:], 'little')
        chain.require_auth(account)

        group = ChatGroup(group_name)
        group.payer = account
        assert chat_group_db.find(group_name) < 0, 'group already exists!'
        chat_group_db.store(group)

    elif action == name('chat'):
        data = chain.read_action_data()
        account, group_name, msg = data[:8], data[8:16], data[16:]
        account = int.from_bytes(account, 'little')
        group_name = int.from_bytes(group_name, 'little')

        chat = ChatMessage(account, msg)
        chain.require_auth(chat.account)
        
        chat_group = chat_group_db.load(group_name)
        assert chat_group, 'group does not exists!!'
        chat_group.count += 1
        chat_group.payer = chat.account
        chat_group_db.store(chat_group)

        
        if chat_group.count > 10:
        # if chain.get_table_count(self_contract, self_contract, name(chat.group)) > 10:
            itr = chain.db_lowerbound_i64(self_contract, self_contract, name(group_name), 0)
            if itr >= 0:
                chain.db_remove_i64(itr)

        chat.index = chat_group.count

        chatdb = db.ChainDBKey64(self_contract, self_contract, name(group_name), ChatMessage)
        chatdb.store(chat)

