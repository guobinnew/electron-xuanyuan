/**
 * Created by unique on 2018/5/25.
 */
var assert = require('chai').assert;
var expect = require('chai').expect;
var uuid = require('uuid');
var SHA1 = require("crypto-js/sha1");

describe('用户登录', function() {
    describe('加密签名', function() {
        it('SHA1', function () {
            var msg = '12345678';
            var sign = '' + SHA1(msg);
            expect(sign).to.be.equal('7c222fb2927d828af22f592134e8932480637c0d');
        });
    });


});