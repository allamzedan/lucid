(function () {
    "use strict";

    const email = "domains@mazajcontent.com";
    const toast = document.getElementById("toastMsg");
    const copyBtn = document.getElementById("copyEmailBtn");
    const afternicBtn = document.getElementById("afternicPlaceholder");
    const heroSvg = document.querySelector(".micro-icon svg");

    let toastTimeout = null;

    function showToast(message) {
        if (!toast) return;

        if (toastTimeout) {
            clearTimeout(toastTimeout);
        }

        toast.innerText = message || "Email copied to clipboard ✓";
        toast.classList.add("is-visible");

        toastTimeout = setTimeout(function () {
            toast.classList.remove("is-visible");
        }, 2000);
    }

    function copyTextToClipboard(text) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text);
        }

        return new Promise(function (resolve, reject) {
            const textarea = document.createElement("textarea");
            textarea.value = text;
            textarea.setAttribute("readonly", "");
            textarea.style.position = "fixed";
            textarea.style.top = "-9999px";
            textarea.style.left = "-9999px";

            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();

            try {
                const successful = document.execCommand("copy");
                document.body.removeChild(textarea);

                if (successful) {
                    resolve();
                } else {
                    reject(new Error("Copy command was unsuccessful."));
                }
            } catch (error) {
                document.body.removeChild(textarea);
                reject(error);
            }
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener("click", function (event) {
            const targetId = anchor.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                event.preventDefault();
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    if (copyBtn) {
        copyBtn.addEventListener("click", function (event) {
            event.preventDefault();

            copyTextToClipboard(email)
                .then(function () {
                    showToast("domains@mazajcontent.com copied ✓");
                })
                .catch(function () {
                    showToast("Copy failed. Email: domains@mazajcontent.com");
                });
        });
    }

    if (afternicBtn) {
        afternicBtn.addEventListener("click", function (event) {
            event.preventDefault();
            showToast("🔗 Listing active on Afternic & Sedo — inquire directly for expedited sale.");
        });
    }

    if (heroSvg) {
        heroSvg.addEventListener("mouseenter", function () {
            heroSvg.classList.add("is-hovered");
        });

        heroSvg.addEventListener("mouseleave", function () {
            heroSvg.classList.remove("is-hovered");
        });
    }
})();