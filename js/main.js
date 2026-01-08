/**
 * 个人主页交互脚本
 * 包含导航栏效果、平滑滚动、页面加载动画等
 */

document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initSmoothScroll();
    initScrollAnimations();
    initMobileMenu();
});

/**
 * 导航栏滚动效果
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;

        // 添加/移除滚动样式
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollY = currentScrollY;
    });
}

/**
 * 平滑滚动导航
 */
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // 关闭移动端菜单
                const navLinksContainer = document.querySelector('.nav-links');
                const navToggle = document.getElementById('navToggle');
                navLinksContainer.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });
}

/**
 * 滚动动画
 */
function initScrollAnimations() {
    // 为需要动画的元素添加类
    const animatedElements = document.querySelectorAll(
        '.about-card, .research-card, .skill-category, .contact-card'
    );

    animatedElements.forEach(el => {
        el.classList.add('fade-in');
    });

    // 观察器配置
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * 移动端菜单切换
 */
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // 点击外部关闭菜单
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

/**
 * 活跃导航链接高亮
 */
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', function() {
        let current = '';
        const navHeight = document.getElementById('navbar').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// 初始化活跃导航高亮
highlightActiveSection();

/**
 * 打字机效果（可选）
 */
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

/**
 * 页面加载完成后的处理
 */
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});
