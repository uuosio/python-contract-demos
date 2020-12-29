class RpcWrapper {
    constructor(rpc) {
        this.rpc = rpc;
    }

    async get_info() {
        try {
            return await this.rpc.get_info();
        } catch (err) {
            return {error: err};
        }
    }

    async get_account(account) {
        try {
            return await this.rpc.get_account(account);
        } catch (err) {
            return {error: err};
        }
    }

    async get_code(account) {
        try {
            return await this.rpc.get_code(account);
        } catch (err) {
            return {error: err};
        }
    }

    async get_currency_balance(token_account, account, token_name) {
        try {
            return await this.rpc.get_currency_balance(token_account, account, token_name);
        } catch (err) {
            return {error: err};
        }
    }

    async get_producer_schedule() {
        try {
            return await this.rpc.get_producer_schedule();
        } catch (err) {
            return {error: err};
        }
    }

    async get_producers(json, lowerBound , limit) {
        try {
            return await this.rpc.get_producers(json, lowerBound, limit);
        } catch (err) {
            return {error: err};
        }
    }
    async get_table_rows(
        json = true,
        code,
        scope,
        table,
        lower_bound = '',
        upper_bound = '',
        index_position = 1,
        key_type = '',
        limit = 10,
        reverse = false,
        show_payer = false,
    ) {
        try {
            return await this.rpc.get_table_rows({
                json: json,
                code: code,
                scope: scope,
                table: table,
                lower_bound: lower_bound,
                upper_bound: upper_bound,
                index_position: index_position,
                key_type: key_type,
                limit: limit,
                reverse: reverse,
                show_payer: show_payer,
            }
            );
        } catch (err) {
            return {error: err};
        }
    }
}

function i2hex(i) {
    return ('0' + i.toString(16)).slice(-2);
}

class ApiWrapper {
    constructor(rpc, signatureProvider) {
      this.rpc = rpc;
      this.signatureProvider = signatureProvider;
      this.api = new eosjs_api.Api({ 'rpc': rpc, 'signatureProvider': signatureProvider });
      window.api = this.api;
    }

    setCachedAbi(accountName, abi) {
        try {
            return this.api.setCachedAbi(accountName, abi);
        } catch (err) {
            console.error(err);
            return {error: err};
        }
    }

    hex2array(hex) {
        var bytes = new Uint8Array(Math.ceil(hex.length / 2));
        for (var i = 0; i < bytes.length; i++) {
            bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
        }
        return bytes;
    }

    jsonToRawAbi(abi) {
        try {
            return this.api.jsonToRawAbi(abi);
        } catch (err) {
            console.error(err);
            return {error: err};
        }
    }

    rawAbiToJson(abi) {
        try {
            var _abi = this.hex2array(abi);
            return this.api.rawAbiToJson(_abi);
        } catch (err) {
            console.error(err);
            return {error: err};
        }
    }

    array2hex(arr) {
        return Array.from(arr).map(i2hex).join('');
    }

    s2n(name) {
        var a = new eosjs_serialize.SerialBuffer()
        a.pushName(name);
        return Array.from(a.asUint8Array()).map(i2hex).join('');
    }

    n2s(n) {
        var bytes = new Uint8Array(Math.ceil(n.length / 2));
        for (var i = 0; i < bytes.length; i++) {
            bytes[i] = parseInt(n.substr(i * 2, 2), 16);
        }
        var a = new eosjs_serialize.SerialBuffer();
        a.pushArray(bytes);
        return a.getName();
    }

    pack_signature(s) {
        var a = new eosjs_serialize.SerialBuffer();
        a.pushSignature(s);
        return Array.from(a.asUint8Array()).map(i2hex).join('');
    }

    async transact (transaction, _a) {
        try {
            return await this.api.transact(transaction, _a);
        } catch (err) {
            console.error('+++transact error:', err);
            return {'error': err};
        }
    }
}

window.ApiWrapper = ApiWrapper;
window.RpcWrapper = RpcWrapper;

