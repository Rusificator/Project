// Данные для таймлайна
const timelineEvents = [
    { 
        year: '1957', 
        title: 'Первый искусственный спутник', 
        description: 'Советский Союз запускает Спутник-1, начало космической эры',
        icon: '🛰️'
    },
    { 
        year: '1961', 
        title: 'Первый человек в космосе', 
        description: 'Юрий Гагарин на корабле "Восток-1" совершает первый полет человека в космос',
        icon: '👨‍🚀'
    },
    { 
        year: '1969', 
        title: 'Первая высадка на Луну', 
        description: 'Аполлон-11, Нил Армстронг делает первые шаги по поверхности Луны',
        icon: '🌕'
    },
    { 
        year: '1971', 
        title: 'Первая орбитальная станция', 
        description: 'Запуск станции Салют-1, первая в мире орбитальная станция',
        icon: '🛸'
    },
    { 
        year: '1990', 
        title: 'Телескоп Хаббл', 
        description: 'Запуск космического телескопа Хаббл, революция в астрономии',
        icon: '🔭'
    },
    { 
        year: '1998', 
        title: 'Начало МКС', 
        description: 'Запуск первого модуля Международной космической станции',
        icon: '🚀'
    },
    { 
        year: '2012', 
        title: 'Марсоход Curiosity', 
        description: 'Марсоход успешно садится на Марс и начинает исследования',
        icon: '🤖'
    },
    { 
        year: '2021', 
        title: 'Первые туристы в космосе', 
        description: 'Компании SpaceX и Blue Origin отправляют первых космических туристов',
        icon: '👩‍🚀'
    }
];

// Данные для галереи
const galleryImages = [
    { 
        id: 1, 
        src: 'content/gallery/earth.jpg', 
        alt: 'Земля из космоса', 
        title: 'Голубая планета' 
    },
    { 
        id: 2, 
        src: 'content/gallery/jupiter.jpg', 
        alt: 'Юпитер', 
        title: 'Газовый гигант' 
    },
    { 
        id: 3, 
        src: 'content/gallery/nebula.jpg', 
        alt: 'Туманность Ориона', 
        title: 'Колыбель звёзд' 
    },
    { 
        id: 4, 
        src: 'content/gallery/mars.jpg', 
        alt: 'Марс', 
        title: 'Красная планета' 
    },
    { 
        id: 5, 
        src: 'content/gallery/saturn.jpg', 
        alt: 'Сатурн с кольцами', 
        title: 'Властелин колец' 
    },
    { 
        id: 6, 
        src: 'content/gallery/iss.jpg', 
        alt: 'Международная космическая станция', 
        title: 'Дом на орбите' 
    },
    { 
        id: 7, 
        src: 'content/gallery/andromeda.jpg', 
        alt: 'Галактика Андромеды', 
        title: 'Соседняя галактика' 
    },
    { 
        id: 8, 
        src: 'content/gallery/hubble.jpg', 
        alt: 'Снимок телескопа Хаббл', 
        title: 'Взгляд во Вселенную' 
    }
];

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация таймлайна
    initTimeline();
    
    // Инициализация галереи
    initGallery();
    
    // Настройка Intersection Observer для анимаций
    setupObservers();
    
    // Обработка наведения на элементы статистики
    setupStatItemsHover();
    
    // Настройка кнопки "Отправиться в путешествие"
    setupJourneyButton();
});

// Инициализация таймлайна
function initTimeline() {
    const timelineContainer = document.querySelector('.timeline-container');
    
    if (timelineContainer) {
        timelineEvents.forEach((event, index) => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';
            timelineItem.style.setProperty('--index', index);
            
            timelineItem.innerHTML = `
                <div class="timeline-marker">
                    <div class="marker-icon">${event.icon}</div>
                    <div class="marker-year">${event.year}</div>
                </div>
                
                <div class="timeline-content">
                    <h3 class="timeline-title">${event.title}</h3>
                    <p class="timeline-description">${event.description}</p>
                </div>
            `;
            
            timelineContainer.appendChild(timelineItem);
        });
    }
}

// Инициализация галереи
function initGallery() {
    const galleryTrack = document.getElementById('galleryTrack');
    
    if (galleryTrack) {
        // Продублируем изображения для бесшовной анимации
        const allImages = [...galleryImages, ...galleryImages];
        
        allImages.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.setAttribute('role', 'button');
            galleryItem.setAttribute('tabindex', '0');
            galleryItem.setAttribute('aria-label', `Открыть ${image.title} в полном размере`);
            
            galleryItem.innerHTML = `
                <div class="image-wrapper">
                    <img 
                        src="${image.src}" 
                        alt="${image.alt}"
                        loading="lazy"
                    >
                    <div class="image-overlay">
                        <span class="image-title">${image.title}</span>
                    </div>
                </div>
            `;
            
            galleryItem.addEventListener('click', () => openImageDetail(image.id));
            galleryItem.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') openImageDetail(image.id);
            });
            
            galleryTrack.appendChild(galleryItem);
        });
    }
}

// Настройка кнопки "Отправиться в путешествие"
function setupJourneyButton() {
    const startJourneyBtn = document.getElementById('startJourneyBtn');
    
    if (startJourneyBtn) {
        startJourneyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const timelineSection = document.getElementById('timelineSection');
            if (timelineSection) {
                window.scrollTo({
                    top: timelineSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                console.log('Кнопка сработала, скроллим к:', timelineSection.offsetTop);
            } else {
                console.error('Не найдена секция timelineSection');
            }
        });
    } else {
        console.error('Не найдена кнопка startJourneyBtn');
    }
}

// Открытие деталей изображения
function openImageDetail(imageId) {
    // В реальном проекте здесь была бы навигация на страницу деталей изображения
    // Для демо просто покажем сообщение
    const image = galleryImages.find(img => img.id === imageId);
    if (image) {
        alert(`Открывается детальная информация об изображении: ${image.title}`);
    }
}

// Настройка Intersection Observer для анимаций
function setupObservers() {
    // Observer для статистики
    const statisticsSection = document.getElementById('statisticsSection');
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statisticsSection && statNumbers.length > 0) {
        const statsObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Запуск анимации чисел
                        animateNumbers(statNumbers);
                        statsObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.3,
                rootMargin: '0px 0px -100px 0px'
            }
        );
        
        statsObserver.observe(statisticsSection);
    }
    
    // Observer для таймлайна
    const timelineSection = document.getElementById('timelineSection');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineSection && timelineItems.length > 0) {
        const timelineObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Показ элементов таймлайна с задержкой
                        timelineItems.forEach((item, index) => {
                            setTimeout(() => {
                                item.classList.add('visible');
                            }, index * 200);
                        });
                        timelineObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.3,
                rootMargin: '0px 0px -100px 0px'
            }
        );
        
        timelineObserver.observe(timelineSection);
    }
}

// Анимация чисел
function animateNumbers(numberElements) {
    numberElements.forEach(element => {
        const target = parseInt(element.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 20);
    });
}

// Обработка наведения на элементы статистики
function setupStatItemsHover() {
    const statItems = document.querySelectorAll('.stat-item');
    
    statItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const line = this.querySelector('.stat-line');
            if (line) {
                line.style.transform = 'translateX(0)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const line = this.querySelector('.stat-line');
            if (line) {
                line.style.transform = 'translateX(-100%)';
            }
        });
    });
}