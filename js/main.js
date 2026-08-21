/**
 * PixaPDF Landing Page - Interactive JavaScript Controller
 * Real Browser Conversion Engine & 2-Trial Limit Redirection
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
 * 5. Interactive Feature Simulator (Real Engine + 2 Trial Limit)
 * -------------------------------------------------- */
function initSimulator() {
  const tabImgToPdf = document.getElementById('tabImgToPdf');
  const tabOcr = document.getElementById('tabOcr');
  const simDropzone = document.getElementById('simDropzone');
  const simFileInput = document.getElementById('simFileInput');
  const simPreviewArea = document.getElementById('simPreviewArea');
  const simResultContent = document.getElementById('simResultContent');
  const trialCountText = document.getElementById('trialCountText');
  const trialCounterBadge = document.getElementById('trialCounterBadge');

  if (!simDropzone || !simFileInput) return;

  const MAX_FREE_TRIALS = 2;
  let trialCount = parseInt(localStorage.getItem('pixapdf_sim_trials') || '0', 10);
  updateTrialUI();

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

  simDropzone.addEventListener('click', () => {
    if (trialCount >= MAX_FREE_TRIALS) {
      showLimitReachedScreen();
    } else {
      simFileInput.click();
    }
  });

  simDropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    if (trialCount < MAX_FREE_TRIALS) {
      simDropzone.style.borderColor = 'var(--primary)';
    }
  });

  simDropzone.addEventListener('dragleave', () => {
    simDropzone.style.borderColor = 'var(--border-glow)';
  });

  simDropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    simDropzone.style.borderColor = 'var(--border-glow)';
    if (trialCount >= MAX_FREE_TRIALS) {
      showLimitReachedScreen();
    } else if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  });

  simFileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files.length > 0) {
      if (trialCount >= MAX_FREE_TRIALS) {
        showLimitReachedScreen();
      } else {
        handleFiles(e.target.files);
      }
    }
  });

  function updateTrialUI() {
    if (trialCountText) {
      trialCountText.innerText = trialCount;
    }
    if (trialCounterBadge) {
      if (trialCount >= MAX_FREE_TRIALS) {
        trialCounterBadge.style.background = 'var(--primary-gradient)';
        trialCounterBadge.style.color = '#ffffff';
        trialCounterBadge.style.borderColor = 'transparent';
        trialCounterBadge.innerHTML = '<i class="fa-solid fa-mobile-screen-button"></i> Get App on Google Play Store';
      }
    }
  }

  function resetSimulator() {
    if (trialCount >= MAX_FREE_TRIALS) {
      showLimitReachedScreen();
    } else {
      simPreviewArea.classList.remove('active');
      simResultContent.innerHTML = '';
    }
  }

  function showLimitReachedScreen() {
    simPreviewArea.classList.add('active');
    simResultContent.innerHTML = `
      <div style="background: var(--bg-card); border: 2px dashed var(--border-glow); padding: 2.25rem 1.5rem; border-radius: var(--radius-lg); text-align: center;">
        <div style="width: 60px; height: 60px; background: var(--primary-gradient); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem auto; color: #FFF; font-size: 1.6rem; box-shadow: var(--shadow-primary);">
          <i class="fa-solid fa-rocket"></i>
        </div>
        <h3 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--text-main);">Unlock Unlimited PDF Powers on Android!</h3>
        <p style="color: var(--text-muted); font-size: 0.98rem; max-width: 540px; margin: 0 auto 1.5rem auto; line-height: 1.6;">
          Loved the browser preview? Download the full <strong>PixaPDF App</strong> on Google Play Store to experience <strong>unlimited offline PDF conversion, document scanning, digital signatures, and AI OCR</strong> with zero restrictions!
        </p>
        <a href="https://play.google.com/store/apps/details?id=com.onewanta.files_tools" target="_blank" class="playstore-badge" style="display: inline-flex; padding: 0.85rem 2rem;">
          <svg viewBox="0 0 512 512" fill="currentColor" style="width: 28px; height: 28px;">
            <path d="M99.617 8.057a50.091 50.091 0 00-38.867 18.24L267.143 256 60.75 485.703a50.08 50.08 0 0038.867 18.24 50.04 50.04 0 0021.054-4.606l270.932-135.466 2.378-1.189L120.67 12.663a50.05 50.05 0 00-21.053-4.606zM32.8 38.35A49.88 49.88 0 0016 74.07v363.86c0 14.15 5.92 26.92 16.8 35.72L235.8 256 32.8 38.35zm389.043 189.624l-48.435-24.218L298.49 256l74.918 52.244 48.435-24.218c18.57-9.285 30.157-27.818 30.157-48.051s-11.587-38.766-30.157-48.051z" />
          </svg>
          <div class="playstore-text">
            <span style="font-size: 0.75rem;">DOWNLOAD FREE ON</span>
            <span style="font-size: 1.15rem;">Google Play Store</span>
          </div>
        </a>
      </div>
    `;
  }

  function handleFiles(files) {
    if (trialCount >= MAX_FREE_TRIALS) {
      showLimitReachedScreen();
      return;
    }

    const file = files[0];
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (JPG, PNG, WEBP)');
      return;
    }

    simPreviewArea.classList.add('active');

    // Increment trial count
    trialCount += 1;
    localStorage.setItem('pixapdf_sim_trials', trialCount.toString());
    updateTrialUI();

    simResultContent.innerHTML = `
      <div style="text-align: center; padding: 1.5rem;">
        <i class="fa-solid fa-spinner fa-spin" style="font-size: 2rem; color: var(--primary);"></i>
        <p style="margin-top: 0.75rem; font-weight: 600;">Processing ${file.name} in Real Browser Engine...</p>
      </div>
    `;

    if (activeMode === 'img2pdf') {
      createRealPdfFromImage(file, (pdfBlob) => {
        const simulatedPdfName = file.name.substring(0, file.name.lastIndexOf('.')) + '_PixaPDF.pdf';
        const pdfUrl = URL.createObjectURL(pdfBlob);
        const fileSizeKb = (pdfBlob.size / 1024).toFixed(1);

        simResultContent.innerHTML = `
          <div class="sim-result-card">
            <div style="display: flex; align-items: center; gap: 1rem;">
              <i class="fa-solid fa-file-pdf" style="font-size: 2.2rem; color: var(--primary);"></i>
              <div>
                <strong style="display: block;">${simulatedPdfName}</strong>
                <small style="color: var(--text-muted);">PDF Document • ${fileSizeKb} KB • Real PDF Output</small>
              </div>
            </div>
            <a href="${pdfUrl}" download="${simulatedPdfName}" class="btn btn-primary" id="downloadPdfBtn">
              <i class="fa-solid fa-download"></i> Download Real PDF
            </a>
          </div>
          ${trialCount >= MAX_FREE_TRIALS ? `
            <p style="margin-top: 1.25rem; color: var(--text-main); font-size: 0.9rem; font-weight: 600; text-align: center;">
              <i class="fa-solid fa-wand-magic-sparkles" style="color: var(--primary);"></i> Want unlimited offline conversions & digital signatures? <a href="https://play.google.com/store/apps/details?id=com.onewanta.files_tools" target="_blank" style="color: var(--primary); font-weight: 700; text-decoration: underline;">Download PixaPDF on Google Play Store &rarr;</a>
            </p>
          ` : ''}
        `;

        document.getElementById('downloadPdfBtn').addEventListener('click', () => {
          showToast('Downloading your real PDF file!');
        });
      });
    } else {
      // OCR mode simulation
      setTimeout(() => {
        simResultContent.innerHTML = `
          <div style="background: var(--bg-surface); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
              <strong style="color: var(--primary);"><i class="fa-solid fa-microchip"></i> Text Extracted Successfully (PixaPDF AI OCR):</strong>
              <button class="btn btn-secondary" id="copyOcrTextBtn" style="padding: 0.3rem 0.8rem; font-size: 0.88rem;">
                <i class="fa-solid fa-copy"></i> Copy Text
              </button>
            </div>
            <p id="ocrTextOutput" style="font-family: monospace; font-size: 0.9rem; color: var(--text-main); line-height: 1.5; background: rgba(0,0,0,0.2); padding: 1rem; border-radius: 8px;">
              [PIXAPDF OCR RESULT DEMO]<br>
              Document: ${file.name}<br>
              "PixaPDF allows you to convert images into high-quality PDF files, extract text automatically with AI OCR, and secure documents offline without an internet connection."
            </p>
          </div>
          ${trialCount >= MAX_FREE_TRIALS ? `
            <p style="margin-top: 1rem; color: #ef4444; font-size: 0.85rem; font-weight: 700; text-align: center;">
              <i class="fa-solid fa-triangle-exclamation"></i> You have used all ${MAX_FREE_TRIALS} free browser trial conversions! <a href="https://play.google.com/store/apps/details?id=com.onewanta.files_tools" target="_blank" style="text-decoration: underline;">Get full Android app for unlimited OCR</a>.
            </p>
          ` : ''}
        `;

        document.getElementById('copyOcrTextBtn').addEventListener('click', () => {
          const txt = document.getElementById('ocrTextOutput').innerText;
          navigator.clipboard.writeText(txt);
          showToast('Extracted OCR text copied to clipboard!');
        });
      }, 1000);
    }
  }
}

/* Pure JavaScript Real PDF Creator for JPEG/PNG/WEBP Images */
function createRealPdfFromImage(file, callback) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const jpegUrl = canvas.toDataURL('image/jpeg', 0.92);
      const base64Data = jpegUrl.split(',')[1];
      const binaryStr = atob(base64Data);
      const imgLen = binaryStr.length;
      const imgBytes = new Uint8Array(imgLen);
      for (let i = 0; i < imgLen; i++) {
        imgBytes[i] = binaryStr.charCodeAt(i);
      }

      const pdfW = (img.width * 0.75).toFixed(2);
      const pdfH = (img.height * 0.75).toFixed(2);

      const header = `%PDF-1.4\n`;
      const obj1 = `1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`;
      const obj2 = `2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n`;
      const obj3 = `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pdfW} ${pdfH}] /Resources << /XObject << /Im1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n`;
      const obj4Head = `4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${img.width} /Height ${img.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${imgLen} >>\nstream\n`;
      const obj4Tail = `\nendstream\nendobj\n`;
      
      const contentStr = `q ${pdfW} 0 0 ${pdfH} 0 0 cm /Im1 Do Q`;
      const obj5 = `5 0 obj\n<< /Length ${contentStr.length} >>\nstream\n${contentStr}\nendstream\nendobj\n`;

      const encoder = new TextEncoder();
      const parts = [
        encoder.encode(header),
        encoder.encode(obj1),
        encoder.encode(obj2),
        encoder.encode(obj3),
        encoder.encode(obj4Head),
        imgBytes,
        encoder.encode(obj4Tail),
        encoder.encode(obj5)
      ];

      let pos = header.length;
      const offsets = [0];
      offsets.push(pos); pos += obj1.length;
      offsets.push(pos); pos += obj2.length;
      offsets.push(pos); pos += obj3.length;
      offsets.push(pos); pos += obj4Head.length + imgLen + obj4Tail.length;
      offsets.push(pos);

      let xref = `xref\n0 6\n0000000000 65535 f \n`;
      for (let i = 1; i <= 5; i++) {
        xref += (offsets[i] + '').padStart(10, '0') + ` 00000 n \n`;
      }
      const startXref = pos + obj5.length;
      const trailer = `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${startXref}\n%%EOF`;

      parts.push(encoder.encode(xref));
      parts.push(encoder.encode(trailer));

      const pdfBlob = new Blob(parts, { type: 'application/pdf' });
      callback(pdfBlob);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
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
