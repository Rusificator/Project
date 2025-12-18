// planets.js

document.addEventListener('DOMContentLoaded', function() {
    const planetsGrid = document.getElementById('planetsGrid');
    const dwarfPlanetsGrid = document.querySelector('.dwarf-planets-grid');
    
    // Данные о планетах
    const planetsData = [
        {
            id: 'mercury',
            name: 'Меркурий',
            type: 'Планета земной группы',
            emoji: '☿',
            description: 'Самая маленькая и ближайшая к Солнцу планета. Имеет сильно кратерированную поверхность, похожую на лунную.',
            stats: {
                'Диаметр': '4,879 км',
                'Масса': '3.3 × 10²³ кг',
                'Орбита': '88 дней',
                'Температура': '-173°C до 427°C'
            },
            fact: 'Сутки на Меркурии длятся 59 земных дней, а год — всего 88 дней!'
        },
        {
            id: 'venus',
            name: 'Венера',
            type: 'Планета земной группы',
            emoji: '♀',
            description: 'Вторая планета от Солнца, самая горячая в Солнечной системе. Имеет плотную атмосферу из углекислого газа.',
            stats: {
                'Диаметр': '12,104 км',
                'Масса': '4.87 × 10²⁴ кг',
                'Орбита': '225 дней',
                'Температура': '462°C'
            },
            fact: 'Венера вращается в обратную сторону по сравнению с другими планетами!'
        },
        {
            id: 'earth',
            name: 'Земля',
            type: 'Планета земной группы',
            emoji: '🌍',
            description: 'Третья планета от Солнца, единственная известная планета с жизнью. Имеет жидкую воду и атмосферу, богатую кислородом.',
            stats: {
                'Диаметр': '12,742 км',
                'Масса': '5.97 × 10²⁴ кг',
                'Орбита': '365.25 дней',
                'Температура': '-89°C до 58°C'
            },
            fact: '71% поверхности Земли покрыто водой — это единственная планета с жидкой водой на поверхности!'
        },
        {
            id: 'mars',
            name: 'Марс',
            type: 'Планета земной группы',
            emoji: '♂',
            description: 'Четвертая планета от Солнца, известная как "Красная планета". Имеет полярные ледяные шапки и свидетельства существования воды в прошлом.',
            stats: {
                'Диаметр': '6,779 км',
                'Масса': '6.42 × 10²³ кг',
                'Орбита': '687 дней',
                'Температура': '-140°C до 20°C'
            },
            fact: 'На Марсе находится самый большой вулкан в Солнечной системе — Олимп, высотой 21 км!'
        },
        {
            id: 'jupiter',
            name: 'Юпитер',
            type: 'Газовый гигант',
            emoji: '♃',
            description: 'Самая большая планета в Солнечной системе. Газовый гигант с характерным Большим Красным Пятном — гигантским штормом.',
            stats: {
                'Диаметр': '139,820 км',
                'Масса': '1.90 × 10²⁷ кг',
                'Орбита': '12 лет',
                'Спутники': '79+'
            },
            fact: 'Юпитер настолько велик, что в него поместились бы все остальные планеты Солнечной системы!'
        },
        {
            id: 'saturn',
            name: 'Сатурн',
            type: 'Газовый гигант',
            emoji: '♄',
            description: 'Шестая планета от Солнца, известная своими впечатляющими кольцами, состоящими из льда и камней.',
            stats: {
                'Диаметр': '116,460 км',
                'Масса': '5.68 × 10²⁶ кг',
                'Орбита': '29.5 лет',
                'Спутники': '82+'
            },
            fact: 'Кольца Сатурна имеют толщину всего около 10 метров, но простираются на сотни тысяч километров!'
        },
        {
            id: 'uranus',
            name: 'Уран',
            type: 'Ледяной гигант',
            emoji: '♅',
            description: 'Седьмая планета от Солнца, ледяной гигант с уникальным наклоном оси вращения — планета как бы "лежит на боку".',
            stats: {
                'Диаметр': '50,724 км',
                'Масса': '8.68 × 10²⁵ кг',
                'Орбита': '84 года',
                'Спутники': '27'
            },
            fact: 'Уран вращается "на боку" — его ось вращения наклонена на 98 градусов!'
        },
        {
            id: 'neptune',
            name: 'Нептун',
            type: 'Ледяной гигант',
            emoji: '♆',
            description: 'Восьмая и самая дальняя планета от Солнца. Ледяной гигант с самыми сильными ветрами в Солнечной системе.',
            stats: {
                'Диаметр': '49,244 км',
                'Масса': '1.02 × 10²⁶ кг',
                'Орбита': '165 лет',
                'Спутники': '14'
            },
            fact: 'На Нептуне дуют самые сильные ветры в Солнечной системе — до 2,100 км/ч!'
        }
    ];
    
    // Данные о карликовых планетах
    const dwarfPlanetsData = [
        {
            name: 'Плутон',
            emoji: '♇',
            description: 'Ранее считался девятой планетой, теперь классифицируется как карликовая планета. Имеет пять спутников.',
            fact: 'Плутону требуется 248 земных лет, чтобы совершить один оборот вокруг Солнца!'
        },
        {
            name: 'Церера',
            emoji: '⚳',
            description: 'Самая близкая к Земле карликовая планета, расположенная в поясе астероидов между Марсом и Юпитером.',
            fact: 'Церера — единственная карликовая планета во внутренней части Солнечной системы!'
        },
        {
            name: 'Хаумеа',
            emoji: '🪐',
            description: 'Быстро вращающаяся карликовая планета необычной вытянутой формы, похожая на сплюснутый эллипсоид.',
            fact: 'Хаумеа совершает один оборот вокруг своей оси всего за 4 часа!'
        },
        {
            name: 'Макемаке',
            emoji: '🪐',
            description: 'Вторая по яркости карликовая планета после Плутона в поясе Койпера. Не имеет известных спутников.',
            fact: 'Макемаке названа в честь бога изобилия в мифологии народа Рапа-Нуи!'
        },
        {
            name: 'Эрида',
            emoji: '🪐',
            description: 'Самая массивная из известных карликовых планет, вращающаяся за пределами орбиты Нептуна.',
            fact: 'Открытие Эриды в 2005 году привело к пересмотру определения планеты и "понижению" Плутона!'
        }
    ];
    
    // Функция создания карточки планеты
    function createPlanetCard(planet) {
        const card = document.createElement('div');
        card.className = `planet-card ${planet.id}`;
        card.innerHTML = `
            <div class="planet-header">
                <div class="planet-emoji">${planet.emoji}</div>
                <div class="planet-titles">
                    <h3 class="planet-name">${planet.name}</h3>
                    <div class="planet-type">${planet.type}</div>
                </div>
            </div>
            
            <div class="planet-info">
                <p class="planet-description">${planet.description}</p>
                
                
            </div>
            
            <button class="explore-btn" data-planet="${planet.id}">
                <span class="btn-icon">🔭</span>
                Изучить планету
            </button>
        `;
        
        return card;
    }
    
    // Функция создания карточки карликовой планеты
    function createDwarfPlanetCard(dwarfPlanet) {
        const card = document.createElement('div');
        card.className = 'dwarf-planet-card dwarf';
        card.innerHTML = `
            <div class="dwarf-planet-header">
                <div class="dwarf-planet-emoji">${dwarfPlanet.emoji}</div>
                <h4 class="dwarf-planet-name">${dwarfPlanet.name}</h4>
            </div>
            <p class="dwarf-planet-description">${dwarfPlanet.description}</p>
        `;
        
        return card;
    }
    
    // Заполняем сетку планет
    planetsData.forEach(planet => {
        planetsGrid.appendChild(createPlanetCard(planet));
    });
    
    // Заполняем сетку карликовых планет
    dwarfPlanetsData.forEach(dwarfPlanet => {
        dwarfPlanetsGrid.appendChild(createDwarfPlanetCard(dwarfPlanet));
    });
    
    // Обработчики для кнопок "Изучить"
    document.querySelectorAll('.explore-btn').forEach(button => {
        button.addEventListener('click', function() {
            const planetId = this.dataset.planet;
            const planet = planetsData.find(p => p.id === planetId);
            
            if (planet) {
                // Показываем заглушку
                showPlanetModal(planet);
            }
        });
    });
    
    // Функция показа модального окна с информацией о планете (заглушка)
    function showPlanetModal(planet) {
        // Создаем модальное окно
        const modal = document.createElement('div');
        modal.className = 'planet-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
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
                max-width: 500px;
                width: 90%;
                border: 2px solid ${getComputedStyle(document.documentElement).getPropertyValue('--planet-color')};
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
                
                <div style="text-align: center; margin-bottom: 1.5rem;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">${planet.emoji}</div>
                    <h2 style="color: white; margin-bottom: 0.5rem; font-size: 2rem;">${planet.name}</h2>
                    <div style="color: ${getComputedStyle(document.documentElement).getPropertyValue('--planet-color')}; 
                         font-weight: 600;">${planet.type}</div>
                </div>
                
                <div style="color: rgba(255, 255, 255, 0.8); line-height: 1.6; margin-bottom: 1.5rem;">
                    ${planet.description}
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <h4 style="color: white; margin-bottom: 1rem;">Интересный факт:</h4>
                    <div style="background: rgba(255, 255, 255, 0.1); padding: 1rem; border-radius: 8px; 
                         border-left: 3px solid ${getComputedStyle(document.documentElement).getPropertyValue('--planet-color')};">
                        ${planet.fact}
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 1.5rem;">
                    ${Object.entries(planet.stats).map(([key, value]) => `
                        <div style="background: rgba(255, 255, 255, 0.05); padding: 0.75rem; border-radius: 8px;">
                            <div style="color: rgba(255, 255, 255, 0.6); font-size: 0.8rem;">${key}</div>
                            <div style="color: white; font-weight: 600; font-size: 1.1rem;">${value}</div>
                        </div>
                    `).join('')}
                </div>
                
                <div style="text-align: center; color: rgba(255, 255, 255, 0.5); font-size: 0.9rem; font-style: italic;">
                    🚀 Детальная страница планеты в разработке
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
});