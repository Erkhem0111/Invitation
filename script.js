// Global countdown interval
let countdownInterval = null;

// Screen transition handler
document.addEventListener('DOMContentLoaded', function () {
    const viewInviteBtn = document.getElementById('viewInviteBtn');
    const introScreen = document.getElementById('introScreen');
    const invitationScreen = document.getElementById('invitationScreen');

    viewInviteBtn.addEventListener('click', function () {
        introScreen.classList.remove('active');

        setTimeout(() => {
            invitationScreen.classList.add('active');
            // Start countdown after transition
            startCountdown();
        }, 800);
    });
});

// Countdown Timer
function startCountdown() {
    // ЧУХАЛ: Энд арга хэмжээний огноо цагийг оруулна уу
    // Сар 0-11 хооронд: 0=Январь, 1=Февраль, 2=Март гм
    // Жишээ: 2026-03-15 14:00 = new Date(2026, 2, 15, 14, 0, 0)
    const targetDate = new Date("2026-02-19T00:00:00+08:00");



    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    // Clear any existing interval
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    function updateCountdown() {
        // Одоогийн цаг
        const now = new Date();
        const distance = targetDate - now;

        // Хэрэв арга хэмжээ өнгөрсөн бол
        if (distance < 0) {
            daysElement.textContent = '00';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            if (countdownInterval) {
                clearInterval(countdownInterval);
            }
            return;
        }

        // Цагийг тооцоолох
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Тоог шинэчлэх
        updateWithAnimation(daysElement, formatNumber(days));
        updateWithAnimation(hoursElement, formatNumber(hours));
        updateWithAnimation(minutesElement, formatNumber(minutes));
        updateWithAnimation(secondsElement, formatNumber(seconds));
    }

    function updateWithAnimation(element, newValue) {
        const currentValue = element.textContent;

        if (currentValue !== newValue) {
            // Анимэйшн нэмэх
            element.classList.add('updating');

            setTimeout(() => {
                element.textContent = newValue;
                element.classList.remove('updating');
            }, 150);
        } else {
            // Утга өөрчлөгдөөгүй ч гэсэн харуулах
            element.textContent = newValue;
        }
    }

    function formatNumber(num) {
        return num.toString().padStart(2, '0');
    }

    // Шууд эхлүүлэх
    updateCountdown();

    // 1 секунд тутамд шинэчлэх
    countdownInterval = setInterval(updateCountdown, 1000);
}
