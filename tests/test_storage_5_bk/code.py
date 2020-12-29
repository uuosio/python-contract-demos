import struct
import chain
import db

def get_scope():
    return name(chain.read_action_data()[:8])

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
        time_seconds = int.to_bytes(chain.current_time(), 8, 'little')
        return account + time_seconds + self.msg

    @classmethod
    def unpack(cls, data):
        account, time_seconds, msg = data[:8], data[8:16], data[16:]
        account = int.from_bytes(account, 'little')
        time_seconds = int.from_bytes(time_seconds, 'little')
        return cls(account, msg)

    def get_primary_key(self):
        return self.index

    def __str__(self):
        data = (self.index, self.account, self.msg)
        return json.dumps(data)

self_contract = chain.current_receiver()
scope = get_scope()
chat_group_db = db.ChainDBKey64(self_contract, scope, name('groups'), ChatGroup)


def apply(receiver, first_receiver, action):
    if action == name('exec'):
        data = chain.read_action_data()
        code, method = struct.unpack('QQ', data[:16])
        if method == chain.s2n('creategroup'):
            account, group_name = struct.unpack('QQ', data[16:32])

            chain.require_auth(account)

            group = ChatGroup(group_name)
            group.payer = account
            assert chat_group_db.find(group_name) < 0, 'group already exists!'
            chat_group_db.store(group)

        elif method == chain.s2n('chat'):
            account, group_name, msg = data[16:24], data[24:32], data[32:]
            account = int.from_bytes(account, 'little')
            group_name = int.from_bytes(group_name, 'little')
    
            chat = ChatMessage(account, msg)
            chain.require_auth(chat.account)
            
            chat_group = chat_group_db.load(group_name)
            assert chat_group, 'group does not exists!'
            chat_group.count += 1
            chat_group.payer = 0
            chat_group_db.store(chat_group)
        
            scope = get_scope()
            chatdb = db.ChainDBKey64(self_contract, scope, name(group_name), ChatMessage)

            if len(chatdb) >= 10:
                itr = chatdb.lower_bound(0)
                if itr >= 0:
                    chatdb.remove_by_itr(itr)
    
            chat.index = chat_group.count
            chatdb.store(chat)
