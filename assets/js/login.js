//注册 登录切换
$(function() {
    $('#link-login').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();

    })
    $('#link-reg').on('click', function() {

            $('.reg-box').hide();
            $('.login-box').show();
        })
        //判断登录逻辑
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        username: function(value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }

            //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
            if (value === 'xxx') {
                alert('用户名不能为敏感词');
                return true;
            }
        }

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        ,
        pass: [
            /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/, '密码必须8位以上，且不能出现纯数字和字母'
        ],
        repass: function(value, item) { //判断二次密码是否相同
            password = $('.reg-box [name=password]').val()

            if (value !== password) {

                return '二次输入的密码不一致'
            }

        }
    });
    //注册
    var times
    $('#form-reg').on('submit', function(e) {
            e.preventDefault()
            var data = { username: $('#form-reg [name=username]').val(), password: $('#form-reg [name=password]').val() }
            $.post('http://www.liulongbin.top:3007/api/reguser', data, function(res) {

                if (res.status != 0) {
                    console.log(res)
                    return layer.msg(res.message)
                }
                console.log(res)
                layer.msg(res.message)
                setTimeout(function() { $('#link-reg').click() }, 3500)




            })


        })
        //登录
    $('#form-login').submit(function(e) {

        e.preventDefault()
        $.ajax({
            url: 'http://www.liulongbin.top:3007/api/login',
            method: 'POST',
            data: $(this).serialize(),

            success: function(res) {
                if (res.status !== 0) {
                    console.log(res.message);
                    return layer.msg(res.message);
                };

                layer.msg(res.message);
                console.log(res.message);

                localStorage.setItem('token', res.token);



                setTimeout(function() { location.href = "/index.html" }, 1500);


            },


        });


    })
})