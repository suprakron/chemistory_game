document.getElementById('calendar-icon').addEventListener('click', function() {
    document.getElementById('calendar-popup').style.display = 'block';
});

// Function to close calendar popup
function closeCalendarPopup() {
    document.getElementById('calendar-popup').style.display = 'none';
}