import json
import chain
import db

class MyDataI256(object):
    def __init__(self, a: int, b: int, c: int, d: float):
        self.a = a
        self.b = b
        self.c = c
        self.d = d
        self.payer = 0

    def pack(self):
        data = (self.a, self.b, self.c, self.d)
        return json.dumps(data)

    @classmethod
    def unpack(cls, data):
        data = json.loads(data)
        return cls(data[0], data[1], data[2], data[3])

    def get_primary_key(self):
        return self.a

    def __str__(self):
        data = (self.a, self.b, self.c, self.d)
        return json.dumps(data)

def apply(receiver, first_receiver, action):
    code = receiver
    scope = get_scope()
    table = name('table3')
    payer = receiver

    storage = db.ChainDBKey256(code, scope, table, MyDataI256)
    primary_key = 0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    d = MyDataI256(primary_key, 2, 3, 5.0)
    d.payer = payer
    storage.store(d)
    
    primary_key = 0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    data = storage.load(primary_key)
    print(data)

    primary_key = 0
    data = storage.load(primary_key)
    print(data)
