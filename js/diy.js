$(function(){
    $('#dowebok').fullpage({
        'navigation': true,
        'navigationPosition': "left",
        'navigationColor': ['#fff'],
        
        // 添加手机端优化配置
        'scrollingSpeed': 600, // 滚动速度调慢，更平滑
        'easing': 'easeInOutCubic', // 缓动效果
        'css3': true, // 使用CSS3动画
        'scrollBar': false, // 不使用滚动条
        
        // 手机端触摸优化
        'touchSensitivity': 15, // 触摸灵敏度
        'normalScrollElements': '.ly-txt14, .ly-txt24, .ly-txt84', // 允许这些元素内部滚动
        'scrollOverflow': true, // 允许内容溢出时滚动
        
        // 响应式配置
        'responsiveWidth': 768, // 小于768px时禁用全屏滚动
        'responsiveHeight': 600, // 小于600px高度时禁用
        
        // 手机端事件回调
        'afterLoad': function(anchorLink, index){
            // 手机端加载后调整内容
            if($(window).width() < 768){
                $('.active .ly-box11, .active .ly-box12, .active .ly-box21, .active .ly-box22, .active .ly-box23, .active .ly-box81, .active .ly-box82').each(function(){
                    if($(this).outerHeight() > $(window).height() * 0.8){
                        $(this).css({
                            'max-height': $(window).height() * 0.8 + 'px',
                            'overflow-y': 'auto'
                        });
                    }
                });
            }
        },
        
        'onLeave': function(index, nextIndex, direction){
            // 离开页面时的处理
            if($(window).width() < 768){
                // 重置所有盒子的最大高度
                $('.ly-box11, .ly-box12, .ly-box21, .ly-box22, .ly-box23, .ly-box81, .ly-box82').css({
                    'max-height': '',
                    'overflow-y': ''
                });
            }
        }
    });
    
    // 手机端禁用导航点，改为手势提示
    function updateNavigation() {
        if($(window).width() < 768){
            $('#fp-nav').hide();
            // 添加手势提示
            if(!$('.swipe-hint').length){
                $('<div class="swipe-hint">↑ 向上滑动 ↓</div>').css({
                    'position': 'fixed',
                    'bottom': '20px',
                    'left': '50%',
                    'transform': 'translateX(-50%)',
                    'color': 'white',
                    'font-size': '14px',
                    'z-index': '100',
                    'opacity': '0.7',
                    'animation': 'fadeInOut 2s infinite'
                }).appendTo('body');
                
                // 添加CSS动画
                $('<style>@keyframes fadeInOut { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }</style>').appendTo('head');
                
                // 5秒后隐藏提示
                setTimeout(function(){
                    $('.swipe-hint').fadeOut(1000);
                }, 5000);
            }
        } else {
            $('#fp-nav').show();
            $('.swipe-hint').remove();
        }
    }
    
    // 初始化
    updateNavigation();
    
    // 窗口大小变化时更新
    $(window).resize(updateNavigation);
    
    // 手机端点击事件优化
    if('ontouchstart' in window || navigator.maxTouchPoints){
        $('.ly-txt14, .ly-txt24, .ly-txt84').css({
            '-webkit-overflow-scrolling': 'touch',
            'overflow-y': 'auto'
        });
    }
});