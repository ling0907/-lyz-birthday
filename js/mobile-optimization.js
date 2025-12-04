/**
 * 移动端iframe高度自适应和触摸优化
 */

// iframe高度自适应函数
function changeFrameHeight() {
    const iframe = document.getElementById('iframepage');
    if (!iframe) return;
    
    try {
        // 获取iframe内部文档的完整高度
        const iframeContent = iframe.contentDocument || iframe.contentWindow.document;
        const contentHeight = Math.max(
            iframeContent.body.scrollHeight,
            iframeContent.body.offsetHeight,
            iframeContent.documentElement.clientHeight,
            iframeContent.documentElement.scrollHeight,
            iframeContent.documentElement.offsetHeight
        );
        
        // 设置iframe高度，确保在移动端也能正常显示
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        iframe.style.height = Math.max(contentHeight, viewportHeight) + 'px';
        
        // 移动端特殊处理
        if (isMobile()) {
            iframe.style.width = '100%';
            iframe.style.height = '100vh';
            iframe.style.border = 'none';
            iframe.style.overflow = 'hidden';
        }
        
    } catch (e) {
        // 跨域情况下的处理
        console.log('跨域iframe，使用默认高度设置');
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        iframe.style.height = viewportHeight + 'px';
        
        if (isMobile()) {
            iframe.style.height = '100vh';
        }
    }
}

// 检测是否为移动设备
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           window.innerWidth <= 768;
}

// 防止移动端双击缩放
function preventDoubleTapZoom() {
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}

// 优化触摸体验
function optimizeTouchExperience() {
    // 禁用默认的触摸高亮
    document.addEventListener('touchstart', function() {}, {passive: true});
    
    // 防止长按选择文本
    document.addEventListener('selectstart', function(e) {
        if (isMobile()) {
            e.preventDefault();
        }
    });
    
    // 优化滚动
    document.body.style.touchAction = 'manipulation';
    document.body.style.webkitOverflowScrolling = 'touch';
}

// 监听窗口大小变化
function handleResize() {
    changeFrameHeight();
    
    // 移动端屏幕旋转处理
    if (isMobile()) {
        setTimeout(function() {
            changeFrameHeight();
        }, 100); // 延迟执行确保屏幕旋转完成
    }
}

// 初始化移动端优化
function initMobileOptimizations() {
    if (isMobile()) {
        // 设置视口优化
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.setAttribute('content', 
                'width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0, minimum-scale=1.0'
            );
        }
        
        // 防止双击缩放
        preventDoubleTapZoom();
        
        // 优化触摸体验
        optimizeTouchExperience();
        
        // 设置body样式
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.height = '100%';
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initMobileOptimizations();
    changeFrameHeight();
});

// 监听窗口变化事件
window.addEventListener('resize', handleResize);
window.addEventListener('orientationchange', handleResize);

// iframe加载完成后重新设置高度
document.addEventListener('DOMContentLoaded', function() {
    const iframe = document.getElementById('iframepage');
    if (iframe) {
        iframe.addEventListener('load', function() {
            setTimeout(changeFrameHeight, 100);
        });
    }
});

// 定期检查和调整iframe高度（移动端可能需要）
if (isMobile()) {
    setInterval(changeFrameHeight, 2000);
}