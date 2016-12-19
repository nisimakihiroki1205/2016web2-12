var express = require('express');
var router = express.Router();
var app = require('../app.js');//global.password を参照する
var crypto = require('crypto');

/* 暗号化 */
router.get('/:encrypt', function(req, res, next) {
  var encrypt = req.params.encrypt;// URLから元の文字列を取得
  if(encrypt !== undefined)
  {
    // 暗号化
    var cipher = crypto.createCipher('aes192', global.password);
    cipher.update(encrypt, 'utf8', 'hex');
    var cipheredText = cipher.final('hex');
    res.send(cipheredText);
    return;
  }
});

module.exports = router;
