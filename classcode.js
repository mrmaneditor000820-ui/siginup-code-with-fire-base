

// import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
// import {
//     getAuth,
//     createUserWithEmailAndPassword,
//     onAuthStateChanged,
//     signInWithEmailAndPassword,
//     signOut 
// } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
// const firebaseConfig = {
//     apiKey: "AIzaSyBxWy54p37na-NPWlk4Qs6dVY46_H2wfOw",
//     authDomain: "abdurehman-app.firebaseapp.com",
//     projectId: "abdurehman-app",
//     storageBucket: "abdurehman-app.firebasestorage.app",
//     messagingSenderId: "1069858262240",
//     appId: "1:1069858262240:web:07c13d163a93266e9f5485",
//     measurementId: "G-CCX68B9RV2"
// };

// const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);
// const auth = getAuth(app);

// var text = document.getElementById("text")

// // action
// var signupbtn = document.getElementById("signupbtn")
// signupbtn.addEventListener("click",signup)

// var loginbtn = document.getElementById("loginbtn")
// loginbtn.addEventListener("click",login)
// // check user state

// var logoutbtn = document.getElementById("logoutbtn")
// logoutbtn.addEventListener("click",logout)

// function logout(){
//   signOut(auth).then(() => {
//   alert("user is logged out")
//   text.innerText = ""
// }).catch((error) => {
//   alert("error in logging out")
// });
// }

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//        text.innerHTML = user.email + " is created successfully"

//     const uid = user.uid;

//   } else {
   
//   }
// });


// function signup(){
// var semail = document.getElementById("semail").value
// var spassword = document.getElementById("spassword").value
// createUserWithEmailAndPassword(auth, semail, spassword)
//   .then((userCredential) => {

//     const user = userCredential.user;
//     text.innerHTML = user.email + " is created successfully"

//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.log(errorMessage)

//   });
// }

// function login(){
// var lemail = document.getElementById("lemail").value
// var lpassword = document.getElementById("lpassword").value
// signInWithEmailAndPassword(auth, lemail, lpassword)
//   .then((userCredential) => {

//     const user = userCredential.user;
//     text.innerHTML = user.email + " is logged in successfully"
//     text.style.color = "green"

//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.log(errorMessage)
//     text.innerText = errorCode
//     text.style.color = "red"

//   });
// }


// Form validation and submission handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validate form
            if (validateForm(name, email, subject, message)) {
                // Show loading state
                const submitBtn = contactForm.querySelector('.submit-btn');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                try {
                    // Simulate API call (replace with actual API endpoint)
                    await sendMessage({ name, email, subject, message });
                    
                    // Show success message
                    showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                    
                    // Reset form
                    contactForm.reset();
                    
                } catch (error) {
                    // Show error message
                    showNotification('Failed to send message. Please try again later.', 'error');
                } finally {
                    // Reset button state
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            }
        });
    }
    
    // Add input validation on blur
    const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                showNotification('Successfully subscribed to newsletter!', 'success');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Form validation function
function validateForm(name, email, subject, message) {
    let isValid = true;
    
    // Validate name
    if (name.length < 2) {
        showFieldError('name', 'Please enter a valid name (minimum 2 characters)');
        isValid = false;
    } else {
        clearFieldError('name');
    }
    
    // Validate email
    if (!validateEmail(email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    } else {
        clearFieldError('email');
    }
    
    // Validate subject
    if (subject.length < 3) {
        showFieldError('subject', 'Please enter a subject (minimum 3 characters)');
        isValid = false;
    } else {
        clearFieldError('subject');
    }
    
    // Validate message
    if (message.length < 10) {
        showFieldError('message', 'Please enter a message (minimum 10 characters)');
        isValid = false;
    } else {
        clearFieldError('message');
    }
    
    return isValid;
}

// Email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Individual field validation
function validateField(field) {
    const value = field.value.trim();
    const fieldId = field.id;
    
    switch(fieldId) {
        case 'name':
            if (value.length < 2) {
                showFieldError(fieldId, 'Name must be at least 2 characters');
            } else {
                clearFieldError(fieldId);
            }
            break;
            
        case 'email':
            if (!validateEmail(value)) {
                showFieldError(fieldId, 'Please enter a valid email');
            } else {
                clearFieldError(fieldId);
            }
            break;
            
        case 'subject':
            if (value.length < 3) {
                showFieldError(fieldId, 'Subject must be at least 3 characters');
            } else {
                clearFieldError(fieldId);
            }
            break;
            
        case 'message':
            if (value.length < 10) {
                showFieldError(fieldId, 'Message must be at least 10 characters');
            } else {
                clearFieldError(fieldId);
            }
            break;
    }
}

// Show field error
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group');
    
    // Remove existing error
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error class to field
    field.classList.add('error');
    
    // Create and add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.85rem';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
    
    formGroup.appendChild(errorDiv);
}

// Clear field error
function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    
    if (errorMessage) {
        errorMessage.remove();
    }
    
    field.classList.remove('error');
}

// Simulate sending message (replace with actual API call)
async function sendMessage(formData) {
    return new Promise((resolve, reject) => {
        // Simulate API delay
        setTimeout(() => {
            // Simulate success (90% success rate)
            if (Math.random() > 0.1) {
                console.log('Message sent:', formData);
                resolve({ success: true });
            } else {
                reject(new Error('Failed to send message'));
            }
        }, 1500);
    });
}

// Show notification function
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    notification.textContent = message;
    
    // Add animation keyframes if not exists
    if (!document.querySelector('#notification-keyframes')) {
        const style = document.createElement('style');
        style.id = 'notification-keyframes';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to body
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add hover effects for info cards
document.querySelectorAll('.info-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add click tracking for contact methods
document.querySelectorAll('.info-card').forEach(card => {
    card.addEventListener('click', function(e) {
        const icon = this.querySelector('.icon i');
        if (icon) {
            if (icon.classList.contains('fa-phone')) {
                console.log('Phone clicked');
                // You can add phone call functionality here
            } else if (icon.classList.contains('fa-envelope')) {
                console.log('Email clicked');
                // You can open email client here
            } else if (icon.classList.contains('fa-map-marker-alt')) {
                console.log('Map clicked');
                // You can open maps here
            }
        }
    });
});

// Lazy load map
const mapFrame = document.querySelector('.map-container iframe');
if (mapFrame) {
    // Add loading="lazy" attribute if not present
    if (!mapFrame.hasAttribute('loading')) {
        mapFrame.setAttribute('loading', 'lazy');
    }
}

// Responsive menu toggle (optional)
function createMobileMenu() {
    if (window.innerWidth <= 768) {
        const nav = document.querySelector('.nav-menu');
        const header = document.querySelector('.navbar');
        
        // Check if mobile menu button doesn't exist
        if (!document.querySelector('.mobile-menu-btn')) {
            const menuBtn = document.createElement('button');
            menuBtn.className = 'mobile-menu-btn';
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            menuBtn.style.cssText = `
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: var(--text-color);
                display: block;
            `;
            
            header.insertBefore(menuBtn, nav);
            
            // Hide nav initially
            nav.style.display = 'none';
            
            menuBtn.addEventListener('click', function() {
                if (nav.style.display === 'none') {
                    nav.style.display = 'flex';
                    this.innerHTML = '<i class="fas fa-times"></i>';
                } else {
                    nav.style.display = 'none';
                    this.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        }
    }
}

// Check screen size on load and resize
window.addEventListener('load', createMobileMenu);
window.addEventListener('resize', function() {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav-menu');
    
    if (window.innerWidth > 768) {
        if (mobileBtn) {
            mobileBtn.remove();
        }
        if (nav) {
            nav.style.display = 'flex';
        }
    } else {
        createMobileMenu();
    }
});