$(function() {
    //设置用户修改逻辑
    var form = layui.form;
    var layer = layui.layer;

    form.verify({
        nickname: function(value) {
            if (value.length > 8) {
                return layer.msg('请输入在8位范围内')
            }


        }


    })

    //用户初始化

    initUserInfo()

    function initUserInfo() {

        $.ajax({
            method: "GET",
            url: 'http://www.liulongbin.top:3008/my/userinfo',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            success: function(res) {
                if (res.code !== 0) {
                    return layer.msg(res.message)

                }
                form.val('formUserInfo', res.data);

            }
        })
        $('#resetbtn').on('click', function(e) {

            e.preventDefault()
            initUserInfo()

        })

    }

    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: 'http://www.liulongbin.top:3008/my/userinfo',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            data: $(this).serialize(),
            success: function(res) {
                if (res.code != 0) {
                    return layer.msg(res.message)
                }

                layer.msg(res.message)
                window.parent.getuserinfo();

            }
        })

    })

})