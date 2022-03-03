//发起ajax请求时 获取接口路径 进行拼接
$.ajaxPrefilter(function(options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url;
})