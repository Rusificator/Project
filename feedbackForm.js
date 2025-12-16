// Конфигурация Formcarry
const FORMCARRY_ENDPOINT = 'https://formcarry.com/s/YOUR_FORM_ID_HERE';
// Замените YOUR_FORM_ID_HERE на ваш реальный ID формы с formcarry.com

// Класс для управления формой обратной связи
class FeedbackForm {
    constructor() {
        this.form = document.getElementById('feedbackForm');
        this.modal = document.getElementById('modalBackdrop');
        this.clearBtn = document.getElementById('clearFormBtn');
        this.submitBtn = document.getElementById('submitBtn');
        this.submitText = document.getElementById('submitText');
        this.loadingSpinner = document.getElementById('loadingSpinner');
        this.formMessage = document.getElementById('formMessage');
        
        // Поля формы (телефон удален)
        this.fields = {
            fullName: document.getElementById('fullName'),
            email: document.getElementById('email'),
            message: document.getElementById('message'),
            agree: document.getElementById('agree')
        };
        
        // Сообщения об ошибках (телефон удален)
        this.errorFields = {
            fullName: document.getElementById('fullNameError'),
            email: document.getElementById('emailError'),
            message: document.getElementById('messageError'),
            agree: document.getElementById('agreeError')
        };
        
        // Состояние формы
        this.isLoading = false;
        this.formData = this.getFormDataFromStorage();
        
        this.init();
    }
    
    init() {
        // Восстановление данных из LocalStorage
        this.restoreFormData();
        
        // Обработчики событий
        this.setupEventListeners();
        
        // Автосохранение при изменении полей
        this.setupAutoSave();
        
        // Настройка стилей чекбокса
        this.setupCheckboxStyles();
    }
    
    // Настройка стилей чекбокса
    setupCheckboxStyles() {
        const checkboxGroup = document.querySelector('.checkbox-group');
        const checkbox = this.fields.agree;
        
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                checkboxGroup.classList.add('success');
                checkboxGroup.classList.remove('error');
            } else {
                checkboxGroup.classList.remove('success');
            }
        });
    }
    
    // Получение данных формы из LocalStorage (телефон удален)
    getFormDataFromStorage() {
        try {
            const savedData = localStorage.getItem('feedbackFormData');
            return savedData ? JSON.parse(savedData) : {
                fullName: '',
                email: '',
                message: '',
                agree: false
            };
        } catch (e) {
            console.error('Ошибка при чтении из LocalStorage:', e);
            return this.getDefaultFormData();
        }
    }
    
    getDefaultFormData() {
        return {
            fullName: '',
            email: '',
            message: '',
            agree: false
        };
    }
    
    // Восстановление данных в форму (телефон удален)
    restoreFormData() {
        if (this.formData) {
            this.fields.fullName.value = this.formData.fullName || '';
            this.fields.email.value = this.formData.email || '';
            this.fields.message.value = this.formData.message || '';
            this.fields.agree.checked = this.formData.agree || false;
            
            // Обновляем стиль чекбокса
            if (this.fields.agree.checked) {
                document.querySelector('.checkbox-group')?.classList.add('success');
            }
        }
    }
    
    // Настройка автосохранения
    setupAutoSave() {
        Object.keys(this.fields).forEach(fieldName => {
            const field = this.fields[fieldName];
            
            if (field.type === 'checkbox') {
                field.addEventListener('change', () => {
                    this.saveFormData();
                    this.clearFieldError(fieldName);
                });
            } else {
                field.addEventListener('input', () => {
                    this.saveFormData();
                    this.clearFieldError(fieldName);
                });
            }
        });
    }
    
    // Сохранение данных формы (телефон удален)
    saveFormData() {
        const formData = {
            fullName: this.fields.fullName.value.trim(),
            email: this.fields.email.value.trim(),
            message: this.fields.message.value.trim(),
            agree: this.fields.agree.checked
        };
        
        try {
            localStorage.setItem('feedbackFormData', JSON.stringify(formData));
        } catch (e) {
            console.error('Ошибка при сохранении в LocalStorage:', e);
        }
    }
    
    // Настройка обработчиков событий
    setupEventListeners() {
        // Отправка формы
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
        
        // Очистка формы
        this.clearBtn.addEventListener('click', () => {
            this.clearForm();
        });
        
        // Валидация при потере фокуса
        this.setupBlurValidation();
        
        // Клик по чекбокс-группе
        const checkboxGroup = document.querySelector('.checkbox-group');
        if (checkboxGroup) {
            checkboxGroup.addEventListener('click', (e) => {
                if (e.target !== this.fields.agree) {
                    this.fields.agree.checked = !this.fields.agree.checked;
                    this.fields.agree.dispatchEvent(new Event('change'));
                }
            });
        }
    }
    
    // Валидация при потере фокуса (телефон удален)
    setupBlurValidation() {
        this.fields.fullName.addEventListener('blur', () => {
            this.validateFullName();
        });
        
        this.fields.email.addEventListener('blur', () => {
            this.validateEmail();
        });
        
        this.fields.message.addEventListener('blur', () => {
            this.validateMessage();
        });
        
        this.fields.agree.addEventListener('change', () => {
            this.validateAgreement();
        });
    }
    
    // Валидация полей (телефон удален)
    validateFullName() {
        const value = this.fields.fullName.value.trim();
        if (!value) {
            this.showFieldError('fullName', 'Пожалуйста, введите ФИО');
            return false;
        }
        if (value.length < 2) {
            this.showFieldError('fullName', 'ФИО должно содержать не менее 2 символов');
            return false;
        }
        this.clearFieldError('fullName');
        return true;
    }
    
    validateEmail() {
        const value = this.fields.email.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!value) {
            this.showFieldError('email', 'Пожалуйста, введите email');
            return false;
        }
        if (!emailRegex.test(value)) {
            this.showFieldError('email', 'Введите корректный email адрес');
            return false;
        }
        this.clearFieldError('email');
        return true;
    }
    
    validateMessage() {
        const value = this.fields.message.value.trim();
        if (!value) {
            this.showFieldError('message', 'Пожалуйста, введите сообщение');
            return false;
        }
        if (value.length < 10) {
            this.showFieldError('message', 'Сообщение должно содержать не менее 10 символов');
            return false;
        }
        if (value.length > 1000) {
            this.showFieldError('message', 'Сообщение слишком длинное (максимум 1000 символов)');
            return false;
        }
        this.clearFieldError('message');
        return true;
    }
    
    validateAgreement() {
        if (!this.fields.agree.checked) {
            this.showFieldError('agree', 'Необходимо согласие с политикой обработки данных');
            document.querySelector('.checkbox-group')?.classList.add('error');
            return false;
        }
        this.clearFieldError('agree');
        document.querySelector('.checkbox-group')?.classList.remove('error');
        document.querySelector('.checkbox-group')?.classList.add('success');
        return true;
    }
    
    // Общая валидация формы (телефон удален)
    validateForm() {
        const validations = [
            this.validateFullName(),
            this.validateEmail(),
            this.validateMessage(),
            this.validateAgreement()
        ];
        
        return validations.every(v => v === true);
    }
    
    // Показать ошибку поля
    showFieldError(fieldName, message) {
        const errorElement = this.errorFields[fieldName];
        if (errorElement) {
            errorElement.textContent = message;
            if (fieldName !== 'agree') {
                this.fields[fieldName].classList.add('error');
                this.fields[fieldName].classList.remove('success');
            }
        }
    }
    
    // Очистить ошибку поля
    clearFieldError(fieldName) {
        const errorElement = this.errorFields[fieldName];
        if (errorElement) {
            errorElement.textContent = '';
            if (fieldName !== 'agree') {
                this.fields[fieldName].classList.remove('error');
                
                // Добавляем класс success если поле заполнено правильно
                if (this.fields[fieldName].value.trim()) {
                    this.fields[fieldName].classList.add('success');
                }
            }
        }
    }
    
    // Показать сообщение формы
    showMessage(text, type = 'info') {
        this.formMessage.textContent = text;
        this.formMessage.className = `message ${type}`;
        this.formMessage.style.display = 'block';
        
        // Автоматическое скрытие сообщения об успехе
        if (type === 'success') {
            setTimeout(() => {
                this.formMessage.style.display = 'none';
            }, 3000);
        }
    }
    
    // Скрыть сообщение формы
    hideMessage() {
        this.formMessage.style.display = 'none';
    }
    
    // Обработка отправки формы (телефон удален)
    async handleSubmit() {
        // Валидация
        if (!this.validateForm()) {
            this.showMessage('Пожалуйста, заполните все обязательные поля корректно', 'error');
            return;
        }
        
        // Показать состояние загрузки
        this.setLoadingState(true);
        this.hideMessage();
        
        try {
            // Подготовка данных для отправки
            const formData = new FormData();
            
            // Добавляем данные формы
            formData.append('fullName', this.fields.fullName.value.trim());
            formData.append('email', this.fields.email.value.trim());
            formData.append('message', this.fields.message.value.trim());
            formData.append('agree', this.fields.agree.checked);
            
            // Добавляем дополнительные поля
            formData.append('_subject', 'Новое сообщение с сайта Космический исследователь');
            formData.append('_language', 'ru');
            formData.append('_page', window.location.href);
            formData.append('_timestamp', new Date().toISOString());
            
            // Отправка на Formcarry
            const response = await fetch(FORMCARRY_ENDPOINT, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            const result = await response.json();
            
            if (result.code === 200) {
                // Успешная отправка
                this.showMessage('Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.', 'success');
                
                // Очистка формы и LocalStorage
                setTimeout(() => {
                    this.clearForm();
                    this.modal.classList.remove('active');
                    document.body.style.overflow = '';
                }, 2000);
            } else {
                throw new Error(result.message || 'Ошибка отправки формы');
            }
        } catch (error) {
            console.error('Ошибка при отправке формы:', error);
            this.showMessage('Ошибка при отправке формы. Пожалуйста, попробуйте еще раз или свяжитесь с нами другим способом.', 'error');
        } finally {
            // Скрыть состояние загрузки
            this.setLoadingState(false);
        }
    }
    
    // Установка состояния загрузки
    setLoadingState(isLoading) {
        this.isLoading = isLoading;
        
        if (isLoading) {
            this.submitBtn.disabled = true;
            this.clearBtn.disabled = true;
            this.submitText.style.display = 'none';
            this.loadingSpinner.style.display = 'inline-block';
        } else {
            this.submitBtn.disabled = false;
            this.clearBtn.disabled = false;
            this.submitText.style.display = 'inline';
            this.loadingSpinner.style.display = 'none';
        }
    }
    
    // Очистка формы
    clearForm() {
        // Сброс значений полей
        this.fields.fullName.value = '';
        this.fields.email.value = '';
        this.fields.message.value = '';
        this.fields.agree.checked = false;
        
        // Очистка ошибок
        Object.keys(this.errorFields).forEach(fieldName => {
            this.clearFieldError(fieldName);
            if (fieldName !== 'agree') {
                this.fields[fieldName].classList.remove('error', 'success');
            }
        });
        
        // Очистка стилей чекбокса
        const checkboxGroup = document.querySelector('.checkbox-group');
        if (checkboxGroup) {
            checkboxGroup.classList.remove('error', 'success');
        }
        
        // Очистка сообщений
        this.hideMessage();
        
        // Очистка LocalStorage
        localStorage.removeItem('feedbackFormData');
        
        // Сброс данных формы
        this.formData = this.getDefaultFormData();
    }
}

// Инициализация формы при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    window.feedbackForm = new FeedbackForm();
});