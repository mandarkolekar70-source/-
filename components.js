// ===== Shared Components for Uttur Gram Panchayat Website =====

function getNavLinks(activePage) {
  const links = [
    { href: 'index.html', label: 'मुख्यपृष्ठ' },
    { href: 'about.html', label: 'ग्रामपंचायत' },
    { href: 'vision-mission.html', label: 'दृष्टी • उद्दिष्टे' },
    { href: 'members.html', label: 'सदस्य' },
    { href: 'doctors.html', label: 'डॉक्टर्स' },
    { href: 'sarpanch.html', label: 'कार्यकाळ' },
    { href: 'schools.html', label: 'शाळा' },
    { href: 'mandir.html', label: 'प्रार्थनीय स्थळे' },
    { href: 'contact.html', label: 'संपर्क' },
  ];
  return links.map(l =>
    `<a href="${l.href}" ${l.href === activePage ? 'class="active"' : ''}>${l.label}</a>`
  ).join('');
}

function renderHeader(activePage) {
  return `
  <div class="marquee-wrapper">
    <div class="marquee-content">
      <div class="marquee-item"><img src="Images/maharaj_s.jpg" class="marquee-img" alt="Shivaji Maharaj"><span>छत्रपती शिवाजी महाराज</span></div>
      <div class="marquee-item"><img src="Images/ambedkar_d.jpg" class="marquee-img" alt="Ambedkar"><span>डॉ. बाबासाहेब आंबेडकर</span></div>
      <div class="marquee-item"><span style="color:var(--saffron);">✦</span> <span style="font-size:1.1rem; color:var(--green-flag);">ग्रामपंचायत कसबा उत्तूर, ता. आजरा, जि. कोल्हापूर</span> <span style="color:var(--saffron);">✦</span></div>
      <div class="marquee-item"><img src="Images/savitribai.png" class="marquee-img" alt="Savitribai"><span>क्रांतिज्योती सावित्रीबाई फुले</span></div>
      <div class="marquee-item"><img src="Images/shahu_m.jpg" class="marquee-img" alt="Shahu Maharaj"><span>राजर्षी शाहू महाराज</span></div>
    </div>
  </div>
  <div class="tricolor-bar"><span></span><span></span><span></span></div>
  <header class="site-header">
    <div class="header-inner">
      <a href="index.html" class="logo-section">
        <div class="logo-emblem">क</div>
        <div class="logo-text">
          <h1>ग्रामपंचायत उत्तूर</h1>
          <p>ता. आजरा, जि. कोल्हापूर</p>
        </div>
      </a>
      <div class="header-contact">
        📞 <a href="tel:+918766737765">+91 8766737765</a>
      </div>
    </div>
  </header>
  <nav class="main-nav">
    <div class="nav-inner">
      <div class="nav-overlay" id="navOverlay"></div>
      <div class="nav-links" id="navLinks">
        ${getNavLinks(activePage)}
      </div>
      <button class="hamburger" id="hamburgerBtn" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>`;
}

function renderFooter() {
  return `
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-col">
        <h4>पत्ता</h4>
        <p>उत्तूर ग्रामपंचायत उत्तूर,<br>ता. आजरा, जि. कोल्हापूर</p>
        <p>📞 +91 8766737765</p>
        <p>✉️ Utturgram@gmail.com</p>
      </div>
      <div class="footer-col">
        <h4>महत्वाच्या लिंक्स</h4>
        <a href="vision-mission.html">दृष्टी • उद्दिष्टे</a>
        <a href="members.html">सदस्य</a>
        <a href="about.html">ग्रामपंचायत</a>
        <a href="contact.html">संपर्क</a>
        <a href="sarpanch.html">कार्यकाळ</a>
      </div>
      <div class="footer-col">
        <h4>सोशल मीडिया</h4>
        <div class="social-links">
          <a href="#" title="Facebook">📘</a>
          <a href="#" title="Instagram">📸</a>
          <a href="#" title="YouTube">🎬</a>
          <a href="#" title="Twitter">🐦</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      © ${new Date().getFullYear()} उत्तूर ग्रामपंचायत. सर्व हक्क राखीव.
    </div>
  </footer>
  <div class="tricolor-bar"><span></span><span></span><span></span></div>
  
  <div class="fab-container">
    <a href="#" class="fab-btn" id="backToTop" title="Back to Top">↑</a>
  </div>`;
}

function renderPageHero(title, subtitle, breadcrumbLabel) {
  return `
  <section class="page-hero">
    <h2>${title}</h2>
    ${subtitle ? `<p>${subtitle}</p>` : ''}
    <div class="breadcrumb">
      <a href="index.html">मुख्यपृष्ठ</a> / <span>${breadcrumbLabel}</span>
    </div>
  </section>`;
}

// ===== Global Event Listeners =====
document.addEventListener('click', (e) => {
  // Mobile Drawer Toggle
  if (e.target.closest('#hamburgerBtn')) {
    const nav = document.getElementById('navLinks');
    const overlay = document.getElementById('navOverlay');
    const btn = document.getElementById('hamburgerBtn');
    if (nav) nav.classList.toggle('open');
    if (overlay) overlay.classList.toggle('open');
    if (btn) btn.classList.toggle('open');
  }
  // Close drawer when clicking overlay
  if (e.target.closest('#navOverlay')) {
    document.getElementById('navLinks').classList.remove('open');
    document.getElementById('navOverlay').classList.remove('open');
    document.getElementById('hamburgerBtn').classList.remove('open');
  }
});

// Scroll Events (Back to Top FAB)
window.addEventListener('scroll', () => {
  const btt = document.getElementById('backToTop');
  if (btt) {
    if (window.scrollY > 300) btt.classList.add('visible');
    else btt.classList.remove('visible');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // Scroll fade-in observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});
