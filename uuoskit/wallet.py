from browser import window

wallets = {}
signatureProvider = window.eosjs_jssig.JsSignatureProvider.new([])

def create(wallet_name):
    return True

def import_key(wallet_name, private_key):
    return signatureProvider.addPrivateKey(private_key)
