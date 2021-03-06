import chain
def apply(a, b, c):
    r = chain.kv_set('helloworld11', b'hello', b'world', 'helloworld11')
    print(r)
    r = chain.kv_set('helloworld11', b'helloo', b'worldd', 'helloworld11')
    print(r)
    r = chain.kv_get('helloworld11', b'hello')
    print(r)
    r = chain.kv_get_data(0)
    print('+++kv_get_data:', r)

    itr = chain.kv_it_create('helloworld11', b'hello')
    print(itr)
    ret = chain.kv_it_lower_bound(itr, b'hello')
    print('kv_it_lower_bound:', ret)

    ret = chain.kv_it_key(itr, 0, 0)
    print('+++kv_it_key:', ret)

    ret = chain.kv_it_value(itr, 0, 0)
    print('+++kv_it_value:', ret)

    itr_ok, key_size, value_size = chain.kv_it_next(itr)
    print('+++kv_it_next:', itr_ok, key_size, value_size)
    ret = chain.kv_it_key(itr, 0, 0)
    print('+++kv_it_key:', ret)

