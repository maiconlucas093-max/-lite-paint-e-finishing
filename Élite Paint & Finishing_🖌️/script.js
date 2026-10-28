/* =========================================================
   ÉLITE PAINT
   JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       1. ÍCONES
    ====================================================== */

    if (window.lucide) {
        lucide.createIcons();
    }


    /* =====================================================
       2. LOADER
    ====================================================== */

    document.body.classList.add("loading");

    window.addEventListener("load", () => {

        const loader =
            document.querySelector("#pageLoader");

        setTimeout(() => {

            loader.classList.add("hidden");

            document.body.classList.remove(
                "loading"
            );

        }, 500);

    });


    /* =====================================================
       3. HEADER
    ====================================================== */

    const header =
        document.querySelector("#header");


    const updateHeader = () => {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    };


    updateHeader();


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /* =====================================================
       4. MENU MOBILE
    ====================================================== */

    const mobileButton =
        document.querySelector(
            "#mobileMenuButton"
        );

    const mobileMenu =
        document.querySelector(
            "#mobileMenu"
        );


    if (mobileButton && mobileMenu) {

        mobileButton.addEventListener(
            "click",
            () => {

                const active =
                    mobileMenu.classList.toggle(
                        "active"
                    );

                mobileButton.setAttribute(
                    "aria-expanded",
                    String(active)
                );

            }
        );


        mobileMenu
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        mobileMenu.classList.remove(
                            "active"
                        );

                        mobileButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }
                );

            });

    }


    /* =====================================================
       5. BEFORE / AFTER
    ====================================================== */

    const comparison =
        document.querySelector(
            "#luxuryComparison"
        );

    const before =
        document.querySelector(
            "#luxuryBefore"
        );

    const divider =
        document.querySelector(
            "#luxuryDivider"
        );


    if (
        comparison &&
        before &&
        divider
    ) {

        let dragging = false;


        const setPosition = (
            clientX
        ) => {

            const rect =
                comparison.getBoundingClientRect();


            let percentage =
                (
                    (clientX - rect.left)
                    /
                    rect.width
                ) * 100;


            percentage =
                Math.max(
                    0,
                    Math.min(
                        100,
                        percentage
                    )
                );


            before.style.width =
                `${percentage}%`;


            divider.style.left =
                `${percentage}%`;


            divider.setAttribute(
                "aria-valuenow",
                Math.round(percentage)
            );

        };


        comparison.addEventListener(
            "pointerdown",
            event => {

                dragging = true;

                comparison.setPointerCapture?.(
                    event.pointerId
                );

                setPosition(
                    event.clientX
                );

            }
        );


        comparison.addEventListener(
            "pointermove",
            event => {

                if (!dragging) {
                    return;
                }

                setPosition(
                    event.clientX
                );

            }
        );


        comparison.addEventListener(
            "pointerup",
            () => {

                dragging = false;

            }
        );


        comparison.addEventListener(
            "pointercancel",
            () => {

                dragging = false;

            }
        );


        /*
         * Controle por teclado.
         */

        divider.addEventListener(
            "keydown",
            event => {

                const current =
                    Number(
                        divider.getAttribute(
                            "aria-valuenow"
                        )
                    ) || 50;


                let next = current;


                if (
                    event.key ===
                    "ArrowLeft"
                ) {

                    next -= 5;

                }


                if (
                    event.key ===
                    "ArrowRight"
                ) {

                    next += 5;

                }


                next =
                    Math.max(
                        0,
                        Math.min(
                            100,
                            next
                        )
                    );


                if (next !== current) {

                    event.preventDefault();

                    before.style.width =
                        `${next}%`;

                    divider.style.left =
                        `${next}%`;

                    divider.setAttribute(
                        "aria-valuenow",
                        next
                    );

                }

            }
        );

    }


    /* =====================================================
       6. FAQ
    ====================================================== */

    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );


    faqItems.forEach(item => {

        const question =
            item.querySelector(
                ".faq-question"
            );

        const answer =
            item.querySelector(
                ".faq-answer"
            );


        question.addEventListener(
            "click",
            () => {

                const isOpen =
                    item.classList.contains(
                        "open"
                    );


                faqItems.forEach(
                    other => {

                        if (
                            other === item
                        ) {
                            return;
                        }


                        other.classList.remove(
                            "open"
                        );


                        const otherQuestion =
                            other.querySelector(
                                ".faq-question"
                            );


                        const otherAnswer =
                            other.querySelector(
                                ".faq-answer"
                            );


                        otherQuestion
                            .setAttribute(
                                "aria-expanded",
                                "false"
                            );


                        otherAnswer
                            .style
                            .maxHeight = null;

                    }
                );


                if (isOpen) {

                    item.classList.remove(
                        "open"
                    );

                    question.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    answer.style.maxHeight =
                        null;

                } else {

                    item.classList.add(
                        "open"
                    );

                    question.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                    answer.style.maxHeight =
                        answer.scrollHeight +
                        "px";

                }

            }
        );

    });


    /* =====================================================
       7. FORMULÁRIO
    ====================================================== */

    const form =
        document.querySelector(
            "#luxuryForm"
        );

    const success =
        document.querySelector(
            "#luxurySuccess"
        );


    if (form) {

        form.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const name =
                    document.querySelector(
                        "#luxuryName"
                    );

                const phone =
                    document.querySelector(
                        "#luxuryPhone"
                    );

                const type =
                    document.querySelector(
                        "#luxuryType"
                    );

                const message =
                    document.querySelector(
                        "#luxuryMessage"
                    );


                let valid = true;


                /*
                 * Limpa erros.
                 */

                form
                    .querySelectorAll(
                        ".form-field"
                    )
                    .forEach(field => {

                        field.classList.remove(
                            "invalid"
                        );

                        const error =
                            field.querySelector(
                                "small"
                            );

                        if (error) {
                            error.textContent = "";
                        }

                    });


                const check =
                    (
                        input,
                        text
                    ) => {

                        const field =
                            input.closest(
                                ".form-field"
                            );

                        const error =
                            field.querySelector(
                                "small"
                            );


                        if (
                            !input.value.trim()
                        ) {

                            field.classList.add(
                                "invalid"
                            );

                            error.textContent =
                                text;

                            valid = false;

                        }

                    };


                check(
                    name,
                    "Informe seu nome."
                );

                check(
                    phone,
                    "Informe seu WhatsApp."
                );

                check(
                    type,
                    "Selecione o tipo de projeto."
                );

                check(
                    message,
                    "Conte um pouco sobre o projeto."
                );


                /*
                 * Telefone.
                 */

                const phoneNumbers =
                    phone.value.replace(
                        /\D/g,
                        ""
                    );


                if (
                    phone.value.trim() &&
                    phoneNumbers.length < 10
                ) {

                    const field =
                        phone.closest(
                            ".form-field"
                        );

                    field.classList.add(
                        "invalid"
                    );

                    field.querySelector(
                        "small"
                    ).textContent =
                        "Informe um telefone válido.";

                    valid = false;

                }


                if (!valid) {

                    const firstInvalid =
                        form.querySelector(
                            ".form-field.invalid input, " +
                            ".form-field.invalid select, " +
                            ".form-field.invalid textarea"
                        );


                    firstInvalid?.focus();

                    return;

                }


                /* Abre o WhatsApp da empresa com os dados do orçamento. */
                const whatsappNumber = "5531975231969";
                const projectType = type.options[type.selectedIndex].text;
                const whatsappMessage =
                    "Olá! Gostaria de solicitar um orçamento de pintura." +
                    "\n\nNome: " + name.value.trim() +
                    "\nMeu WhatsApp: " + phone.value.trim() +
                    "\nTipo de projeto: " + projectType +
                    "\nDetalhes: " + message.value.trim();
                const whatsappUrl =
                    "https://wa.me/" + whatsappNumber +
                    "?text=" + encodeURIComponent(whatsappMessage);

                window.open(whatsappUrl, "_blank", "noopener,noreferrer");

            }
        );

    }


    /* =====================================================
       8. MÁSCARA WHATSAPP
    ====================================================== */

    const phoneInput =
        document.querySelector(
            "#luxuryPhone"
        );


    if (phoneInput) {

        phoneInput.addEventListener(
            "input",
            event => {

                let value =
                    event.target.value
                        .replace(
                            /\D/g,
                            ""
                        )
                        .slice(
                            0,
                            11
                        );


                if (
                    value.length <= 10
                ) {

                    value =
                        value.replace(
                            /^(\d{2})(\d)/,
                            "($1) $2"
                        );

                    value =
                        value.replace(
                            /(\d{4})(\d)/,
                            "$1-$2"
                        );

                } else {

                    value =
                        value.replace(
                            /^(\d{2})(\d)/,
                            "($1) $2"
                        );

                    value =
                        value.replace(
                            /(\d{5})(\d)/,
                            "$1-$2"
                        );

                }


                event.target.value =
                    value;

            }
        );

    }


    /* =====================================================
       9. SCROLL REVEAL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target
                                    .classList
                                    .add(
                                        "visible"
                                    );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            element => {

                observer.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =====================================================
       10. SMOOTH SCROLL
    ====================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const id =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !id ||
                        id === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            id
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    const headerHeight =
                        header.offsetHeight;


                    const position =
                        target
                            .getBoundingClientRect()
                            .top
                        +
                        window.scrollY
                        -
                        headerHeight;


                    window.scrollTo({
                        top: position,
                        behavior: "smooth"
                    });

                }
            );

        });

});