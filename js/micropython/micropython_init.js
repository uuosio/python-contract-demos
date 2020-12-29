window.output_buffer = '';

function compile_src(src) {
    var code_ptr = mp_js_compile_src('main.py', src);
    if (code_ptr == 0) {
        return '';
    }
    code_size = getValue(code_ptr, 'i32');
    if (code_size == 0) {
        return '';
    }
    var hexString = '';
    for (var i=0;i<code_size;i++) {
        var b = getValue(code_ptr + 4 + i, 'i8');
        b &= 0xff;
        var hex = b.toString(16);
        if (hex.length == 1) {
            hex = '0'+hex;
        }
        hexString += hex;
    }
//    console.log(hexString);
    return hexString;
}

function mp_init() {
    mp_js_init(512 * 1024);
    mp_js_do_str('print(\'hello world\')');
    compile_src("print('hello worlddd')");  
}
