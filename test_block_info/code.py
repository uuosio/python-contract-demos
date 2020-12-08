import chain
import time
def apply(receiver, first_receiver, action):
    print(time.time())
    print(chain.current_time())
    print(chain.is_account('hello'), chain.is_account('none'))
    print(chain.tapos_block_num())
    print(chain.tapos_block_prefix())
    print(chain.expiration())
    
    print(chain.read_transaction())

#    _type - 0 for context free action, 1 for action
#    index - the index of the requested action
#    get_action(_type, index)

    print(chain.get_action(1, 0))
    print(chain.get_action(0, 0))
