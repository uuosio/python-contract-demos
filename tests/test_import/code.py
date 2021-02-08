from helloworld11 import hello
from helloworld11.hello import say_hello

def apply(receiver, first_receiver, action):
    hello.say_hello()
    say_hello()

'============='

def say_hello():
    print('hello world from sub module')
