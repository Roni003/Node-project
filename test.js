var CryptoJS = require("crypto-js");

key = '123'

pass = 'abc'


enc = CryptoJS.AES.encrypt(pass,key)
dec = CryptoJS.AES.decrypt(enc, key)
let originalText = dec.toString(CryptoJS.enc.Utf8);

console.log(originalText)