//获取用户信息
var layer = layui.layer
getuserinfo()

function getuserinfo() {
    $.ajax({
        method: 'GET',
        url: 'http://www.liulongbin.top:3008/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token') || ''

        },
        success: function(res) {
            if (res.code != 0) {
                return layui.layer.msg(res.message)
            }
            userAvaer(res)
        },

        //不管成功还是失败都会调用complete函数
        complete: function(res) {
            console.log(res);
            if (res.responseJSON.code === 1 && res.responseJSON.message === "身份认证失败！") {

                localStorage.removeItem('token')
                location.href = '/login.html'
            }
        }

    })
}

function userAvaer(res) {

    var name = res.data.nickname || res.data.username;

    $('#welcome').html("欢迎&nbsp;&nbsp" + name).show()

    if (res.data.user_pic != null) {

        $('.layui-nav-img').attr('src', res.data.user_pic)
        $('.text-avatar').hide()


    } else {

        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show
    }


}
//是否退出
$('#btnlogout').on('click', function() {

    layer.confirm('是否要退出', { icon: 3, title: '提示' },
        function(index) {

            localStorage.removeItem('token')
            location.href = "/login.html"
            layer.close(index);
        });
})