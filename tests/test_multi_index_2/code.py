import json
import struct
import db
import chain

def get_scope():
    return name(chain.read_action_data()[:8])

class MyData(object):
    def __init__(self, a: int, b: int, c: int, d: float):
        self.a = a
        self.b = b
        self.c = c
        self.d = d
        self.payer = 0

    def pack(self):
        b = int.to_bytes(self.b, 16, 'little')
        c = int.to_bytes(self.c, 32, 'little')
        return struct.pack('Q16s32sd', self.a, b, c, self.d)

    @classmethod
    def unpack(cls, data):
        a, b, c, d = struct.unpack('Q16s32sd', data)
        b = int.from_bytes(b, 'little')
        c = int.from_bytes(c, 'little')
        return cls(a, b, c, d)

    def get_primary_key(self):
        return self.a

    def get_secondary_values(self):
        return (self.a, self.b, self.c, self.d)

    @staticmethod
    def get_secondary_indexes():
        return (db.idx64, db.idx128, db.idx256, db.idx_double)

    def __str__(self):
        data = (self.a, self.b, self.c, self.d)
        return json.dumps(data)

def apply(receiver, code, action):
    code = receiver
    scope = get_scope()
    payer = receiver

    table = name('table')
    mi = db.MultiIndex(code, scope, table, MyData)

    try:
        itr = mi.find(1)
        if itr >= 0:
            data = mi.get(itr)
            print(data.a, data.b, data.c, data.d)
    except Exception as e:
        print(e)

    d = MyData(1, 2, 3, 5.0)
    d.payer = payer
    mi.store(d)
    print(mi[1])
    print(1 in mi)
    print(2 in mi)

    d = MyData(3, 4, 5, 7.0)
    d.payer = payer
    mi.store(d)

    itr = mi.lower_bound(1)
    print(itr, mi.get(itr))

    itr = mi.upper_bound(1)
    print(itr, mi.get(itr))
