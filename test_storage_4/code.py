import struct
import chain
import db

def get_scope():
    return name(chain.read_action_data()[:8])

class Counter(object):

    def __init__(self):
        receiver = chain.current_receiver()
        code = receiver
        scope = get_scope()
        payer = receiver
        self.storage = db.ChainDBKey64(code, scope, name('table3'), type(self))
        self.primary_key = chain.s2n('counter')
        self.payer = payer
        self.count = self.load()
        if self.count is None:
            self.count = 0

    def load(self):
        return self.storage.load(self.primary_key)

    def store(self):
        self.storage.store(self)

    def pack(self):
        return struct.pack('l', self.count)

    @classmethod
    def unpack(cls, data):
        return struct.unpack('l', data)[0]

    def get_primary_key(self):
        return self.primary_key

    def __str__(self):
        return str(self.count)

def apply(receiver, first_receiver, action):
    c = Counter()
    c.count += 1
    c.store()
    print('counter is:', c)
