// Correct code
const CORRECT_CODE = "2008";

// Initialize falling hearts
function initializeHearts() {
    const heartsContainer = document.getElementById('heartsContainer');
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = '❤️';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
        heart.style.animationDelay = Math.random() * 0.5 + 's';
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 8000);
    }
    
    setInterval(createHeart, 800);
}

// Check code function
function checkCode() {
    const input = document.getElementById('codeInput');
    const code = input.value;
    const errorMessage = document.getElementById('errorMessage');
    
    if (code === CORRECT_CODE) {
        // Correct code - transition to main screen
        errorMessage.textContent = '';
        revealBirthday();
    } else {
        // Wrong code - show error
        errorMessage.textContent = '❌ Oops! That\'s not the right code. Try again! 💕';
        input.value = '';
        input.focus();
        
        // Add shake animation
        input.style.animation = 'none';
        setTimeout(() => {
            input.style.animation = 'shake 0.5s ease-in-out';
        }, 10);
    }
}

// Enter key support for code input
document.addEventListener('DOMContentLoaded', function() {
    const codeInput = document.getElementById('codeInput');
    if (codeInput) {
        codeInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkCode();
            }
        });
    }
});

// Reveal birthday surprise
function revealBirthday() {
    const codeScreen = document.getElementById('codeScreen');
    const mainScreen = document.getElementById('mainScreen');
    
    // Smooth transition
    codeScreen.style.animation = 'fadeOut 0.5s ease-out';
    
    setTimeout(() => {
        codeScreen.classList.add('hidden');
        mainScreen.classList.remove('hidden');
        
        // Trigger confetti/celebration effect
        celebrationEffect();
    }, 500);
}

// Celebration effect with extra hearts
function celebrationEffect() {
    const heartsContainer = document.getElementById('heartsContainer');
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = ['❤️', '💕', '💖', '✨'][Math.floor(Math.random() * 4)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (1.5 + Math.random() * 1.5) + 'rem';
            heart.style.animationDuration = (3 + Math.random() * 2) + 's';
            heartsContainer.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 5000);
        }, i * 100);
    }
}

// Music player functionality
let isPlaying = false;

function toggleMusic() {
    const audio = document.getElementById('birthdayAudio');
    const button = document.getElementById('musicToggle');
    
    // Check if audio source is set
    if (!audio.src || audio.src === '') {
        alert('No song added yet! Add your favorite song to the music player.');
        return;
    }
    
    if (isPlaying) {
        audio.pause();
        button.innerHTML = '<span class="play-icon">▶</span><span class="text">Play Song</span>';
        isPlaying = false;
    } else {
        audio.play().catch(error => {
            console.log('Playback failed:', error);
            alert('Could not play the audio file.');
        });
        button.innerHTML = '<span class="play-icon">⏸</span><span class="text">Pause</span>';
        isPlaying = true;
    }
}

// Audio ended listener
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('birthdayAudio');
    if (audio) {
        audio.addEventListener('ended', function() {
            const button = document.getElementById('musicToggle');
            button.innerHTML = '<span class="play-icon">▶</span><span class="text">Play Song</span>';
            isPlaying = false;
        });
    }
});

// Smooth scroll behavior for mobile
if (document.documentElement.style.scrollBehavior !== undefined) {
    document.documentElement.style.scrollBehavior = 'smooth';
}

// Initialize on page load
window.addEventListener('load', function() {
    initializeHearts();
    
    // Auto-focus code input on mobile
    const codeInput = document.getElementById('codeInput');
    if (codeInput && window.innerWidth < 768) {
        codeInput.focus();
    }
});

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
`;
document.head.appendChild(style);