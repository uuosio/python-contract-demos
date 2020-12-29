import struct
import chain

TOKEN_SYMBOL = int.from_bytes(b'\x04TTT\x00\x00\x00\x00', 'little')

def apply(receiver, first_receiver, action):
    if not receiver == first_receiver:
        return
    if action == name('create'):
#        token_create( uint64_t issuer, int64_t maximum_supply, uint64_t sym)
        data = chain.read_action_data()
        issuer, maximum_supply, symbol = struct.unpack('QQQ', data)
        assert symbol == TOKEN_SYMBOL
        chain.token_create(issuer, maximum_supply, TOKEN_SYMBOL)
    elif action == name('issue'):
# void token_issue( uint64_t to, int64_t quantity, uint64_t sym, const char* memo, size_t size2 );
        data = chain.read_action_data()
        to, quantity, symbol = struct.unpack('QQQ', data[:24])
        assert TOKEN_SYMBOL == symbol
        chain.token_issue(to, quantity, TOKEN_SYMBOL, data[25:])
    elif action == name('transfer'):
# void token_transfer( uint64_t from, uint64_t to, int64_t quantity, uint64_t sym, const char* memo, size_t size2);
        data = chain.read_action_data()
        _from, to, quantity, symbol = struct.unpack('QQQQ', data[:32])
        assert TOKEN_SYMBOL == symbol
        chain.token_transfer(_from, to, quantity, TOKEN_SYMBOL, data[33:])
