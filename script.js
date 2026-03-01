document.addEventListener("DOMContentLoaded", () => {
    // Letter-by-letter animation wrapper for selected text elements
    const letterAnimatedElements = document.querySelectorAll(".contact-letter-anim, .letter-anim-seq, .hero-line-gradient");
    const applyLetterAnimation = (element) => {
        if (!element || element.dataset.letterized === "true") {
            return;
        }

        const originalText = element.textContent || "";
        const fragment = document.createDocumentFragment();
        let letterIndex = 0;

        Array.from(originalText).forEach((char) => {
            const letterSpan = document.createElement("span");
            letterSpan.className = "letter";

            if (char === " ") {
                letterSpan.classList.add("space");
                letterSpan.innerHTML = "&nbsp;";
            } else {
                letterSpan.textContent = char;
            }

            letterSpan.style.setProperty("--i", String(letterIndex));
            fragment.appendChild(letterSpan);
            letterIndex += 1;
        });

        element.textContent = "";
        element.appendChild(fragment);
        element.dataset.letterized = "true";
    };

    letterAnimatedElements.forEach((element) => {
        applyLetterAnimation(element);
    });

    // 1. MOUSE GLOW EFFECT
    const glow = document.querySelector(".cursor-glow");
    if (glow) {
        window.addEventListener("mousemove", (e) => {
            glow.style.left = `${e.clientX}px`;
            glow.style.top = `${e.clientY}px`;
        });
    }

    // 2. NAVBAR SCROLL HIGHLIGHT
    const navbar = document.querySelector(".glass-navbar");
    const menuToggleBtn = document.getElementById("menuToggleBtn");
    const navList = document.getElementById("primaryNav");
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    const closeMobileMenu = () => {
        if (!navbar || !menuToggleBtn) {
            return;
        }
        navbar.classList.remove("menu-open");
        menuToggleBtn.setAttribute("aria-expanded", "false");
    };

    const openMobileMenu = () => {
        if (!navbar || !menuToggleBtn) {
            return;
        }
        navbar.classList.add("menu-open");
        menuToggleBtn.setAttribute("aria-expanded", "true");
    };

    if (menuToggleBtn) {
        menuToggleBtn.addEventListener("click", () => {
            const isOpen = navbar && navbar.classList.contains("menu-open");
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            closeMobileMenu();
        });
    });

    document.addEventListener("click", (event) => {
        if (!navbar || !menuToggleBtn || !navList) {
            return;
        }

        if (!navbar.classList.contains("menu-open")) {
            return;
        }

        const clickedInsideNav = event.target.closest(".glass-navbar");
        if (!clickedInsideNav) {
            closeMobileMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });

    const highlightNav = () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", highlightNav);

    // 3. CATEGORY VIEWER (OPEN SELECTED CATEGORY IN FULL GRID)
    const categoryCards = document.querySelectorAll(".category-card");
    const categoryViewer = document.getElementById("categoryViewer");
    const categoryViewerTitle = document.getElementById("categoryViewerTitle");
    const categoryViewerGrid = document.getElementById("categoryViewerGrid");
    const categoryViewerClose = document.getElementById("categoryViewerClose");

    const closeCategoryViewer = () => {
        if (!categoryViewer || !categoryViewerGrid) {
            return;
        }
        categoryViewer.classList.remove("open");
        categoryViewer.setAttribute("aria-hidden", "true");
        categoryViewerGrid.innerHTML = "";
    };

    const openCategoryViewer = (card) => {
        if (!categoryViewer || !categoryViewerGrid || !categoryViewerTitle) {
            return;
        }

        const title = card.dataset.title || "Category";
        const prefix = card.dataset.prefix || "";
        const extension = card.dataset.extension || "jpg";
        const count = Number(card.dataset.count || 0);

        categoryViewerTitle.textContent = title;
        categoryViewerGrid.innerHTML = "";

        for (let i = 1; i <= count; i += 1) {
            const item = document.createElement("figure");
            item.className = "category-viewer-item";

            const image = document.createElement("img");
            image.src = `${prefix}${i}.${extension}`;
            image.alt = `${title} ${i}`;
            image.loading = "lazy";

            item.appendChild(image);
            categoryViewerGrid.appendChild(item);
        }

        categoryViewer.classList.add("open");
        categoryViewer.setAttribute("aria-hidden", "false");
        categoryViewer.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    categoryCards.forEach((card) => {
        card.addEventListener("click", () => openCategoryViewer(card));
    });

    if (categoryViewerClose) {
        categoryViewerClose.addEventListener("click", closeCategoryViewer);
    }

    // 4. SERVICE TEXT PREVIEW MODAL
    const textPreviewModal = document.getElementById("textPreviewModal");
    const textPreviewTitle = document.getElementById("textPreviewTitle");
    const textPreviewBody = document.getElementById("textPreviewBody");
    const textPreviewCloseBtn = document.getElementById("textPreviewCloseBtn");

    const closeTextPreview = () => {
        if (!textPreviewModal) {
            return;
        }
        textPreviewModal.classList.remove("open");
        textPreviewModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    };

    const openTextPreview = (title, body) => {
        if (!textPreviewModal || !textPreviewTitle || !textPreviewBody) {
            return;
        }
        textPreviewTitle.textContent = title || "Preview";
        textPreviewBody.textContent = body || "";
        textPreviewModal.classList.add("open");
        textPreviewModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    };

    // 5. IMAGE LIGHTBOX PREVIEW
    const lightbox = document.getElementById("imageLightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxCloseBtn = document.getElementById("lightboxCloseBtn");

    const closeLightbox = () => {
        if (!lightbox) {
            return;
        }
        lightbox.classList.remove("open");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    };

    const openLightbox = (src, altText) => {
        if (!lightbox || !lightboxImage || !src) {
            return;
        }
        lightboxImage.src = src;
        lightboxImage.alt = altText || "Preview";
        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    };

    document.addEventListener("click", (event) => {
        const closeTrigger = event.target.closest("[data-lightbox-close='true']");
        if (closeTrigger) {
            closeLightbox();
            return;
        }

        if (event.target.id === "lightboxCloseBtn") {
            closeLightbox();
            return;
        }

        const closeTextTrigger = event.target.closest("[data-text-close='true']");
        if (closeTextTrigger || event.target.id === "textPreviewCloseBtn") {
            closeTextPreview();
            return;
        }

        const serviceText = event.target.closest(".service-preview-text");
        if (serviceText) {
            if (serviceText.closest(".thumbnail-service-card")) {
                openThumbnailDetail();
                return;
            }
            if (serviceText.closest(".product-service-card")) {
                openProductDetail();
                return;
            }
            if (serviceText.closest(".poster-service-card")) {
                openPosterDetail();
                return;
            }
            if (serviceText.closest(".social-service-card")) {
                openSocialDetail();
                return;
            }
            if (serviceText.closest(".graphic-service-card")) {
                openGraphicDetail();
                return;
            }
            const previewTitle = serviceText.dataset.previewTitle || "Service Preview";
            openTextPreview(previewTitle, serviceText.textContent.trim());
            return;
        }

        const clickedImage = event.target.closest(".category-viewer-item img");
        if (!clickedImage) {
            return;
        }

        if (lightbox && lightbox.contains(clickedImage)) {
            return;
        }

        openLightbox(clickedImage.currentSrc || clickedImage.src, clickedImage.alt);
    });

    if (lightboxCloseBtn) {
        lightboxCloseBtn.addEventListener("click", closeLightbox);
    }

    if (textPreviewCloseBtn) {
        textPreviewCloseBtn.addEventListener("click", closeTextPreview);
    }

    // 6. THUMBNAIL DESIGN FULL DETAILS MODAL
    const thumbnailServiceCard = document.querySelector(".thumbnail-service-card");
    const thumbnailDetailModal = document.getElementById("thumbnailDetailModal");
    const thumbnailDetailCloseBtn = document.getElementById("thumbnailDetailCloseBtn");
    const thumbnailImageRow = document.getElementById("thumbnailImageRow");

    const closeThumbnailDetail = () => {
        if (!thumbnailDetailModal) {
            return;
        }
        thumbnailDetailModal.classList.remove("open");
        thumbnailDetailModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    };

    const buildThumbnailImageStrip = () => {
        if (!thumbnailImageRow || thumbnailImageRow.dataset.loaded === "true") {
            return;
        }

        for (let i = 1; i <= 15; i += 1) {
            const img = document.createElement("img");
            img.src = `thumbnail${i}.jpg`;
            img.alt = `Thumbnail ${i}`;
            img.loading = "lazy";
            thumbnailImageRow.appendChild(img);
        }

        thumbnailImageRow.dataset.loaded = "true";
    };

    const openThumbnailDetail = () => {
        if (!thumbnailDetailModal) {
            return;
        }
        buildThumbnailImageStrip();
        thumbnailDetailModal.classList.add("open");
        thumbnailDetailModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    };

    if (thumbnailServiceCard) {
        thumbnailServiceCard.addEventListener("click", openThumbnailDetail);
        thumbnailServiceCard.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openThumbnailDetail();
            }
        });
    }

    if (thumbnailDetailCloseBtn) {
        thumbnailDetailCloseBtn.addEventListener("click", closeThumbnailDetail);
    }

    // 7. SOCIAL MEDIA POST FULL DETAILS MODAL
    const socialServiceCard = document.querySelector(".social-service-card");
    const socialDetailModal = document.getElementById("socialDetailModal");
    const socialDetailCloseBtn = document.getElementById("socialDetailCloseBtn");
    const socialImageRow = document.getElementById("socialImageRow");

    const closeSocialDetail = () => {
        if (!socialDetailModal) {
            return;
        }
        socialDetailModal.classList.remove("open");
        socialDetailModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    };

    const buildSocialImageStrip = () => {
        if (!socialImageRow || socialImageRow.dataset.loaded === "true") {
            return;
        }

        for (let i = 1; i <= 12; i += 1) {
            const img = document.createElement("img");
            img.src = `social media post ${i}.jpg`;
            img.alt = `Social post ${i}`;
            img.loading = "lazy";
            socialImageRow.appendChild(img);
        }

        socialImageRow.dataset.loaded = "true";
    };

    const openSocialDetail = () => {
        if (!socialDetailModal) {
            return;
        }
        buildSocialImageStrip();
        socialDetailModal.classList.add("open");
        socialDetailModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    };

    if (socialServiceCard) {
        socialServiceCard.addEventListener("click", openSocialDetail);
        socialServiceCard.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openSocialDetail();
            }
        });
    }

    if (socialDetailCloseBtn) {
        socialDetailCloseBtn.addEventListener("click", closeSocialDetail);
    }

    // 8. PRODUCT MANIPULATION FULL DETAILS MODAL
    const productServiceCard = document.querySelector(".product-service-card");
    const productDetailModal = document.getElementById("productDetailModal");
    const productDetailCloseBtn = document.getElementById("productDetailCloseBtn");
    const productImageRow = document.getElementById("productImageRow");

    const closeProductDetail = () => {
        if (!productDetailModal) {
            return;
        }
        productDetailModal.classList.remove("open");
        productDetailModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    };

    const buildProductImageStrip = () => {
        if (!productImageRow || productImageRow.dataset.loaded === "true") {
            return;
        }

        for (let i = 1; i <= 13; i += 1) {
            const img = document.createElement("img");
            img.src = `Product Manipulation ${i}.jpg`;
            img.alt = `Product manipulation ${i}`;
            img.loading = "lazy";
            productImageRow.appendChild(img);
        }

        productImageRow.dataset.loaded = "true";
    };

    const openProductDetail = () => {
        if (!productDetailModal) {
            return;
        }
        buildProductImageStrip();
        productDetailModal.classList.add("open");
        productDetailModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    };

    if (productServiceCard) {
        productServiceCard.addEventListener("click", openProductDetail);
        productServiceCard.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openProductDetail();
            }
        });
    }

    if (productDetailCloseBtn) {
        productDetailCloseBtn.addEventListener("click", closeProductDetail);
    }

    // 9. POSTER DESIGN FULL DETAILS MODAL
    const posterServiceCard = document.querySelector(".poster-service-card");
    const posterDetailModal = document.getElementById("posterDetailModal");
    const posterDetailCloseBtn = document.getElementById("posterDetailCloseBtn");
    const posterImageRow = document.getElementById("posterImageRow");

    const closePosterDetail = () => {
        if (!posterDetailModal) {
            return;
        }
        posterDetailModal.classList.remove("open");
        posterDetailModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    };

    const buildPosterImageStrip = () => {
        if (!posterImageRow || posterImageRow.dataset.loaded === "true") {
            return;
        }

        for (let i = 1; i <= 8; i += 1) {
            const img = document.createElement("img");
            img.src = `poster ${i}.jpg`;
            img.alt = `Poster ${i}`;
            img.loading = "lazy";
            posterImageRow.appendChild(img);
        }

        posterImageRow.dataset.loaded = "true";
    };

    const openPosterDetail = () => {
        if (!posterDetailModal) {
            return;
        }
        buildPosterImageStrip();
        posterDetailModal.classList.add("open");
        posterDetailModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    };

    if (posterServiceCard) {
        posterServiceCard.addEventListener("click", openPosterDetail);
        posterServiceCard.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openPosterDetail();
            }
        });
    }

    if (posterDetailCloseBtn) {
        posterDetailCloseBtn.addEventListener("click", closePosterDetail);
    }

    // 10. GRAPHIC DESIGN FULL DETAILS MODAL
    const graphicServiceCard = document.querySelector(".graphic-service-card");
    const graphicDetailModal = document.getElementById("graphicDetailModal");
    const graphicDetailCloseBtn = document.getElementById("graphicDetailCloseBtn");
    const graphicImageRow = document.getElementById("graphicImageRow");

    const closeGraphicDetail = () => {
        if (!graphicDetailModal) {
            return;
        }
        graphicDetailModal.classList.remove("open");
        graphicDetailModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    };

    const buildGraphicImageStrip = () => {
        if (!graphicImageRow || graphicImageRow.dataset.loaded === "true") {
            return;
        }

        const imageSources = [];
        for (let i = 1; i <= 15; i += 1) imageSources.push(`thumbnail${i}.jpg`);
        for (let i = 1; i <= 13; i += 1) imageSources.push(`Product Manipulation ${i}.jpg`);
        for (let i = 1; i <= 12; i += 1) imageSources.push(`social media post ${i}.jpg`);
        for (let i = 1; i <= 8; i += 1) imageSources.push(`poster ${i}.jpg`);

        imageSources.forEach((src, index) => {
            const img = document.createElement("img");
            img.src = src;
            img.alt = `Graphic design ${index + 1}`;
            img.loading = "lazy";
            graphicImageRow.appendChild(img);
        });

        graphicImageRow.dataset.loaded = "true";
    };

    const openGraphicDetail = () => {
        if (!graphicDetailModal) {
            return;
        }
        buildGraphicImageStrip();
        graphicDetailModal.classList.add("open");
        graphicDetailModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    };

    if (graphicServiceCard) {
        graphicServiceCard.addEventListener("click", openGraphicDetail);
        graphicServiceCard.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openGraphicDetail();
            }
        });
    }

    if (graphicDetailCloseBtn) {
        graphicDetailCloseBtn.addEventListener("click", closeGraphicDetail);
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMobileMenu();
            closeLightbox();
            closeTextPreview();
            closeThumbnailDetail();
            closeSocialDetail();
            closeProductDetail();
            closePosterDetail();
            closeGraphicDetail();
        }
    });

    document.addEventListener("click", (event) => {
        const closeThumbnailTrigger = event.target.closest("[data-thumbnail-close='true']");
        if (closeThumbnailTrigger || event.target.id === "thumbnailDetailCloseBtn") {
            closeThumbnailDetail();
            return;
        }

        const closeSocialTrigger = event.target.closest("[data-social-close='true']");
        if (closeSocialTrigger || event.target.id === "socialDetailCloseBtn") {
            closeSocialDetail();
            return;
        }

        const closeProductTrigger = event.target.closest("[data-product-close='true']");
        if (closeProductTrigger || event.target.id === "productDetailCloseBtn") {
            closeProductDetail();
            return;
        }

        const closePosterTrigger = event.target.closest("[data-poster-close='true']");
        if (closePosterTrigger || event.target.id === "posterDetailCloseBtn") {
            closePosterDetail();
            return;
        }

        const closeGraphicTrigger = event.target.closest("[data-graphic-close='true']");
        if (closeGraphicTrigger || event.target.id === "graphicDetailCloseBtn") {
            closeGraphicDetail();
        }
    });
});


