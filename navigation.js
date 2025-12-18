
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
    }
    
    
    initMobileMenu() {
        if (this.mobileMenuBtn && this.nav) {
            this.mobileMenuBtn.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
            
            
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
            
            
            dropdownToggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.stopPropagation();
                    const isActive = dropdownMenu.style.maxHeight;
                    dropdownMenu.style.maxHeight = isActive ? null : dropdownMenu.scrollHeight + 'px';
                }
            });
            
            
            document.addEventListener('click', (e) => {
                if (!this.dropdown.contains(e.target)) {
                    dropdownMenu.style.maxHeight = null;
                }
            });
            
            
            if (window.innerWidth <= 768) {
                dropdownMenu.style.maxHeight = null;
            }
            
            
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    dropdownMenu.style.maxHeight = null;
                } else {
                    dropdownMenu.style.maxHeight = null;
                }
            });
        }
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
                if (!this.nav.contains(e.target) && !this.mobileMenuBtn.contains(e.target) && this.nav.classList.contains('active')) {
                    this.closeMobileMenu();
                }
            }
        });
    }
}


document.addEventListener('DOMContentLoaded', () => {
    window.navigation = new Navigation();
});