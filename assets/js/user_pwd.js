$(function() {

    var layer = layui.layer;
    var form = layui.form;
    var password;
    form.verify({
        pass: [
            /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/, '密码必须8位以上，且不能出现纯数字和字母'
        ],
        samepwd: function(value) {
            if (value == $('.layui-card-body [name=oldPwd]').val()) {
                return '新旧密码相同请重新输入'
            }
        },

        repass: function(value) { //判断二次密码是否相同
            password = $('.layui-card-body [name=newPwd]').val();

            if (value !== password) {

                return '二次输入的密码不一致'
            }



        }
    })
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();

        $.ajax({
            method: 'POST',
            url: 'http://www.liulongbin.top:3008/my/updatepwd',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            data: $(this).serialize(),
            success: function(res) {
                if (res.code != 0) {
                    return layer.msg(res.message)
                }
                console.log($(this).serialize());
                layer.msg(res.message)
                $('.layui-form')[0].reset();
            }
        })



    })
})