// ==UserScript==
// @name         Send_animation
// @description  给输入框底部添加发送动画
// @version      0.0.1
// @homepageURL  https://github.com/naahi-i/LiteLoaderQQNT--Scriptio--Send_animation
// @author       naahi-i
// ==/UserScript==
(function () {
    'use strict';

    // 动态插入 CSS 样式
    function injectStyles() {
        const styles = `
            body.vue-component #app .chat-input-area {
                position: relative;
                overflow: hidden; 
                box-shadow: 0 2px 0 0 rgb(86, 80, 177); /* 默认底部横条亮起 */
            }

            body.vue-component #app .chat-input-area::before {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                height: 3px; /* 调整横条的厚度 */
                background-color: rgb(0,102,204); /* 横条颜色 */
                width: 100%; /* 横条宽度 */
                border-radius: 0 0 4px 4px; /* 底部圆角 */
                z-index: 1; /* 保持在黑块之下 */
            }

            body.vue-component #app .chat-input-area.flash-shadow::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                height: 4px; /* 调整黑块的厚度 */
                background-color: rgba(0, 0, 0, 0.5); /* 黑块颜色 */
                width: 100%; /* 黑块的宽度 */
                border-radius: 0 0 4px 4px; /* 阴影底部圆角 */
                transform: translateX(-100%); /* 初始位置在元素外部左侧 */
                animation: shadow-slide 0.6s ease forwards;
                z-index: 2; /* 保持在横条之上 */
            }
            
            @keyframes shadow-slide {
                0% {
                    transform: translateX(-100%); 
                }
                100% {
                    transform: translateX(100%); 
                }
            }
        `;
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);
    }

    // 监听回车按键事件
    function setupEnterKeyListener() {
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                console.log('Enter key pressed!');

                // 触发黑块动画效果
                const chatInputArea = document.querySelector('.chat-input-area');
                if (chatInputArea) {
                    // 移除类并强制重绘
                    chatInputArea.classList.remove('flash-shadow');
                    void chatInputArea.offsetWidth; // 强制重绘

                    // 添加类以重新触发动画
                    chatInputArea.classList.add('flash-shadow');
                }
            }
        });
    }

    function init() {
        injectStyles();
        setupEnterKeyListener();
    }

    init();
})();
