document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const minutesElem = document.getElementById('minutes');
    const secondsElem = document.getElementById('seconds');
    const millisecondsElem = document.getElementById('milliseconds');
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const lapBtn = document.getElementById('lapBtn');
    const lapsList = document.getElementById('lapsList');

    // Stopwatch state
    let minutes = 0;
    let seconds = 0;
    let milliseconds = 0;
    let interval;
    let lapCounter = 1;
    let isRunning = false;

    // Event Listeners
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
    lapBtn.addEventListener('click', recordLap);

    // Helper function to format numbers with leading zeros
    function formatTime(num) {
        return num.toString().padStart(2, '0');
    }

    // Main timer function
    function runTimer() {
        milliseconds++;
        if (milliseconds === 100) {
            milliseconds = 0;
            seconds++;
        }
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        updateDisplay();
    }

    // Update the timer display on the page
    function updateDisplay() {
        minutesElem.textContent = formatTime(minutes);
        secondsElem.textContent = formatTime(seconds);
        millisecondsElem.textContent = formatTime(milliseconds);
    }

    // Start the stopwatch
    function startTimer() {
        if (!isRunning) {
            interval = setInterval(runTimer, 10);
            isRunning = true;
            
            // Update button visibility
            startBtn.style.display = 'none';
            pauseBtn.style.display = 'inline-flex';
            lapBtn.disabled = false;
        }
    }

    // Pause the stopwatch
    function pauseTimer() {
        if (isRunning) {
            clearInterval(interval);
            isRunning = false;

            // Update button visibility
            startBtn.style.display = 'inline-flex';
            pauseBtn.style.display = 'none';
        }
    }

    // Reset the stopwatch
    function resetTimer() {
        clearInterval(interval);
        isRunning = false;

        // Reset time variables
        minutes = 0;
        seconds = 0;
        milliseconds = 0;

        // Reset display and laps
        updateDisplay();
        lapsList.innerHTML = '';
        lapCounter = 1;

        // Reset button states
        startBtn.style.display = 'inline-flex';
        pauseBtn.style.display = 'none';
        lapBtn.disabled = true;
    }

    // Record a lap time
    function recordLap() {
        if (isRunning) {
            const lapTime = `${formatTime(minutes)}:${formatTime(seconds)},${formatTime(milliseconds)}`;
            
            const li = document.createElement('li');
            li.innerHTML = `
                <span>Lap ${lapCounter}</span>
                <span>${lapTime}</span>
            `;
            lapsList.prepend(li); // Add new laps to the top
            lapCounter++;
        }
    }

    // Initial state
    lapBtn.disabled = true;
});
