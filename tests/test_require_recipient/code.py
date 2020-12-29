#send notify
import chain
def apply(receiver, first_receiver, action):
    data = chain.read_action_data()
    notify_to = data[8:16]
    notify_to = name(notify_to)
    print('send notify:', notify_to)
    assert chain.is_account(notify_to), 'notify to account does not exists!'
    chain.require_recipient(notify_to)
