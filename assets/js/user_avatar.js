var form = layui.form;
var layer = layui.layer;

// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
    // 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)



$("#btn").on('click', function() {


    $("#btnCloseImage").click()


})

$('#btnCloseImage').on('change', function(e) {
    var filelist = e.target.files;
    if (filelist.length == 0) {

        return layer.msg('请选择图片')
    }
    var file = e.target.files[0]
    console.log(file);
    var newImgURL = URL.createObjectURL(file)
    $image
        .cropper('destroy') // 销毁旧的裁剪区域
        .attr('src', newImgURL) // 重新设置图片路径
        .cropper(options) // 重新初始化裁剪区域
})

$('#btnUpLoad').on('click', function() {

    var dataURL = $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 100,
            height: 100
        })
        .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    $.ajax({

        method: 'PATCH',
        url: 'http://www.liulongbin.top:3008/my/update/avatar',
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        data: { avatar: dataURL },
        success: function(res) {

            if (res.code != 0) {
                return layer.msg(res.message)

            }
            layer.msg(res.message)
            window.parent.getuserinfo()

        }

    })
})