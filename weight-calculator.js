// weight-calculator.js

document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const weightInput = document.getElementById('earth-weight');
    const unitSelect = document.getElementById('unit-select');
    const currentWeightDisplay = document.getElementById('current-weight-value');
    const resultsSection = document.getElementById('results-section');
    const planetsGrid = document.getElementById('planets-grid');
    const emptyState = document.getElementById('empty-state');
    
    // Данные о планетах
    const celestialBodies = [
        {
            id: 'mercury',
            name: 'Меркурий',
            gravity: 0.38,
            image: 'mercury',
            fact: 'Здесь вы будете чувствовать себя невесомым!',
            description: 'Самая маленькая и быстрая планета',
            color: '#9c9c9c'
        },
        {
            id: 'venus',
            name: 'Венера',
            gravity: 0.91,
            image: 'venus',
            fact: 'Почти как на Земле, но с кислотными облаками!',
            description: 'Планета с адской атмосферой',
            color: '#ffcc99'
        },
        {
            id: 'earth',
            name: 'Земля',
            gravity: 1.00,
            image: 'earth',
            fact: 'Ваш родной вес!',
            description: 'Наш дом в космосе',
            color: '#4fc3f7'
        },
        {
            id: 'moon',
            name: 'Луна',
            gravity: 0.16,
            image: 'moon',
            fact: 'Прыгайте в 6 раз выше!',
            description: 'Естественный спутник Земли',
            color: '#cccccc'
        },
        {
            id: 'mars',
            name: 'Марс',
            gravity: 0.38,
            image: 'mars',
            fact: 'Идеально для будущих колонистов!',
            description: 'Красная планета',
            color: '#ff6b6b'
        },
        {
            id: 'jupiter',
            name: 'Юпитер',
            gravity: 2.34,
            image: 'jupiter',
            fact: 'На Юпитере тебя раздавит собственный вес!',
            description: 'Газовый гигант',
            color: '#ffa726'
        },
        {
            id: 'saturn',
            name: 'Сатурн',
            gravity: 0.93,
            image: 'saturn',
            fact: 'Почти как дома, но с кольцами!',
            description: 'Властелин колец',
            color: '#ffd54f'
        },
        {
            id: 'uranus',
            name: 'Уран',
            gravity: 0.92,
            image: 'uranus',
            fact: 'Легче, чем кажется!',
            description: 'Ледяной гигант',
            color: '#80deea'
        },
        {
            id: 'neptune',
            name: 'Нептун',
            gravity: 1.12,
            image: 'neptune',
            fact: 'Немного тяжелее земных условий!',
            description: 'Голубая планета ветров',
            color: '#42a5f5'
        },
        {
            id: 'pluto',
            name: 'Плутон',
            gravity: 0.06,
            image: 'pluto',
            fact: 'Вы почти невесомы!',
            description: 'Карликовая планета',
            color: '#bdbdbd'
        }
    ];

    let selectedPlanet = null;

    // Функция для получения цвета по значению гравитации
    function getWeightColor(gravity) {
        if (gravity > 1.5) return '#ff6b6b'; // Красный для очень тяжелых
        if (gravity > 1) return '#ffa726';    // Оранжевый для тяжелых
        if (gravity < 0.5) return '#4fc3f7';  // Голубой для очень легких
        return '#66bb6a';                     // Зеленый для нормальных
    }

    // Функция для получения темного оттенка цвета
    function getDarkColor(color) {
        // Преобразуем hex в rgb и делаем темнее
        const hex = color.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        
        const darkR = Math.max(0, r - 50);
        const darkG = Math.max(0, g - 50);
        const darkB = Math.max(0, b - 50);
        
        return `#${darkR.toString(16).padStart(2, '0')}${darkG.toString(16).padStart(2, '0')}${darkB.toString(16).padStart(2, '0')}`;
    }

    // Функция расчета весов
    function calculateWeights() {
        const earthWeight = parseFloat(weightInput.value);
        const unit = unitSelect.value;
        
        if (!earthWeight || isNaN(earthWeight) || earthWeight <= 0) {
            resultsSection.style.display = 'none';
            emptyState.style.display = 'block';
            currentWeightDisplay.textContent = '0 ' + (unit === 'kg' ? 'кг' : 'фунты');
            return;
        }

        // Обновляем отображение текущего веса
        currentWeightDisplay.textContent = `${earthWeight} ${unit === 'kg' ? 'кг' : 'фунты'}`;
        
        // Показываем результаты и скрываем пустое состояние
        resultsSection.style.display = 'block';
        emptyState.style.display = 'none';
        
        // Очищаем сетку планет
        planetsGrid.innerHTML = '';
        
        // Рассчитываем вес для каждой планеты
        celestialBodies.forEach(body => {
            let weightOnPlanet;
            let weightDisplay;
            
            // Конвертируем в фунты если нужно (1 кг = 2.20462 фунтов)
            if (unit === 'lb') {
                const weightInLbs = earthWeight; // Пользователь ввел в фунтах
                weightOnPlanet = weightInLbs * body.gravity;
                weightDisplay = weightOnPlanet.toFixed(1);
            } else {
                weightOnPlanet = earthWeight * body.gravity;
                weightDisplay = weightOnPlanet.toFixed(1);
            }
            
            const difference = (body.gravity - 1).toFixed(2);
            
            let comparison = '';
            if (body.gravity > 1) {
                const diffWeight = (earthWeight * (body.gravity - 1)).toFixed(1);
                comparison = `Тяжелее на ${diffWeight} ${unit === 'kg' ? 'кг' : 'фунты'}`;
            } else if (body.gravity < 1) {
                const diffWeight = (earthWeight * (1 - body.gravity)).toFixed(1);
                comparison = `Легче на ${diffWeight} ${unit === 'kg' ? 'кг' : 'фунты'}`;
            } else {
                comparison = 'Такой же как на Земле';
            }
            
            // Получаем цвет для планеты
            const weightColor = getWeightColor(body.gravity);
            const darkColor = getDarkColor(weightColor);
            
            // Создаем карточку планеты
            const planetCard = document.createElement('div');
            planetCard.className = 'planet-card';
            planetCard.dataset.id = body.id;
            
            // Устанавливаем CSS переменные для цвета
            planetCard.style.cssText = `
                --weight-color: ${weightColor};
                --weight-color-dark: ${darkColor};
                --weight-color-shadow: ${weightColor}40;
            `;
            
            // Добавляем обработчик клика для выбора планеты
            planetCard.addEventListener('click', () => {
                selectPlanet(body.id);
            });
            
            // Заполняем контент карточки
            planetCard.innerHTML = `
                <div class="planet-image">
                    <div class="planet-icon ${body.image}"></div>
                    <div class="gravity-badge">
                        g = ${body.gravity}
                    </div>
                </div>
                
                <div class="planet-info">
                    <h3 class="planet-name">${body.name}</h3>
                    <p class="planet-description">${body.description}</p>
                    
                    <div class="weight-result">
                        <span class="weight-value">${weightDisplay}</span>
                        <span class="weight-unit">${unit === 'kg' ? 'кг' : 'фунты'}</span>
                    </div>
                    
                    <div class="weight-comparison">
                        ${comparison}
                    </div>
                    
                    <div class="planet-fact">
                        ${body.fact}
                    </div>
                </div>
            `;
            
            planetsGrid.appendChild(planetCard);
        });
        
        // Автоматически выбираем Землю при первом расчете
        if (!selectedPlanet) {
            selectPlanet('earth');
        }
    }

    // Функция для выбора планеты
    function selectPlanet(planetId) {
        // Убираем класс selected у всех планет
        document.querySelectorAll('.planet-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Добавляем класс selected к выбранной планете
        const selectedCard = document.querySelector(`.planet-card[data-id="${planetId}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
            selectedPlanet = planetId;
            
            // Добавляем анимацию пульсации
            const weightValue = selectedCard.querySelector('.weight-value');
            weightValue.style.animation = 'weightPulse 1s ease-in-out';
            
            // Убираем анимацию после завершения
            setTimeout(() => {
                weightValue.style.animation = '';
            }, 1000);
        }
    }

    // Обработчики событий
    weightInput.addEventListener('input', calculateWeights);
    unitSelect.addEventListener('change', calculateWeights);
    
    // Инициализация калькулятора
    calculateWeights();
    
    // Фокус на поле ввода при загрузке
    weightInput.focus();
    
    // Добавляем пример веса для демонстрации
    weightInput.value = '70';
    calculateWeights();
});