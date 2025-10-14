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