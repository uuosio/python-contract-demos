# https://docs.micropython.org/en/latest/library/math.html
def apply(receiver, first_receiver, action):
    import math
    print(math.pow(5, 2) == 25.0)
    print(math.ceil(1.1) == 2)
    print(math.log2(8) == 3.0)
    print(math.sqrt(4) == 2.0)
    print(math.pi)
    print(dir(math))
