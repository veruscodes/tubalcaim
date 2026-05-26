const previewCards = document.querySelectorAll(".video-card[data-video-id]");

const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");

const buildPreviewUrl = (videoId) => {
    const params = new URLSearchParams({
        autoplay: "1",
        mute: "1",
        controls: "0",
        modestbranding: "1",
        rel: "0",
        playsinline: "1",
        loop: "1",
        playlist: videoId
    });

    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
};

const startPreview = (card) => {
    if (!canHover.matches || card.classList.contains("is-previewing")) {
        return;
    }

    const previewHost = card.querySelector(".video-preview");
    const videoId = card.dataset.videoId;

    if (!previewHost || !videoId) {
        return;
    }

    const iframe = document.createElement("iframe");
    iframe.src = buildPreviewUrl(videoId);
    iframe.title = "Preview do video no YouTube";
    iframe.allow = "autoplay; encrypted-media; picture-in-picture";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.tabIndex = -1;

    previewHost.replaceChildren(iframe);
    card.classList.add("is-previewing");
};

const stopPreview = (card) => {
    const previewHost = card.querySelector(".video-preview");

    if (!previewHost || !card.classList.contains("is-previewing")) {
        return;
    }

    previewHost.replaceChildren();
    card.classList.remove("is-previewing");
};

previewCards.forEach((card) => {
    card.addEventListener("mouseenter", () => startPreview(card));
    card.addEventListener("mouseleave", () => stopPreview(card));
    card.addEventListener("focus", () => startPreview(card));
    card.addEventListener("blur", () => stopPreview(card));
});

canHover.addEventListener("change", (event) => {
    if (event.matches) {
        return;
    }

    previewCards.forEach((card) => stopPreview(card));
});
