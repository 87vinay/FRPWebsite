document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu functionality
  const mobileMenu = document.getElementById("mobile-menu");
  const navMenu = document.querySelector(".nav-menu");
  mobileMenu.addEventListener("click", function () {
    this.classList.toggle("active");
    navMenu.classList.toggle("active");
  });
  // Close mobile menu when nav links are clicked
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.remove("active");
      navMenu.classList.remove("active");
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
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  });
  // Contact form validation
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;
      if (!name || !email || !subject || !message) {
        showAlert("Please fill in all required fields", "danger");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
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
    contactForm.parentNode.insertBefore(alert, contactForm);
    const closeButton = alert.querySelector(".alert-close");
    closeButton.addEventListener("click", function () {
      alert.remove();
    });
    setTimeout(() => {
      if (document.body.contains(alert)) {
        alert.remove();
      }
    }, 5000);
  }
  // Testimonial carousel
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
        const navbarHeight = document.querySelector(".navbar").offsetHeight;
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

const productData = {
  automotive: {
    title: null,
    products: [
      {
        imageClass: "automotive-1",
        title: "Front & Rear Fascia",
        description: "FRP front and rear fascia for buses & trucks",
      },
      {
        imageClass: "automotive-2",
        title: "Bumpers & Grills",
        description: "FRP front bumpers and grills for commercial vehicles",
      },
      {
        imageClass: "automotive-3",
        title: "Dashboards",
        description: "Custom FRP dashboards for buses & trucks",
      },
      {
        imageClass: "automotive-4",
        title: "Engine Covers",
        description: "Durable FRP engine covers for commercial vehicles",
      },
    ],
    additionalContent: `
    <div class="product-info">
        <h3>Automotive FRP Applications</h3>
        <p>Our automotive FRP solutions provide lightweight, durable alternatives to traditional metal components, resulting in improved fuel efficiency and longer service life.</p>
        <ul>
             <li>Improved thermal insulation properties</li>
            <li>High impact resistance and durability</li>
            <li>Greater design flexibility for complex shapes</li>
            <li>Reduced weight compared to metal components</li>
            <li>Excellent resistance to corrosion and weathering</li>
        </ul>
    </div>
`,
  },
  industrial: {
    title: null,
    products: [
      {
        imageClass: "industrial-1",
        title: "Storage Solutions",
        description: "FRP storage containers for various industries",
      },
      {
        imageClass: "industrial-2",
        title: "Sepration Rooms",
        description: "FRP separation rooms for clean environments",
      },
      {
        imageClass: "industrial-3",
        title: "Conveyor Trays",
        description: "Multiple FRP trays for conveyor systems",
      },
      {
        imageClass: "industrial-4",
        title: "Porta Cabins",
        description: "FRP porta cabins for temporary setups",
      },
    ],
    additionalContent: `
          <div class="product-list-full">
              <h3>Industrial Applications:</h3>
              <ul>
                  <li>Water tanks with capacities of 5000-50000 liters</li>
                  <li>Clean room setups</li>
                  <li>Conveyor belt trays and robotic arm container trays</li>
                  <li>Chemical storage solutions</li>
                  <li>Naturopathy treatment equipment</li>
                  <li>Sewer treatment plant components</li>
                  <li>Porta cabins and shelters</li>
              </ul>
          </div>
      `,
  },
  custom: {
    title: null,
    products: [
      {
        imageClass: "custom-1",
        title: "Bus stand with toilet",
        description: "FRP bus stand with integrated toilet facility",
      },
      {
        imageClass: "custom-2",
        title: "Customized Boxes",
        description: "Custom FRP boxes for various applications",
      },
      {
        imageClass: "custom-3",
        title: "Amusement Park Items",
        description: "Various amusement park components in FRP",
      },
      {
        imageClass: "custom-4",
        title: "Jigs & Fixtures",
        description: "Custom jigs and fixtures for various applications",
      },
    ],
    additionalContent: `
          <div class="product-info">
              <h3>Custom Solutions</h3>
              <p>With our expertise in FRP manufacturing, we can create custom solutions for virtually any
                  application. Our team works closely with clients from conceptualization to final
                  commercial supplies, ensuring that each product meets specific requirements and highest
                  quality standards.</p>
              <p>The design flexibility of FRP allows for superior aesthetics compared to traditional
                  materials, while providing enhanced durability and minimum maintenance requirements.</p>
          </div>
      `,
  },
};
// Function to create a product card
function createProductCard(product) {
  return `
      <div class="product-card">
          <div class="product-image ${product.imageClass}"></div>
          <h3>${product.title}</h3>
          <p>${product.description}</p>
      </div>
  `;
}
// Function to render a category tab
function renderCategoryTab(categoryId, isActive = false) {
  const category = productData[categoryId];
  let content = `<div class="tab-item ${
    isActive ? "active" : ""
  }" id="${categoryId}">`;
  // Add product cards
  content += '<div class="product-list">';
  category.products.forEach((product) => {
    content += createProductCard(product);
  });
  content += "</div>";
  // Add additional content if available
  if (category.additionalContent) {
    content += category.additionalContent;
  }
  content += "</div>";
  return content;
}
// Function to initialize the product tabs
function initProductTabs() {
  const tabContent = document.getElementById("product-content");
  let tabsHTML = "";
  // Generate all tabs content
  Object.keys(productData).forEach((categoryId, index) => {
    tabsHTML += renderCategoryTab(categoryId, index === 0);
  });
  tabContent.innerHTML = tabsHTML;
  // Set up tab switching functionality
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabItems = document.querySelectorAll(".tab-item");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons and tabs
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabItems.forEach((item) => item.classList.remove("active"));
      // Add active class to clicked button and corresponding tab
      button.classList.add("active");
      const tabId = button.dataset.id;
      document.getElementById(tabId).classList.add("active");
    });
  });
}
// Initialize when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initProductTabs);

document.addEventListener("DOMContentLoaded", function () {
  const backToTopButton = document.querySelector(".back-to-top");

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
});

document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById("gallery-track");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const indicators = document.getElementById("gallery-indicators");
  const items = document.querySelectorAll(".gallery-item");
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
    timer = setInterval(nextSlide, 1500); // Change slide every 3 seconds
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
