#send notify
import chain
def apply(receiver, first_receiver, action):
    print('send notify:')
    chain.require_recipient(name('helloworld11'))

#*code separator*#

#notify receiver
import chain
def apply(receiver, first_receiver, action):
    if receiver != first_receiver:
        data = chain.read_action_data()
        print('on notify:', receiver, first_receiver, action, data)
