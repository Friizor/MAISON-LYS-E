/**
 * MAISON ÉLYSÉE — Interactive Logic & Luxury Motion
 * High-end bespoke real estate interactive experience
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. SCROLL PROGRESS BAR & STICKY HEADER
  // =========================================================================
  const header = document.getElementById('siteHeader');
  const progressBar = document.getElementById('scrollProgressBar');

  function updateScrollState() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Progress bar width
    if (progressBar && docHeight > 0) {
      const progress = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
      progressBar.style.width = `${progress}%`;
    }

    // Header transition
    if (header) {
      if (scrollY > 50) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }
  }

  window.addEventListener('scroll', updateScrollState, { passive: true });
  updateScrollState();

  // =========================================================================
  // 2. MOBILE NAVIGATION DRAWER
  // =========================================================================
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('mobileDrawerClose');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, #mobileDrawerCta');

  function openMobileMenu() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    mobileToggle?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    mobileToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  mobileToggle?.addEventListener('click', openMobileMenu);
  drawerClose?.addEventListener('click', closeMobileMenu);
  mobileDrawer?.addEventListener('click', (e) => {
    if (e.target === mobileDrawer) closeMobileMenu();
  });
  mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

  // =========================================================================
  // 3. CURRENCY & UNIT PREFERENCES
  // =========================================================================
  const currencyBtns = document.querySelectorAll('[data-currency-set]');
  const unitBtns = document.querySelectorAll('[data-unit-set]');

  const priceElements = document.querySelectorAll('[data-price-text]');
  const interiorElements = document.querySelectorAll('[data-unit-text="interior"]');
  const interiorAltElements = document.querySelectorAll('[data-unit-alt="interior"]');
  const terraceElements = document.querySelectorAll('[data-unit-text="terrace"]');
  const terraceAltElements = document.querySelectorAll('[data-unit-alt="terrace"]');
  const heroInteriorVal = document.querySelector('[data-unit-val="interior"]');
  const heroTerraceVal = document.querySelector('[data-unit-val="terrace"]');

  const currencyData = {
    EUR: { price: '€24,500,000', sub: 'Price Upon Private Application' },
    USD: { price: '$26,800,000', sub: 'USD Equivalent (Demonstration)' },
    GBP: { price: '£21,200,000', sub: 'GBP Equivalent (Demonstration)' }
  };

  const unitData = {
    m2: {
      interior: '680 m²',
      interiorAlt: '7,320 sq ft gross',
      terrace: '240 m²',
      terraceAlt: 'Private Sky Terrace & Pool',
      heroInterior: '680 M²',
      heroTerrace: '240 M² SKY TERRACE'
    },
    sqft: {
      interior: '7,320 sq ft',
      interiorAlt: '680 m² gross',
      terrace: '2,583 sq ft',
      terraceAlt: '240 m² Sky Terrace & Pool',
      heroInterior: '7,320 SQ FT',
      heroTerrace: '2,583 SQ FT SKY TERRACE'
    }
  };

  currencyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const curr = btn.getAttribute('data-currency-set');
      currencyBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (currencyData[curr]) {
        priceElements.forEach(el => {
          el.textContent = currencyData[curr].price;
        });
      }
    });
  });

  unitBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const u = btn.getAttribute('data-unit-set');
      unitBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (unitData[u]) {
        interiorElements.forEach(el => el.textContent = unitData[u].interior);
        interiorAltElements.forEach(el => el.textContent = unitData[u].interiorAlt);
        terraceElements.forEach(el => el.textContent = unitData[u].terrace);
        terraceAltElements.forEach(el => el.textContent = unitData[u].terraceAlt);
        if (heroInteriorVal) heroInteriorVal.textContent = unitData[u].heroInterior;
        if (heroTerraceVal) heroTerraceVal.textContent = unitData[u].heroTerrace;
      }
    });
  });

  // =========================================================================
  // 4. PHOTO GALLERY & FULLSCREEN LIGHTBOX
  // =========================================================================
  const galleryCards = document.querySelectorAll('.gallery-card');
  const filterTabs = document.querySelectorAll('.filter-tab');

  const galleryItems = [
    {
      src: '/images/gallery-facade.jpg',
      category: 'ARCHITECTURE',
      title: 'Limestone Facade & Private Grounds',
      caption: 'The contemporary limestone facade harmoniously anchors the residence within its private landscaped grounds.'
    },
    {
      src: '/images/gallery-living.jpg',
      category: 'LIVING & RECEPTION',
      title: 'Grand Salon & Travertine Hearth',
      caption: 'The double-height 14-meter Grand Salon featuring custom honed Roman travertine fireplace and 4.10m glazing.'
    },
    {
      src: '/images/gallery-kitchen.jpg',
      category: 'CULINARY ATELIER',
      title: 'Monolithic Marble Chef\'s Kitchen',
      caption: 'Bespoke Boffi kitchen configured with a Fior di Bosco marble monolith island, Gaggenau 400 series, and Sub-Zero storage.'
    },
    {
      src: '/images/gallery-bedroom.jpg',
      category: 'PRIVATE SUITES',
      title: 'Primary Penthouse Suite',
      caption: 'Primary bedroom sanctuary wrapped in Belgian linen draperies with direct morning access to the Sky Terrace.'
    },
    {
      src: '/images/gallery-bathroom.jpg',
      category: 'WELLNESS SPA',
      title: 'Primary En-Suite Spa & Stone Tub',
      caption: 'Sculptural freestanding Roman stone soaking tub, fluted bookmatched marble vanities, and Finnish cedar sauna access.'
    },
    {
      src: '/images/gallery-terrace.jpg',
      category: 'OUTDOOR LIVING',
      title: 'Private Sky Terrace & Sunset Loggia',
      caption: '240 m² private sky terrace landscaped by Piet Oudolf Studio, featuring a heated infinity plunge pool and sunset panorama.'
    },
    {
      src: '/images/gallery-dining.jpg',
      category: 'LIVING & RECEPTION',
      title: 'Intimate Formal Dining Salon',
      caption: 'Architectural dining salon seating up to 14 guests, illuminated by custom bronze suspension fittings and temperature wine wall.'
    },
    {
      src: '/images/gallery-details.jpg',
      category: 'CRAFTSMANSHIP',
      title: 'Bespoke Millwork & Stone Joints',
      caption: 'Subtle hairline junctions between hand-patinated architectural bronze, quarter-sawn white oak, and honed travertine.'
    },
    {
      src: '/images/gallery-garden.jpg',
      category: 'TERRACE & GROUNDS',
      title: 'Private Reflexion Courtyard',
      caption: 'The private ground-level reflecting pool and serene courtyard providing visual peace and acoustic containment.'
    },
    {
      src: '/images/editorial-story-1.jpg',
      category: 'ARCHITECTURE',
      title: 'Double-Height Glazing Facade',
      caption: 'Monolithic stone colonnades framing custom Schuco triple-glazed acoustic facades engineered to capture Parisian daylight.'
    },
    {
      src: '/images/editorial-story-2.jpg',
      category: 'PRIVATE SUITES',
      title: 'Guest Suite Finishings',
      caption: 'Tactile materiality and acoustic isolation within the dedicated guest suite wing on Level 01.'
    },
    {
      src: '/images/cta-closing.jpg',
      category: 'OUTDOOR LIVING',
      title: 'Twilight Pavilions & Sky Lounge',
      caption: 'Atmospheric twilight illumination transforming the terrace into a serene open-air pavilion under the Parisian sky.'
    }
  ];

  // Category Filtering
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const filter = tab.getAttribute('data-filter');
      filterTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      galleryCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Lightbox Implementation
  const lightbox = document.getElementById('galleryLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxThumbStrip = document.getElementById('lightboxThumbStrip');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
  const lightboxNextBtn = document.getElementById('lightboxNextBtn');

  let currentPhotoIndex = 0;

  // Build Thumbnail Strip
  if (lightboxThumbStrip) {
    lightboxThumbStrip.innerHTML = '';
    galleryItems.forEach((item, idx) => {
      const thumb = document.createElement('div');
      thumb.className = `lightbox-thumb ${idx === 0 ? 'active' : ''}`;
      thumb.innerHTML = `<img src="${item.src}" alt="${item.title}">`;
      thumb.addEventListener('click', () => showLightboxIndex(idx));
      lightboxThumbStrip.appendChild(thumb);
    });
  }

  function showLightboxIndex(index) {
    if (index < 0) index = galleryItems.length - 1;
    if (index >= galleryItems.length) index = 0;
    currentPhotoIndex = index;

    const data = galleryItems[currentPhotoIndex];
    if (!data || !lightboxImg) return;

    lightboxImg.style.opacity = '0';
    setTimeout(() => {
      lightboxImg.src = data.src;
      lightboxImg.alt = data.title;
      lightboxCounter.textContent = `${String(currentPhotoIndex + 1).padStart(2, '0')} / ${String(galleryItems.length).padStart(2, '0')}`;
      lightboxCategory.textContent = data.category;
      lightboxTitle.textContent = data.title;
      lightboxCaption.textContent = data.caption;
      lightboxImg.style.opacity = '1';

      // Update active thumb
      const thumbs = lightboxThumbStrip?.querySelectorAll('.lightbox-thumb');
      thumbs?.forEach((t, i) => {
        if (i === currentPhotoIndex) {
          t.classList.add('active');
          t.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
          t.classList.remove('active');
        }
      });
    }, 150);
  }

  function openLightbox(index) {
    if (!lightbox) return;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    showLightboxIndex(index);
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-index') || '0', 10);
      openLightbox(idx);
    });
  });

  lightboxCloseBtn?.addEventListener('click', closeLightbox);
  lightboxPrevBtn?.addEventListener('click', () => showLightboxIndex(currentPhotoIndex - 1));
  lightboxNextBtn?.addEventListener('click', () => showLightboxIndex(currentPhotoIndex + 1));
  lightbox?.addEventListener('click', (e) => {
    if (e.target.classList.contains('lightbox-backdrop')) closeLightbox();
  });

  // Touch Swipe for Mobile Lightbox
  let touchStartX = 0;
  let touchEndX = 0;
  lightbox?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  lightbox?.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) {
      showLightboxIndex(currentPhotoIndex + 1); // Swipe left = next
    } else if (touchEndX - touchStartX > 50) {
      showLightboxIndex(currentPhotoIndex - 1); // Swipe right = prev
    }
  }, { passive: true });

  // =========================================================================
  // 5. INTERACTIVE FLOOR PLANS & BLUEPRINT INSPECTOR
  // =========================================================================
  const levelTabs = document.querySelectorAll('.level-tab');
  const planLevel1 = document.getElementById('planLevel1');
  const planLevel2 = document.getElementById('planLevel2');
  const activeFloorLabel = document.getElementById('activeFloorLabel');

  const inspectorRoomTitle = document.getElementById('inspectorRoomTitle');
  const inspectorRoomArea = document.getElementById('inspectorRoomArea');
  const inspectorFinishes = document.getElementById('inspectorFinishes');
  const inspectorCeiling = document.getElementById('inspectorCeiling');
  const inspectorGlazing = document.getElementById('inspectorGlazing');
  const inspectorFeature = document.getElementById('inspectorFeature');
  const inspectorExposure = document.getElementById('inspectorExposure');

  const roomSpecs = {
    salon: {
      title: 'Grand Salon & Living Gallery',
      area: '14.20m × 8.80m · 125 m² (1,345 sq ft)',
      finishes: 'Honed Roman Travertine, Quarter-sawn White Oak',
      ceiling: '3.40m with concealed cove ambient wash',
      glazing: 'Schuco Triple-Glazed Acoustic Panoramic Facade',
      feature: 'Carved Travertine Fireplace with clean ethanol flame',
      exposure: 'South & South-West (Golden Hour light)'
    },
    dining: {
      title: 'Formal Dining Salon',
      area: '6.50m × 5.80m · 38 m² (409 sq ft)',
      finishes: 'Smoked Oak Flooring, Hand-stitched Leather Panels',
      ceiling: '3.40m with bespoke patinated bronze suspension',
      glazing: 'Full-height acoustic Schuco glass opening to terrace loggia',
      feature: 'Custom climate-controlled 320-bottle wine showcase',
      exposure: 'South exposure with integrated automated solar louvers'
    },
    kitchen: {
      title: 'Chef\'s Culinary Atelier',
      area: '4.20m × 5.80m · 24 m² (258 sq ft)',
      finishes: 'Monolithic Fior di Bosco Marble, Smoked Oak Joinery',
      ceiling: '3.40m with architectural task downlighting',
      glazing: 'Dual garden exposure with discrete ventilation',
      feature: 'Gaggenau 400 Series ovens & concealed scullery kitchen',
      exposure: 'Morning East daylight orientation'
    },
    foyer: {
      title: 'Private Elevator Foyer',
      area: '5.20m × 3.50m · 18 m² (194 sq ft)',
      finishes: 'Roman Travertine colonnade, patinated bronze reveals',
      ceiling: '3.40m vaulted vestibule',
      glazing: 'Frosted bronze-mesh security glass',
      feature: 'Biometric facial recognition lift access direct from garage',
      exposure: 'Private interior gallery'
    },
    guest1: {
      title: 'Guest Residence Suite I',
      area: '7.20m × 5.20m · 37 m² (398 sq ft)',
      finishes: 'Belgian linen wall coverings, chevron white oak',
      ceiling: '3.40m acoustic decoupled slab',
      glazing: 'Triple-glazed Schuco window with acoustic isolation',
      feature: 'Private en-suite Calacatta bathroom with rain shower',
      exposure: 'West courtyard view'
    },
    guest2: {
      title: 'Guest Residence Suite II',
      area: '6.80m × 5.40m · 36 m² (387 sq ft)',
      finishes: 'Quarter-sawn oak millwork, brushed bronze fittings',
      ceiling: '3.40m acoustic decoupled slab',
      glazing: 'Floor-to-ceiling garden glazed aperture',
      feature: 'Walk-in dressing closet and private marble bathroom',
      exposure: 'East garden orientation'
    },
    terrace: {
      title: 'Private Sky Terrace & Pergola',
      area: '240 m² (2,583 sq ft usable exterior)',
      finishes: 'Honed limestone pavers, weathered teak, bronze pergolas',
      ceiling: 'Open sky with motorized bronze weather louvers',
      glazing: 'Seamless tempered structural glass balustrades',
      feature: 'Heated infinity plunge pool (8.5m × 3.0m) & Piet Oudolf flora',
      exposure: '360° panoramic Parisian skyline with Eiffel Tower vista'
    },
    master: {
      title: 'Primary Penthouse Suite',
      area: '10.80m × 6.80m · 74 m² (796 sq ft)',
      finishes: 'Smoked European oak wide planks, woven cashmere textiles',
      ceiling: '3.80m vaulted ceiling with indirect architectural perimeter glow',
      glazing: 'Motorized Schuco sliding panels opening directly onto pool deck',
      feature: 'Private terrace lounge and dual fireplace access',
      exposure: 'South & South-West dual exposure'
    },
    spa: {
      title: 'Primary Spa En-Suite & Sauna',
      area: '5.80m × 4.60m · 27 m² (290 sq ft)',
      finishes: 'Bookmatched Calacatta Borghini, Roman Travertine tub',
      ceiling: '3.40m with diffused skylight aperture',
      glazing: 'Private frosted smart-privacy glass to sky terrace',
      feature: 'Cedar Finnish dry sauna, steam hammam & cold hydro plunge',
      exposure: 'Zenithal natural daylight'
    },
    study: {
      title: 'Dressing Salon & Private Atelier',
      area: '4.80m × 4.20m · 21 m² (226 sq ft)',
      finishes: 'Poliform custom bronze & leather lined cabinetry',
      ceiling: '3.40m with museum color-accurate lighting (CRI 98+)',
      glazing: 'Discreet acoustic garden window',
      feature: 'Integrated biometric jewelry vault & writing desk',
      exposure: 'North-West soft diffused light'
    }
  };

  function updateRoomInspector(roomId) {
    const data = roomSpecs[roomId];
    if (!data) return;

    if (inspectorRoomTitle) inspectorRoomTitle.textContent = data.title;
    if (inspectorRoomArea) inspectorRoomArea.textContent = data.area;
    if (inspectorFinishes) inspectorFinishes.textContent = data.finishes;
    if (inspectorCeiling) inspectorCeiling.textContent = data.ceiling;
    if (inspectorGlazing) inspectorGlazing.textContent = data.glazing;
    if (inspectorFeature) inspectorFeature.textContent = data.feature;
    if (inspectorExposure) inspectorExposure.textContent = data.exposure;
  }

  levelTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const level = tab.getAttribute('data-level');
      levelTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      if (level === '1') {
        planLevel1?.classList.add('active');
        planLevel2?.classList.remove('active');
        if (activeFloorLabel) activeFloorLabel.textContent = 'LEVEL 01 · RECEPTION & SUITES';
        updateRoomInspector('salon');
      } else {
        planLevel1?.classList.remove('active');
        planLevel2?.classList.add('active');
        if (activeFloorLabel) activeFloorLabel.textContent = 'LEVEL 02 · MASTER PENTHOUSE & SKY LOGGIA';
        updateRoomInspector('terrace');
      }
    });
  });

  // Attach hover/click listeners to SVG blueprint elements if embedded or via object/iframe
  // We can also allow clicking on SVG directly if rendered inline or via interactive hotspot buttons
  const cadImages = document.querySelectorAll('.cad-svg');
  cadImages.forEach(img => {
    img.addEventListener('click', (e) => {
      // Toggle rooms based on click position or active tab
      const isLevel2 = planLevel2?.classList.contains('active');
      const rect = img.getBoundingClientRect();
      const clickY = (e.clientY - rect.top) / rect.height;
      if (isLevel2) {
        if (clickY < 0.45) updateRoomInspector('terrace');
        else if (clickY < 0.7) updateRoomInspector('master');
        else updateRoomInspector('spa');
      } else {
        if (clickY < 0.5) updateRoomInspector('salon');
        else updateRoomInspector('guest1');
      }
    });
  });

  // =========================================================================
  // 6. ARCHITECTURAL DOSSIER MODAL
  // =========================================================================
  const downloadBrochureBtn = document.getElementById('downloadBrochureBtn');
  const dossierModal = document.getElementById('dossierModal');
  const dossierCloseBtn = document.getElementById('dossierCloseBtn');
  const printDossierBtn = document.getElementById('printDossierBtn');
  const dossierViewingBtn = document.getElementById('dossierViewingBtn');

  function openDossier() {
    if (!dossierModal) return;
    dossierModal.classList.add('open');
    dossierModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDossier() {
    if (!dossierModal) return;
    dossierModal.classList.remove('open');
    dossierModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  downloadBrochureBtn?.addEventListener('click', openDossier);
  dossierCloseBtn?.addEventListener('click', closeDossier);
  dossierViewingBtn?.addEventListener('click', closeDossier);
  dossierModal?.addEventListener('click', (e) => {
    if (e.target.classList.contains('dossier-backdrop')) closeDossier();
  });
  printDossierBtn?.addEventListener('click', () => {
    window.print();
  });

  // =========================================================================
  // 7. NEIGHBORHOOD DIRECTORY FILTERS
  // =========================================================================
  const dirTabs = document.querySelectorAll('.dir-tab');
  const dirItems = document.querySelectorAll('.dir-item');

  dirTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const filter = tab.getAttribute('data-loc-filter');
      dirTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      dirItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // =========================================================================
  // 8. PRIVATE VIEWING REQUEST FORM & REALISTIC SUBMISSION
  // =========================================================================
  const viewingForm = document.getElementById('viewingForm');
  const successCard = document.getElementById('viewingSuccessCard');
  const submitBtn = document.getElementById('submitViewingBtn');

  const fullNameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('emailAddress');
  const phoneInput = document.getElementById('phoneNumber');
  const countryCodeSelect = document.getElementById('countryCode');
  const dateInput = document.getElementById('preferredDate');
  const timeSelect = document.getElementById('preferredTime');
  const visitorsSelect = document.getElementById('numVisitors');
  const specialRequests = document.getElementById('specialRequests');
  const privacyCheckbox = document.getElementById('privacyConsent');

  const confirmedClientName = document.getElementById('confirmedClientName');
  const confirmedRefCode = document.getElementById('confirmedRefCode');
  const confirmedDate = document.getElementById('confirmedDate');
  const confirmedTime = document.getElementById('confirmedTime');
  const confirmedVisitors = document.getElementById('confirmedVisitors');

  const downloadIcsBtn = document.getElementById('downloadIcsBtn');
  const resetFormBtn = document.getElementById('resetFormBtn');

  // Enforce minimum date to tomorrow
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minStr = tomorrow.toISOString().split('T')[0];
    dateInput.min = minStr;
    dateInput.value = minStr;
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function clearErrors() {
    document.querySelectorAll('.form-group').forEach(g => g.classList.remove('has-error'));
  }

  if (viewingForm) {
    viewingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();

      let isValid = true;

      // Validate Name
      if (!fullNameInput.value.trim() || fullNameInput.value.trim().length < 2) {
        document.getElementById('groupFullName')?.classList.add('has-error');
        isValid = false;
      }

      // Validate Email
      if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
        document.getElementById('groupEmail')?.classList.add('has-error');
        isValid = false;
      }

      // Validate Phone
      if (!phoneInput.value.trim() || phoneInput.value.trim().length < 6) {
        document.getElementById('groupPhone')?.classList.add('has-error');
        isValid = false;
      }

      // Validate Date
      if (!dateInput.value) {
        document.getElementById('groupDate')?.classList.add('has-error');
        isValid = false;
      }

      // Validate Consent
      if (!privacyCheckbox.checked) {
        document.getElementById('groupConsent')?.classList.add('has-error');
        isValid = false;
      }

      if (!isValid) return;

      // Submission simulation state
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;

        // Generate unique appointment reference code
        const refNumber = `ME-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        const clientName = fullNameInput.value.trim();
        const selectedDate = new Date(dateInput.value);
        const dateFormatted = selectedDate.toLocaleDateString('en-GB', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });

        // Populate summary ticket
        if (confirmedClientName) confirmedClientName.textContent = clientName;
        if (confirmedRefCode) confirmedRefCode.textContent = `REF: ${refNumber}`;
        if (confirmedDate) confirmedDate.textContent = dateFormatted;
        if (confirmedTime) confirmedTime.textContent = `${timeSelect.value} CET`;
        if (confirmedVisitors) confirmedVisitors.textContent = `${visitorsSelect.value} Guests`;

        // Switch form to success state
        viewingForm.style.display = 'none';
        if (successCard) {
          successCard.style.display = 'block';
          successCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 1100);
    });
  }

  // Reset form
  resetFormBtn?.addEventListener('click', () => {
    if (viewingForm && successCard) {
      viewingForm.reset();
      if (dateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.value = tomorrow.toISOString().split('T')[0];
      }
      successCard.style.display = 'none';
      viewingForm.style.display = 'block';
      viewingForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  // Dynamic .ics Calendar File Generator
  downloadIcsBtn?.addEventListener('click', () => {
    const dateVal = dateInput?.value || new Date().toISOString().split('T')[0];
    const timeVal = timeSelect?.value || '14:00 - 15:30';
    const startHour = timeVal.startsWith('10') ? '10' : (timeVal.startsWith('17') ? '17' : '14');
    const startMinute = timeVal.startsWith('17') ? '30' : '00';
    const endHour = timeVal.startsWith('10') ? '11' : (timeVal.startsWith('17') ? '19' : '15');
    const endMinute = '30';

    const dateClean = dateVal.replace(/-/g, '');
    const dtStart = `${dateClean}T${startHour}${startMinute}00Z`;
    const dtEnd = `${dateClean}T${endHour}${endMinute}00Z`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//MAISON ELYSEE//Private Viewing Invitation//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:REQUEST',
      'BEGIN:VEVENT',
      `UID:ME-${Date.now()}@maisonelysee.com`,
      `DTSTAMP:${dateClean}T120000Z`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      'SUMMARY:MAISON ÉLYSÉE — Private Residence Walkthrough & Advisory',
      'DESCRIPTION:Private viewing of MAISON ÉLYSÉE Penthouse with Henri de Montmirail, Director of Acquisitions. Direct Concierge: +33 1 42 68 50 18.',
      'LOCATION:18 Avenue Montaigne Adjacency, 75008 Paris, France',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Maison_Elysee_Private_Viewing.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  // =========================================================================
  // 9. PRIVACY POLICY MODAL
  // =========================================================================
  const privacyModal = document.getElementById('privacyModal');
  const privacyCloseBtn = document.getElementById('privacyCloseBtn');
  const privacyLinks = document.querySelectorAll('#privacyLink, #footerPrivacyLink, #footerLegalLink');

  function openPrivacyModal(e) {
    e?.preventDefault();
    if (!privacyModal) return;
    privacyModal.classList.add('open');
    privacyModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closePrivacyModal() {
    if (!privacyModal) return;
    privacyModal.classList.remove('open');
    privacyModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  privacyLinks.forEach(link => link.addEventListener('click', openPrivacyModal));
  privacyCloseBtn?.addEventListener('click', closePrivacyModal);
  privacyModal?.addEventListener('click', (e) => {
    if (e.target.classList.contains('dossier-backdrop')) closePrivacyModal();
  });

  // =========================================================================
  // 10. BACK TO TOP BUTTON
  // =========================================================================
  const backToTopBtn = document.getElementById('backToTopBtn');
  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // =========================================================================
  // 11. SCROLL REVEAL OBSERVER
  // =========================================================================
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  // =========================================================================
  // 12. GLOBAL KEYBOARD ACCESSIBILITY (ESC KEY)
  // =========================================================================
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeDossier();
      closePrivacyModal();
      closeMobileMenu();
    } else if (e.key === 'ArrowRight' && lightbox?.classList.contains('open')) {
      showLightboxIndex(currentPhotoIndex + 1);
    } else if (e.key === 'ArrowLeft' && lightbox?.classList.contains('open')) {
      showLightboxIndex(currentPhotoIndex - 1);
    }
  });

});
