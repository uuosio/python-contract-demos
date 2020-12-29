import chain
def apply(receiver, first_receiver, action):
    signature = chain.read_action_data()[8:]
    digest = chain.sha256('hello,world')
    pub_key = chain.recover_key(digest, signature)
    print(pub_key)
    # raw public key, no checksum, 34 bytes
    assert pub_key == b'\x00\x02\xa8\x91\xe0\xddW\x13.\xd6\x83\xbc\x87]\xac\xc9a\xc6\xfd]\xfa\xe6\x80\x0b\xc6\x18\x1a\xb6\x8b\xb8H%\x1eR'
    chain.assert_recover_key(digest, signature, pub_key)
