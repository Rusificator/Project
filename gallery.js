

document.addEventListener('DOMContentLoaded', function() {
    
    const galleryGrid = document.getElementById('galleryGrid');
    const imageModal = document.getElementById('imageModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const modalImage = document.getElementById('modalImage');
    const imageLoader = document.getElementById('imageLoader');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalId = document.getElementById('modalId');
    const modalCategory = document.getElementById('modalCategory');
    const currentImage = document.getElementById('currentImage');
    const totalImages = document.getElementById('totalImages');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    
    const galleryImages = [
        { 
            id: 1, 
            src: 'content/gallery/earth.jpg', 
            alt: 'Земля из космоса', 
            title: 'Голубая планета',
            description: 'Фотография Земли, сделанная с борта Международной космической станции. Видны облачные образования, океаны и континенты.',
            category: 'Планета Земля',
            year: '2023'
        },
        { 
            id: 2, 
            src: 'content/gallery/jupiter.jpg', 
            alt: 'Юпитер', 
            title: 'Газовый гигант',
            description: 'Снимок Юпитера, сделанный космическим телескопом Хаббл. Хорошо видно Большое Красное Пятно - гигантский шторм, бушующий уже более 350 лет.',
            category: 'Планета-гигант',
            year: '2022'
        },
        { 
            id: 3, 
            src: 'content/gallery/nebula.jpg', 
            alt: 'Туманность Ориона', 
            title: 'Колыбель звёзд',
            description: 'Туманность Ориона - одна из самых ярких туманностей, видимых с Земли. Это область активного звездообразования.',
            category: 'Туманность',
            year: '2021'
        },
        { 
            id: 4, 
            src: 'content/gallery/mars.jpg', 
            alt: 'Марс', 
            title: 'Красная планета',
            description: 'Детальный снимок поверхности Марса, сделанный марсоходом Curiosity. Видны характерные красные пески и скальные образования.',
            category: 'Планета Марс',
            year: '2023'
        },
        { 
            id: 5, 
            src: 'content/gallery/saturn.jpg', 
            alt: 'Сатурн с кольцами', 
            title: 'Властелин колец',
            description: 'Сатурн и его знаменитые кольца, состоящие из миллиардов частиц льда и пыли. Снимок сделан космическим аппаратом Кассини.',
            category: 'Планета с кольцами',
            year: '2017'
        },
        { 
            id: 6, 
            src: 'content/gallery/iss.jpg', 
            alt: 'Международная космическая станция', 
            title: 'Дом на орбите',
            description: 'Международная космическая станция на фоне Земли. Крупнейший искусственный спутник Земли, служащий космической исследовательской лабораторией.',
            category: 'Космическая станция',
            year: '2023'
        },
        { 
            id: 7, 
            src: 'content/gallery/andromeda.jpg', 
            alt: 'Галактика Андромеды', 
            title: 'Соседняя галактика',
            description: 'Галактика Андромеды - ближайшая к Млечному Пути крупная галактика. Расположена на расстоянии около 2.5 миллионов световых лет.',
            category: 'Галактика',
            year: '2022'
        },
        { 
            id: 8, 
            src: 'content/gallery/hubble.jpg', 
            alt: 'Снимок телескопа Хаббл', 
            title: 'Взгляд во Вселенную',
            description: 'Одно из самых глубоких изображений Вселенной, сделанное телескопом Хаббл. Видны тысячи галактик на разных расстояниях.',
            category: 'Глубокий космос',
            year: '2022'
        }
    ];
    
    let currentImageIndex = 0;
    
   
    totalImages.textContent = galleryImages.length;
    
    
    function createGalleryCard(image) {
        const card = document.createElement('div');
        card.className = 'gallery-card';
        card.dataset.id = image.id;
        
        card.innerHTML = `
            <div class="card-image-wrapper">
                <img src="${image.src}" alt="${image.alt}" class="card-image" loading="lazy">
                <div class="card-overlay">
                    <h3 class="card-title">${image.title}</h3>
                </div>
                <button class="view-btn" aria-label="Посмотреть изображение">
                    <span class="view-icon">🔍</span>
                </button>
            </div>
            <div class="card-info">
                <div class="card-id">#${image.id.toString().padStart(2, '0')}</div>
                <p class="card-description">${image.description.substring(0, 80)}...</p>
            </div>
        `;
        
        
        card.addEventListener('click', () => {
            openModal(image.id - 1);
        });
        
        
        const viewBtn = card.querySelector('.view-btn');
        viewBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            openModal(image.id - 1);
        });
        
        return card;
    }
    
    
    function openModal(index) {
        currentImageIndex = index;
        updateModal();
        imageModal.classList.add('active');
        document.body.style.overflow = 'hidden'; 
        
        
        modalImage.classList.remove('loaded');
        imageLoader.style.display = 'flex';
        
       
        const img = new Image();
        img.src = galleryImages[currentImageIndex].src;
        img.onload = () => {
            modalImage.src = img.src;
            modalImage.alt = galleryImages[currentImageIndex].alt;
            modalImage.classList.add('loaded');
            imageLoader.style.display = 'none';
        };
        
        img.onerror = () => {
            // Если изображение не загрузилось, заглушку
            modalImage.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%231a1a2e"/><text x="50%" y="50%" font-family="Arial" font-size="16" fill="white" text-anchor="middle" dy=".3em">Изображение не загрузилось</text></svg>';
            modalImage.alt = 'Изображение не загрузилось';
            modalImage.classList.add('loaded');
            imageLoader.style.display = 'none';
        };
    }
    
    
    function updateModal() {
        const image = galleryImages[currentImageIndex];
        
        modalTitle.textContent = image.title;
        modalDescription.textContent = image.description;
        modalId.textContent = image.id.toString().padStart(2, '0');
        modalCategory.textContent = `${image.category} • ${image.year}`;
        currentImage.textContent = currentImageIndex + 1;
        
       
        prevBtn.disabled = currentImageIndex === 0;
        nextBtn.disabled = currentImageIndex === galleryImages.length - 1;
    }
    
    
    function closeModal() {
        imageModal.classList.remove('active');
        document.body.style.overflow = ''; 
    }
    
    
    function nextImage() {
        if (currentImageIndex < galleryImages.length - 1) {
            currentImageIndex++;
            openModal(currentImageIndex);
        }
    }
    
    
    function prevImage() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            openModal(currentImageIndex);
        }
    }
    
    
    galleryImages.forEach(image => {
        galleryGrid.appendChild(createGalleryCard(image));
    });
    
    
    modalOverlay.addEventListener('click', closeModal);
    modalClose.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);
    
   
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && imageModal.classList.contains('active')) {
            closeModal();
        }
        
        
        if (imageModal.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                prevImage();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            }
        }
    });
    
    
    function preloadImages() {
        galleryImages.forEach(image => {
            const img = new Image();
            img.src = image.src;
        });
    }
    
    
    setTimeout(preloadImages, 1000);
});