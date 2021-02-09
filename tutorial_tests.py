import time
import sys
import tb as traceback

from browser import document as doc, bind, console, window
from browser import timer, aio
from browser.local_storage import storage
from browser import timer

import editor_tutorial as editor
import brython_test_utils as utils

import test_modules
from uuoskit import test_helper

#utils.populate_testmod_input(doc['files'], test_modules.classes)

failed = []
t_start = None

def save_editor():
    storage['code'] = editor.editor.getValue()
    storage['abi'] = editor.editor_abi.getValue()
    storage['test'] = editor.editor_test.getValue()

async def run(reset=False):
    if reset:
        doc["console"].value = ""

    src = editor.editor_test.getValue()
    if storage is not None:
       storage["py_test"] = src
    
    save_editor()

    state, t0, t1, _ = await utils.run(src)
    dt = (t1 - t0) * 1000.0
    if state == 0:
#        print(f'<completed in {dt:6.2f} ms (FAILED)>')
        print(f'<Test finished (FAILED)>')
    else:
#        print(f'<completed in {dt:6.2f} ms (OK)>')
        print(f'<Test finished (OK)>')
    sys.stdout.flush()

    return state

@bind("#set_debug", "change")
def set_debug(ev):
    if ev.target.checked:
        __BRYTHON__.debug = 1
    else:
        __BRYTHON__.debug = 0

__BRYTHON__.debug = int(doc['set_debug'].checked)

@bind("#run", "click")
def run_one(ev):
    aio.run(run(reset=True))

async def load_test(test_name):
    req = await aio.get('tests/' + test_name + '/code.py', data={"t": time.time()})
    src = req.data
    editor.editor.setValue(src)
    storage["code"] = src

    req = await aio.get('tests/' + test_name + '/abi.py', data={"t": time.time()})
    src = req.data
    editor.editor_abi.setValue(src)
    storage["abi"] = src

    req = await aio.get('tests/' + test_name + '/test.py', data={"t": time.time()})
    src = req.data
    editor.editor_test.setValue(src)
    storage["test"] = src

def load_test_sync(test_name):
    url = 'tests/' + test_name + '/code.py' + '?foo=%s' % time.time()
    code = open(url).read()
    editor.editor.setValue(code)
    storage['code'] = code

    url = 'tests/' + test_name + '/abi.py' + '?foo=%s' % time.time()
    abi = open(url).read()
    editor.editor_abi.setValue(abi)
    storage['abi'] = abi

    url = 'tests/' + test_name + '/test.py' + '?foo=%s' % time.time()
    test = open(url).read()
    editor.editor_test.setValue(test)
    storage['test'] = test

def load_test_in_storage():
    if 'code' in storage:
       editor.editor.setValue(storage['code'])

    if 'abi' in storage:
        editor.editor_abi.setValue(storage['abi'])

    if 'test' in storage:
        editor.editor_test.setValue(storage['test'])

def option_load_test(evt):
    storage['selected_file_index'] = str(doc['files'].selectedIndex)
    storage['selected_file'] = evt.target.value
    load_test_sync(evt.target.value)

async def init_editor():
    option = doc['files'].options[0]
    
    if 'selected_file_index' in storage:
        doc['files'].selectedIndex = int(storage['selected_file_index'])
    else:
        doc['files'].selectedIndex = 0

    if 'selected_file' in storage:
        load_test_in_storage()
    else:
        storage['selected_file_index'] = str(0)
        storage['selected_file'] = 'test_helloworld'
        load_test_sync('test_helloworld')

    # network = 'UUOS_Testnet'
    # if 'network' in storage:
    #     network = storage['network']
    # if network == 'Eos_Testnet':
    #     doc['networks'].selectedIndex = 0
    # elif network == 'UUOS_Testnet':
    #     doc['networks'].selectedIndex = 1
    # else:
    #     doc['networks'].selectedIndex = 0

    network = 'UUOS_Testnet'
    doc['networks'].selectedIndex = 0
    switch_network(network)

def load_code(evt):
    if evt.target.id == 'btn_code':
        window.on_tab_click(evt, 'code')
    elif evt.target.id == 'btn_abi':
        window.on_tab_click(evt, 'abi')
    elif evt.target.id == 'btn_test':
        window.on_tab_click(evt, 'test')
    else:
        window.on_tab_click(evt, 'code')

def switch_network(network_name):
    storage['network'] = network_name
    if network_name == 'Eos_Testnet':
        test_helper.init1()
    elif network_name == 'UUOS_Testnet':
        test_helper.init2()
    elif network_name == 'UUOS_Testnet2':
        test_helper.init3()
    else:
        test_helper.init1()

def option_on_change_network(evt):
    network_name = evt.target.value
    switch_network(network_name)

# bindings to functions in module editor
# doc['show_js'].bind('click', editor.show_js)
# doc['show_console'].bind('click', editor.show_console)
doc['files'].bind('change', option_load_test)
doc['networks'].bind('change', option_on_change_network)

doc['btn_code'].bind('click', load_code)
doc['btn_abi'].bind('click', load_code)
doc['btn_test'].bind('click', load_code)

aio.run(init_editor())
def print_str(s):
    print(s, end='')
window.print_str = print_str

timer.set_interval(save_editor, 10000)
