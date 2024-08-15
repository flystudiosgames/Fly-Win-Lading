// Global variables for the Lucky Jet game
let increaseSpeed = 0.1; // Speed of incrementing display value
let animationDuration = 2000; // Duration of the interpolation animation in ms
let minimRange = 2.0;
let maximRange = 20.0;
let generatedValue;

// Initial loading screen display for 3 seconds
setTimeout(function() {
    showScreen('homeScreen');
}, 3000);

// Function to show a specific screen after displaying the loading screen
function transitionToScreen(screenId) {
    showScreen('loadingScreen');

    setTimeout(function() {
        showScreen(screenId);
    }, 3000);
}

// Function to show a specific screen and hide others
function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        if (screen.id === screenId) {
            screen.classList.add('active');
        } else {
            screen.classList.remove('active');
        }
    });
}

// Lucky Jet game signal function
function luckyJetGetSignal() {
    console.log("LuckyJetGetSignal");

    // Generate a random float number between minimRange and maximRange
    generatedValue = (Math.random() * (maximRange - minimRange) + minimRange).toFixed(2);

    // Disable the button to prevent multiple clicks during animation
    setButtonState(false);

    // Start the animation to incrementally display the value
    startScoreInterpolation();
}

// Interpolation animation function
function startScoreInterpolation() {
    let startValue = 1.0;
    let startTime = Date.now();

    function update() {
        let elapsedTime = Date.now() - startTime;
        let progress = Math.min(elapsedTime / animationDuration, 1);
        let currentValue = (1.0 + (generatedValue - 1.0) * progress).toFixed(2);

        updateDrawResultText(currentValue);

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            setButtonState(true);
        }
    }

    requestAnimationFrame(update);
}

// Update the draw result text
function updateDrawResultText(value) {
    document.getElementById('drawResult').textContent = 'x' + value;
}

// Enable or disable the button
function setButtonState(activeSelf) {
    document.querySelector('.btn-primary').disabled = !activeSelf;
}
