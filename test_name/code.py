import chain
def apply(receiver, first_receiver, action):
    print(type(receiver), type(first_receiver), type(action))

    print(receiver, first_receiver, action)
    print(int(receiver), int(first_receiver), int(action))
    print(str(receiver), str(first_receiver), str(action))

    print(name('hello'), name('sayhello'))
    
    print(chain.s2n('hello'), chain.n2s(7684013976526520320), type(chain.n2s(7684013976526520320)))
