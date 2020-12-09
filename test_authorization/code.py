import chain
def apply(receiver, first_receiver, action):
    print(receiver, first_receiver)
    if action == name('test1'):
        print(chain.has_auth('hello'))
        print(chain.has_auth('bob'))
        chain.require_auth('hello')
        chain.require_auth2('hello', 'active')
    elif action == name('test2'):
        print('hello')
        # not good, transaction does not have owner authorization,
        # will throw an exception, should be caught by test code
        chain.require_auth2('hello', 'owner')
