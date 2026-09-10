/* =========================================
   AUXANO INSTITUTE OF TECHNOLOGY
   Class 4 — First JavaScript
   Author  : Haleemat Sikiru
   Purpose : Production-ready JS for a
             beginner portfolio / landing page
   ========================================= */


/* ─────────────────────────────────────────
   HOW TO INTEGRATE THIS FILE
   ─────────────────────────────────────────
   1. Save this file as  script.js  in the
      same folder as your HTML file.
   2. Add this ONE line just before </body>
      in My_First_Webpage.html:

      <script src="script.js"></script>

   3. Add the HTML snippets shown in each
      section below where instructed.
   ───────────────────────────────────────── */


/* =========================================
   1. SMOOTH SCROLLING FOR ANCHOR LINKS
   =========================================
   What it does : Any link like <a href="#about">
   will glide smoothly to that section instead
   of jumping instantly.

   HTML needed  : Add id attributes to your
   sections, e.g.  <section id="about">

   The CSS already has  scroll-behavior: smooth
   on <html>, but this JS version also works in
   older browsers that ignore that CSS rule.
   ========================================= */

function initSmoothScrolling() {
  // Select every link whose href starts with "#"
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      // Stop the browser's default jump behaviour
      event.preventDefault();

      // Read the target id from the href  (e.g. "#about" → "about")
      const targetId = this.getAttribute("href").slice(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Scroll the target into view with a smooth animation
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        console.log("Smooth scrolling to:", targetId);
      }
    });
  });

  console.log("✅ Smooth scrolling initialised on", anchorLinks.length, "link(s).");
}


/* =========================================
   2. SCROLL ANIMATIONS (fade-in / slide-up)
   =========================================
   What it does : Elements appear with a
   fade + upward slide the moment they enter
   the viewport while the user scrolls.

   Uses : IntersectionObserver API — a modern
   browser feature that watches elements and
   fires a callback when they become visible.

   HTML needed  : Add  class="animate-on-scroll"
   to any element you want to animate, e.g.:
     <p class="animate-on-scroll">...</p>
     <ul class="animate-on-scroll">...</ul>

   CSS needed   : Copy the block at the bottom
   of this file into your style.css.
   ========================================= */

function initScrollAnimations() {
  // Grab every element that should animate
  const animatedElements = document.querySelectorAll(".animate-on-scroll");

  if (animatedElements.length === 0) {
    console.log("ℹ️  No elements with class 'animate-on-scroll' found.");
    return;
  }

  // IntersectionObserver fires when an element
  // enters or leaves the viewport
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Element is now visible → add the "visible" class
          entry.target.classList.add("visible");
          console.log("👁️  Animating element:", entry.target.tagName);

          // Stop watching this element once it has animated
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15, // Trigger when 15% of the element is visible
    }
  );

  // Tell the observer to watch every animated element
  animatedElements.forEach(function (el) {
    observer.observe(el);
  });

  console.log("✅ Scroll animations watching", animatedElements.length, "element(s).");
}


/* =========================================
   3. CONTACT FORM VALIDATION
   =========================================
   What it does : Checks that name, email,
   and message are filled in correctly before
   the form is submitted. Shows friendly error
   messages if something is wrong.

   HTML needed  : Add a form like this to
   your HTML file:

   <section id="contact">
     <h2>Contact Me</h2>
     <form id="contactForm" novalidate>
       <input  type="text"  id="name"    placeholder="Your name"    required>
       <span   class="error-msg" id="nameError"></span>

       <input  type="email" id="email"   placeholder="Your email"   required>
       <span   class="error-msg" id="emailError"></span>

       <textarea id="message" placeholder="Your message" required></textarea>
       <span   class="error-msg" id="messageError"></span>

       <button type="submit">Send Message</button>
     </form>
     <p id="formSuccess" style="display:none; color:green;">
       ✅ Message sent! Thank you.
     </p>
   </section>
   ========================================= */

function initContactForm() {
  const form = document.getElementById("contactForm");

  // Exit quietly if there is no form on this page
  if (!form) {
    console.log("ℹ️  No contact form found (id='contactForm').");
    return;
  }

  form.addEventListener("submit", function (event) {
    // Always prevent the default page reload first
    event.preventDefault();

    // Collect values and trim whitespace
    const name    = document.getElementById("name").value.trim();
    const email   = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Clear any previous error messages
    clearError("nameError");
    clearError("emailError");
    clearError("messageError");

    let isValid = true; // assume everything is fine

    // --- Validate Name ---
    if (name === "") {
      showError("nameError", "Please enter your name.");
      isValid = false;
    } else if (name.length < 2) {
      showError("nameError", "Name must be at least 2 characters.");
      isValid = false;
    }

    // --- Validate Email ---
    // A simple regex that checks for the pattern  something@something.something
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      showError("emailError", "Please enter your email address.");
      isValid = false;
    } else if (!emailPattern.test(email)) {
      showError("emailError", "Please enter a valid email (e.g. you@email.com).");
      isValid = false;
    }

    // --- Validate Message ---
    if (message === "") {
      showError("messageError", "Please write a message.");
      isValid = false;
    } else if (message.length < 10) {
      showError("messageError", "Message must be at least 10 characters.");
      isValid = false;
    }

    // If everything passed, show success and reset
    if (isValid) {
      console.log("📧 Form submitted:", { name, email, message });
      form.reset();

      const successMsg = document.getElementById("formSuccess");
      if (successMsg) {
        successMsg.style.display = "block";
        // Hide the success message after 5 seconds
        setTimeout(function () {
          successMsg.style.display = "none";
        }, 5000);
      }
    }
  });

  // Helper: display an error message
  function showError(elementId, message) {
    const el = document.getElementById(elementId);
    if (el) el.textContent = message;
  }

  // Helper: clear an error message
  function clearError(elementId) {
    const el = document.getElementById(elementId);
    if (el) el.textContent = "";
  }

  console.log("✅ Contact form validation ready.");
}


/* =========================================
   4. MOBILE HAMBURGER MENU TOGGLE
   =========================================
   What it does : Shows/hides the navigation
   links on small screens when the ☰ button
   is tapped.

   HTML needed  : Add this nav to your page
   (usually just after <body>):

   <nav id="mainNav">
     <div class="nav-brand">Haleemat Sikiru</div>
     <button id="hamburger" aria-label="Toggle menu" aria-expanded="false">
       ☰
     </button>
     <ul id="navLinks">
       <li><a href="#about">About</a></li>
       <li><a href="#contact">Contact</a></li>
     </ul>
   </nav>

   CSS needed   : Copy the block at the bottom
   of this file into your style.css.
   ========================================= */

function initHamburgerMenu() {
  const hamburger = document.getElementById("hamburger");
  const navLinks  = document.getElementById("navLinks");

  if (!hamburger || !navLinks) {
    console.log("ℹ️  No hamburger menu found.");
    return;
  }

  hamburger.addEventListener("click", function () {
    // Toggle the "open" class on the nav list
    const isOpen = navLinks.classList.toggle("open");

    // Update aria-expanded for accessibility (screen readers)
    hamburger.setAttribute("aria-expanded", isOpen);

    // Switch the icon between ☰ (closed) and ✕ (open)
    hamburger.textContent = isOpen ? "✕" : "☰";

    console.log("🍔 Hamburger menu is now:", isOpen ? "open" : "closed");
  });

  // Close the menu when any nav link is clicked
  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");
      hamburger.setAttribute("aria-expanded", false);
      hamburger.textContent = "☰";
    });
  });

  console.log("✅ Hamburger menu ready.");
}


/* =========================================
   5. DARK MODE TOGGLE (saves preference)
   =========================================
   What it does : Switches the page between
   light and dark themes. Saves the user's
   choice in localStorage so it persists
   the next time they visit.

   HTML needed  : Add a toggle button anywhere:

   <button id="darkModeToggle" aria-label="Toggle dark mode">
     🌙 Dark Mode
   </button>

   CSS needed   : Copy the block at the bottom
   of this file into your style.css.
   ========================================= */

function initDarkMode() {
  const toggleBtn = document.getElementById("darkModeToggle");

  if (!toggleBtn) {
    console.log("ℹ️  No dark mode button found (id='darkModeToggle').");
    return;
  }

  // localStorage lets us remember data across page visits.
  // We store "dark" or "light" under the key "theme".
  const savedTheme = localStorage.getItem("theme");

  // Apply the saved theme immediately (before the page renders)
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    toggleBtn.textContent = "☀️ Light Mode";
  }

  toggleBtn.addEventListener("click", function () {
    // Toggle the class on <body>
    const isDark = document.body.classList.toggle("dark-mode");

    // Update the button label
    toggleBtn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";

    // Save the preference so it survives page refresh
    localStorage.setItem("theme", isDark ? "dark" : "light");

    console.log("🌙 Theme changed to:", isDark ? "dark" : "light");
  });

  console.log("✅ Dark mode ready. Saved theme:", savedTheme || "none (default light)");
}


/* =========================================
   6. SCROLL-TO-TOP BUTTON
   =========================================
   What it does : A floating button appears
   after the user scrolls 300 px down the
   page. Clicking it smoothly scrolls back
   to the top.

   HTML needed  : Add this button anywhere
   inside <body> (it will float via CSS):

   <button id="scrollTopBtn" aria-label="Scroll to top">
     ↑ Top
   </button>

   CSS needed   : Copy the block at the bottom
   of this file into your style.css.
   ========================================= */

function initScrollToTop() {
  const btn = document.getElementById("scrollTopBtn");

  if (!btn) {
    console.log("ℹ️  No scroll-to-top button found (id='scrollTopBtn').");
    return;
  }

  // Listen for the user scrolling the page
  window.addEventListener("scroll", function () {
    // window.scrollY = how many pixels the page has been scrolled down
    if (window.scrollY > 300) {
      btn.classList.add("show"); // make it visible
    } else {
      btn.classList.remove("show"); // hide it again
    }
  });

  // When clicked, scroll smoothly to the very top
  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
    console.log("⬆️  Scrolled back to top.");
  });

  console.log("✅ Scroll-to-top button ready.");
}


/* =========================================
   INITIALISE EVERYTHING
   =========================================
   DOMContentLoaded fires once the HTML has
   been fully parsed — the safe moment to
   start attaching JavaScript behaviour.
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 script.js loaded for:", document.title);

  initSmoothScrolling();
  initScrollAnimations();
  initContactForm();
  initHamburgerMenu();
  initDarkMode();
  initScrollToTop();

  console.log("🎉 All features initialised successfully!");
});


/* =========================================
   COMPANION CSS — PASTE INTO style.css
   =========================================
   Copy everything between the dashes below
   and paste it at the END of your style.css.
   ─────────────────────────────────────────

   === 2. Scroll animations ===

   .animate-on-scroll {
     opacity: 0;
     transform: translateY(30px);
     transition: opacity 0.6s ease, transform 0.6s ease;
   }
   .animate-on-scroll.visible {
     opacity: 1;
     transform: translateY(0);
   }

   === 4. Hamburger nav ===

   #mainNav {
     display: flex;
     align-items: center;
     justify-content: space-between;
     flex-wrap: wrap;
     padding: 14px 20px;
     background: #0b1f33;
     position: sticky;
     top: 0;
     z-index: 100;
   }
   .nav-brand { color: #fff; font-weight: 700; }
   #hamburger {
     background: none;
     border: 2px solid #00a99d;
     color: #00a99d;
     font-size: 1.4rem;
     padding: 4px 10px;
     cursor: pointer;
     border-radius: 6px;
     display: none;
   }
   #navLinks {
     list-style: none;
     display: flex;
     gap: 20px;
     margin: 0;
     padding: 0;
   }
   #navLinks a { color: #fff; font-weight: 600; }
   @media (max-width: 600px) {
     #hamburger { display: block; }
     #navLinks {
       display: none;
       flex-direction: column;
       width: 100%;
       padding: 10px 0;
       gap: 10px;
     }
     #navLinks.open { display: flex; }
   }

   === 5. Dark mode ===

   body.dark-mode {
     background: #111827;
     color: #e5e7eb;
   }
   body.dark-mode h1  { background: #1f2937; }
   body.dark-mode h2  { color: #34d399; }
   body.dark-mode h3  { color: #60a5fa; }
   body.dark-mode ul,
   body.dark-mode ol  { background: #1f2937; border-color: #34d399; }
   body.dark-mode footer { background: #1f2937; }
   body.dark-mode a   { color: #60a5fa; }
   #darkModeToggle {
     display: block;
     margin: 16px auto;
     padding: 10px 22px;
     border: 2px solid #00a99d;
     background: transparent;
     color: #0b1f33;
     font-size: 1rem;
     border-radius: 8px;
     cursor: pointer;
     transition: background 0.3s, color 0.3s;
   }
   body.dark-mode #darkModeToggle { color: #e5e7eb; }
   #darkModeToggle:hover { background: #00a99d; color: #fff; }

   === 3. Form errors ===

   .error-msg {
     display: block;
     color: #dc2626;
     font-size: 0.85rem;
     margin-top: 4px;
     margin-bottom: 10px;
   }
   #contactForm input,
   #contactForm textarea {
     display: block;
     width: 100%;
     padding: 10px 14px;
     border: 2px solid #dbe5ec;
     border-radius: 8px;
     font-size: 1rem;
     margin-top: 10px;
     font-family: inherit;
   }
   #contactForm input:focus,
   #contactForm textarea:focus {
     outline: none;
     border-color: #00a99d;
   }
   #contactForm textarea { min-height: 120px; resize: vertical; }
   #contactForm button[type="submit"] {
     margin-top: 14px;
     padding: 12px 28px;
     background: #0b1f33;
     color: #fff;
     border: none;
     border-radius: 8px;
     font-size: 1rem;
     cursor: pointer;
     transition: background 0.3s;
   }
   #contactForm button[type="submit"]:hover { background: #00a99d; }

   === 6. Scroll-to-top button ===

   #scrollTopBtn {
     position: fixed;
     bottom: 30px;
     right: 24px;
     padding: 12px 16px;
     background: #0b1f33;
     color: #fff;
     border: none;
     border-radius: 50px;
     font-size: 1rem;
     cursor: pointer;
     box-shadow: 0 4px 14px rgba(0,0,0,0.3);
     opacity: 0;
     transform: translateY(20px);
     pointer-events: none;
     transition: opacity 0.3s, transform 0.3s;
     z-index: 999;
   }
   #scrollTopBtn.show {
     opacity: 1;
     transform: translateY(0);
     pointer-events: auto;
   }
   #scrollTopBtn:hover { background: #00a99d; }

   ─────────────────────────────────────────
   END OF COMPANION CSS
   ========================================= */
