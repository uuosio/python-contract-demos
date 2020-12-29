import json
import javascript

jsobj_type = type(javascript.Date)

def dumps(data, indent=''):
    if type(data) == jsobj_type:
        return javascript.JSON.stringify(data, None, indent)
    else:
        json.dumps(data, indent)

def loads(data):
    if type(data) == jsobj_type:
        return javascript.JSON.parse(data)
    else:
        json.loads(data)
