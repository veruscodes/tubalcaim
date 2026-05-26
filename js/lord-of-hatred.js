const classPills = document.querySelectorAll(".class-pill[data-class]");
const typeTabs = document.querySelectorAll(".toolbar-tab[data-type]");
const playstyleToggle = document.querySelector("[data-playstyle-toggle]");
const playstyleMenu = document.querySelector("[data-playstyle-menu]");
const playstyleLabel = document.querySelector("[data-playstyle-label]");
const playstyleItems = document.querySelectorAll(".toolbar-menu__item[data-playstyle]");
const searchInput = document.querySelector("[data-build-search]");
const buildCards = document.querySelectorAll(".build-card[data-class]");
const emptyState = document.querySelector("[data-builds-empty]");

const filters = {
    className: "all",
    type: "all",
    playstyle: "all",
    query: ""
};

const playstyleLabels = {
    all: "Playstyle",
    melee: "Melee",
    ranged: "Ranged",
    summoner: "Summoner",
    tank: "Tank",
    speedfarm: "Speedfarm"
};

const applyFilters = () => {
    let visibleCount = 0;

    buildCards.forEach((card) => {
        const className = card.dataset.class || "";
        const type = card.dataset.type || "";
        const playstyle = card.dataset.playstyle || "";
        const haystack = `${card.dataset.search || ""} ${card.textContent || ""}`.toLowerCase();

        const matchesClass = filters.className === "all" || filters.className === className;
        const matchesType = filters.type === "all" || filters.type === type;
        const matchesPlaystyle = filters.playstyle === "all" || filters.playstyle === playstyle;
        const matchesQuery = !filters.query || haystack.includes(filters.query);
        const isVisible = matchesClass && matchesType && matchesPlaystyle && matchesQuery;

        card.hidden = !isVisible;

        if (isVisible) {
            visibleCount += 1;
        }
    });

    if (emptyState) {
        emptyState.hidden = visibleCount > 0;
    }
};

classPills.forEach((pill) => {
    pill.addEventListener("click", () => {
        filters.className = pill.dataset.class || "all";

        classPills.forEach((item) => {
            const isActive = item === pill;
            item.classList.toggle("class-pill--active", isActive);
            item.setAttribute("aria-pressed", String(isActive));
        });

        applyFilters();
    });
});

typeTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        filters.type = tab.dataset.type || "all";

        typeTabs.forEach((item) => {
            const isActive = item === tab;
            item.classList.toggle("toolbar-tab--active", isActive);
            item.setAttribute("aria-selected", String(isActive));
        });

        applyFilters();
    });
});

const closePlaystyleMenu = () => {
    if (!playstyleToggle || !playstyleMenu) {
        return;
    }

    playstyleMenu.hidden = true;
    playstyleToggle.setAttribute("aria-expanded", "false");
};

if (playstyleToggle && playstyleMenu) {
    playstyleToggle.addEventListener("click", () => {
        const isOpen = playstyleToggle.getAttribute("aria-expanded") === "true";
        playstyleMenu.hidden = isOpen;
        playstyleToggle.setAttribute("aria-expanded", String(!isOpen));
    });

    playstyleItems.forEach((item) => {
        item.addEventListener("click", () => {
            const value = item.dataset.playstyle || "all";
            filters.playstyle = value;

            playstyleItems.forEach((option) => {
                option.classList.toggle("toolbar-menu__item--active", option === item);
            });

            if (playstyleLabel) {
                playstyleLabel.textContent = playstyleLabels[value] || "Playstyle";
            }

            closePlaystyleMenu();
            applyFilters();
        });
    });

    document.addEventListener("click", (event) => {
        const target = event.target;

        if (!(target instanceof Node)) {
            return;
        }

        if (!playstyleMenu.contains(target) && !playstyleToggle.contains(target)) {
            closePlaystyleMenu();
        }
    });
}

if (searchInput) {
    searchInput.addEventListener("input", () => {
        filters.query = searchInput.value.trim().toLowerCase();
        applyFilters();
    });
}

applyFilters();
