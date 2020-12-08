def apply(a, b, c):
    a = float128('3.14') * 5.1
    print(type(a), a)

    a = 5.1 * float128('3.14')
    print(type(a), a)

    a = float128(3.14) * float128(5.1)
    print(type(a), a)
