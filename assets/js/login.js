$(function() {
    // 点击去注册的点击事件
    $('.login-box a').on('click', function(e) {
        $('.reg-box').show();
        $('.login-box').hide();
    })

    // 点击去登录的点击事件
    $('.reg-box a').on('click', function(e) {
        $('.reg-box').hide();
        $('.login-box').show();
    })

    // 获取form对象
    var form = layui.form;
    var layer = layui.layer;
    // 定义正则验证表单
    form.verify({
        //校验密码
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //校验注册确认密码
        resPwd: function(value) {
            var pwdValue = $('.reg-box [name=password]').val();
            if (value !== pwdValue) {
                return '两次输入的密码不一致';
            }
        }
    })


    //注册验证
    $('#regForm').on('submit', (function(e) {
        let data = { username: $('#regForm [name=username]').val(), password: $('#regForm [name=password]').val() };
        e.preventDefault();
        $.post('http://www.liulongbin.top:3007/api/reguser', data, function(res) {
            console.log($(this).serialize());
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg(res.message);
            $('.reg-box a').click();
        })
    }));

    //登陆验证
    $('#login_form').on('submit', function(e) {
        e.preventDefault();
        let data = { username: $('#login_form [name=username]').val(), password: $('#login_form [name=password]').val() };
        $.post('http://www.liulongbin.top:3007/api/login', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg(res.message);
            // console.log(res.token);
            localStorage.setItem('token', res.token);
            location.href = '/index.html'
        })
    })
})