/**
 * PixaPDF Landing Page - Interactive JavaScript Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // Init Components
  initThemeToggle();
  initHeaderScroll();
  initMobileMenu();
  initFAQAccordion();
  initSimulator();
  initAdsTxtCopy();
  initContactForm();
});

/* --------------------------------------------------
 * 1. Dark / Light Theme Toggle
 * -------------------------------------------------- */
function initThemeToggle() {
  const themeBtn = document.getElementById('themeToggleBtn');
  if (!themeBtn) return;

  const currentTheme = localStorage.getItem('pixapdf_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(themeBtn, currentTheme);

  themeBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('pixapdf_theme', newTheme);
    updateThemeIcon(themeBtn, newTheme);
  });
}

function updateThemeIcon(btn, theme) {
  if (theme === 'light') {
    btn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    btn.setAttribute('title', 'Switch to Dark Mode');
  } else {
    btn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    btn.setAttribute('title', 'Switch to Light Mode');
  }
}

/* --------------------------------------------------
 * 2. Sticky Header & Scrollspy
 * -------------------------------------------------- */
function initHeaderScroll() {
  const header = document.getElementById('mainHeader');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* --------------------------------------------------
 * 3. Mobile Navigation Drawer Toggle
 * -------------------------------------------------- */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!mobileToggle || !navMenu) return;

  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const isOpen = navMenu.classList.contains('open');
    mobileToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });
}

/* --------------------------------------------------
 * 4. FAQ Accordion Toggle
 * -------------------------------------------------- */
function initFAQAccordion() {
  const faqHeaders = document.querySelectorAll('.faq-header');
  
  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.parentElement;
      const isOpen = parent.classList.contains('open');

      // Close all other accordions
      document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('open'));

      if (!isOpen) {
        parent.classList.add('open');
      }
    });
  });
}

/* --------------------------------------------------
 * 5. Interactive Feature Simulator (Browser Demo)
 * -------------------------------------------------- */
function initSimulator() {
  const tabImgToPdf = document.getElementById('tabImgToPdf');
  const tabOcr = document.getElementById('tabOcr');
  const simDropzone = document.getElementById('simDropzone');
  const simFileInput = document.getElementById('simFileInput');
  const simPreviewArea = document.getElementById('simPreviewArea');
  const simResultContent = document.getElementById('simResultContent');

  if (!simDropzone || !simFileInput) return;

  let activeMode = 'img2pdf'; // 'img2pdf' or 'ocr'

  if (tabImgToPdf && tabOcr) {
    tabImgToPdf.addEventListener('click', () => {
      activeMode = 'img2pdf';
      tabImgToPdf.classList.add('active');
      tabOcr.classList.remove('active');
      resetSimulator();
    });

    tabOcr.addEventListener('click', () => {
      activeMode = 'ocr';
      tabOcr.classList.add('active');
      tabImgToPdf.classList.remove('active');
      resetSimulator();
    });
  }

  simDropzone.addEventListener('click', () => simFileInput.click());

  simDropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    simDropzone.style.borderColor = 'var(--primary)';
  });

  simDropzone.addEventListener('dragleave', () => {
    simDropzone.style.borderColor = 'var(--border-glow)';
  });

  simDropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    simDropzone.style.borderColor = 'var(--border-glow)';
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  });

  simFileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  });

  function resetSimulator() {
    simPreviewArea.classList.remove('active');
    simResultContent.innerHTML = '';
  }

  function handleFiles(files) {
    const file = files[0];
    simPreviewArea.classList.add('active');

    simResultContent.innerHTML = `
      <div style="text-align: center; padding: 1.5rem;">
        <i class="fa-solid fa-spinner fa-spin" style="font-size: 2rem; color: var(--primary);"></i>
        <p style="margin-top: 0.75rem; font-weight: 600;">Processing ${file.name}...</p>
      </div>
    `;

    setTimeout(() => {
      if (activeMode === 'img2pdf') {
        const simulatedPdfName = file.name.substring(0, file.name.lastIndexOf('.')) + '_PixaPDF.pdf';
        simResultContent.innerHTML = `
          <div class="sim-result-card">
            <div style="display: flex; align-items: center; gap: 1rem;">
              <i class="fa-solid fa-file-pdf" style="font-size: 2rem; color: var(--primary);"></i>
              <div>
                <strong style="display: block;">${simulatedPdfName}</strong>
                <small style="color: var(--text-muted);">PDF Document • Ready (HD Quality)</small>
              </div>
            </div>
            <button class="btn btn-primary" onclick="showToast('Simulator demo: In PixaPDF app files are saved 100% offline on your device!')">
              <i class="fa-solid fa-download"></i> Download PDF
            </button>
          </div>
        `;
      } else {
        // OCR mode simulation
        simResultContent.innerHTML = `
          <div style="background: var(--bg-surface); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <strong style="color: var(--primary);"><i class="fa-solid fa-microchip"></i> Text Extracted Successfully (PixaPDF AI OCR):</strong>
              <button class="btn btn-secondary" style="padding: 0.3rem 0.8rem; font-size: 0.8rem;" onclick="navigator.clipboard.writeText('Sample text extracted by PixaPDF OCR...'); showToast('Text copied successfully!');">
                <i class="fa-solid fa-copy"></i> Copy Text
              </button>
            </div>
            <p style="font-family: monospace; font-size: 0.9rem; color: var(--text-main); line-height: 1.5; background: rgba(0,0,0,0.2); padding: 1rem; border-radius: 8px;">
              [PIXAPDF OCR RESULT DEMO]<br>
              Document: ${file.name}<br>
              "PixaPDF allows you to convert images into high-quality PDF files, extract text automatically with AI OCR, and secure documents offline without an internet connection."
            </p>
          </div>
        `;
      }
    }, 1200);
  }
}

/* --------------------------------------------------
 * 6. Copy App-Ads.txt Code Functionality
 * -------------------------------------------------- */
function initAdsTxtCopy() {
  const copyBtn = document.getElementById('copyAdsTxtBtn');
  const codeContent = document.getElementById('adsTxtSnippet');

  if (!copyBtn || !codeContent) return;

  copyBtn.addEventListener('click', () => {
    const textToCopy = codeContent.innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
      showToast('app-ads.txt content copied successfully!');
      copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
      setTimeout(() => {
        copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i> Copy Snippet';
      }, 2000);
    });
  });
}

/* --------------------------------------------------
 * 7. Contact Form Handling
 * -------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Your message has been sent! The PixaPDF team will respond via email.');
    form.reset();
  });
}

/* Helper Toast Notification */
function showToast(message) {
  let toast = document.getElementById('pixaToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'pixaToast';
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background: var(--primary-gradient);
      color: #FFF;
      padding: 0.85rem 1.5rem;
      border-radius: var(--radius-full);
      box-shadow: 0 10px 25px rgba(255, 59, 48, 0.4);
      z-index: 9999;
      font-weight: 700;
      font-size: 0.95rem;
      display: flex;
      align-items: center;
      gap: 0.6rem;
      transition: all 0.3s ease;
      opacity: 0;
      transform: translateY(20px);
    `;
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
  }, 3500);
}
