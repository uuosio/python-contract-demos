import db
import struct
import chain

class Counter(object):

    def __init__(self):
        self.storage = db.ChainDBKey64(name('hello'), name('hello'), name('table3'), type(self))
        self.primary_key = chain.s2n('counter')
        self.payer = name('hello')
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

    def __repr__(self):
        return self.count

    def __str__(self):
        return str(self.count)

def apply(receiver, first_receiver, action):
    c = Counter()
    c.count += 1
    c.store()
    print('counter is:', c)
