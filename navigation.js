
const dropdownData = [
    {
        text: 'Калькулятор веса на планетах',
        icon: '⚖️',
        href: '#calculator'
    },
    {
        text: '3D Модель Солнечной системы',
        icon: '🌐',
        href: '#solar-model'
    }
];

class Navigation {
    constructor() {
        this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        this.nav = document.querySelector('.nav');
        this.openFeedbackBtn = document.getElementById('openFeedbackBtn');
        this.modalCloseBtn = document.getElementById('modalCloseBtn');
        this.modal = document.getElementById('modalBackdrop');
        this.dropdown = document.querySelector('.nav-item.dropdown');
        
        this.init();
    }
    
    init() {
        this.initMobileMenu();
        this.initModal();
        this.initDropdownMenu();
        this.initSmoothScroll();
        this.initOutsideClickHandlers();
        this.initResizeHandler();
    }
    
    initMobileMenu() {
        if (this.mobileMenuBtn && this.nav) {
            this.mobileMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleMobileMenu();
            });
            
            // Закрытие меню при клике на ссылку
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    if (window.innerWidth <= 768) {
                        this.closeMobileMenu();
                        this.closeAllDropdowns();
                    }
                });
            });
        }
    }
    
    toggleMobileMenu() {
        this.mobileMenuBtn.classList.toggle('active');
        this.nav.classList.toggle('active');
        document.body.style.overflow = this.nav.classList.contains('active') ? 'hidden' : '';
        
        // Закрываем все dropdown при закрытии мобильного меню
        if (!this.nav.classList.contains('active')) {
            this.closeAllDropdowns();
        }
    }
    
    closeMobileMenu() {
        this.mobileMenuBtn.classList.remove('active');
        this.nav.classList.remove('active');
        document.body.style.overflow = '';
        this.closeAllDropdowns();
    }
    
    initModal() {
        if (this.openFeedbackBtn && this.modalCloseBtn && this.modal) {
            this.openFeedbackBtn.addEventListener('click', () => {
                this.openModal();
            });
            
            this.modalCloseBtn.addEventListener('click', () => {
                this.closeModal();
            });
            
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });
            
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                    this.closeModal();
                }
            });
        }
    }
    
    openModal() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.closeMobileMenu();
    }
    
    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    initDropdownMenu() {
        if (this.dropdown) {
            const dropdownToggle = this.dropdown.querySelector('.dropdown-toggle');
            const dropdownMenu = this.dropdown.querySelector('.dropdown-menu');
            
            // Очищаем и заполняем dropdown меню
            dropdownMenu.innerHTML = '';
            
            dropdownData.forEach(item => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                
                a.href = item.href;
                a.className = 'dropdown-link';
                a.innerHTML = `
                    <span class="dropdown-icon">${item.icon}</span>
                    ${item.text}
                `;
                
                li.appendChild(a);
                dropdownMenu.appendChild(li);
            });
            
            // Обработчик для десктопного ховера
            if (window.innerWidth > 768) {
                this.dropdown.addEventListener('mouseenter', () => {
                    this.dropdown.classList.add('active');
                });
                
                this.dropdown.addEventListener('mouseleave', () => {
                    this.dropdown.classList.remove('active');
                });
            }
            
            // Обработчик для мобильного клика
            dropdownToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                if (window.innerWidth <= 768) {
                    // Закрываем все остальные dropdown
                    const allDropdowns = document.querySelectorAll('.nav-item.dropdown');
                    allDropdowns.forEach(dropdown => {
                        if (dropdown !== this.dropdown) {
                            dropdown.classList.remove('active');
                        }
                    });
                    
                    // Переключаем текущий dropdown
                    this.dropdown.classList.toggle('active');
                }
            });
            
            // Закрытие dropdown при клике вне его на мобильных
            if (window.innerWidth <= 768) {
                document.addEventListener('click', (e) => {
                    if (!this.dropdown.contains(e.target)) {
                        this.dropdown.classList.remove('active');
                    }
                });
            }
            
            // Закрытие dropdown при клике на ссылку внутри него
            const dropdownLinks = dropdownMenu.querySelectorAll('.dropdown-link');
            dropdownLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 768) {
                        this.closeMobileMenu();
                        this.closeAllDropdowns();
                    }
                });
            });
        }
    }
    
    closeAllDropdowns() {
        const dropdowns = document.querySelectorAll('.nav-item.dropdown');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
    
    initSmoothScroll() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href === '#') return;
                if (href.includes('.html')) return;
                
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    this.updateActiveLink(link);
                    
                    // Закрываем мобильное меню после клика на ссылку
                    if (window.innerWidth <= 768) {
                        this.closeMobileMenu();
                        this.closeAllDropdowns();
                    }
                }
            });
        });
        
        const viewGalleryBtn = document.getElementById('viewGalleryBtn');
        if (viewGalleryBtn) {
            viewGalleryBtn.addEventListener('click', () => {
                const gallerySection = document.querySelector('.auto-gallery-section');
                if (gallerySection) {
                    window.scrollTo({
                        top: gallerySection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Закрываем мобильное меню
                    if (window.innerWidth <= 768) {
                        this.closeMobileMenu();
                        this.closeAllDropdowns();
                    }
                }
            });
        }
    }
    
    updateActiveLink(clickedLink) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        clickedLink.classList.add('active');
    }
    
    initOutsideClickHandlers() {
        document.addEventListener('click', (e) => {
            if (this.nav && this.mobileMenuBtn) {
                if (!this.nav.contains(e.target) && 
                    !this.mobileMenuBtn.contains(e.target) && 
                    this.nav.classList.contains('active')) {
                    this.closeMobileMenu();
                }
            }
        });
    }
    
    initResizeHandler() {
        window.addEventListener('resize', () => {
            // При изменении размера окна закрываем мобильное меню
            if (window.innerWidth > 768 && this.nav.classList.contains('active')) {
                this.closeMobileMenu();
            }
            
            // Сбрасываем состояние dropdown при переходе между мобильным и десктопом
            if (this.dropdown) {
                if (window.innerWidth > 768) {
                    this.dropdown.classList.remove('active');
                    // Включаем ховер для десктопа
                    this.dropdown.addEventListener('mouseenter', () => {
                        this.dropdown.classList.add('active');
                    });
                    this.dropdown.addEventListener('mouseleave', () => {
                        this.dropdown.classList.remove('active');
                    });
                } else {
                    // Отключаем ховер для мобильных
                    this.dropdown.removeEventListener('mouseenter', () => {});
                    this.dropdown.removeEventListener('mouseleave', () => {});
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.navigation = new Navigation();
});
