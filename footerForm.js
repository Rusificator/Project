
const FOOTER_FORMCARRY_ENDPOINT = 'https://formcarry.com/s/_na1c8kkBc4';



class FooterContactForm {
    constructor() {
        this.form = document.getElementById('footerContactForm');
        this.submitBtn = document.getElementById('footerSubmitBtn');
        this.submitText = document.getElementById('footerSubmitText');
        this.loadingSpinner = document.getElementById('footerLoadingSpinner');
        this.formMessage = document.getElementById('footerFormMessage');
        
        
        this.fields = {
            fullName: document.getElementById('footerFullName'),
            phone: document.getElementById('footerPhone'),
            email: document.getElementById('footerEmail'),
            message: document.getElementById('footerMessage'),
            agree: document.getElementById('footerAgree')
        };
        
        
        this.errorFields = {
            fullName: document.getElementById('footerFullNameError'),
            phone: document.getElementById('footerPhoneError'),
            email: document.getElementById('footerEmailError'),
            message: document.getElementById('footerMessageError'),
            agree: document.getElementById('footerAgreeError')
        };
        
        
        this.isLoading = false;
        this.formData = this.getFormDataFromStorage();
        
        this.init();
    }
    
    init() {
        
        this.restoreFormData();
        
        
        this.setupEventListeners();
        
        
        this.setupAutoSave();
        
        
        this.setupCheckboxStyles();
    }
    
    
    setupCheckboxStyles() {
        const checkboxGroup = this.form.querySelector('.checkbox-group');
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
    
    
    getFormDataFromStorage() {
        try {
            const savedData = localStorage.getItem('footerContactFormData');
            return savedData ? JSON.parse(savedData) : {
                fullName: '',
                phone: '',
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
            phone: '',
            email: '',
            message: '',
            agree: false
        };
    }
    
    
    restoreFormData() {
        if (this.formData) {
            this.fields.fullName.value = this.formData.fullName || '';
            this.fields.phone.value = this.formData.phone || '';
            this.fields.email.value = this.formData.email || '';
            this.fields.message.value = this.formData.message || '';
            this.fields.agree.checked = this.formData.agree || false;
            
            
            if (this.fields.agree.checked) {
                this.form.querySelector('.checkbox-group')?.classList.add('success');
            }
        }
    }
    
    
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
    
    
    saveFormData() {
        const formData = {
            fullName: this.fields.fullName.value.trim(),
            phone: this.fields.phone.value.trim(),
            email: this.fields.email.value.trim(),
            message: this.fields.message.value.trim(),
            agree: this.fields.agree.checked
        };
        
        try {
            localStorage.setItem('footerContactFormData', JSON.stringify(formData));
        } catch (e) {
            console.error('Ошибка при сохранении в LocalStorage:', e);
        }
    }
    
    
    setupEventListeners() {
        
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
        
        
        this.setupBlurValidation();
        
        
        const checkboxGroup = this.form.querySelector('.checkbox-group');
        if (checkboxGroup) {
            checkboxGroup.addEventListener('click', (e) => {
                if (e.target !== this.fields.agree) {
                    this.fields.agree.checked = !this.fields.agree.checked;
                    this.fields.agree.dispatchEvent(new Event('change'));
                }
            });
        }
    }
    
    
    setupBlurValidation() {
        this.fields.fullName.addEventListener('blur', () => {
            this.validateFullName();
        });
        
        this.fields.phone.addEventListener('blur', () => {
            this.validatePhone();
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
    
    validatePhone() {
        const value = this.fields.phone.value.trim();
        
        if (!value) {
            this.showFieldError('phone', 'Пожалуйста, введите номер телефона');
            return false;
        }
        
        
        const phoneDigits = value.replace(/\D/g, '');
        if (phoneDigits.length < 5) {
            this.showFieldError('phone', 'Номер телефона слишком короткий');
            return false;
        }
        
        
        if (phoneDigits.length > 15) {
            this.showFieldError('phone', 'Номер телефона слишком длинный');
            return false;
        }
        
       
        if (!/\d/.test(value)) {
            this.showFieldError('phone', 'Номер телефона должен содержать цифры');
            return false;
        }
        
        this.clearFieldError('phone');
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
            this.form.querySelector('.checkbox-group')?.classList.add('error');
            return false;
        }
        this.clearFieldError('agree');
        this.form.querySelector('.checkbox-group')?.classList.remove('error');
        this.form.querySelector('.checkbox-group')?.classList.add('success');
        return true;
    }
    
    
    validateForm() {
        const validations = [
            this.validateFullName(),
            this.validatePhone(),
            this.validateEmail(),
            this.validateMessage(),
            this.validateAgreement()
        ];
        
        return validations.every(v => v === true);
    }
    
    
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
    
    
    clearFieldError(fieldName) {
        const errorElement = this.errorFields[fieldName];
        if (errorElement) {
            errorElement.textContent = '';
            if (fieldName !== 'agree') {
                this.fields[fieldName].classList.remove('error');
                
                
                if (this.fields[fieldName].value.trim()) {
                    this.fields[fieldName].classList.add('success');
                }
            }
        }
    }
    
    
    showMessage(text, type = 'info') {
        this.formMessage.textContent = text;
        this.formMessage.className = `message ${type}`;
        this.formMessage.style.display = 'block';
        
        
        this.formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        
        if (type === 'success') {
            setTimeout(() => {
                this.formMessage.style.display = 'none';
            }, 5000);
        }
    }
    
    
    hideMessage() {
        this.formMessage.style.display = 'none';
    }
    
    
    async handleSubmit() {
        
        if (!this.validateForm()) {
            this.showMessage('Пожалуйста, заполните все обязательные поля корректно', 'error');
            return;
        }
        
        
        this.setLoadingState(true);
        this.hideMessage();
        
        try {
            
            const formData = new FormData();
            
            
            formData.append('fullName', this.fields.fullName.value.trim());
            formData.append('phone', this.fields.phone.value.trim());
            formData.append('email', this.fields.email.value.trim());
            formData.append('message', this.fields.message.value.trim());
            formData.append('agree', this.fields.agree.checked);
            
            
            formData.append('_subject', 'Сообщение из футера Космический исследователь');
            formData.append('_language', 'ru');
            formData.append('_page', window.location.href);
            formData.append('_timestamp', new Date().toISOString());
            
            
            const response = await fetch(FOOTER_FORMCARRY_ENDPOINT, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            const result = await response.json();
            
            if (result.code === 200) {
                
                this.showMessage('Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.', 'success');
                
                
                setTimeout(() => {
                    this.clearForm();
                }, 2000);
            } else {
                throw new Error(result.message || 'Ошибка отправки формы');
            }
        } catch (error) {
            console.error('Ошибка при отправке формы:', error);
            this.showMessage('Ошибка при отправке формы. Пожалуйста, попробуйте еще раз или свяжитесь с нами другим способом.', 'error');
        } finally {
            
            this.setLoadingState(false);
        }
    }
    
    
    setLoadingState(isLoading) {
        this.isLoading = isLoading;
        
        if (isLoading) {
            this.submitBtn.disabled = true;
            this.submitText.style.display = 'none';
            this.loadingSpinner.style.display = 'inline-block';
        } else {
            this.submitBtn.disabled = false;
            this.submitText.style.display = 'inline';
            this.loadingSpinner.style.display = 'none';
        }
    }
    
   
    clearForm() {
        
        this.fields.fullName.value = '';
        this.fields.phone.value = '';
        this.fields.email.value = '';
        this.fields.message.value = '';
        this.fields.agree.checked = false;
        
        
        Object.keys(this.errorFields).forEach(fieldName => {
            this.clearFieldError(fieldName);
            if (fieldName !== 'agree') {
                this.fields[fieldName].classList.remove('error', 'success');
            }
        });
        
        
        const checkboxGroup = this.form.querySelector('.checkbox-group');
        if (checkboxGroup) {
            checkboxGroup.classList.remove('error', 'success');
        }
        
        
        this.hideMessage();
        
        
        localStorage.removeItem('footerContactFormData');
        
        
        this.formData = this.getDefaultFormData();
    }
}


document.addEventListener('DOMContentLoaded', () => {
    
    if (document.getElementById('footerContactForm')) {
        window.footerContactForm = new FooterContactForm();
    }
});