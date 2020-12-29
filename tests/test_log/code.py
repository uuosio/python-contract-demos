import db
import struct
import chain
import uio

self_contract = chain.current_receiver()

def get_scope():
    return name(chain.read_action_data()[:8])

class Log(object):
    def __init__(self, raw=b''):
        self.raw = raw
        self.index = 0
        self.payer = 0

    def pack(self):
        return self.raw

    @classmethod
    def unpack(cls, data):
        return cls(data)

    def get_primary_key(self):
        return self.index

    def __str__(self):
        return str(self.raw)

class LogDB(object):
    def __init__(self):
        scope = get_scope()
        self.log_db = db.ChainDBKey64(self_contract, scope, name('log'), Log)

    def init(self):
        itr = self.log_db.find(0)
        if itr >= 0:
            return
        # log head: total_log : current_log_pos
        raw = bytes(8)
        log = Log(raw)
        log.index = 0
        log.payer = self_contract
        self.log_db.store(log)

        # max 10 logs
        raw = bytes(513)
        for i in range(1, 11):
            log = Log(raw)
            log.index = i
            log.payer = self_contract
            self.log_db.store(log)

    def log(self):
        self.init()
        log_head = self.log_db.load(0)
        total_log, pos = struct.unpack('ii', log_head.raw[:8])

        raw_log = chain.get_log()
        if not raw_log:
            return
        if len(raw_log) > 512:
            raw_log = raw_log[:512]
        buf = uio.BytesIO(512)
        buf.write(raw_log)
        buf.seek(512)
        buf.write(b'\x00')

        log = Log(buf.getvalue())
        pos += 1
        if pos > 10:
            pos = 1
        log.index = pos
        self.log_db.store(log)

        if total_log < 10:
            total_log += 1
        raw = struct.pack('ii', total_log, pos)
        log_head.raw = struct.pack('ii', total_log, pos)
        self.log_db.store(log_head)

logdb = LogDB()
def apply(receiver, first_receiver, action):
    chain.enable_log(True)
    data = chain.read_action_data()
    print(data)
    logdb.log()
