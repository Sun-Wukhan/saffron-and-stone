(function initializeWebsite() {
  "use strict";

  /**
   * Returns whether a dish should be visible for the selected category.
   * @param {string} selectedCategory - The currently selected menu category.
   * @param {string} dishCategory - The category assigned to the dish.
   * @returns {boolean} Whether the dish belongs in the filtered list.
   */
  function shouldShowDish(selectedCategory, dishCategory) {
    return selectedCategory === "all" || selectedCategory === dishCategory;
  }

  /**
   * Returns a four-digit year for the footer.
   * @param {Date} date - Date used to determine the displayed year.
   * @returns {number} The full calendar year.
   */
  function getDisplayYear(date) {
    return date.getFullYear();
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { getDisplayYear, shouldShowDish };
  }

  if (typeof document === "undefined") {
    return;
  }

  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const navigation = document.querySelector("[data-nav]");
  const menuTabs = document.querySelectorAll("[data-filter]");
  const dishes = document.querySelectorAll("[data-category]");
  const reservationForm = document.querySelector("[data-reservation-form]");
  const formNote = document.querySelector("[data-form-note]");
  const year = document.querySelector("[data-year]");

  /**
   * Closes the mobile navigation and restores page scrolling.
   * @returns {void}
   */
  function closeNavigation() {
    navigation?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation");
    document.body.classList.remove("nav-open");
  }

  menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Open navigation" : "Close navigation",
    );
    navigation?.classList.toggle("open", !isOpen);
    document.body.classList.toggle("nav-open", !isOpen);
  });

  navigation?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNavigation);
  });

  window.addEventListener(
    "scroll",
    () => {
      header?.classList.toggle("scrolled", window.scrollY > 48);
    },
    { passive: true },
  );

  menuTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const selectedCategory = tab.dataset.filter ?? "all";

      menuTabs.forEach((item) => item.classList.toggle("active", item === tab));
      dishes.forEach((dish) => {
        const dishCategory = dish.dataset.category ?? "";
        dish.classList.toggle(
          "is-hidden",
          !shouldShowDish(selectedCategory, dishCategory),
        );
      });
    });
  });

  reservationForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(reservationForm);
    const guestName = String(formData.get("name") ?? "").trim();

    if (formNote) {
      formNote.textContent = `Thank you${guestName ? `, ${guestName}` : ""}. Your table request is ready to send.`;
    }

    reservationForm.reset();
  });

  if (year) {
    year.textContent = String(getDisplayYear(new Date()));
  }
})();
