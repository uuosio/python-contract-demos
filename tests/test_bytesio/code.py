import uio

SEEK_SET = 0
SEEK_CUR = 1
SEEK_END = 2

def apply(receiver, first_receiver, action):
   buf = uio.BytesIO(b'hello')
   print(buf.read(1))
   print(buf.getvalue())
   
   buf.seek(2)
   buf.write('kk')
   print(buf.getvalue())

   #seek to end
   buf.seek(0, SEEK_END)
   print(buf.tell())
   buf.write(',world')
   print(buf.getvalue())
