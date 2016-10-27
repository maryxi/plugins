/**
 * 处理.5px
 * 自动判断设备像素比,如非单倍像素比,则遍历页面上className为
 * ['border-1px', 'border-top-1px', 'border-bottom-1px', 'border-left-1px', 'border-right-1px']
 * 元素,自动设置元素宽度为.5px
 *
 * 如元素为后期Dom操作出现,则需手动触发 "hairlines.trigger" 方法,再次设定.5px
 */
var $ = require("common:static/js/lib/zepto.min.js");

function Hairlines(){
    this.init();
}
Hairlines.prototype = {
    init: function(){
        var _this = this;
        this.change();
    },
    isMoreTimes: function(){
        var _this = this;
        var flag = false;
        if (window.devicePixelRatio && devicePixelRatio >= 2) {
            var $testObj = $('<div>');
            $testObj.css('border' , '.5px solid transparent');
            $('body').append($testObj);
            if ($testObj.offset().height == 1) {
                flag = true;
            }
            $testObj.remove();
        }
        return flag;
    },
    change: function(){
        var _this = this;
        if(!this.isMoreTimes()) return;
        var allObjArr = ['border-1px', 'border-top-1px', 'border-bottom-1px', 'border-left-1px', 'border-right-1px'];

        $.each(allObjArr, function(i, a){
            $.each($('.' + a), function(j, b){
                var $b = $(b);
                var iArr = a.split('-');
                var className = iArr.length > 2 ? iArr[0] +'-'+ iArr[1] : iArr[0];
                var iBorder = $b.css(className).substring($b.css(className).indexOf(' '));
                $b.css(className, '.5px ' + iBorder);
            })
        })
    },
    trigger: function(){
        var _this = this;
        this.change();
    }
};

var hairlines = new Hairlines();

if (typeof module != 'undefined' && typeof module.exports != 'undefined') {
    module.exports = hairlines;
} else {
    window.hairlines = hairlines;
}
