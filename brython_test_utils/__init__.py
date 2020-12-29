import sys
import time
import tb as traceback

from browser import console
import test_modules

def discover_brython_test_modules():
    # TODO : Test discovery based on file system paths
    return test_modules.modules

def populate_testmod_input(elem, selected=None):
    """Build a multiple selection control including test modules
    """
    from browser import html
    groups = discover_brython_test_modules()
    for label, options in groups:
        if selected and label not in selected:
            continue
        g = html.OPTGROUP(label=label)
        elem <= g
        for filenm, caption in options:
            if filenm == selected:
                o = html.OPTION(caption, value=filenm, selected='')
            else:
                o = html.OPTION(caption, value=filenm)
            g <= o

async def run(src, file_path=None):
    t0 = time.perf_counter()
    msg = ''
    try:
        a = compile(src, "__main__", 'exec')
        m = type(sys)('__main__')
        if file_path is not None:
            m.__dict__['__file__'] = file_path
        print('Test is running, please wait...')
        exec(a, m.__dict__)
        await m.run_test()
        state = 1
    except Exception as exc:
        print(exc)
        # msg = traceback.format_exc()
        # print(msg, file=sys.stderr)
        state = 0
    t1 = time.perf_counter()
    return state, t0, t1, msg

async def run2(src, file_path=None):
    t0 = time.perf_counter()
    msg = ''
    try:
        ns = {'__name__':'__main__'}
        if file_path is not None:
            ns['__file__'] = file_path
        exec(src, ns)
        state = 1
    except Exception as exc:
        msg = traceback.format_exc()
        print(msg, file=sys.stderr)
        state = 0
    t1 = time.perf_counter()
    return state, t0, t1, msg

def run_test_module(filename, base_path=''):
    if base_path and not base_path.endswith('/'):
        base_path += '/'
    file_path = base_path + filename
    src = open(file_path).read()
    return run(src, file_path)

