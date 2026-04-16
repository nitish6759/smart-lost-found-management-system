document.addEventListener('DOMContentLoaded', () => {
    const reportBtn = document.getElementById('reportLostBtn');
    const searchInput = document.getElementById('searchInput');

    // Simple Click Event
    reportBtn.addEventListener('click', () => {
        alert('Redirecting to Report Form...');
        // In a real app, you'd use: window.location.href = '/report.html';
    });

    // Simple Search Filter Simulation
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        console.log('Searching for:', query);
        // You could filter the "Recent Reports" grid here
    });

    // Log for initialization
    console.log("NIT Silchar L&F Frontend Initialized.");
});
