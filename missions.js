// missions.js

document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const missionsGrid = document.getElementById('missionsGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Данные о космических миссиях
    const missionsData = [
    {
        id: 0,
        name: 'Восток-1',
        type: 'manned',
        special: true,
        date: '12 апреля 1961',
        image: 'content/missions/gagarin.jpg',
        description: 'Первый в истории полёт человека в космос. Юрий Гагарин совершил один виток вокруг Земли на корабле "Восток-1", открыв новую эру в освоении космоса.',
        agency: 'СССР',
        duration: '1 час 48 минут',
        distance: '327 км (апогей)',
        achievement: 'Первый человек в космосе',
        additional: 'Юрий Гагарин произнёс легендарную фразу: "Поехали!"'
    },
    {
        id: 1,
        name: 'Аполлон-11',
        type: 'manned',
        date: '1969',
        image: 'content/missions/apollo11.jpg',
        description: 'Первая пилотируемая миссия, в ходе которой человек впервые ступил на поверхность Луны.',
        agency: 'NASA',
        duration: '8 дней',
        crew: '3 астронавта',
        achievement: 'Первая высадка на Луну'
    },
    {
        id: 2,
        name: 'Вояджер-1',
        type: 'planetary',
        date: '1977',
        image: 'content/missions/voyager1.jpeg',
        description: 'Самый дальний от Земли искусственный объект. Покинул Солнечную систему и продолжает передавать данные.',
        agency: 'NASA',
        duration: '46+ лет',
        distance: '23.8 млрд км',
        achievement: 'Первый объект в межзвездном пространстве'
    },
    {
        id: 3,
        name: 'Марсоход Curiosity',
        type: 'planetary',
        date: '2012',
        image: 'content/missions/curiosity.jpg',
        description: 'Самый большой марсоход, исследующий геологию Марса и ищущий признаки жизни.',
        agency: 'NASA',
        duration: '11+ лет',
        distance: '225 млн км',
        achievement: 'Обнаружение органических молекул'
    },
    {
        id: 4,
        name: 'Международная космическая станция',
        type: 'orbital',
        date: '1998',
        image: 'content/missions/iss.jpg',
        description: 'Крупнейший искусственный спутник Земли, служащий космической исследовательской лабораторией.',
        agency: 'Международная',
        duration: '25+ лет',
        crew: 'До 7 человек',
        achievement: 'Непрерывное присутствие человека в космосе'
    },
    {
        id: 5,
        name: 'Космический телескоп Хаббл',
        type: 'telescope',
        date: '1990',
        image: 'content/missions/hubble.jpg',
        description: 'Орбитальный телескоп, совершивший революцию в астрономии своими снимками далекого космоса.',
        agency: 'NASA/ESA',
        duration: '33+ года',
        distance: '547 км',
        achievement: 'Более 1.5 млн наблюдений'
    },
    {
        id: 6,
        name: 'Новые горизонты',
        type: 'planetary',
        date: '2006',
        image: 'content/missions/newhorizons.jpg',
        description: 'Первая миссия к Плутону, предоставившая детальные снимки карликовой планеты и её спутников.',
        agency: 'NASA',
        duration: '17+ лет',
        distance: '8.5 млрд км',
        achievement: 'Первое исследование Плутона'
    },
    {
        id: 7,
        name: 'Кассини-Гюйгенс',
        type: 'planetary',
        date: '1997',
        image: 'content/missions/cassini.jpg',
        description: 'Миссия по изучению Сатурна, его колец и спутников. Спускаемый аппарат Гюйгенс исследовал Титан.',
        agency: 'NASA/ESA/ASI',
        duration: '20 лет',
        distance: '1.5 млрд км',
        achievement: 'Высадка на Титан'
    },
    {
        id: 8,
        name: 'Джеймс Уэбб',
        type: 'telescope',
        date: '2021',
        image: 'content/missions/webb.jfif',
        description: 'Самый мощный космический телескоп, изучающий раннюю Вселенную, формирование галактик и экзопланеты.',
        agency: 'NASA/ESA/CSA',
        duration: '2+ года',
        distance: '1.5 млн км',
        achievement: 'Снимки первых галактик'
    },
    {
        id: 9,
        name: 'Розетта',
        type: 'planetary',
        date: '2004',
        image: 'content/missions/rosetta.jfif',
        description: 'Первая миссия, которая вышла на орбиту кометы и посадила на её поверхность спускаемый аппарат.',
        agency: 'ESA',
        duration: '12 лет',
        distance: '6 млрд км',
        achievement: 'Первая посадка на комету'
    },
    {
        id: 10,
        name: 'Спейс Шаттл',
        type: 'manned',
        date: '1981',
        image: 'content/missions/shuttle.jpg',
        description: 'Первые многоразовые космические корабли, совершившие 135 полетов и доставившие на орбиту множество спутников.',
        agency: 'NASA',
        duration: '30 лет',
        flights: '135 миссий',
        achievement: 'Многоразовый космический корабль'
    },
    {
        id: 11,
        name: 'Марс-3',
        type: 'planetary',
        date: '1971',
        image: 'content/missions/mars3.jpg',
        description: 'Первая успешная посадка советского аппарата на Марс. Передавал данные с поверхности 14.5 секунд.',
        agency: 'СССР',
        duration: '14.5 секунд',
        distance: '225 млн км',
        achievement: 'Первая мягкая посадка на Марс'
    },
    {
        id: 12,
        name: 'Кеплер',
        type: 'telescope',
        date: '2009',
        image: 'content/missions/kepler.jpg',
        description: 'Космический телескоп для поиска экзопланет. Обнаружил более 2600 подтвержденных планет за пределами Солнечной системы.',
        agency: 'NASA',
        duration: '9 лет',
        planets: '2600+',
        achievement: 'Обнаружение тысяч экзопланет'
    }
];
    
    // Функция для получения русского названия типа миссии
    function getMissionTypeLabel(type) {
        const types = {
            'planetary': 'Планетарная',
            'orbital': 'Орбитальная',
            'manned': 'Пилотируемая',
            'telescope': 'Телескоп'
        };
        return types[type] || type;
    }
    
    // Функция создания карточки миссии
   function createMissionCard(mission) {
    const card = document.createElement('div');
    
    // Добавляем специальный класс для миссии Гагарина
    const cardClass = mission.special ? 'mission-card gagarin-special' : `mission-card ${mission.type}`;
    card.className = cardClass;
    card.dataset.type = mission.type;
    
    card.innerHTML = `
        <div class="mission-image-container">
            <img src="${mission.image}" alt="${mission.name}" class="mission-image" loading="lazy">
            <div class="mission-overlay">
                <div class="mission-type">${getMissionTypeLabel(mission.type)}</div>
                ${mission.special ? '<div class="mission-special"></div>' : ''}
            </div>
        </div>
        
        <div class="mission-content">
            <div class="mission-header">
                <h3 class="mission-name">${mission.name}</h3>
                <div class="mission-date">
                    <span class="date-icon">📅</span>
                    ${mission.date}
                </div>
            </div>
            
            <p class="mission-description">${mission.description}</p>
            
           
            
            <button class="details-btn" data-mission="${mission.id}">
                <span class="btn-icon">📖</span>
                Подробнее о миссии
            </button>
        </div>
    `;
        // Добавляем обработчик для кнопки "Подробнее"
        const detailsBtn = card.querySelector('.details-btn');
        detailsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showMissionDetails(mission);
        });
        
        return card;
    }
    
    // Функция фильтрации миссий
    function filterMissions(filter) {
        const allCards = document.querySelectorAll('.mission-card');
        
        allCards.forEach(card => {
            if (filter === 'all' || card.dataset.type === filter) {
                card.style.display = 'flex';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // Функция показа деталей миссии (заглушка)
    function showMissionDetails(mission) {
        // Создаем модальное окно
        const modal = document.createElement('div');
        modal.className = 'mission-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            backdrop-filter: blur(10px);
            animation: fadeIn 0.3s ease;
        `;
        
        modal.innerHTML = `
            <div class="modal-content" style="
                background: var(--gradient-card);
                border-radius: var(--border-radius);
                padding: 2rem;
                max-width: 600px;
                width: 90%;
                border: 2px solid var(--mission-color, #667eea);
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
                position: relative;
                animation: slideUp 0.3s ease;
            ">
                <button class="close-modal" style="
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: transparent;
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.1);
                ">×</button>
                
                <div style="margin-bottom: 1.5rem;">
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                        <div style="
                            width: 60px;
                            height: 60px;
                            background: var(--mission-bg, linear-gradient(135deg, #667eea, #764ba2));
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 1.5rem;
                            color: white;
                        ">🚀</div>
                        <div>
                            <h2 style="color: white; margin: 0 0 0.25rem; font-size: 1.8rem;">${mission.name}</h2>
                            <div style="color: var(--mission-color, #667eea); font-weight: 600;">
                                ${getMissionTypeLabel(mission.type)} • ${mission.date}
                            </div>
                        </div>
                    </div>
                    
                    <div style="
                        background: rgba(255, 255, 255, 0.05);
                        border-radius: 8px;
                        padding: 1rem;
                        margin-bottom: 1rem;
                    ">
                        <img src="${mission.image}" alt="${mission.name}" style="
                            width: 100%;
                            height: 200px;
                            object-fit: cover;
                            border-radius: 6px;
                            margin-bottom: 1rem;
                        ">
                        <p style="color: rgba(255, 255, 255, 0.8); line-height: 1.6; margin: 0;">
                            ${mission.description}
                        </p>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 1.5rem;">
                        <div style="background: rgba(255, 255, 255, 0.05); padding: 1rem; border-radius: 8px;">
                            <div style="color: rgba(255, 255, 255, 0.6); font-size: 0.8rem; margin-bottom: 0.25rem;">Агентство</div>
                            <div style="color: white; font-weight: 600; font-size: 1.1rem;">${mission.agency}</div>
                        </div>
                        <div style="background: rgba(255, 255, 255, 0.05); padding: 1rem; border-radius: 8px;">
                            <div style="color: rgba(255, 255, 255, 0.6); font-size: 0.8rem; margin-bottom: 0.25rem;">Длительность</div>
                            <div style="color: white; font-weight: 600; font-size: 1.1rem;">${mission.duration}</div>
                        </div>
                        ${mission.distance ? `
                        <div style="background: rgba(255, 255, 255, 0.05); padding: 1rem; border-radius: 8px;">
                            <div style="color: rgba(255, 255, 255, 0.6); font-size: 0.8rem; margin-bottom: 0.25rem;">Расстояние</div>
                            <div style="color: white; font-weight: 600; font-size: 1.1rem;">${mission.distance}</div>
                        </div>
                        ` : ''}
                        <div style="background: rgba(255, 255, 255, 0.05); padding: 1rem; border-radius: 8px;">
                            <div style="color: rgba(255, 255, 255, 0.6); font-size: 0.8rem; margin-bottom: 0.25rem;">Главное достижение</div>
                            <div style="color: white; font-weight: 600; font-size: 1.1rem;">${mission.achievement}</div>
                        </div>
                    </div>
                    
                    <div style="text-align: center; color: rgba(255, 255, 255, 0.5); font-size: 0.9rem; font-style: italic;">
                        🚀 Детальная страница миссии в разработке
                    </div>
                </div>
            </div>
            
            <style>
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { 
                        opacity: 0; 
                        transform: translateY(20px); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0); 
                    }
                }
            </style>
        `;
        
        document.body.appendChild(modal);
        
        // Закрытие модального окна
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.style.animation = 'fadeOut 0.3s ease';
            modal.querySelector('.modal-content').style.animation = 'slideDown 0.3s ease';
            
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        });
        
        // Закрытие по клику на фон
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.animation = 'fadeOut 0.3s ease';
                modal.querySelector('.modal-content').style.animation = 'slideDown 0.3s ease';
                
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            }
        });
        
        // Добавляем стили для анимации закрытия
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            @keyframes slideDown {
                from { 
                    opacity: 1; 
                    transform: translateY(0); 
                }
                to { 
                    opacity: 0; 
                    transform: translateY(20px); 
                }
            }
        `;
        modal.appendChild(style);
    }
    
    // Заполняем сетку миссий
    missionsData.forEach(mission => {
        missionsGrid.appendChild(createMissionCard(mission));
    });
    
    // Обработчики для кнопок фильтрации
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Убираем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс нажатой кнопке
            button.classList.add('active');
            // Фильтруем миссии
            filterMissions(button.dataset.filter);
        });
    });
    
    // Предзагрузка изображений
    function preloadImages() {
        missionsData.forEach(mission => {
            const img = new Image();
            img.src = mission.image;
        });
    }
    
    // Запускаем предзагрузку после загрузки страницы
    setTimeout(preloadImages, 1000);
});