document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (toggleBtn && navLinks) {
        toggleBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const carCards = document.querySelectorAll('.car-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            carCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Modal functionality
    const modal = document.getElementById('testDriveModal');
    const openBtns = document.querySelectorAll('.open-modal');
    const closeBtn = document.getElementById('closeModal');
    const form = document.getElementById('driveForm');
    const confirm = document.getElementById('driveConfirm');

    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (modal) modal.classList.add('active');
        });
    });

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }

    if (form && confirm) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            form.style.display = 'none';
            confirm.style.display = 'block';
        });
    }
});
