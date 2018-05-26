/**
 * Created by unique on 2018/5/25.
 */

$(document).ready(function() {

    $('#login').on('click', function () {

        var a = $('#inputName').val()
        var b = $('#inputPassword').val()

        var $msg = $('.login-message')
        if (!a && !b) {
            $('#inputName').addClass('is-invalid')
            $('#inputPassword').addClass('is-invalid')
            $msg.html('请输入用户名和密码')
            return
        }
        else if (!a) {
            $('#inputName').addClass('is-invalid')
            $('#inputPassword').addClass('is-valid')
            $('#inputPassword').removeClass('is-invalid')
            $msg.html('请输入用户名')
            return
        }
        else if (!b) {
            $('#inputName').addClass('is-valid')
            $('#inputName').removeClass('is-invalid')
            $('#inputPassword').addClass('is-invalid')
            $msg.html('请输入密码')
            return
        }

        $('#inputName').removeClass('is-invalid is-valid')
        $('#inputPassword').removeClass('is-invalid is-valid')
        $msg.html('')

        $('form').submit(function (e) {
            // 提交表单
            console.log('login....')
        })
    })
})
