import chain
def apply(receiver, first_receiver, action):
    data = 'hello,world'
    h = chain.sha256(data)
    print('hash256:', h)
    chain.assert_sha256(data, h)

    h = chain.sha1(data)
    print('sha1:', h)
    chain.assert_sha1(data, h)

    h = chain.sha512(data)
    print('sha512', h)
    chain.assert_sha512(data, h)

    h = chain.ripemd160(data)
    print('ripemd160:', h)
    chain.assert_ripemd160(data, h)
    print('all tests passed!')
