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
        title: "Tripod Bases",
        description: "FRP tripod bases for vessels under RTM",
      },
      {
        imageClass: "industrial-2",
        title: "Vessel Liners",
        description: "FRP liner for vessels under HLU",
      },
      {
        imageClass: "industrial-3",
        title: "Conveyor Trays",
        description: "Multiple FRP trays for conveyor systems",
      },
      {
        imageClass: "industrial-4",
        title: "Water Tanks",
        description: "FRP water tanks from 5000 to 50000 ltr capacity",
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
        title: "Furniture Components",
        description: "Custom FRP furniture and school furniture",
      },
      {
        imageClass: "custom-2",
        title: "Spa Products",
        description: "FRP components for salons and spas",
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
