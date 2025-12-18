// solar-model.js - упрощенная версия

document.addEventListener('DOMContentLoaded', function() {
    const modelContainer = document.querySelector('.model-container');
    const solarIframe = document.querySelector('.solar-iframe');
    
    if (!modelContainer || !solarIframe) return;
    
    // Создаем кнопку для полноэкранного режима
    const fullscreenBtn = document.createElement('button');
    fullscreenBtn.className = 'fullscreen-btn';
    fullscreenBtn.setAttribute('aria-label', 'Развернуть на полный экран');
    fullscreenBtn.innerHTML = `
        <span class="fullscreen-icon">⛶</span>
        <span class="fullscreen-text">Полный экран</span>
    `;
    
    // Стили для кнопки
    fullscreenBtn.style.cssText = `
        position: absolute;
        bottom: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 6px;
        padding: 10px 16px;
        font-size: 0.9rem;
        cursor: pointer;
        z-index: 10;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 8px;
        font-family: inherit;
    `;
    
    // Добавляем hover эффект
    fullscreenBtn.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(255, 204, 0, 0.9)';
        this.style.color = '#000';
        this.style.borderColor = '#ffcc00';
    });
    
    fullscreenBtn.addEventListener('mouseleave', function() {
        this.style.background = 'rgba(0, 0, 0, 0.7)';
        this.style.color = 'white';
        this.style.borderColor = 'rgba(255, 255, 255, 0.3)';
    });
    
    // Обработчик клика для полноэкранного режима
    fullscreenBtn.addEventListener('click', function() {
        if (modelContainer.requestFullscreen) {
            modelContainer.requestFullscreen();
        } else if (modelContainer.mozRequestFullScreen) { // Firefox
            modelContainer.mozRequestFullScreen();
        } else if (modelContainer.webkitRequestFullscreen) { // Chrome, Safari и Opera
            modelContainer.webkitRequestFullscreen();
        } else if (modelContainer.msRequestFullscreen) { // IE/Edge
            modelContainer.msRequestFullscreen();
        }
    });
    
    // Изменяем кнопку при переходе в полноэкранный режим
    document.addEventListener('fullscreenchange', updateFullscreenButton);
    document.addEventListener('webkitfullscreenchange', updateFullscreenButton);
    document.addEventListener('mozfullscreenchange', updateFullscreenButton);
    document.addEventListener('MSFullscreenChange', updateFullscreenButton);
    
    function updateFullscreenButton() {
        const isFullscreen = document.fullscreenElement || 
                            document.webkitFullscreenElement ||
                            document.mozFullScreenElement ||
                            document.msFullscreenElement;
        
        if (isFullscreen) {
            fullscreenBtn.innerHTML = `
                <span class="fullscreen-icon">🗗</span>
                <span class="fullscreen-text">Свернуть</span>
            `;
            fullscreenBtn.style.bottom = '30px';
            fullscreenBtn.style.right = '30px';
        } else {
            fullscreenBtn.innerHTML = `
                <span class="fullscreen-icon">⛶</span>
                <span class="fullscreen-text">Полный экран</span>
            `;
            fullscreenBtn.style.bottom = '20px';
            fullscreenBtn.style.right = '20px';
        }
    }
    
    // Добавляем кнопку в контейнер
    modelContainer.style.position = 'relative';
    modelContainer.appendChild(fullscreenBtn);
    
    // Выход из полноэкранного режима по нажатию Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const isFullscreen = document.fullscreenElement || 
                                document.webkitFullscreenElement ||
                                document.mozFullScreenElement ||
                                document.msFullscreenElement;
            
            if (isFullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }
        }
    });
});