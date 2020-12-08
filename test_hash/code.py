import chain
def apply(receiver, first_receiver, action):
    data = 'hello,world'
    h = chain.sha256(data)
    chain.assert_sha256(data, h)

    h = chain.sha1(data)
    chain.assert_sha1(data, h)

    h = chain.sha512(data)
    chain.assert_sha512(data, h)

    h = chain.ripemd160(data)
    chain.assert_ripemd160(data, h)
    print('all tests passed!')
