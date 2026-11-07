/**
 * THE MIRRORR Unisex Hair & Beauty Studio - Bengaluru
 * Client Application Logic & Verified Data Controller
 */

// Verified Service & Gallery Data
const SALON_DATA = {
  business: {
    name: "THE MIRRORR Unisex Hair & Beauty Studio",
    phone: "+91 80883 23885",
    phoneRaw: "+918088323885",
    email: "themirrorr2024@gmail.com",
    address: "B. No. 64, 1st Floor, Vinayaka Nagara, Hosa Road, near Sobha Silicon Oasis, Doddanagamangala Village, Naganathapura, Bengaluru, Karnataka 560100",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=12.818598022474724,77.74761579415772"
  },
  services: [
    {
      id: "women-hair-cut",
      title: "Women Hair Cut",
      categoryKey: "hair-cut",
      categoryName: "Hair Styling & Cuts",
      image: "assets/images/service_haircut.jpg",
      remoteImage: "https://productimages.withfloats.com/serviceimages/tile/660b99a65a08a11d4626643awoman-getting-her-hair-cut-beauty-salon-scaled",
      alt: "Professional women's haircut and styling at THE MIRRORR salon",
      summary: "Personalized hair cutting designed to elevate your style and accentuate your natural beauty, from trendy bob cuts to classic layers.",
      fullDescription: `At The Mirror Salon, our Women's Hair Cut service is designed to elevate your style and accentuate your natural beauty. Our experienced stylists are adept at creating personalized cuts tailored to your unique preferences and features.

Whether you're looking for a bold new look or a subtle refresh, we're here to bring your vision to life. From trendy bob cuts to classic layers, we offer a diverse range of styles to suit every taste. With attention to detail and precision, we ensure that each cut complements your face shape and enhances your overall look.

Step into The Mirror Salon and let us transform your hair into a masterpiece of style and sophistication.`,
      features: [
        "Personalized face-shape & texture consultation",
        "Trendy bob cuts, classic layers & contemporary trims",
        "Blowout finishing & home styling maintenance advice",
        "Hygienic tools & dedicated styling stations"
      ],
      tags: ["hosa road", "bangalore", "karnataka", "pragathi nagar", "parappana agrahara"]
    },
    {
      id: "women-hair-color",
      title: "Women Hair Color",
      categoryKey: "hair-color",
      categoryName: "Hair Color & Treatments",
      image: "assets/images/service_haircolor.jpg",
      remoteImage: "https://productimages.withfloats.com/serviceimages/tile/660b9d469f6e942b760d62d2HD-wallpaper-hair-colorful-skin-texture",
      alt: "Rich hair coloring, highlights, and custom tones at THE MIRRORR",
      summary: "Transformative and subtle coloring with custom blending, gentle damage-free formulas, and tailored aftercare.",
      fullDescription: `Highlights of our Hair Color Services:

1. Custom Consultation: Before any color service, we offer a personalized consultation to understand your preferences, lifestyle, and hair goals. This ensures that we tailor the color to suit you perfectly.

2. Professional Expertise: Our team of skilled colorists stays updated with the latest trends and techniques in hair coloring. You can trust us to deliver high-quality results every time.

3. Wide Range of Options: From vibrant hues to soft, natural tones, we offer a comprehensive range of color options to suit every taste and complexion.

4. Custom Blending: We specialize in custom blending techniques to create a unique color that complements your skin tone and enhances your features.

5. Damage-Free Formulas: We prioritize the health of your hair, using gentle, ammonia-free formulas that minimize damage and maintain the integrity of your strands.

6. Color Correction: If you're unhappy with a previous color treatment or need a correction, our color experts can help you achieve the desired result safely and effectively.

7. Long-Lasting Results: We use top-quality color products that ensure your color stays vibrant and beautiful for as long as possible, with minimal fading.

8. Aftercare Advice: To help you maintain your color between salon visits, we provide personalized aftercare advice and recommend professional-grade products to keep your hair healthy and vibrant.

At The Mirror Salon, we're passionate about helping you look and feel your best. Trust us to bring out the true beauty of your hair with our exceptional color services. Schedule your appointment today and let us transform your look!`,
      features: [
        "1. Custom Consultation tailored to lifestyle and skin tone",
        "2. Professional Expertise with latest blending techniques",
        "3. Wide Range from natural nuances to vibrant balayage",
        "4. Damage-Free Formulas prioritizing hair health",
        "5. Corrective Color & Pro Aftercare Guidance"
      ],
      tags: ["hosa road", "pragathi nagar", "bangalore", "karnataka", "electronic city"]
    },
    {
      id: "massage",
      title: "Massage Therapy",
      categoryKey: "massage",
      categoryName: "Massage Therapy",
      image: "assets/images/service_massage.jpg",
      remoteImage: "https://productimages.withfloats.com/serviceimages/tile/66176d8d9e6097d4ec18726fthemirrorr01",
      alt: "Tranquil massage therapy and relaxation session at THE MIRRORR",
      summary: "Premier massage experience blending ancient techniques with modern expertise, featuring Swedish, deep tissue, hot stone, and aromatherapy styles.",
      fullDescription: `"Indulge in a world of relaxation with our premier massage service, tailored to elevate your mind, body, and spirit. Our skilled therapists blend ancient techniques with modern expertise to provide you with a rejuvenating experience like no other.

Embark on a journey of tranquility as our therapists work their magic, easing tension and soothing tired muscles with expert precision. Choose from a variety of massage styles, including Swedish, deep tissue, hot stone, aromatherapy, and more, each designed to address your specific needs and preferences.

Step into our serene oasis, where every detail is crafted to enhance your comfort and well-being. Let the gentle music, calming aromas, and plush surroundings transport you to a state of blissful relaxation. Whether you seek relief from stress, muscle soreness, or simply crave a moment of pampering, our massage service promises to leave you feeling refreshed, renewed, and revitalized.

Experience the ultimate in relaxation and wellness with our exceptional massage service. Book your appointment today and treat yourself to the luxury you deserve."`,
      features: [
        "Swedish Massage for gentle circulation and tension relief",
        "Deep Tissue Massage for persistent muscle knots and fatigue",
        "Hot Stone Therapy for deep penetrating warmth",
        "Aromatherapy infused with botanical essential oils",
        "Private therapy suite with soothing background music"
      ],
      tags: ["massage service in hosa road", "head massage center in hosa road", "best massage center in bangalore"]
    },
    {
      id: "body-polishing",
      title: "Body Polishing",
      categoryKey: "body-polishing",
      categoryName: "Skin & Body Polishing",
      image: "assets/images/service_bodypolishing.jpg",
      remoteImage: "https://productimages.withfloats.com/serviceimages/tile/66177640c81c35d61fdfd13ddiy-body-polishingthemirrorr",
      alt: "Luxurious 4-stage body polishing ritual for radiant, glowing skin",
      summary: "Four-step luxurious skin treatment combining gentle exfoliation, deep antioxidant hydration, soothing massage, and silky finishing touches.",
      fullDescription: `Indulge in Luxury: Body Polishing Service

Unveil a radiant, luminous glow with our exclusive Body Polishing service, designed to pamper your skin and revitalize your senses. Our skilled therapists combine the finest ingredients with expert techniques to deliver a transformative experience that leaves your skin irresistibly smooth and radiant.

Experience the Ritual:

1. Exfoliation: Begin your journey to silky-smooth skin with a gentle exfoliation process that sloughs away dead skin cells, revealing the fresh, luminous skin beneath. Our exfoliating formulas are meticulously crafted to buff and refine, leaving your skin velvety soft and glowing.

2. Hydration: Replenish your skin's moisture balance with our nourishing hydration treatments. Luxurious oils and creams infused with potent antioxidants and vitamins are expertly massaged into your skin, restoring vitality and suppleness while promoting cellular renewal.

3. Massage: Drift into a state of bliss as our skilled therapists indulge your senses with a soothing massage. Tailored to your preferences, our massages melt away tension and stress, promoting relaxation and enhancing the overall well-being of your body and mind.

4. Finishing Touches: Complete your body polishing experience with a lavish application of hydrating body butter or oil, leaving your skin enveloped in a delicate veil of silkiness. Revel in the sensation of silky-smooth skin and bask in the glow of your rejuvenated complexion.

Benefits:
- Radiant Skin: Say goodbye to dullness and hello to luminosity as our Body Polishing service unveils your skin's natural radiance.
- Deep Hydration: Restore moisture levels and replenish dry, thirsty skin with our intensive hydration treatments.
- Stress Relief: Indulge in a moment of relaxation and tranquility with our soothing massage techniques, designed to melt away tension and promote overall well-being.
- Silky Smooth Texture: Experience the luxurious sensation of velvety soft skin, courtesy of our expert exfoliation and moisturizing rituals.

Treat yourself to the ultimate indulgence with our Body Polishing service and discover the transformative power of radiant, luminous skin. Book your appointment today and embark on a journey to rejuvenation and renewal.`,
      features: [
        "Stage 1: Gentle skin-buffing exfoliation",
        "Stage 2: Antioxidant & vitamin deep hydration infusion",
        "Stage 3: Tension-relieving therapeutic body massage",
        "Stage 4: Finishing touches with lavish body butter",
        "Restores natural radiance, softness, and elasticity"
      ],
      tags: ["body polishing service in hosa road", "body polishing service in bangalore", "body polishing service in pragathi nagar"]
    }
  ],
  gallery: [
    {
      id: "gal-1",
      src: "assets/images/gallery_1.jpg",
      remoteSrc: "https://fpimages.withfloats.com/actual/660b9376c27c8bfa4465e790.jpg",
      alt: "Spacious salon floor with illuminated styling mirrors and comfortable chairs",
      caption: "Spacious Unisex Styling Floor",
      category: "ambience"
    },
    {
      id: "gal-2",
      src: "assets/images/gallery_2.jpg",
      remoteSrc: "https://fpimages.withfloats.com/actual/660b9383887b35bf51b153a8.jpg",
      alt: "Dedicated hair wash and conditioning station with ergonomic recliners",
      caption: "Hair Wash & Spa Reclining Stations",
      category: "hair"
    },
    {
      id: "gal-3",
      src: "assets/images/gallery_3.jpg",
      remoteSrc: "https://fpimages.withfloats.com/actual/660b938217445f91396ca91e.jpg",
      alt: "Warm ambient studio lighting and immaculate salon interior",
      caption: "Warm & Tranquil Studio Atmosphere",
      category: "ambience"
    },
    {
      id: "gal-4",
      src: "assets/images/gallery_4.jpg",
      remoteSrc: "https://fpimages.withfloats.com/actual/660b9382231ec71601affd94.jpg",
      alt: "Precision hair cutting and color consultation station",
      caption: "Consultation & Precision Cut Mirrors",
      category: "hair"
    },
    {
      id: "gal-5",
      src: "assets/images/gallery_5.jpg",
      remoteSrc: "https://fpimages.withfloats.com/actual/660b93750d2b465f92892af9.jpg",
      alt: "Private therapy suite for Swedish, deep tissue, and hot stone massage",
      caption: "Private Massage & Therapy Suite",
      category: "wellness"
    },
    {
      id: "gal-6",
      src: "assets/images/gallery_6.jpg",
      remoteSrc: "https://fpimages.withfloats.com/actual/660b93829f37f5af97e0a14d.jpg",
      alt: "Welcoming reception and waiting lounge for clients",
      caption: "Hospitable Reception & Waiting Area",
      category: "ambience"
    },
    {
      id: "gal-7",
      src: "assets/images/gallery_7.jpg",
      remoteSrc: "https://fpimages.withfloats.com/actual/660b93759f37f5af97e0a137.jpg",
      alt: "Clean, sanitized professional salon tools and grooming supplies",
      caption: "Strictly Sanitized Grooming Equipment",
      category: "wellness"
    },
    {
      id: "gal-8",
      src: "assets/images/gallery_8.jpg",
      remoteSrc: "https://fpimages.withfloats.com/actual/660b93837158b0d796cf841a.jpg",
      alt: "Wide panoramic view of THE MIRRORR salon studio on Hosa Road, Bengaluru",
      caption: "Full Studio Interior on Hosa Road",
      category: "ambience"
    }
  ]
};

// DOM State & Controllers
document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  renderServices(SALON_DATA.services);
  initServiceFilters();
  initServiceSearch();
  renderGallery(SALON_DATA.gallery);
  initGalleryFilters();
  initGalleryLightbox();
  initServiceModal();
  initContactForm();
  handleUrlHashRouting();
});

/* ==========================================================================
   Mobile Navigation Drawer
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById("mobileToggle");
  const closeBtn = document.getElementById("drawerClose");
  const drawer = document.getElementById("mobileDrawer");
  const backdrop = document.getElementById("drawerBackdrop");
  const drawerLinks = document.querySelectorAll(".drawer-nav-link");

  function openDrawer() {
    drawer.classList.add("open");
    backdrop.classList.add("open");
    toggleBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    drawer.classList.remove("open");
    backdrop.classList.remove("open");
    toggleBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  if (toggleBtn) toggleBtn.addEventListener("click", openDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  if (backdrop) backdrop.addEventListener("click", closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener("click", closeDrawer);
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("open")) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   Services Rendering & Filtering
   ========================================================================== */
function renderServices(servicesToRender) {
  const container = document.getElementById("servicesGrid");
  if (!container) return;

  if (servicesToRender.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; background: #fff; border-radius: 12px; border: 1px solid var(--border-subtle);">
        <p style="font-size: 1.1rem; color: var(--text-muted); margin-bottom: 12px;">No matching services found.</p>
        <button class="btn btn-secondary btn-sm" onclick="resetFilters()">Reset Search & Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = servicesToRender.map(service => {
    const featureItems = service.features.slice(0, 3).map(f => `
      <li class="service-feature-item">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>${escapeHtml(f)}</span>
      </li>
    `).join("");

    return `
      <article class="service-card" data-category="${service.categoryKey}" id="card-${service.id}">
        <div class="service-card-media">
          <img 
            src="${service.image}" 
            alt="${escapeHtml(service.alt)}" 
            class="service-card-img" 
            loading="lazy"
            onerror="this.onerror=null; this.src='${service.remoteImage}'"
          >
          <span class="service-category-tag">${escapeHtml(service.categoryName)}</span>
        </div>
        <div class="service-card-body">
          <h3 class="service-card-title">${escapeHtml(service.title)}</h3>
          <p class="service-card-summary">${escapeHtml(service.summary)}</p>
          
          <ul class="service-feature-checklist">
            ${featureItems}
          </ul>

          <div class="service-pricing-row">
            <span class="pricing-label">Service Fee</span>
            <span class="pricing-val" title="Reference website does not publish fixed prices. Contact salon for exact consultation rates.">
              Contact us for pricing
            </span>
          </div>

          <div class="service-card-actions">
            <button 
              type="button" 
              class="btn btn-secondary btn-sm" 
              onclick="openServiceModal('${service.id}')"
              aria-label="View full details for ${escapeHtml(service.title)}"
            >
              View Full Details
            </button>
            <button 
              type="button" 
              class="btn btn-primary btn-sm" 
              onclick="selectServiceAndScroll('${escapeHtml(service.title)}')"
              aria-label="Enquire about ${escapeHtml(service.title)}"
            >
              Enquire Now
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function initServiceFilters() {
  const filterBtns = document.querySelectorAll(".services-filter-toolbar .filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.getAttribute("data-category");
      filterServices();
    });
  });
}

function initServiceSearch() {
  const searchInput = document.getElementById("serviceSearchInput");
  if (!searchInput) return;

  searchInput.addEventListener("input", () => {
    filterServices();
  });
}

function filterServices() {
  const activeBtn = document.querySelector(".services-filter-toolbar .filter-btn.active");
  const category = activeBtn ? activeBtn.getAttribute("data-category") : "all";
  const searchInput = document.getElementById("serviceSearchInput");
  const query = searchInput ? searchInput.value.toLowerCase().trim() : "";

  const filtered = SALON_DATA.services.filter(service => {
    const matchesCategory = (category === "all" || service.categoryKey === category);
    const matchesQuery = query === "" || 
      service.title.toLowerCase().includes(query) ||
      service.summary.toLowerCase().includes(query) ||
      service.fullDescription.toLowerCase().includes(query) ||
      service.tags.some(t => t.toLowerCase().includes(query));
    
    return matchesCategory && matchesQuery;
  });

  renderServices(filtered);
}

window.resetFilters = function() {
  const searchInput = document.getElementById("serviceSearchInput");
  if (searchInput) searchInput.value = "";
  const filterBtns = document.querySelectorAll(".services-filter-toolbar .filter-btn");
  filterBtns.forEach(b => {
    if (b.getAttribute("data-category") === "all") b.classList.add("active");
    else b.classList.remove("active");
  });
  renderServices(SALON_DATA.services);
};

/* ==========================================================================
   Service Details Modal
   ========================================================================== */
function initServiceModal() {
  const modal = document.getElementById("serviceModal");
  const closeBtn = document.getElementById("modalClose");
  if (!modal || !closeBtn) return;

  closeBtn.addEventListener("click", closeServiceModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeServiceModal();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeServiceModal();
    }
  });
}

window.openServiceModal = function(serviceId) {
  const service = SALON_DATA.services.find(s => s.id === serviceId);
  if (!service) return;

  const modal = document.getElementById("serviceModal");
  const img = document.getElementById("modalImg");
  const cat = document.getElementById("modalCategory");
  const title = document.getElementById("modalTitle");
  const body = document.getElementById("modalBody");
  const tagsRow = document.getElementById("modalTags");
  const bookBtn = document.getElementById("modalBookBtn");

  if (img) {
    img.src = service.image;
    img.alt = service.alt;
    img.onerror = function() { this.src = service.remoteImage; };
  }
  if (cat) cat.textContent = service.categoryName;
  if (title) title.textContent = service.title;
  if (body) body.textContent = service.fullDescription;
  
  if (tagsRow) {
    tagsRow.innerHTML = service.tags.map(t => `<span class="modal-tag">#${escapeHtml(t)}</span>`).join("");
  }

  if (bookBtn) {
    bookBtn.onclick = () => {
      closeServiceModal();
      selectServiceAndScroll(service.title);
    };
  }

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
  window.location.hash = `service-${service.id}`;
};

function closeServiceModal() {
  const modal = document.getElementById("serviceModal");
  if (modal) modal.classList.remove("active");
  document.body.style.overflow = "";
  if (window.location.hash.startsWith("#service-")) {
    history.pushState("", document.title, window.location.pathname + window.location.search);
  }
}

/* ==========================================================================
   Gallery Rendering & Lightbox
   ========================================================================== */
let activeLightboxIndex = 0;
let currentGalleryList = [...SALON_DATA.gallery];

function renderGallery(galleryItems) {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;

  grid.innerHTML = galleryItems.map((item, index) => {
    return `
      <div class="gallery-item" data-category="${item.category}" onclick="openLightbox(${index})" tabindex="0" role="button" aria-label="View ${escapeHtml(item.caption)}">
        <img 
          src="${item.src}" 
          alt="${escapeHtml(item.alt)}" 
          class="gallery-thumb" 
          loading="lazy"
          onerror="this.onerror=null; this.src='${item.remoteSrc}'"
        >
        <div class="gallery-overlay">
          <span class="gallery-item-cat">${escapeHtml(item.category)}</span>
          <p class="gallery-item-title">${escapeHtml(item.caption)}</p>
        </div>
      </div>
    `;
  }).join("");
}

function initGalleryFilters() {
  const filterBtns = document.querySelectorAll(".gallery-filter-row .filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.getAttribute("data-filter");

      if (category === "all") {
        currentGalleryList = [...SALON_DATA.gallery];
      } else {
        currentGalleryList = SALON_DATA.gallery.filter(i => i.category === category);
      }
      renderGallery(currentGalleryList);
    });
  });
}

function initGalleryLightbox() {
  const modal = document.getElementById("lightboxModal");
  const closeBtn = document.getElementById("lightboxClose");
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");

  if (!modal) return;

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (prevBtn) prevBtn.addEventListener("click", showPrevImage);
  if (nextBtn) nextBtn.addEventListener("click", showNextImage);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeLightbox();
  });

  window.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showPrevImage();
    if (e.key === "ArrowRight") showNextImage();
  });
}

window.openLightbox = function(index) {
  activeLightboxIndex = index;
  updateLightboxContent();
  const modal = document.getElementById("lightboxModal");
  if (modal) modal.classList.add("active");
  document.body.style.overflow = "hidden";
};

function closeLightbox() {
  const modal = document.getElementById("lightboxModal");
  if (modal) modal.classList.remove("active");
  document.body.style.overflow = "";
}

function updateLightboxContent() {
  const item = currentGalleryList[activeLightboxIndex];
  if (!item) return;

  const img = document.getElementById("lightboxImg");
  const caption = document.getElementById("lightboxCaption");

  if (img) {
    img.src = item.src;
    img.alt = item.alt;
    img.onerror = function() { this.src = item.remoteSrc; };
  }
  if (caption) {
    caption.textContent = `${item.caption} (${activeLightboxIndex + 1} of ${currentGalleryList.length})`;
  }
}

function showPrevImage() {
  activeLightboxIndex = (activeLightboxIndex - 1 + currentGalleryList.length) % currentGalleryList.length;
  updateLightboxContent();
}

function showNextImage() {
  activeLightboxIndex = (activeLightboxIndex + 1) % currentGalleryList.length;
  updateLightboxContent();
}

/* ==========================================================================
   Contact / "Ask Us Anything" Form Handler
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById("enquiryForm");
  const successModal = document.getElementById("successModal");
  const successClose = document.getElementById("successCloseBtn");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("formName").value.trim();
    const contact = document.getElementById("formContact").value.trim();
    const service = document.getElementById("formService").value;
    const timeSlot = document.getElementById("formTimeSlot").value;
    const message = document.getElementById("formMessage").value.trim();

    if (!name || !contact) {
      alert("Please provide your name and contact details (phone or email).");
      return;
    }

    // Populate success modal summary
    const summaryBox = document.getElementById("successSummary");
    if (summaryBox) {
      summaryBox.innerHTML = `
        <div style="text-align: left; background: var(--bg-primary); padding: 16px; border-radius: 8px; margin: 16px 0; font-size: 0.875rem; border: 1px solid var(--border-subtle);">
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Contact:</strong> ${escapeHtml(contact)}</p>
          <p><strong>Requested Service:</strong> ${escapeHtml(service || 'General Enquiry')}</p>
          <p><strong>Preferred Time:</strong> ${escapeHtml(timeSlot || 'Anytime')}</p>
          ${message ? `<p><strong>Message:</strong> ${escapeHtml(message)}</p>` : ''}
          <p style="margin-top: 8px; color: var(--accent-sage); font-weight: 600;">Status: Demo Request Logged (No live server submission)</p>
        </div>
      `;
    }

    // Show modal
    if (successModal) successModal.classList.add("active");
    document.body.style.overflow = "hidden";

    // Reset form
    form.reset();
  });

  if (successClose) {
    successClose.addEventListener("click", () => {
      if (successModal) successModal.classList.remove("active");
      document.body.style.overflow = "";
    });
  }
}

window.selectServiceAndScroll = function(serviceTitle) {
  const select = document.getElementById("formService");
  if (select) {
    select.value = serviceTitle;
  }
  const contactSection = document.getElementById("contact");
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      const msgInput = document.getElementById("formMessage");
      if (msgInput) msgInput.focus();
    }, 600);
  }
};

/* ==========================================================================
   Deep Link & Hash Routing
   ========================================================================== */
function handleUrlHashRouting() {
  const hash = window.location.hash;
  if (!hash) return;

  if (hash.startsWith("#service-")) {
    const serviceId = hash.replace("#service-", "");
    setTimeout(() => {
      openServiceModal(serviceId);
    }, 200);
  }
}

// Utility
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
