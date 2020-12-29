'''
   struct permission_level_weight {
      permission_level  permission;
      uint16_t          weight;

      // explicit serialization macro is not necessary, used here only to improve compilation time
      EOSLIB_SERIALIZE( permission_level_weight, (permission)(weight) )
   };

   struct key_weight {
      eosio::public_key  key;
      uint16_t           weight;

      // explicit serialization macro is not necessary, used here only to improve compilation time
      EOSLIB_SERIALIZE( key_weight, (key)(weight) )
   };

   struct wait_weight {
      uint32_t           wait_sec;
      uint16_t           weight;

      // explicit serialization macro is not necessary, used here only to improve compilation time
      EOSLIB_SERIALIZE( wait_weight, (wait_sec)(weight) )
   };

   struct authority {
      uint32_t                              threshold = 0;
      std::vector<key_weight>               keys;
      std::vector<permission_level_weight>  accounts;
      std::vector<wait_weight>              waits;

      // explicit serialization macro is not necessary, used here only to improve compilation time
      EOSLIB_SERIALIZE( authority, (threshold)(keys)(accounts)(waits) )
   };

'''


import chain
import struct
import binascii
import uio

RAW_TOKEN_SYMBOL = b'\x04UUOS\x00\x00\x00'
TOKEN_SYMBOL = int.from_bytes(b'\x04UUOS\x00\x00\x00', 'little')

def create_new_account(account, pub_key, amount):
    creator = name('hello').to_bytes()
    assert amount > 6_000, "not enough balance to create an account"

    packed_size = b'\x01'
    packed_zero_size = b'\x00'
    packed_key_weight = struct.pack('H', 1) #uint16
    threshold = struct.pack('I', 1) #uint32

    new_account = uio.BytesIO(102)
    auth = b''.join((threshold, packed_size, pub_key, packed_key_weight, packed_zero_size, packed_zero_size))
    owner = auth
    active = auth

    new_account.write(creator)
    new_account.write(account)
    new_account.write(owner)
    new_account.write(active)
    print(new_account.tell())

    actor = name('hello')
    permission = name('active')
    chain.send_inline(name('uuos'), name('newaccount'), actor, permission, new_account.getvalue())

    # buyrambytes = creator + account + struct.pack('I', 64*1024)
    # chain.send_inline(name('uuos'), name('buyrambytes'), actor, permission, buyrambytes)

    payer = creator
    receiver = account
    buy_ram_amount = 5_000
    quantity = struct.pack('Q', buy_ram_amount) + RAW_TOKEN_SYMBOL

    buyram = uio.BytesIO(32)
    buyram.write(payer)
    buyram.write(receiver)
    buyram.write(quantity)
    buyram = buyram.getvalue()
    # buyram = b''.join((payer, receiver, quantity))
    chain.send_inline(name('uuos'), name('buyram'), actor, permission, buyram)

    stake_net_amount = 1_000
    stake_cpu_amount = amount - buy_ram_amount - stake_net_amount

    stake_net_quantity = struct.pack('Q', stake_net_amount) + RAW_TOKEN_SYMBOL
    stake_cpu_quantity = struct.pack('Q', stake_cpu_amount) + RAW_TOKEN_SYMBOL
    transfer = b'\x01'

    delegatebw = creator + account + stake_net_quantity + stake_cpu_quantity + transfer
    chain.send_inline(name('uuos'), name('delegatebw'), actor, permission, delegatebw)

def apply(receiver, first_receiver, action):
    if first_receiver == name('uuos.token'): #receive a notify from uuos.token
        print(receiver, first_receiver)
        if not action == name('transfer'):
            return
        data = chain.read_action_data()
        _from, to, amount, symbol = struct.unpack('QQQQ', data[:32])
        if _from == int(name('hello')):
            return
        assert name(to) == name('hello')
        assert symbol == TOKEN_SYMBOL, 'bad token'
        assert amount >= 1_0000
        memo = data[33:]
        account, pub_key = memo.split(b'-')
        assert len(pub_key) == 68
        account = name(account.decode())
        account = bytes(account)
        pub_key = binascii.unhexlify(pub_key)
        create_new_account(account, pub_key, amount)

    if action == name('newaccount'):
        chain.require_auth('hello')
        data = chain.read_action_data()
        account = data[:8]
        pub_key = data[8:8+34]
        create_new_account(account, pub_key)
    elif action == name('sayhello'):
        data = chain.read_action_data()
        print(data)
