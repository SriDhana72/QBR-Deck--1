        // Word-by-word animation script
        document.addEventListener('DOMContentLoaded', () => {
            const wrapWords = (element) => {
                const initialTextSpan = element.querySelector('.initial-text');
                if (!initialTextSpan) return;
                const text = initialTextSpan.innerHTML;
                let wrappedText = '';
                const parts = text.split(/(<[^>]+>|\s+)/);
                parts.forEach((part) => {
                    if (part.startsWith('<') && part.endsWith('>')) {
                        wrappedText += part;
                    } else if (part.trim() === '') {
                        wrappedText += part;
                    } else {
                        wrappedText += `<span style="opacity:0;">${part}</span>`;
                    }
                });
                element.innerHTML = wrappedText;
            };

            const animateWords = (element) => {
                const words = element.querySelectorAll('span');
                words.forEach((word, index) => {
                    setTimeout(() => {
                        word.style.opacity = '1';
                    }, index * 20);
                });
            };

            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (entry.target.classList.contains('word-by-word')) {
                            animateWords(entry.target);
                        }
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            const wordByWordTargets = document.querySelectorAll('.word-by-word');
            wordByWordTargets.forEach(target => {
                wrapWords(target);
                observer.observe(target);
            });
        });

        // PDF Download Function
        function downloadPDF() {
            // Get the container for the button which will be hidden during print
            const buttonContainer = document.querySelector('.print-button-container');
            const elementToPrint = document.getElementById('content-to-print');

            // Temporarily hide the button container
            buttonContainer.style.display = 'none';

            const options = {
                margin: 0.5,
                filename: 'Global_Innovations_QBR_Q2_2025.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true, letterRendering: true },
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
            };

            // Use html2pdf to generate the PDF
            html2pdf().from(elementToPrint).set(options).save()
                .then(() => {
                    // Show the button again after the PDF has been saved
                    buttonContainer.style.display = 'flex';
                })
                .catch(err => {
                    console.error("Error generating PDF:", err);
                    // Ensure the button is shown again even if there's an error
                    buttonContainer.style.display = 'flex';
                });
        }