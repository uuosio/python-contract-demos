import struct
import chain
import db


class Counter(object):

    def __init__(self):
        receiver = 'helloworld11'
        code = receiver
        scope = 'helloworld11'
        payer = receiver
        self.storage = db.ChainDBKey64(code, scope, name('table3'), type(self))
        self.primary_key = chain.s2n('counter')
        self.payer = payer

    def load(self):
        self.count = self.storage.load(self.primary_key)
        if self.count is None:
            self.count = 0

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

counter = Counter()
def apply(receiver, first_receiver, action):
    counter.load()
    counter.count += 1
    counter.store()
    print('+++counter is:', counter)
