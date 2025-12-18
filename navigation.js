// Данные для выпадающего меню
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

// Класс для управления навигацией
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
    }
    
    // Мобильное меню
    initMobileMenu() {
        if (this.mobileMenuBtn && this.nav) {
            this.mobileMenuBtn.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
            
            // Закрытие меню при клике на ссылку
            const navLinks = document.querySelectorAll('.nav-link, .dropdown-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.closeMobileMenu();
                });
            });
        }
    }
    
    toggleMobileMenu() {
        this.mobileMenuBtn.classList.toggle('active');
        this.nav.classList.toggle('active');
        document.body.style.overflow = this.nav.classList.contains('active') ? 'hidden' : '';
    }
    
    closeMobileMenu() {
        this.mobileMenuBtn.classList.remove('active');
        this.nav.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Модальное окно
    initModal() {
        if (this.openFeedbackBtn && this.modalCloseBtn && this.modal) {
            // Открытие модального окна
            this.openFeedbackBtn.addEventListener('click', () => {
                this.openModal();
            });
            
            // Закрытие по кнопке
            this.modalCloseBtn.addEventListener('click', () => {
                this.closeModal();
            });
            
            // Закрытие по клику вне окна
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });
            
            // Закрытие по клавише Escape
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
    
    // Выпадающее меню
    initDropdownMenu() {
        if (this.dropdown) {
            const dropdownToggle = this.dropdown.querySelector('.dropdown-toggle');
            const dropdownMenu = this.dropdown.querySelector('.dropdown-menu');
            
            // Очистка меню перед добавлением элементов (на случай дублирования)
            dropdownMenu.innerHTML = '';
            
            // Создание элементов выпадающего меню
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
            
            // Открытие/закрытие на десктопе
            dropdownToggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.stopPropagation();
                    const isActive = dropdownMenu.style.maxHeight;
                    dropdownMenu.style.maxHeight = isActive ? null : dropdownMenu.scrollHeight + 'px';
                }
            });
            
            // Закрытие при клике вне меню
            document.addEventListener('click', (e) => {
                if (!this.dropdown.contains(e.target)) {
                    dropdownMenu.style.maxHeight = null;
                }
            });
            
            // Обработка для мобильных устройств
            if (window.innerWidth <= 768) {
                dropdownMenu.style.maxHeight = null;
            }
            
            // Адаптация при изменении размера окна
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    dropdownMenu.style.maxHeight = null;
                } else {
                    dropdownMenu.style.maxHeight = null;
                }
            });
        }
    }
    
    // Плавная прокрутка
    initSmoothScroll() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Пропускаем якорь "#"
                if (href === '#') return;
                
                // Пропускаем ссылки на другие страницы
                if (href.includes('.html')) return;
                
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Обновление активной ссылки
                    this.updateActiveLink(link);
                }
            });
        });
        
        // Обработка кнопки "Смотреть всю галерею"
        const viewGalleryBtn = document.getElementById('viewGalleryBtn');
        if (viewGalleryBtn) {
            viewGalleryBtn.addEventListener('click', () => {
                // В демо-версии просто скроллим к галерее
                const gallerySection = document.querySelector('.auto-gallery-section');
                if (gallerySection) {
                    window.scrollTo({
                        top: gallerySection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        }
    }
    
    updateActiveLink(clickedLink) {
        // Удаляем активный класс у всех ссылок
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Добавляем активный класс к нажатой ссылке
        clickedLink.classList.add('active');
    }
    
    // Обработчики кликов вне элементов
    initOutsideClickHandlers() {
        // Закрытие мобильного меню при клике вне его
        document.addEventListener('click', (e) => {
            if (this.nav && this.mobileMenuBtn) {
                if (!this.nav.contains(e.target) && !this.mobileMenuBtn.contains(e.target) && this.nav.classList.contains('active')) {
                    this.closeMobileMenu();
                }
            }
        });
    }
}

// Инициализация навигации при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    window.navigation = new Navigation();
});