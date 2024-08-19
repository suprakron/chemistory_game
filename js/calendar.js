function toggleDropdown() {
    const dropdown = document.getElementById('calendar-dropdown');

    if (dropdown.style.display === 'block') {
        dropdown.style.opacity = '0';
        dropdown.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            dropdown.style.display = 'none';
        }, 300); // Match the duration of the transition
    } else {
        dropdown.style.display = 'block';
        setTimeout(() => {
            dropdown.style.opacity = '1';
            dropdown.style.transform = 'translateY(0)';
        }, 10); // Slight delay to ensure transition is visible
    }
}

// Close dropdown when clicking outside
window.onclick = function(event) {
    if (!event.target.closest('#calendar-icon') && !event.target.closest('#calendar-dropdown')) {
        const dropdown = document.getElementById('calendar-dropdown');
        if (dropdown.style.display === 'block') {
            dropdown.style.opacity = '0';
            dropdown.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                dropdown.style.display = 'none';
            }, 300);
        }
    }
}
