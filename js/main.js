// PillowDreamWorks — Premium Core Interactive Logic
// Shared interactions, accessibility-aware modals, forms, and safety flows.

let userIntakeProfile = null;
let allCatalogAssessments = [];

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initCheckoutModal();
  initAccordion();
  initFileUpload();
  initToolkitCheckout();
  initToolkitSlides();
  initAllModalCloseButtons();

  if (typeof getFullAssessmentCatalog !== 'undefined') {
    allCatalogAssessments = getFullAssessmentCatalog();
    renderAssessmentList(allCatalogAssessments);
    initAssessmentFilters();
  }
});

function initAllModalCloseButtons() {
  // Wire up ALL close buttons (close-modal-btn) across any modal backdrops
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    // Close on backdrop click
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModal(backdrop);
    });
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !backdrop.classList.contains('hidden')) {
        closeModal(backdrop);
      }
    });
    // Wire close buttons inside this backdrop
    backdrop.querySelectorAll('.close-modal-btn, .modal-close').forEach(btn => {
      btn.addEventListener('click', () => closeModal(backdrop));
    });
  });
}


/* ═══════════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════════ */

function initNavigation() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', String(!isExpanded));
      mobileMenu.classList.toggle('open');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
}


/* ═══════════════════════════════════════════════
   SHARED MODAL UTILITIES
   ═══════════════════════════════════════════════ */

let lastFocusedElement = null;

function openModal(modal) {
  if (!modal) return;
  lastFocusedElement = document.activeElement;
  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (focusable) setTimeout(() => focusable.focus(), 30);
  modal.addEventListener('keydown', trapFocusInModal);
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  modal.removeEventListener('keydown', trapFocusInModal);
  if (lastFocusedElement && lastFocusedElement.focus) lastFocusedElement.focus();
}

function trapFocusInModal(event) {
  if (event.key !== 'Tab') return;
  const modal = event.currentTarget;
  const focusables = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (focusables.length === 0) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function initModalEscape(modalSelector) {
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const modal = document.querySelector(modalSelector);
    if (modal && !modal.classList.contains('hidden')) closeModal(modal);
  });
}

function initModalBackdropClick(modalSelector, closeButtonSelector) {
  const modal = document.querySelector(modalSelector);
  if (!modal) return;
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal(modal);
  });
  const closeBtn = modal.querySelector(closeButtonSelector);
  if (closeBtn) closeBtn.addEventListener('click', () => closeModal(modal));
}

/* ═══════════════════════════════════════════════
   BOOK CHECKOUT MODAL
   ═══════════════════════════════════════════════ */

let currentBookFormat = 'ebook';
let currentPrice = 799;
let hasOrderBump = false;
let bookQuantity = 1;

function initCheckoutModal() {
  const modal = document.getElementById('checkout-modal');
  if (!modal) return;
  initModalEscape('#checkout-modal');
  initModalBackdropClick('#checkout-modal', '.close-modal-btn');

  const formatCards = modal.querySelectorAll('.format-card');
  formatCards.forEach(card => {
    card.addEventListener('click', () => {
      formatCards.forEach(c => c.classList.remove('selected-format'));
      card.classList.add('selected-format');
      currentBookFormat = card.getAttribute('data-format');
      currentPrice = parseInt(card.getAttribute('data-price'), 10) || 0;
      updateModalTotal();
    });
  });

  const bumpCheckbox = document.getElementById('order-bump-checkbox');
  if (bumpCheckbox) {
    bumpCheckbox.addEventListener('change', (e) => {
      hasOrderBump = e.target.checked;
      updateModalTotal();
    });
  }
}

function updateQuantity(change) {
  bookQuantity = Math.max(1, bookQuantity + change);
  const qtyDisplay = document.getElementById('modal-qty-val');
  if (qtyDisplay) qtyDisplay.textContent = bookQuantity;
  updateModalTotal();
}

function openCheckoutModal(defaultFormat = 'ebook') {
  const modal = document.getElementById('checkout-modal');
  if (!modal) return;
  openModal(modal);
  const targetCard = modal.querySelector(`.format-card[data-format="${defaultFormat}"]`);
  if (targetCard) targetCard.click();
}

function updateModalTotal() {
  const totalDisplay = document.getElementById('modal-total-price');
  const bumpPrice = hasOrderBump ? 299 : 0;
  const grandTotal = (currentPrice * bookQuantity) + bumpPrice;
  if (totalDisplay) totalDisplay.textContent = `₹${grandTotal.toLocaleString('en-IN')}`;
}

function processCheckout(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const nameEl = form.querySelector('#cust-name');
  const emailEl = form.querySelector('#cust-email');
  const name = nameEl ? nameEl.value.trim() : '';
  const email = emailEl ? emailEl.value.trim() : '';

  if (!name || !email) {
    alert('Please enter your name and email address.');
    return;
  }

  const consentEl = document.getElementById('checkout-privacy-consent');
  if (consentEl && !consentEl.checked) {
    alert('Please confirm the privacy consent before completing your order.');
    return;
  }

  const bumpPrice = hasOrderBump ? 299 : 0;
  const totalAmount = (currentPrice * bookQuantity) + bumpPrice;
  window.location.href = `thankyou.html?format=${currentBookFormat}&qty=${bookQuantity}&price=${totalAmount}&bump=${hasOrderBump ? 'yes' : 'no'}&cust=${encodeURIComponent(name)}`;
}

/* ═══════════════════════════════════════════════
   ASSESSMENT INTAKE
   ═══════════════════════════════════════════════ */

function saveIntakeProfile(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const name = form.querySelector('#intake-name')?.value.trim() || '';
  const email = form.querySelector('#intake-email')?.value.trim() || '';
  const age = form.querySelector('#intake-age')?.value.trim() || '';
  const gender = form.querySelector('#intake-gender')?.value || '';
  const consentEl = document.getElementById('intake-privacy-consent');
  if (!name || !email || !age) return;
  if (consentEl && !consentEl.checked) {
    alert('Please confirm the assessment privacy consent before continuing.');
    return;
  }

  userIntakeProfile = { name, email, age, gender };
  const gate = document.getElementById('intake-gate-container');
  const suite = document.getElementById('assessment-suite-container');
  if (gate && suite) {
    gate.classList.add('hidden');
    suite.classList.remove('hidden');
    const greeting = document.getElementById('active-user-greeting');
    if (greeting) greeting.textContent = `Welcome, ${name}. Explore your assessments below.`;
  }
}

function resetIntake() {
  userIntakeProfile = null;
  const gate = document.getElementById('intake-gate-container');
  const suite = document.getElementById('assessment-suite-container');
  if (gate && suite) {
    gate.classList.remove('hidden');
    suite.classList.add('hidden');
  }
}

/* ═══════════════════════════════════════════════
   ASSESSMENT CARD RENDERING & FILTERS
   ═══════════════════════════════════════════════ */

function renderAssessmentList(list) {
  const container = document.getElementById('assessment-list-container');
  const countDisplay = document.getElementById('assessment-count-display');
  if (!container) return;

  if (countDisplay) {
    const freeCount = list.filter(item => !item.isPaid).length;
    const paidCount = list.filter(item => item.isPaid).length;
    countDisplay.textContent = `${list.length} assessments found — ${freeCount} free, ${paidCount} practitioner sessions`;
  }

  if (list.length === 0) {
    container.innerHTML = `
      <div class="p-10 text-center text-gray-400 bg-white rounded-2xl border col-span-2">
        <p class="text-lg font-semibold text-gray-500 mb-1">No results found</p>
        <p class="text-sm">Try different keywords like "anxiety", "personality", or "depression".</p>
      </div>`;
    return;
  }

  let html = '';
  list.forEach(item => {
    if (item.isPaid) {
      let includesList = '';
      if (item.includes && Array.isArray(item.includes)) {
        includesList = item.includes.map(inc =>
          `<li class="flex items-start gap-1.5"><svg class="w-3 h-3 text-gold-600 shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg><span>${escapeHtml(inc)}</span></li>`
        ).join('');
      }
      html += `
        <div class="bg-white p-6 rounded-2xl border border-gold-200 shadow-sm premium-card-hover flex flex-col justify-between space-y-4 relative overflow-hidden">
          <div class="absolute top-0 right-0 paid-badge text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl">BOOK SESSION</div>
          <div>
            <div class="text-[11px] font-semibold text-navy-500 uppercase tracking-wider mb-1">${escapeHtml(item.breadcrumb)}</div>
            <h3 class="text-lg font-bold text-navy-900 pr-20">${escapeHtml(item.title)}</h3>
            <p class="text-xs text-gray-500 mt-1 leading-relaxed">${escapeHtml(item.description)}</p>
            <div class="mt-3 flex items-center gap-3">
              <span class="text-xl font-extrabold text-navy-900">₹${item.priceINR.toLocaleString('en-IN')}</span>
              <span class="text-xs text-gray-400">($${item.priceUSD})</span>
            </div>
            <p class="text-xs text-gray-400 mt-0.5">⏱ ${escapeHtml(item.duration)}</p>
            ${includesList ? `<ul class="mt-3 text-xs text-gray-600 space-y-1 bg-navy-50 p-3 rounded-xl border border-navy-100">${includesList}</ul>` : ''}
          </div>
          <button data-book-id="${item.id}" class="w-full py-3 bg-navy hover:bg-navy-900 text-white font-bold rounded-xl text-xs shadow-md transition-all">Book Session with Manish Garg →</button>
        </div>`;
    } else {
      html += `
        <div class="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm premium-card-hover flex flex-col justify-between space-y-4 relative overflow-hidden">
          <div class="absolute top-0 right-0 free-badge text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl">FREE</div>
          <div>
            <div class="text-[11px] font-semibold text-navy-500 uppercase tracking-wider mb-1">${escapeHtml(item.breadcrumb)}</div>
            <h3 class="text-lg font-bold text-navy-900 pr-12">${escapeHtml(item.title)}</h3>
            <p class="text-xs text-gray-500 mt-1 leading-relaxed">${escapeHtml(item.description)}</p>
            <div class="mt-3 flex flex-wrap gap-2 text-[11px]">
              <span class="px-2.5 py-1 bg-navy-50 text-navy-700 rounded-lg font-medium border border-navy-100">${escapeHtml(item.whoCanTake)}</span>
              <span class="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg font-medium border border-emerald-100">${item.questions.length} Questions</span>
            </div>
          </div>
          <button data-assess-id="${item.id}" class="w-full py-3 bg-navy-800 hover:bg-navy-900 text-white font-bold rounded-xl text-xs shadow-md transition-all">Take Free Assessment →</button>
        </div>`;
    }
  });

  container.innerHTML = html;

  container.querySelectorAll('[data-book-id]').forEach(btn => {
    btn.addEventListener('click', () => openBatteryBookingModal(btn.dataset.bookId));
  });
  container.querySelectorAll('[data-assess-id]').forEach(btn => {
    btn.addEventListener('click', () => launchAssessmentModal(btn.dataset.assessId));
  });

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

let currentTypeFilter = 'all';

function setTypeFilter(type) {
  currentTypeFilter = type;
  const tabs = ['all', 'free', 'paid'];
  tabs.forEach(t => {
    const btn = document.getElementById(`tab-filter-${t}`);
    if (!btn) return;
    if (t === type) {
      btn.className = 'px-3.5 py-1.5 rounded-lg text-xs font-bold bg-navy-900 text-white transition-all shadow-xs';
    } else {
      btn.className = 'px-3.5 py-1.5 rounded-lg text-xs font-semibold text-gray-600 hover:text-navy-900 transition-all';
    }
  });
  applyAssessmentFilters();
}

function applyAssessmentFilters() {
  const searchInput = document.getElementById('assessment-search-input');
  const domainSelect = document.getElementById('assessment-domain-select');
  const q = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const domain = domainSelect ? domainSelect.value : '';

  const filtered = allCatalogAssessments.filter(item => {
    const matchQ = !q ||
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.domain.toLowerCase().includes(q) ||
      (item.breadcrumb || '').toLowerCase().includes(q);
    const matchDomain = !domain || item.domain === domain;
    let matchType = true;
    if (currentTypeFilter === 'free') matchType = !item.isPaid;
    if (currentTypeFilter === 'paid') matchType = !!item.isPaid;
    return matchQ && matchDomain && matchType;
  });

  renderAssessmentList(filtered);
}

function initAssessmentFilters() {
  const searchInput = document.getElementById('assessment-search-input');
  const domainSelect = document.getElementById('assessment-domain-select');
  if (searchInput) searchInput.addEventListener('input', applyAssessmentFilters);
  if (domainSelect) domainSelect.addEventListener('change', applyAssessmentFilters);
}

/* ═══════════════════════════════════════════════
   ASSESSMENT MODAL (FREE) & BOOKING MODAL (PAID)
   ═══════════════════════════════════════════════ */

function launchAssessmentModal(testId) {
  const item = allCatalogAssessments.find(a => a.id === testId);
  if (!item || item.isPaid) return;
  const modal = document.getElementById('active-assessment-modal');
  const modalContent = document.getElementById('active-assessment-modal-content');
  if (!modal || !modalContent) return;

  let optionsHtml = '';
  item.questions.forEach((q, idx) => {
    let choices = '';
    item.options.forEach((opt, optIdx) => {
      choices += `
        <label class="p-2.5 bg-gray-50 rounded-lg border border-gray-200 text-center cursor-pointer hover:bg-navy-50 hover:border-navy-300 text-xs transition-colors">
          <input type="radio" name="q_${idx}" value="${optIdx}" required class="mr-1 accent-navy-700"> ${escapeHtml(opt)}
        </label>`;
    });
    optionsHtml += `
      <div class="space-y-2">
        <label class="block font-semibold text-navy-800 text-xs sm:text-sm">${idx + 1}. ${escapeHtml(q)}</label>
        <div class="grid grid-cols-${item.options.length <= 4 ? item.options.length : 4} gap-2">${choices}</div>
      </div>`;
  });

  modalContent.innerHTML = `
    <div class="border-b pb-4 mb-5">
      <div class="text-[11px] font-bold text-navy-500 uppercase tracking-wider">${escapeHtml(item.breadcrumb)}</div>
      <h3 class="text-xl sm:text-2xl font-bold text-navy-900 mt-1">${escapeHtml(item.title)}</h3>
      <p class="text-xs text-gray-500 mt-1">${escapeHtml(item.whoCanTake)} · Self-Administered · Free</p>
    </div>
    <form onsubmit="submitAssessmentResults(event, '${item.id}')" class="space-y-5">${optionsHtml}</form>
    <div id="active-test-results-output"></div>`;

  const firstForm = modalContent.querySelector('form');
  if (firstForm) firstForm.addEventListener('submit', (event) => submitAssessmentResults(event, item.id));

  openModal(modal);
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function submitAssessmentResults(event, testId) {
  event.preventDefault();
  const item = allCatalogAssessments.find(a => a.id === testId);
  const output = document.getElementById('active-test-results-output');
  if (!item || !output) return;

  const form = event.currentTarget;
  const formData = new FormData(form);
  let scores = [];
  for (const pair of formData.entries()) scores.push(parseInt(pair[1], 10));
  if (scores.length < item.questions.length) {
    alert('Please answer all questions to generate your results.');
    return;
  }

  const result = item.scoring(scores);
  const userName = userIntakeProfile ? userIntakeProfile.name : 'Valued Visitor';

  output.innerHTML = `
    <div class="p-6 bg-white rounded-2xl border-2 border-navy-200 shadow-xl mt-6 space-y-4 animate-slideUp" aria-live="polite">
      <div class="flex items-center justify-between border-b pb-3">
        <div>
          <span class="text-[11px] text-gray-400 font-semibold block">${escapeHtml(item.breadcrumb)}</span>
          <h4 class="text-lg font-bold text-navy-900">Results for ${escapeHtml(userName)}</h4>
        </div>
        <span class="px-3 py-1.5 rounded-full text-xs font-bold ${result.badge}">${escapeHtml(result.level)}</span>
      </div>
      <div class="p-4 bg-navy-50 rounded-xl text-sm text-navy-900 font-semibold">Score: ${result.score} / ${result.maxScore}</div>
      <div class="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-2">
        <h5 class="font-bold flex items-center gap-1.5"><svg class="w-4 h-4 text-amber-600" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg> Important Note</h5>
        <p class="leading-relaxed">This is an educational screening tool and does not constitute a formal diagnosis. For professional evaluation and personalised guidance, consider booking a session with <strong>Manish Garg</strong>.</p>
      </div>
      <div class="pt-2 flex flex-col sm:flex-row items-center gap-3">
        <a href="index.html#services" class="w-full sm:w-auto px-6 py-3 bg-navy hover:bg-navy-900 text-white font-bold rounded-xl text-xs text-center shadow-md transition-all">Book Counselling Session (₹1,499)</a>
        <a href="index.html#services" class="w-full sm:w-auto px-5 py-3 bg-crisis hover:bg-red-700 text-white font-bold rounded-xl text-xs text-center shadow-md transition-all">Crisis Support (₹399)</a>
      </div>
    </div>`;
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function closeActiveAssessmentModal() {
  const modal = document.getElementById('active-assessment-modal');
  if (modal) closeModal(modal);
}

function openBatteryBookingModal(testId) {
  const item = allCatalogAssessments.find(a => a.id === testId);
  if (!item || !item.isPaid) return;
  const modal = document.getElementById('battery-booking-modal');
  if (!modal) return;
  openModal(modal);

  const idField = document.getElementById('booking-battery-id');
  const categoryEl = document.getElementById('booking-battery-category');
  const titleEl = document.getElementById('booking-battery-title');
  const priceEl = document.getElementById('booking-battery-price');
  if (idField) idField.value = item.id;
  if (categoryEl) categoryEl.textContent = `${item.domain} — ${item.category || 'Diagnostic'}`;
  if (titleEl) titleEl.textContent = item.title;
  if (priceEl) priceEl.textContent = `₹${item.priceINR.toLocaleString('en-IN')} ($${item.priceUSD}) · ${item.duration}`;

  if (userIntakeProfile) {
    const nameField = document.getElementById('b-cust-name');
    const emailField = document.getElementById('b-cust-email');
    if (nameField) nameField.value = userIntakeProfile.name || '';
    if (emailField) emailField.value = userIntakeProfile.email || '';
  }
}

function closeBatteryBookingModal() {
  const modal = document.getElementById('battery-booking-modal');
  if (modal) closeModal(modal);
}

function submitBatteryBooking(event) {
  event.preventDefault();
  const batteryId = document.getElementById('booking-battery-id')?.value || '';
  const name = document.getElementById('b-cust-name')?.value.trim() || '';
  const phone = document.getElementById('b-cust-phone')?.value.trim() || '';
  const date = document.getElementById('b-preferred-date')?.value || '';
  const consentEl = document.getElementById('battery-booking-consent');
  if (!name || !phone || !date) {
    alert('Please complete all required booking fields.');
    return;
  }
  if (consentEl && !consentEl.checked) {
    alert('Please confirm the privacy consent before booking the assessment.');
    return;
  }
  const item = allCatalogAssessments.find(a => a.id === batteryId);
  const title = item ? item.title : 'Diagnostic Session';
  const price = item ? item.priceINR : 2999;
  alert(`Thank you, ${name}!\n\nYour booking request for "${title}" (₹${price.toLocaleString('en-IN')}) on ${new Date(date).toLocaleString()} has been received.\n\nManish Garg's team will contact you at ${phone} to confirm the session.`);
  closeBatteryBookingModal();
}

/* ═══════════════════════════════════════════════
   FILE UPLOAD & ACCORDION
   ═══════════════════════════════════════════════ */

function initFileUpload() {
  const fileInput = document.getElementById('handwriting-file-input');
  const fileNameDisplay = document.getElementById('file-name-display');
  if (fileInput && fileNameDisplay) {
    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        const file = e.target.files[0];
        fileNameDisplay.textContent = `Selected: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
        fileNameDisplay.classList.remove('hidden');
      }
    });
  }
}

function initAccordion() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const icon = header.querySelector('.accordion-icon');
      if (!content) return;
      content.classList.toggle('hidden');
      if (icon) icon.classList.toggle('rotate-180');
    });
  });
}

/* ═══════════════════════════════════════════════
   TOOLKIT WORKBOOK INTERACTIONS
   ═══════════════════════════════════════════════ */

const TOOLKIT_SKU_DEFAULTS = {
  tier_1: { title: 'Standard Edition (PDF + 5 Audio Guides)', inr: '₹999', usd: '$127' },
  tier_2: { title: 'Complete Growth Edition (All 11 Modules)', inr: '₹1,499', usd: '$197' },
  tier_3: { title: 'Mastery Edition (Workbook + 1-on-1 Consultation)', inr: '₹2,499', usd: '$297' },
  grapho_pack: { title: 'Toolkit + Graphotherapy Analysis Pack', inr: '₹1,199', usd: '$15' },
  bundle_a: { title: 'Bundle A: Toolkit + 1-on-1 Counselling', inr: '₹2,199', usd: '$279' },
  bundle_b: { title: 'Bundle B: Toolkit + Full Graphotherapy', inr: '₹1,899', usd: '$249' },
  bundle_c: { title: 'Bundle C: Complete Foundation Trio', inr: '₹3,499', usd: '$449' }
};

function initToolkitCheckout() {
  const modal = document.getElementById('toolkit-checkout-modal');
  if (!modal) return;
  initModalEscape('#toolkit-checkout-modal');
  initModalBackdropClick('#toolkit-checkout-modal', '[onclick*="closeToolkitCheckout"]');
}

function openToolkitCheckout(sku) {
  const modal = document.getElementById('toolkit-checkout-modal');
  if (!modal) return;
  const skuDict = typeof SKU_NAMES !== 'undefined' ? SKU_NAMES : TOOLKIT_SKU_DEFAULTS;
  const item = skuDict[sku] || skuDict['tier_2'];
  const currency = typeof currentCurrency !== 'undefined' ? currentCurrency : 'INR';
  const price = currency === 'INR' ? item.inr : item.usd;
  const skuEl = document.getElementById('tk-selected-sku');
  const titleEl = document.getElementById('tk-modal-title');
  const priceEl = document.getElementById('tk-modal-price');
  const sumItemEl = document.getElementById('tk-summary-item');
  const sumAmtEl = document.getElementById('tk-summary-amount');
  if (skuEl) skuEl.value = sku;
  if (titleEl) titleEl.textContent = item.title;
  if (priceEl) priceEl.textContent = `Total: ${price} (${currency})`;
  if (sumItemEl) sumItemEl.textContent = item.title;
  if (sumAmtEl) sumAmtEl.textContent = price;
  openModal(modal);
}

function closeToolkitCheckout() {
  const modal = document.getElementById('toolkit-checkout-modal');
  if (modal) closeModal(modal);
}

function processToolkitOrder(event) {
  event.preventDefault();
  const sku = document.getElementById('tk-selected-sku')?.value || '';
  const name = document.getElementById('tk-cust-name')?.value.trim() || '';
  const email = document.getElementById('tk-cust-email')?.value.trim() || '';
  const phone = document.getElementById('tk-cust-phone')?.value.trim() || '';
  const consentEl = document.getElementById('toolkit-privacy-consent');
  if (!name || !email || !phone) {
    alert('Please complete all fields.');
    return;
  }
  if (consentEl && !consentEl.checked) {
    alert('Please confirm the privacy consent before placing the order.');
    return;
  }
  const skuDict = typeof SKU_NAMES !== 'undefined' ? SKU_NAMES : TOOLKIT_SKU_DEFAULTS;
  const item = skuDict[sku] || skuDict['tier_2'];
  const currency = typeof currentCurrency !== 'undefined' ? currentCurrency : 'INR';
  const price = currency === 'INR' ? item.inr : item.usd;
  alert(`Thank you, ${name}!\n\nYour order for "${item.title}" (${price}) has been received.\nInstant digital workbook download access has been sent to: ${email}.\nOur consultation coordinator will reach out to ${phone}.`);
  closeToolkitCheckout();
}

/* ═══════════════════════════════════════════════
   CONTACT FORM & COURSE ENQUIRY
   ═══════════════════════════════════════════════ */

function submitContactForm(event) {
  event.preventDefault();
  const form = event.currentTarget || document.getElementById('contact-form');
  if (!form) return;
  const name = form.querySelector('#contact-name')?.value.trim() || '';
  const email = form.querySelector('#contact-email')?.value.trim() || '';
  const service = form.querySelector('#contact-service')?.value || 'general';
  const consentEl = document.getElementById('contact-privacy-consent');

  if (!name || !email) {
    alert('Please enter your name and email address.');
    return;
  }

  if (consentEl && !consentEl.checked) {
    alert('Please confirm the privacy consent before sending your message.');
    return;
  }

  const successEl = document.getElementById('contact-success');
  if (successEl) {
    successEl.classList.remove('hidden');
    successEl.classList.add('visible');
    successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  alert(`Thank you, ${name}! Your inquiry regarding ${service || 'our services'} has been received.\n\nManish Garg will respond to ${email} within 12 hours.`);
  form.reset();
}

function openEnquiryModal(serviceId) {
  const serviceSelect = document.getElementById('contact-service');
  const messageInput = document.getElementById('contact-msg');
  const contactSection = document.getElementById('contact');

  if (serviceSelect) {
    if (serviceId.includes('course') || serviceId === 'courses') {
      serviceSelect.value = 'courses';
    } else if (serviceId.includes('crisis')) {
      serviceSelect.value = 'crisis';
    } else if (serviceId.includes('grapho')) {
      serviceSelect.value = 'graphology';
    } else if (serviceId.includes('counselling')) {
      serviceSelect.value = 'counselling';
    } else if (serviceId.includes('book')) {
      serviceSelect.value = 'book';
    }
  }

  const courseNames = {
    'course-crisis': 'Crisis Counselling Masterclass (₹999)',
    'course-cognitive': 'Cognitive Counselling Essentials (₹999)',
    'course-bundle': 'PsychSnaps Complete Course Bundle (₹1,499)'
  };

  if (messageInput && courseNames[serviceId]) {
    messageInput.value = `I am interested in enrolling in the ${courseNames[serviceId]}. Please send enrollment and access details.`;
  }

  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
    const nameInput = document.getElementById('contact-name');
    if (nameInput) setTimeout(() => nameInput.focus(), 500);
  }
}


/* ═══════════════════════════════════════════════
   SLIDE VIEWER & PREVIEW
   ═══════════════════════════════════════════════ */

let currentSlide = 0;
let slides = [];
const slideTitles = [
  'Page 1: Workbook Cover', 'Page 16: Emotion Wheel Worksheet', 'Page 17: Daily Feelings Tracker',
  'Page 18: Trigger to Response Planner', 'Page 31: Thought Record Worksheet', 'Page 47: Anxiety Intensity Tracker',
  'Page 49: Coping Strategy Planner', 'Page 62: Boundary Script Worksheet', 'Page 64: Support Circle Map',
  'Page 71: SMART Goal Framework', 'Page 78: 30-Day Purpose Review'
];

function initToolkitSlides() {
  slides = document.querySelectorAll('.slide-item');
  const dotsContainer = document.getElementById('slide-dots');
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = `w-2.5 h-2.5 rounded-full transition-all ${i === 0 ? 'bg-navy-900 w-6' : 'bg-gray-300 hover:bg-gray-400'}`;
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }
  updateSlideState();
}

function updateSlideState() {
  slides.forEach((slide, idx) => {
    slide.classList.toggle('active', idx === currentSlide);
  });
  const info = document.getElementById('slide-info-display');
  if (info) info.textContent = `Page ${currentSlide + 1} of ${slides.length} • ${slideTitles[currentSlide] || ''}`;

  const dots = document.querySelectorAll('#slide-dots button');
  dots.forEach((dot, idx) => {
    dot.className = `w-2.5 h-2.5 rounded-full transition-all ${idx === currentSlide ? 'bg-navy-900 w-6' : 'bg-gray-300 hover:bg-gray-400'}`;
  });

  const tabs = document.querySelectorAll('.preview-tab');
  tabs.forEach(t => {
    if (parseInt(t.getAttribute('data-index'), 10) === currentSlide) {
      t.className = 'preview-tab px-3.5 py-1.5 rounded-full text-xs font-bold transition-all bg-navy-900 text-white';
    } else {
      t.className = 'preview-tab px-3.5 py-1.5 rounded-full text-xs font-semibold text-gray-600 hover:text-navy-900 bg-gray-100 transition-all';
    }
  });
}

function goToSlide(index) {
  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;
  currentSlide = index;
  updateSlideState();
}

function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }

function scrollToPreview() {
  const section = document.getElementById('preview-gallery');
  if (section) section.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
}

function openLightbox() {
  const modal = document.getElementById('preview-lightbox-modal');
  const target = document.getElementById('lightbox-content-target');
  if (!modal || !target) return;
  const activeSlide = slides[currentSlide];
  if (activeSlide) {
    target.innerHTML = activeSlide.outerHTML;
    target.querySelector('.slide-item').classList.add('active');
  }
  openModal(modal);
}

function closeLightbox() {
  const modal = document.getElementById('preview-lightbox-modal');
  if (modal) closeModal(modal);
}

/* ═══════════════════════════════════════════════
   BOOK PREVIEW & POLICY MODALS
   ═══════════════════════════════════════════════ */

function openBookPreview() {
  const modal = document.getElementById('book-preview-modal');
  if (modal) openModal(modal);
}
function closeBookPreview() {
  const modal = document.getElementById('book-preview-modal');
  if (modal) closeModal(modal);
}
function openPolicyModal(id) {
  const modal = document.getElementById(id);
  if (modal) openModal(modal);
}
function closePolicyModal(id) {
  const modal = document.getElementById(id);
  if (modal) closeModal(modal);
}

/* ═══════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════ */

function escapeHtml(text) {
  if (text == null) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
