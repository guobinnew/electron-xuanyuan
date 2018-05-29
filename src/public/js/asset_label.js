/**
 * Created by unique on 2018/5/29.
 */

$(document).ready(function () {

    JsBarcode("#barcode", "123434-2018-01-05", {
        format: "code128",
        lineColor: "#333",
        displayValue: true
    });

    var qrcode1 = new QRCode(document.getElementById("qrcode1"), {
        text: "http://jindo.dev.naver.com/collie",
        width: 180,
        height: 180,
        colorDark : "rgba(243,156,18,.88)",
        colorLight : "#fff",
        correctLevel : QRCode.CorrectLevel.H
    });
    var qrcode2 = new QRCode(document.getElementById("qrcode2"), {
        text: "http://jindo.dev.naver.com/collie",
        width: 180,
        height: 180,
        colorDark : "rgba(231,76,60,.88)",
        colorLight : "#fff",
        correctLevel : QRCode.CorrectLevel.H
    });
    var qrcode3 = new QRCode(document.getElementById("qrcode3"), {
        text: "http://jindo.dev.naver.com/collie",
        width: 180,
        height: 180,
        colorDark : "rgba(52,152,219,.88)",
        colorLight : "#fff",
        correctLevel : QRCode.CorrectLevel.H
    });
})