// PillowDreamWorks — Premium Core Interactive Logic
// Shared interactions, accessibility-aware modals, forms, and safety flows.

let userIntakeProfile = null;
let allCatalogAssessments = [];
const ASSESSMENT_USER_ID_KEY = 'pillowdreamworks_assessment_user_id';
const ASSESSMENT_PROFILE_KEY = 'pillowdreamworks_assessment_profile';

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

  const storedUserId = window.localStorage ? window.localStorage.getItem(ASSESSMENT_USER_ID_KEY) : '';
  const userId = storedUserId || (window.crypto && typeof window.crypto.randomUUID === 'function'
    ? window.crypto.randomUUID()
    : `assessment-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`);
  if (!storedUserId && window.localStorage) {
    window.localStorage.setItem(ASSESSMENT_USER_ID_KEY, userId);
  }
  userIntakeProfile = { userId, name, email, age, gender, consent: true };
  if (window.localStorage) {
    window.localStorage.setItem(ASSESSMENT_PROFILE_KEY, JSON.stringify(userIntakeProfile));
  }
  saveAssessmentProfileToGoogleSheets(userIntakeProfile);
  const gate = document.getElementById('intake-gate-container');
  const suite = document.getElementById('assessment-suite-container');
  if (gate && suite) {
    gate.classList.add('hidden');
    suite.classList.remove('hidden');
    const greeting = document.getElementById('active-user-greeting');
    if (greeting) greeting.textContent = `Welcome, ${name}. Explore your assessments below.`;
  }

}

function getCurrentAssessmentProfile() {
  if (userIntakeProfile) return userIntakeProfile;
  if (!window.localStorage) return null;
  try {
    const storedProfile = JSON.parse(window.localStorage.getItem(ASSESSMENT_PROFILE_KEY) || 'null');
    return storedProfile && storedProfile.consent === true ? storedProfile : null;
  } catch (error) {
    console.warn('Stored assessment profile could not be read:', error.message || error);
    return null;
  }
}

function getAssessmentSheetsEndpoint() {
  return window.GOOGLE_SHEETS_WEB_APP_URL ||
    window.GOOGLE_SHEETS_ENDPOINT ||
    window.GOOGLE_APPS_SCRIPT_URL ||
    '';
}

function saveAssessmentProfileToGoogleSheets(profile) {
  const endpoint = getAssessmentSheetsEndpoint();
  if (!endpoint) {
    console.warn('Assessment profile save skipped: no Google Sheets endpoint configured.');
    return;
  }

  fetch(endpoint, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({
      action: 'save_profile',
      userId: profile.userId,
      name: profile.name,
      age: profile.age,
      gender: profile.gender,
      email: profile.email,
      consent: true
    })
  }).then((response) => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
  }).catch((error) => {
    console.warn('Assessment profile save failed; continuing without Sheets sync:', error.message || error);
  });
}

function resetIntake() {
  userIntakeProfile = null;
  if (window.localStorage) {
    window.localStorage.removeItem(ASSESSMENT_USER_ID_KEY);
    window.localStorage.removeItem(ASSESSMENT_PROFILE_KEY);
  }
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
    <form onsubmit="submitAssessmentResults(event, '${item.id}')" class="space-y-5">
      ${optionsHtml}
      <button type="submit" class="w-full py-3.5 bg-navy hover:bg-navy-900 text-white font-bold rounded-xl shadow-md text-sm transition-all">
        Submit Assessment →
      </button>
    </form>
    <div id="active-test-results-output"></div>`;

  openModal(modal);
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function safeNumber(value, fallback = 0) {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : fallback;
}

function calculatePercentage(score, maxScore) {
  const parsedScore = safeNumber(score, 0);
  const parsedMax = safeNumber(maxScore, 0);
  if (!parsedMax) return 0;
  const pct = (parsedScore / parsedMax) * 100;
  return Number.isFinite(pct) ? pct : 0;
}

function buildScoreRingSVG(score, maxScore, percentage) {
  const safeScore = Math.max(0, safeNumber(score, 0));
  const safeMax = Math.max(1, safeNumber(maxScore, 1));
  const safePct = Number.isFinite(percentage) ? Math.max(0, Math.min(100, percentage)) : 0;
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (safePct / 100) * circumference;

  return `
    <div class="relative h-40 w-40">
      <svg viewBox="0 0 140 140" class="h-full w-full -rotate-90" role="img" aria-label="Score visualization showing ${safeScore} out of ${safeMax}">
        <circle cx="70" cy="70" r="52" stroke="#e5e7eb" stroke-width="12" fill="none"></circle>
        <circle cx="70" cy="70" r="52" stroke="#102a43" stroke-width="12" fill="none" stroke-linecap="round" stroke-dasharray="${circumference}" stroke-dashoffset="${dashOffset}" class="transition-all duration-300"></circle>
      </svg>
      <div class="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span class="text-[10px] font-semibold uppercase tracking-[0.2em] text-navy-500">Score</span>
        <span class="text-xl font-bold text-navy-900">${safeScore}</span>
        <span class="text-[11px] text-gray-500">/ ${safeMax}</span>
      </div>
    </div>`;
}

function formatAssessmentPercentage(value) {
  if (!Number.isFinite(value)) return '0.0%';
  return `${Math.max(0, Math.min(100, value)).toFixed(1)}%`;
}

function buildMeasureRows(item, result, score, maxScore, percentage) {
  const rows = [];
  const level = result && result.level ? String(result.level) : 'Current range';
  const sourceFactors = Array.isArray(result?.factors) && result.factors.length > 0
    ? result.factors
    : (Array.isArray(item?.factors) ? item.factors : []);

  if (sourceFactors.length > 0) {
    sourceFactors.forEach((factor) => {
      const factorScore = safeNumber(factor.score, 0);
      const factorMax = safeNumber(factor.maxScore, factorScore || 1);
      const factorPct = calculatePercentage(factorScore, factorMax);
      rows.push({
        measure: factor.label || factor.name || 'Factor',
        score: factorScore,
        maxScore: factorMax,
        percentage: factorPct,
        level: factor.level || level,
        meaning: factor.meaning || 'This factor reflects the pattern reported in this assessment.'
      });
    });
    return rows;
  }

  rows.push({
    measure: item?.title || 'Overall score',
    score,
    maxScore,
    percentage,
    level,
    meaning: item?.description ? item.description : 'This score reflects the pattern captured in this assessment.'
  });

  return rows;
}

function buildAssessmentInterpretation(item, result, percentage) {
  const score = safeNumber(result.score, 0);
  const maxScore = safeNumber(result.maxScore, 0) || 1;
  const levelLabel = result.level ? String(result.level) : 'Current range';
  const safePercentage = Number.isFinite(percentage) ? percentage : calculatePercentage(score, maxScore);
  const normalisedSummary = `${score} out of ${maxScore}`;
  const domainText = item?.domain ? item.domain.toLowerCase() : 'assessment';
  const lowerText = /low|minimal|normal|clear|not elevated|lower/.test(String(levelLabel).toLowerCase()) ? 'lower' : /moderate|mild|mixed|borderline/.test(String(levelLabel).toLowerCase()) ? 'moderate' : 'higher';
  const assessmentSentence = item?.description ? item.description.replace(/\s+/g, ' ').trim() : 'This assessment explores the pattern described in the respondent’s answers.';
  const sourceFactors = Array.isArray(result?.factors) ? result.factors : [];
  const rows = buildMeasureRows(item, result, score, maxScore, safePercentage);

  if (sourceFactors.length > 1) {
    const orderedFactors = [...sourceFactors].sort((a, b) => safeNumber(b.percentage) - safeNumber(a.percentage));
    const strongest = orderedFactors[0];
    const lowest = orderedFactors[orderedFactors.length - 1];
    const middle = orderedFactors.slice(1, -1);
    const factorSummary = sourceFactors.map((factor) => `${factor.name} is ${safeNumber(factor.score)} out of ${safeNumber(factor.maxScore) || 1} (${formatAssessmentPercentage(safeNumber(factor.percentage))}, ${factor.level || 'current range'})`).join('; ');
    const middleText = middle.length > 0 ? middle.map((factor) => `${factor.name} at ${factor.level || 'the current range'}`).join(', ') : 'the remaining factors';
    const profile = `The factor pattern is ${factorSummary}. Relative strength is ${strongest.name}, while ${lowest.name} is comparatively lower; ${middleText} sits between those points. This profile describes the current response pattern and should not be reduced to a single personality total.`;
    const discussion = [
      `${strongest.name} is the relatively strongest factor at ${safeNumber(strongest.score)} out of ${safeNumber(strongest.maxScore) || 1}, which may be a useful resource in the situations covered by this assessment.`,
      `${lowest.name} is the relatively lower factor at ${safeNumber(lowest.score)} out of ${safeNumber(lowest.maxScore) || 1}, so it may deserve closer contextual exploration rather than a fixed label.`,
      `${strongest.name} and ${lowest.name} together create the clearest contrast in this profile.`,
      `That contrast may mean the respondent can draw on ${strongest.name} in some settings while finding situations linked to ${lowest.name} less automatic or more effortful.`,
      `${middleText} should be interpreted as part of the pattern rather than as isolated scores.`,
      `The scores do not establish a diagnosis, and the direction of a factor is meaningful only in relation to the items and the person's context.`,
      `In a live session, ask when the relatively stronger factor is most visible and what conditions help it operate well.`,
      `Also ask whether the relatively lower factor reflects a stable preference, a recent stressor, or the wording and timing of the questions.`,
      `The combination of ${strongest.name} and ${lowest.name} may shape how the respondent approaches relationships, learning, work, or coping, depending on the assessment domain.`,
      `A useful reflection is whether the middle factors support, balance, or sometimes compete with those two more distinct results.`,
      `Practical support should build on the stronger pattern while creating small, specific opportunities to practise the lower pattern when it matters.`,
      `The profile is most useful as a structured starting point for supervision, collaborative reflection, and further assessment when needed.`
    ].join(' ');
    const conclusion = [
      `Overall, ${strongest.name} is the clearest relative strength and ${lowest.name} is the main lower-range point in this profile.`,
      `The other factor results add context and should be considered alongside the respondent’s lived experience.`,
      `This pattern is a reflection aid, not a diagnosis or a standalone description of the person.`,
      `Use it to guide specific discussion about situations, resources, and next steps.`
    ].join(' ');

    return {
      title: `Your factor profile for ${item?.title || 'this assessment'} is ready.`,
      statement: `The individual factor results are shown first. ${profile}`,
      interpretation: `This ${domainText} assessment contains ${sourceFactors.length} separately scored factors. ${profile} Each factor should be read with its score, maximum, percentage, and level rather than inferred from the overall response total.`,
      discussion,
      conclusion,
      note: 'This is an educational screening tool and does not constitute a formal diagnosis. It is intended to support reflective discussion, supervision, and self-understanding rather than to establish a clinical condition.',
      rows,
      overallProfile: profile,
      category: item?.domain || 'Assessment'
    };
  }

  const titleLine = `Your score is ${normalisedSummary} on the ${item?.title || 'assessment'} measure.`;
  const statement = `This falls within the ${levelLabel} range for this ${domainText} assessment, indicating a ${lowerText} level of the reported concern or pattern relative to the current scoring framework.`;

  const interpretationParagraph = [
    `This result is for ${item?.title || 'this assessment'}, a ${domainText} measure designed to explore ${assessmentSentence.toLowerCase()}.`,
    `The response pattern produced a score of ${normalisedSummary}, or ${formatAssessmentPercentage(safePercentage)}, placing it in the ${levelLabel} range within the assessment's current scoring system.`,
    `A score in this range may suggest a comparatively ${lowerText} level of the construct being examined, while also reminding us that this is not a diagnosis and that context matters.`,
    `The practical value of this assessment is to support reflective discussion, identify patterns, and guide further exploration of relevant triggers, routines, and coping strategies.`,
    `In a supervision or counselling context, this result can help frame meaningful questions about recent experiences, emotional patterns, and areas where the person may want additional support or self-observation.`,
    `It is most useful when interpreted alongside the specific items, the respondent's context, and any other information available from the client or supervised practitioner.`
  ].join(' ');

  const discussion = [
    `The strongest pattern in this profile is the ${levelLabel.toLowerCase()} range observed in the overall score.`,
    `This suggests the respondent is reporting a noticeable level of the construct measured by ${item?.title || 'this assessment'}.`,
    `The area to pay attention to is the specific pattern of responses rather than a single number in isolation.`,
    `In day-to-day settings, this may show up as repeated worry, difficulty regulating emotions, changes in attention, or stress in work, learning, or relationships.`,
    `A useful reflection question is how frequently these experiences occur and under what conditions they become more or less prominent.`,
    `When interpreting the result with a client, it is helpful to discuss whether the pattern fits the current context or reflects a broader developmental or situational challenge.`,
    `If one area is comparatively stronger or weaker, that is often more informative than simply asking whether the total score is 'high' or 'low'.`,
    `This discussion should remain educational, cautious, and linked to the assessment's current scoring framework rather than to fixed labels or diagnoses.`
  ].join(' ');

  const conclusion = [
    `Overall, this profile points toward a ${lowerText} pattern within the ${item?.domain || 'assessment'} domain.`,
    `The most relevant strength or area to notice is the response pattern reflected in the current score.`,
    `The main area for reflection is how this pattern appears in daily routines, relationships, or performance.`,
    `This result is best used as a structured discussion prompt and a starting point for supervision, reflection, or further assessment when needed.`
  ].join(' ');

  const note = 'This is an educational screening tool and does not constitute a formal diagnosis. It is intended to support reflective discussion, supervision, and self-understanding rather than to establish a clinical condition.';

  return {
    title: titleLine,
    statement,
    interpretation: interpretationParagraph,
    discussion,
    conclusion,
    note,
    rows,
    overallProfile: `The assessment pattern suggests a ${lowerText} level of the measured construct relative to the assessment's current scoring range, with the result best interpreted as a contextual summary of the responses provided.`,
    category: item?.domain || 'Assessment'
  };
}

async function persistAssessmentResultToGoogleSheets(payload) {
  const endpoint = getAssessmentSheetsEndpoint();
  if (!endpoint) {
    return { ok: false, reason: 'No Google Sheets endpoint configured.' };
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({
      action: 'save_assessment',
      resultId: payload.resultId || '',
      name: payload.name || '',
      userId: payload.userId || '',
      age: payload.age || '',
      gender: payload.gender || '',
      email: payload.email || '',
      assessmentId: payload.assessmentId || '',
      assessmentName: payload.assessmentName || '',
      resultType: payload.resultType || 'single-score',
      score: safeNumber(payload.score, 0),
      maxScore: safeNumber(payload.maxScore, 0),
      percentage: safeNumber(payload.percentage, 0),
      level: payload.level || '',
      interpretation: payload.interpretation || '',
      discussion: payload.discussion || '',
      conclusion: payload.conclusion || '',
      factorResults: Array.isArray(payload.factorResults) ? payload.factorResults : [],
      consent: true
    })
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return { ok: true, response };
}

function showResultSaveNotice(message, type = 'info') {
  const saveNotice = document.getElementById('assessment-save-status');
  if (!saveNotice) return;
  saveNotice.textContent = message;
  saveNotice.className = `mt-3 rounded-xl border px-3 py-2 text-[11px] ${type === 'error' ? 'border-amber-200 bg-amber-50 text-amber-800' : 'border-emerald-200 bg-emerald-50 text-emerald-800'}`;
}

function submitAssessmentResults(event, testId) {
  event.preventDefault();
  const item = allCatalogAssessments.find(a => a.id === testId);
  const output = document.getElementById('active-test-results-output');
  if (!item || !output) return;

  const form = event.currentTarget;
  const formData = new FormData(form);
  const scores = [];
  for (const pair of formData.entries()) {
    const numericValue = Number.parseInt(pair[1], 10);
    if (!Number.isNaN(numericValue)) scores.push(numericValue);
  }

  if (scores.length < item.questions.length) {
    alert('Please answer all questions to generate your results.');
    return;
  }

  const result = item.scoring(scores);
  const score = safeNumber(result.score, 0);
  const maxScore = safeNumber(result.maxScore, 0) || 1;
  const percentage = calculatePercentage(score, maxScore);
  const userName = userIntakeProfile ? userIntakeProfile.name : 'Valued Visitor';
  const interpretation = buildAssessmentInterpretation(item, result, percentage);
  const scoreRingSvg = buildScoreRingSVG(score, maxScore, percentage);
  const isFactorProfile = Array.isArray(result?.factors) && result.factors.length > 1;
  const rowsHtml = interpretation.rows.map((row) => `
    <tr class="border-b border-gray-200 last:border-b-0">
      <td class="px-3 py-2 align-top text-left text-xs font-medium text-navy-800">${escapeHtml(row.measure)}</td>
      <td class="px-3 py-2 align-top text-left text-xs text-gray-700">${safeNumber(row.score, 0)}</td>
      <td class="px-3 py-2 align-top text-left text-xs text-gray-700">${safeNumber(row.maxScore, 0) || 1}</td>
      <td class="px-3 py-2 align-top text-left text-xs text-gray-700">${formatAssessmentPercentage(safeNumber(row.percentage, 0))}</td>
      <td class="px-3 py-2 align-top text-left text-xs"><span class="inline-flex rounded-full bg-navy-100 px-2 py-1 font-semibold text-navy-800">${escapeHtml(row.level || 'Current range')}</span></td>
    </tr>`).join('');
  const factorCardsHtml = isFactorProfile ? interpretation.rows.map((row) => `
    <div class="rounded-2xl border border-gray-200 bg-white p-3">
      <div class="flex items-start justify-between gap-3">
        <div>
          <div class="text-[11px] font-bold uppercase tracking-[0.16em] text-navy-500">${escapeHtml(row.measure)}</div>
          <div class="mt-1 text-lg font-bold text-navy-900">${safeNumber(row.score, 0)} / ${safeNumber(row.maxScore, 0) || 1}</div>
        </div>
        <span class="inline-flex rounded-full bg-navy-100 px-2 py-1 text-[10px] font-bold text-navy-800">${escapeHtml(row.level || 'Current range')}</span>
      </div>
      <div class="mt-2 text-[11px] text-gray-500">${formatAssessmentPercentage(safeNumber(row.percentage, 0))}</div>
      <p class="mt-2 text-sm text-gray-700 leading-relaxed">${escapeHtml(row.meaning || 'This factor reflects the pattern reported in this assessment.')}</p>
    </div>`).join('') : '';

  output.innerHTML = `
    <div class="mt-6 rounded-2xl border border-navy-200 bg-white p-5 shadow-xl animate-slideUp" aria-live="polite">
      <div class="flex flex-col gap-4 border-b border-gray-200 pb-4">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <span class="block text-[11px] font-bold uppercase tracking-[0.18em] text-navy-500">${escapeHtml(interpretation.category || item.domain || 'Assessment')}</span>
            <h4 class="mt-1 text-xl font-bold text-navy-900">${escapeHtml(item.title)}</h4>
          </div>
          <span class="inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-bold ${result.badge || 'bg-navy-100 text-navy-800'}">${escapeHtml(result.level || 'Current range')}</span>
        </div>
        <p class="text-sm text-gray-600">Results for ${escapeHtml(userName)} · ${escapeHtml(item.administration || 'Self-Administered')}</p>
      </div>

      <div class="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_220px] lg:items-center">
        <div class="space-y-4">
          <div class="rounded-2xl bg-navy-50 border border-navy-100 p-4">
            <div class="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-500">${isFactorProfile ? 'Overall response total (reference only)' : 'Score'}</div>
            <div class="mt-2 text-2xl font-bold text-navy-900">${score} / ${maxScore}</div>
            <div class="mt-1 text-xs text-gray-600">${isFactorProfile ? 'Not used as the primary factor result' : (Number.isFinite(percentage) ? `${percentage.toFixed(1)}% of total` : 'Score recorded')}</div>
          </div>

          <div class="rounded-2xl bg-cream border border-amber-200 p-4">
            <div class="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-700">What your score shows</div>
            <p class="mt-2 text-sm text-gray-700 leading-relaxed">${escapeHtml(interpretation.title)}</p>
            <p class="mt-2 text-sm text-gray-700 leading-relaxed">${escapeHtml(interpretation.statement)}</p>
          </div>
        </div>

        <div class="flex justify-center">
          ${scoreRingSvg}
        </div>
      </div>

      <div class="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-4">
        <h5 class="text-[11px] font-bold uppercase tracking-[0.18em] text-navy-500">RESULTS AT A GLANCE</h5>
        ${isFactorProfile ? '<div class="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-navy-500">Factor Profile</div>' : ''}
        <div class="mt-3">
          ${isFactorProfile ? `<div class="space-y-3">${factorCardsHtml}</div>` : `
            <div class="overflow-x-auto">
              <table class="min-w-full text-left">
                <thead>
                  <tr class="border-b border-gray-200 text-[11px] uppercase tracking-wide text-gray-500">
                    <th class="px-3 py-2 font-semibold">Measure</th>
                    <th class="px-3 py-2 font-semibold">Score</th>
                    <th class="px-3 py-2 font-semibold">Max</th>
                    <th class="px-3 py-2 font-semibold">%</th>
                    <th class="px-3 py-2 font-semibold">Level</th>
                  </tr>
                </thead>
                <tbody>${rowsHtml}</tbody>
              </table>
            </div>` }
        </div>
      </div>

      <div class="mt-6 rounded-2xl border border-gray-200 bg-white p-4">
        <h5 class="text-[11px] font-bold uppercase tracking-[0.18em] text-navy-500">Overall Profile</h5>
        <p class="mt-2 text-sm text-gray-700 leading-relaxed">${escapeHtml(interpretation.overallProfile)}</p>
      </div>

      <div class="mt-6 rounded-2xl border border-gray-200 bg-white p-4">
        <h5 class="text-[11px] font-bold uppercase tracking-[0.18em] text-navy-500">Interpretation</h5>
        <p class="mt-2 text-sm text-gray-700 leading-relaxed">${escapeHtml(interpretation.interpretation)}</p>
      </div>

      <div class="mt-5 grid gap-4 md:grid-cols-2">
        <div class="rounded-2xl border border-gray-200 bg-gray-50 p-4">
          <div class="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-500">Discussion</div>
          <p class="mt-2 text-sm text-gray-700 leading-relaxed">${escapeHtml(interpretation.discussion)}</p>
        </div>
        <div class="rounded-2xl border border-gray-200 bg-gray-50 p-4">
          <div class="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-500">Assessment context</div>
          <p class="mt-2 text-sm text-gray-700 leading-relaxed">${escapeHtml(item.description || 'This self-assessment is designed for reflection and awareness-building.')}</p>
        </div>
      </div>

      <div class="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900 space-y-2">
        <h5 class="font-bold flex items-center gap-1.5"><svg class="w-4 h-4 text-amber-600" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg> Important Note</h5>
        <p class="leading-relaxed">${escapeHtml(interpretation.note)}</p>
      </div>

      <div class="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
        <h5 class="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">Conclusion</h5>
        <p class="mt-2 text-sm text-gray-700 leading-relaxed">${escapeHtml(interpretation.conclusion)}</p>
      </div>

      <div id="assessment-save-status" class="mt-3 hidden"></div>

      <div class="mt-5 flex flex-col gap-3 sm:flex-row">
        <button type="button" onclick="closeActiveAssessmentModal()" class="w-full sm:w-auto px-5 py-3 bg-white border border-navy-200 text-navy-800 font-bold rounded-xl text-xs text-center shadow-sm transition-all hover:bg-navy-50">Take Another Assessment</button>
        <a href="index.html#services" class="w-full sm:w-auto px-6 py-3 bg-navy hover:bg-navy-900 text-white font-bold rounded-xl text-xs text-center shadow-md transition-all">Book Counselling Session (₹1,499)</a>
        <a href="index.html#services" class="w-full sm:w-auto px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs text-center shadow-md transition-all">Crisis Support (₹399)</a>
      </div>
    </div>`;

  const savePayload = {
    resultId: window.crypto && typeof window.crypto.randomUUID === 'function'
      ? window.crypto.randomUUID()
      : `result-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    name: userIntakeProfile?.name || '',
    userId: userIntakeProfile?.userId || '',
    age: userIntakeProfile?.age || '',
    gender: userIntakeProfile?.gender || '',
    email: userIntakeProfile?.email || '',
    assessmentId: item.id,
    assessmentName: item.title,
    resultType: Array.isArray(result?.factors) && result.factors.length > 1 ? 'factor-profile' : 'single-score',
    score,
    maxScore,
    percentage,
    level: result.level || '',
    factorResults: Array.isArray(result?.factors) ? result.factors : [],
    interpretation: [interpretation.title, interpretation.statement, interpretation.overallProfile, interpretation.interpretation].filter(Boolean).join(' ').trim(),
    discussion: interpretation.discussion || '',
    conclusion: interpretation.conclusion || ''
  };

  persistAssessmentResultToGoogleSheets(savePayload)
    .then((result) => {
      const saveNotice = document.getElementById('assessment-save-status');
      if (!saveNotice) return;
      if (result && result.ok) {
        saveNotice.textContent = 'Assessment result saved successfully.';
        saveNotice.className = 'mt-3 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-[11px] text-emerald-800';
      } else {
        saveNotice.textContent = 'Result rendered successfully. Google Sheets sync is unavailable in this environment.';
        saveNotice.className = 'mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] text-amber-800';
      }
      saveNotice.classList.remove('hidden');
    })
    .catch((error) => {
      const saveNotice = document.getElementById('assessment-save-status');
      if (saveNotice) {
        saveNotice.textContent = 'Result rendered successfully. Google Sheets sync is unavailable in this environment.';
        saveNotice.className = 'mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] text-amber-800';
        saveNotice.classList.remove('hidden');
      }
      console.warn('Google Sheets save skipped:', error && error.message ? error.message : error);
    });

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

function submitCounsellingBookingToGoogleSheets(profile = getCurrentAssessmentProfile()) {
  const endpoint = getAssessmentSheetsEndpoint();
  if (!endpoint || !profile || profile.consent !== true) return;

  fetch(endpoint, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({
      action: 'counselling_booking',
      userId: profile.userId || '',
      name: profile.name || '',
      age: profile.age || '',
      gender: profile.gender || '',
      email: profile.email || '',
      consent: true
    })
  }).catch((error) => {
    console.warn('Counselling booking save failed; continuing without Sheets sync:', error.message || error);
  });
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

  if (service === 'counselling' && userIntakeProfile?.consent === true) {
    submitCounsellingBookingToGoogleSheets();
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
