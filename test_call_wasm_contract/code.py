import struct
import chain
def apply(receiver, code, action):
    contract = chain.s2n('calltest1')
    args = struct.pack('QQ', contract, 1)
    ret = chain.call_contract('helloworld11', args)
    print('+++call contract return:', len(ret), ret)
    ret = int.from_bytes(ret, 'little')
    print(ret)
    assert ret == 2
