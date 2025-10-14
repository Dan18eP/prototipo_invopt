let currentScreen = 'login';

function showScreen(screenId) {
    // Hide current screen
    const current = document.getElementById(currentScreen);
    current.classList.remove('active');
    current.classList.add('prev');
    
    // Show new screen after a short delay
    setTimeout(() => {
        current.classList.remove('prev');
        const newScreen = document.getElementById(screenId);
        newScreen.classList.add('active');
        currentScreen = screenId;
    }, 250);
}

// Add some interactive feedback
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
        e.target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            e.target.style.transform = 'scale(1)';
        }, 150);
    }
});

// Update time and date
function updateDateTime() {
    const now = new Date();
    
    // Format time (HH:MM)
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timeString = `🕐 ${hours}:${minutes}`;
    
    // Format date
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const dayName = days[now.getDay()];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const dateString = `📅 ${dayName}, ${day} ${month} ${year}`;
    
    // Update all time elements
    const timeElements = document.querySelectorAll('.current-time');
    timeElements.forEach(el => {
        el.textContent = timeString;
    });
    
    // Update all date elements
    const dateElements = document.querySelectorAll('.current-date');
    dateElements.forEach(el => {
        el.textContent = dateString;
    });
}

// Update time every minute
setInterval(updateDateTime, 60000);

// Initialize time on page load
document.addEventListener('DOMContentLoaded', function() {
    updateDateTime();
});

// Add some interactive feedback
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
        e.target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            e.target.style.transform = 'scale(1)';
        }, 150);
    }
});