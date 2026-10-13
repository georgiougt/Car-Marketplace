// Veloce Auto Exchange - Interactive Logic

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.textContent = navLinks.classList.contains('active') ? 'close' : 'menu';
      }
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileToggle.querySelector('.material-symbols-outlined');
        if (icon) icon.textContent = 'menu';
      });
    });
  }

  // Inventory Filtering (Tabs)
  const tabBtns = document.querySelectorAll('.tab-btn');
  const carCards = document.querySelectorAll('.car-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      carCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Search Console Bar in Hero
  const searchBtn = document.getElementById('searchBtn');
  const makeFilter = document.getElementById('makeFilter');
  const bodyFilter = document.getElementById('bodyFilter');
  const priceFilter = document.getElementById('priceFilter');

  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const selectedMake = makeFilter ? makeFilter.value : 'all';
      const selectedBody = bodyFilter ? bodyFilter.value : 'all';
      const selectedPrice = priceFilter ? priceFilter.value : 'all';

      carCards.forEach(card => {
        const make = card.getAttribute('data-make');
        const body = card.getAttribute('data-category');
        const price = parseInt(card.getAttribute('data-price') || '0', 10);

        let makeMatch = (selectedMake === 'all' || make === selectedMake);
        let bodyMatch = (selectedBody === 'all' || body === selectedBody);
        let priceMatch = true;

        if (selectedPrice === 'under300') {
          priceMatch = price < 300000;
        } else if (selectedPrice === 'over300') {
          priceMatch = price >= 300000;
        }

        if (makeMatch && bodyMatch && priceMatch) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });

      // Smooth scroll to inventory
      const inventorySection = document.getElementById('inventory');
      if (inventorySection) {
        inventorySection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Modal
  const modal = document.getElementById('viewingModal');
  const openBtns = document.querySelectorAll('.open-modal');
  const closeBtn = document.getElementById('closeModal');
  const viewingForm = document.getElementById('viewingForm');
  const carSelect = document.getElementById('carSelect');

  const openModal = (carName = '') => {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (carSelect && carName) {
      for (let i = 0; i < carSelect.options.length; i++) {
        if (carSelect.options[i].text.includes(carName) || carSelect.options[i].value.includes(carName)) {
          carSelect.selectedIndex = i;
          break;
        }
      }
    }
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const car = btn.getAttribute('data-car') || '';
      openModal(car);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  if (viewingForm) {
    viewingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = viewingForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="material-symbols-outlined" style="animation: spin 1s infinite linear;">sync</span>
        Confirming with Concierge...
      `;

      setTimeout(() => {
        viewingForm.innerHTML = `
          <div style="text-align: center; padding: 2rem 1rem;">
            <div style="width: 64px; height: 64px; background: rgba(229, 169, 60, 0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; color: #E5A93C;">
              <span class="material-symbols-outlined" style="font-size: 36px;">task_alt</span>
            </div>
            <h3 style="font-family: var(--font-display); font-size: 1.8rem; color: #FFF; margin-bottom: 0.5rem;">Appointment Reserved</h3>
            <p style="color: #8E95A5; font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">
              Our Private Client Concierge has received your request. An NDA and private showroom access pass will be sent to your phone within 2 hours.
            </p>
            <button type="button" class="btn btn-accent" id="doneModalBtn" style="width: 100%; justify-content: center;">
              Return to Collection
            </button>
          </div>
        `;

        const doneBtn = document.getElementById('doneModalBtn');
        if (doneBtn) doneBtn.addEventListener('click', closeModal);
      }, 900);
    });
  }
});
