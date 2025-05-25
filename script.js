document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu functionality
  const mobileMenu = document.getElementById("mobile-menu");
  const navMenu = document.querySelector(".nav-menu");

  if (mobileMenu && navMenu) {
    mobileMenu.addEventListener("click", function () {
      this.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  // Close mobile menu when nav links are clicked
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (mobileMenu && navMenu) {
        mobileMenu.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });
  });

  // Scroll animation functionality
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (elementPosition < windowHeight - 100) {
        element.classList.add("visible");
      }
    });
  };

  const addFadeInClass = function () {
    document
      .querySelectorAll(".card, .process-step, .tech-item, .product-card")
      .forEach((item) => {
        item.classList.add("fade-in");
      });
  };

  addFadeInClass();
  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll();

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 100) {
        navbar.classList.add("navbar-scrolled");
      } else {
        navbar.classList.remove("navbar-scrolled");
      }
    });
  }

  // Contact form validation - Fixed to match HTML form fields
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const message = document.getElementById("message");

      // Check if elements exist before accessing their values
      if (!name || !email || !message) {
        showAlert("Form fields not found", "danger");
        return;
      }

      const nameValue = name.value.trim();
      const emailValue = email.value.trim();
      const messageValue = message.value.trim();

      if (!nameValue || !emailValue || !messageValue) {
        showAlert("Please fill in all required fields", "danger");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailValue)) {
        showAlert("Please enter a valid email address", "danger");
        return;
      }

      showAlert("Your message has been sent successfully!", "success");
      contactForm.reset();
    });
  }

  function showAlert(message, type) {
    const existingAlert = document.querySelector(".alert");
    if (existingAlert) {
      existingAlert.remove();
    }

    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
            <div class="alert-message">${message}</div>
            <button class="alert-close">&times;</button>
        `;

    if (contactForm && contactForm.parentNode) {
      contactForm.parentNode.insertBefore(alert, contactForm);
    }

    const closeButton = alert.querySelector(".alert-close");
    if (closeButton) {
      closeButton.addEventListener("click", function () {
        alert.remove();
      });
    }

    setTimeout(() => {
      if (document.body.contains(alert)) {
        alert.remove();
      }
    }, 5000);
  }

  // Testimonial carousel - Added null check
  let currentTestimonial = 0;
  const testimonials = document.querySelectorAll(".testimonial");
  const testimonialCount = testimonials.length;

  function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
      testimonial.style.transform = `translateX(${100 * (i - index)}%)`;
    });
  }

  if (testimonialCount > 0) {
    showTestimonial(currentTestimonial);
    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonialCount;
      showTestimonial(currentTestimonial);
    }, 5000);
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navbar = document.querySelector(".navbar");
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Dynamic styles
  const style = document.createElement("style");
  style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
        .navbar-scrolled {
            padding: 0.5rem 0;
            background-color: rgba(255, 255, 255, 0.98);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .alert {
            padding: 1rem;
            margin-bottom: 1rem;
            border-radius: 4px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .alert-success {
            background-color: rgba(16, 185, 129, 0.1);
            border: 1px solid #10b981;
            color: #10b981;
        }
        .alert-danger {
            background-color: rgba(239, 68, 68, 0.1);
            border: 1px solid #ef4444;
            color: #ef4444;
        }
        .alert-close {
            background: none;
            border: none;
            font-size: 1.25rem;
            cursor: pointer;
            color: inherit;
        }
        .testimonial {
            position: absolute;
            width: 100%;
            transition: transform 0.5s ease;
        }
    `;
  document.head.appendChild(style);

  // Mobile styles
  const mobileStyle = document.createElement("style");
  mobileStyle.textContent = `
        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                top: 60px;
                left: -100%;
                width: 80%;
                height: 100vh;
                background-color: var(--white);
                flex-direction: column;
                padding: 2rem;
                transition: left 0.3s ease;
                box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
            }
            .nav-menu.active {
                left: 0;
            }
            .nav-menu li {
                margin: 1rem 0;
            }
            .menu-toggle {
                display: flex !important;
                flex-direction: column;
                justify-content: space-between;
                width: 30px;
                height: 21px;
                cursor: pointer;
            }
            .menu-toggle .bar {
                height: 3px;
                width: 100%;
                background-color: var(--primary-color);
                border-radius: 3px;
                transition: var(--transition);
            }
            .menu-toggle.active .bar:nth-child(1) {
                transform: translateY(9px) rotate(45deg);
            }
            .menu-toggle.active .bar:nth-child(2) {
                opacity: 0;
            }
            .menu-toggle.active .bar:nth-child(3) {
                transform: translateY(-9px) rotate(-45deg);
            }
        }
    `;
  document.head.appendChild(mobileStyle);
});

// Back to top functionality
document.addEventListener("DOMContentLoaded", function () {
  const backToTopButton = document.querySelector(".back-to-top");

  if (backToTopButton) {
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 500) {
        backToTopButton.classList.add("visible");
      } else {
        backToTopButton.classList.remove("visible");
      }
    });

    backToTopButton.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});

// Gallery functionality - FIXED: Better error handling and element checking
document.addEventListener("DOMContentLoaded", function () {
  // Check if gallery container exists first
  const galleryContainer = document.querySelector(
    ".gallery-container, .gallery, [data-gallery]"
  );

  if (!galleryContainer) {
    console.log(
      "No gallery container found - gallery functionality not needed"
    );
    return;
  }

  const track = document.getElementById("gallery-track");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const indicators = document.getElementById("gallery-indicators");

  // Only show error if gallery container exists but elements are missing
  if (!track || !prevBtn || !nextBtn || !indicators) {
    console.warn("Gallery container found but required elements missing:", {
      track: !!track,
      prevBtn: !!prevBtn,
      nextBtn: !!nextBtn,
      indicators: !!indicators,
    });
    return;
  }

  const items = document.querySelectorAll(".gallery-item");

  if (items.length === 0) {
    console.log("No gallery items found");
    return;
  }

  function getVisibleItemsCount() {
    if (window.innerWidth < 768) {
      return 1; // Mobile: 1 item
    } else if (window.innerWidth < 1024) {
      return 2; // Tablet: 2 items
    } else {
      return 4; // Desktop: 4 items
    }
  }

  let visibleItems = getVisibleItemsCount();
  const totalItems = items.length;
  let currentIndex = 0;
  let timer;

  function setItemWidths() {
    visibleItems = getVisibleItemsCount();
    const containerWidth = track.parentElement.clientWidth;
    const gap = 16;
    const totalGapWidth = gap * (visibleItems - 1);
    const itemWidth = (containerWidth - totalGapWidth) / visibleItems;

    items.forEach((item) => {
      item.style.width = `${itemWidth}px`;
    });

    if (currentIndex > totalItems - visibleItems) {
      currentIndex = Math.max(0, totalItems - visibleItems);
    }
    moveToIndex(currentIndex);
    createIndicators();
    updateIndicators();
  }

  function createIndicators() {
    indicators.innerHTML = "";
    const pages = Math.ceil((totalItems - visibleItems + 1) / 1);

    for (let i = 0; i < pages; i++) {
      const dot = document.createElement("div");
      dot.classList.add("indicator");
      if (i === Math.floor(currentIndex / 1)) dot.classList.add("active");
      dot.addEventListener("click", () => {
        currentIndex = i;
        moveToIndex(currentIndex);
        updateIndicators();
        resetAutoScroll();
      });
      indicators.appendChild(dot);
    }
  }

  function updateIndicators() {
    const activePage = Math.floor(currentIndex / 1);
    const dots = document.querySelectorAll(".indicator");

    dots.forEach((dot, i) => {
      if (i === activePage) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  function moveToIndex(index) {
    const itemWidth = items[0].offsetWidth;
    const gapWidth = 16;
    track.style.transform = `translateX(-${index * (itemWidth + gapWidth)}px)`;
  }

  function nextSlide() {
    if (currentIndex >= totalItems - visibleItems) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
    moveToIndex(currentIndex);
    updateIndicators();
  }

  function prevSlide() {
    if (currentIndex <= 0) {
      currentIndex = totalItems - visibleItems;
    } else {
      currentIndex--;
    }
    moveToIndex(currentIndex);
    updateIndicators();
  }

  function startAutoScroll() {
    timer = setInterval(nextSlide, 1500);
  }

  function resetAutoScroll() {
    clearInterval(timer);
    startAutoScroll();
  }

  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetAutoScroll();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetAutoScroll();
  });

  window.addEventListener("resize", () => {
    setItemWidths();
  });

  setItemWidths();
  startAutoScroll();

  track.parentElement.addEventListener("mouseenter", () => {
    clearInterval(timer);
  });

  track.parentElement.addEventListener("mouseleave", () => {
    startAutoScroll();
  });
});

// Product slider functionality - FIXED: Added passive event listeners
document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".product-slider-track");
  const nextButton = document.querySelector(".next-btn");
  const prevButton = document.querySelector(".prev-btn");

  // Only proceed if all elements exist
  if (!track || !nextButton || !prevButton) {
    console.log(
      "Product slider elements not found - skipping slider initialization"
    );
    return;
  }

  const slides = Array.from(track.children);

  if (slides.length === 0) {
    console.log("No slides found - skipping slider initialization");
    return;
  }

  function getSlidesPerView() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    if (window.innerWidth <= 1024) return 3;
    return 4;
  }

  let currentIndex = 0;
  let slidesPerView = getSlidesPerView();

  function setSlideWidth() {
    slidesPerView = getSlidesPerView();
    const slideWidth = 100 / slidesPerView;
    slides.forEach((slide) => {
      slide.style.flex = `0 0 calc(${slideWidth}% - 20px)`;
    });
  }

  function updateSliderPosition() {
    const slideWidth = slides[0].getBoundingClientRect().width + 20;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

    prevButton.disabled = currentIndex === 0;
    prevButton.style.opacity = currentIndex === 0 ? 0.5 : 1;

    nextButton.disabled = currentIndex >= slides.length - slidesPerView;
    nextButton.style.opacity =
      currentIndex >= slides.length - slidesPerView ? 0.5 : 1;
  }

  function moveNext() {
    if (currentIndex < slides.length - slidesPerView) {
      currentIndex++;
      updateSliderPosition();
    }
  }

  function movePrev() {
    if (currentIndex > 0) {
      currentIndex--;
      updateSliderPosition();
    }
  }

  function initSlider() {
    setSlideWidth();
    updateSliderPosition();

    nextButton.addEventListener("click", moveNext);
    prevButton.addEventListener("click", movePrev);

    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") moveNext();
      if (e.key === "ArrowLeft") movePrev();
    });

    let touchStartX = 0;
    let touchEndX = 0;

    // FIXED: Added passive option to touchstart event listener
    track.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    track.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      },
      { passive: true }
    );

    function handleSwipe() {
      const swipeThreshold = 50;
      if (touchEndX < touchStartX - swipeThreshold) {
        moveNext();
      }
      if (touchEndX > touchStartX + swipeThreshold) {
        movePrev();
      }
    }
  }

  window.addEventListener("resize", function () {
    setSlideWidth();
    updateSliderPosition();
  });

  initSlider();
});
