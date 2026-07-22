(() => {
    "use strict";

    const body = document.body;
    const technicalMode =
        new URLSearchParams(window.location.search).get("mode") === "technical";
    const searchInput = document.getElementById("manualSearch");
    const sections = Array.from(document.querySelectorAll(".manual-section"))
        .filter((section) => technicalMode || !section.classList.contains("technical"));
    const navLinks = Array.from(document.querySelectorAll(".nav-link[href^='#']"))
        .filter((link) => technicalMode || !link.closest(".technical-navigation"));
    const emptyState = document.getElementById("searchEmpty");
    const menuToggle = document.getElementById("menuToggle");
    const backToTop = document.getElementById("backToTop");
    const printButton = document.getElementById("printManual");

    body.dataset.manualMode = technicalMode ? "technical" : "client";
    if (technicalMode) {
        document.title = "Manual técnico SAV";
        const brandTitle = document.querySelector(".brand-copy strong");
        const brandSubtitle = document.querySelector(".brand-copy small");
        const eyebrow = document.querySelector(".hero .eyebrow");
        if (brandTitle) brandTitle.textContent = "Manual técnico";
        if (brandSubtitle) brandSubtitle.textContent = "Arquitectura, seguridad y soporte";
        if (eyebrow) eyebrow.textContent = "Referencia técnica restringida";
    }

    const normalize = (value) => String(value || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

    const filterSections = () => {
        const query = normalize(searchInput.value.trim());
        let visible = 0;

        sections.forEach((section) => {
            const matches = !query || normalize(section.textContent).includes(query);
            section.classList.toggle("search-hidden", !matches);
            if (matches) visible += 1;
        });

        emptyState.style.display = visible ? "none" : "block";
    };

    const setActiveNavigation = () => {
        const offset = window.scrollY + 120;
        let currentId = "";

        sections.forEach((section) => {
            if (!section.classList.contains("search-hidden") && section.offsetTop <= offset) {
                currentId = section.id;
            }
        });

        navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
        });

        backToTop.classList.toggle("visible", window.scrollY > 700);
    };

    searchInput.addEventListener("input", filterSections);
    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            searchInput.value = "";
            filterSections();
            searchInput.blur();
        }
    });

    document.addEventListener("keydown", (event) => {
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
            event.preventDefault();
            searchInput.focus();
            searchInput.select();
        }
    });

    menuToggle.addEventListener("click", () => {
        body.classList.toggle("sidebar-open");
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => body.classList.remove("sidebar-open"));
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    printButton.addEventListener("click", () => window.print());
    window.addEventListener("scroll", setActiveNavigation, { passive: true });
    window.addEventListener("resize", setActiveNavigation);

    document.querySelectorAll(".manual-shot img").forEach((image) => {
        image.addEventListener("error", () => {
            if (!image.dataset.fallbackApplied) {
                image.dataset.fallbackApplied = "true";
                image.src = "assets/placeholder.svg";
            }
        });
    });

    setActiveNavigation();
})();
