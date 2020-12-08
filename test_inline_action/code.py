import chain
def apply(receiver, first_receiver, action):
    if action == name('testinline'):
        account = name('hello')
        action = name('sayhello')
        actor = name('hello')
        permission = name('active')
        data = b'hello,world'
        chain.send_inline(account, action, actor, permission, data)
        print('inline action sended')
    elif action == name('sayhello'):
        data = chain.read_action_data()
        print(data)
