import chain
def apply(receiver, first_receiver, action):
    if action == name('test1'):
        chain.uuos_assert(receiver == first_receiver, 'oops, not work in notify')
        chain.uuos_assert_code(receiver == first_receiver, 123)
    elif action == name('test2'):
        assert False, 'exception raised'
    else:
        chain.uuos_assert(False, 'bad action')
