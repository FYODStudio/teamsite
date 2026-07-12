(function () {
    'use strict';

    // DOM 元素
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const menuOverlay = document.getElementById('menuOverlay');
    const closeBtn = document.getElementById('closeBtn');
    const overlayLinks = menuOverlay.querySelectorAll('.overlay-nav a');

    // 菜单状态
    let isMenuOpen = false;

    // ----- 打开菜单 -----
    function openMenu() {
        if (isMenuOpen) return;
        isMenuOpen = true;

        hamburger.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
        menuOverlay.classList.add('active');
        header.classList.add('menu-open');

        // 禁止页面滚动
        document.body.style.overflow = 'hidden';

        // 聚焦到第一个菜单项（可访问性）
        setTimeout(() => {
            const firstLink = menuOverlay.querySelector('.overlay-nav a');
            if (firstLink) firstLink.focus();
        }, 100);
    }

    // ----- 关闭菜单 -----
    function closeMenu() {
        if (!isMenuOpen) return;
        isMenuOpen = false;

        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        menuOverlay.classList.remove('active');
        header.classList.remove('menu-open');

        // 恢复滚动
        document.body.style.overflow = '';

        // 将焦点还给汉堡按钮
        hamburger.focus();
    }

    // ----- 切换菜单 -----
    function toggleMenu() {
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    // ----- 事件绑定 -----

    // 1. 汉堡按钮点击切换
    hamburger.addEventListener('click', toggleMenu);

    // 2. 关闭按钮点击关闭
    closeBtn.addEventListener('click', closeMenu);

    // 3. 点击菜单项关闭
    overlayLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // 如果链接是 # 或空，阻止跳转
            const href = this.getAttribute('href');
            if (href === '#' || href === '' || href === null) {
                e.preventDefault();
            }
            closeMenu();
        });
    });

    // 4. 点击覆盖层空白区域关闭（点击覆盖层本身，但不是点击其子元素）
    menuOverlay.addEventListener('click', function (e) {
        if (e.target === this) {
            closeMenu();
        }
    });

    // 5. 按 ESC 键关闭菜单
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });

    // 6. 窗口 resize：如果宽度 >= 768px 且菜单打开，自动关闭
    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth >= 768 && isMenuOpen) {
                closeMenu();
            }
        }, 100);
    });

    // 7. 可访问性：当菜单打开时，聚焦陷阱（简单处理）
    // 当焦点在菜单内循环，但为了防止复杂实现，我们只确保关闭按钮可被聚焦
    // 已通过 openMenu 中的聚焦第一个链接实现

    console.log('🍔 自适应汉堡菜单已初始化');
    console.log('📐 当前宽度:', window.innerWidth, 'px');

})();