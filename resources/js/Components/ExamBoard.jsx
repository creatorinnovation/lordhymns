import React from 'react'
import SwipeCard from '../components/SwipeCard';

// कंपनी लोगो और जानकारी का डेटा
const companyLogos = [
    { id: 1, name: "ABRSM", category: "टेक्नोलॉजी", logo: '/images/ABRSM.webp' },
    { id: 2, name: "Trinity College London", category: "बैंकिंग", logo: "/images/TRINITY_COLLEGE_LONDON.webp" },
    { id: 3, name: "Rock School London", category: "शिपिंग", logo: "/images/RSL.webp" },
    { id: 4, name: "Cambridge IGCSE", category: "डिजाइन", logo: "/images/Cambridge+IGCSE+.webp" },
    // { id: 5, name: "ईज़ी हेल्थकेयर", category: "स्वास्थ्य", logo: "/images/" },
    // { id: 6, name: "क्लीन एनर्जी", category: "नवीकरणीय ऊर्जा", logo: "/images/" },
    // { id: 7, name: "टेस्टी फ़ूड्स", category: "खाद्य और पेय", logo: "/images/" },
    // { id: 8, name: "एजुकेशन पाथ", category: "शिक्षा", logo: "/images/" },
];



const ExamBoards = () => {

    const [dragStartX, setDragStartX] = React.useState(null); // टच/माउस की शुरुआत की स्थिति
    const [isDragging, setIsDragging] = React.useState(false); // माउस ड्रैग स्थिति
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const totalCards = companyLogos.length;
    const threshold = 50; // स्वाइप/ड्रैग के लिए न्यूनतम दूरी (pixels)

    // lg: 3 कार्ड एक साथ दिखेंगे, md: 2 कार्ड, sm: 1 कार्ड
    const getCardsPerView = React.useCallback(() => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth >= 1024) return 3; // lg
            if (window.innerWidth >= 768) return 2;  // md
        }
        return 1; // mobile or server render
    }, []);

    // स्लाइडिंग लॉजिक (आगे)
    const goToNext = React.useCallback(() => {
        const cardsPerView = getCardsPerView();
        // अगर अगले स्लाइड के लिए पर्याप्त कार्ड नहीं हैं, तो पहले कार्ड पर वापस आ जाएँ
        if (currentIndex < totalCards - cardsPerView) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
            setCurrentIndex(0); // लूपिंग (शुरुआत में वापस)
        }
    }, [currentIndex, totalCards, getCardsPerView]);

    // स्लाइडिंग लॉजिक (पीछे)
    const goToPrev = React.useCallback(() => {
        const cardsPerView = getCardsPerView();
        if (currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1);
        } else {
            // अगर पहले कार्ड पर हैं, तो अंतिम सेट पर जाएँ
            const maxIndex = totalCards - cardsPerView;
            setCurrentIndex(maxIndex > 0 ? maxIndex : 0);
        }
    }, [currentIndex, totalCards, getCardsPerView]);

    // स्वाइप (टच या माउस) की जाँच के लिए केंद्रीय फ़ंक्शन
    const handleSwipe = (endX) => {
        if (dragStartX === null) return;

        const swipeDistance = dragStartX - endX; // Positive = Swipe Left (Next), Negative = Swipe Right (Prev)

        if (Math.abs(swipeDistance) > threshold) {
            if (swipeDistance > 0) {
                // बाईं ओर स्वाइप/ड्रैग किया (अगला कार्ड)
                goToNext();
            } else {
                // दाईं ओर स्वाइप/ड्रैग किया (पिछला कार्ड)
                goToPrev();
            }
        }

        // ड्रैग शुरुआत को रीसेट करें
        setDragStartX(null);
        setIsDragging(false);
    };

    // --- टच इवेंट हैंडलर (मोबाइल) ---
    const handleTouchStart = (e) => {
        setDragStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e) => {
        handleSwipe(e.changedTouches[0].clientX);
    };

    // --- माउस इवेंट हैंडलर (डेस्कटॉप ड्रैग) ---
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setDragStartX(e.clientX);
    };

    // onMouseLeave और onMouseUp को document पर जोड़ते हैं ताकि अगर माउस कंटेनर से बाहर निकल जाए तब भी ड्रैग खत्म हो
    React.useEffect(() => {
        const handleMouseUp = (e) => {
            if (!isDragging) return;
            handleSwipe(e.clientX);
        };

        // अगर माउस बटन दबा हुआ है और ड्रैग स्टार्ट X सेट है
        const handleMouseMove = (e) => {
            // NOTE: हम यहां पर कंटीन्यूअस स्लाइडिंग नहीं कर रहे हैं,
            // केवल माउस बटन दबा हुआ है यह सुनिश्चित कर रहे हैं ताकि onMouseUp पर स्वाइप चेक हो
        };

        if (isDragging) {
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('mousemove', handleMouseMove);
        } else {
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);
        }

        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isDragging, handleSwipe]);

    // स्लाइड ट्रांसफ़ॉर्मेशन (CSS)
    const transformValue = () => {
        const cardsPerView = getCardsPerView();
        // 100% / cardsPerView = एक कार्ड की चौड़ाई
        const percentageMove = 100 / cardsPerView;
        return `translateX(-${currentIndex * percentageMove}%)`;
    };

    // विंडो रीसाइज़ होने पर currentIndex को रीसेट करने के लिए (ताकि ब्रेकपॉइंट पर लेआउट न टूटे)
    React.useEffect(() => {
        const handleResize = () => {
            const cardsPerView = getCardsPerView();
            const maxIndex = totalCards - cardsPerView;
            if (currentIndex > maxIndex) {
                setCurrentIndex(maxIndex > 0 ? maxIndex : 0);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [currentIndex, totalCards, getCardsPerView]);

    return (
        <div className=" bg-gray-50 p-4 sm:p-8 font-sans">
            <header className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-gray-800">
                    Exam boards we teach for
                </h1>
                <p className="text-lg text-gray-500 mt-2">
                    Our students obtain certifications from internationally recognized boards, thereby boosting their music careers.
                </p>
            </header>

            {/* स्लाइडर कंटेनर */}
            <div className="max-w-7xl mx-auto relative">
                {/* विज़िबल विंडो - ओवरफ्लो को छुपाता है */}
                <div
                    // टच इवेंट्स
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    // माउस इवेंट्स
                    onMouseDown={handleMouseDown}
                    // 'cursor-grabbing' तब दिखाएगा जब ड्रैग शुरू होगा, बेहतर UX के लिए
                    className={`overflow-hidden rounded-xl shadow-inner bg-gray-100 py-4 select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                >

                    {/* कार्ड लिस्ट - ट्रांसफ़ॉर्म के साथ स्लाइड होती है */}
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: transformValue() }}
                    >
                        {companyLogos.map((company) => (
                            <SwipeCard key={company.id} company={company} />
                        ))}
                    </div>
                </div>

                {/* नेविगेशन बटन (डेस्कटॉप) */}
                <button
                    onClick={goToPrev}
                    aria-label="Previous Slide"
                    className="absolute top-1/2 left-0 z-10 -translate-y-1/2 -translate-x-1/2 p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition duration-150 hidden md:block"
                >
                    {/* Chevron Left Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6" /></svg>
                </button>

                <button
                    onClick={goToNext}
                    aria-label="Next Slide"
                    className="absolute top-1/2 right-0 z-10 -translate-y-1/2 translate-x-1/2 p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition duration-150 hidden md:block"
                >
                    {/* Chevron Right Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>
                </button>

                {/* मोबाइल के लिए बटन (नीचे) */}
                <div className="flex justify-center mt-6 gap-4 md:hidden">
                    <button
                        onClick={goToPrev}
                        className="py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition duration-150 flex items-center shadow-md"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                        Previous
                    </button>
                    <button
                        onClick={goToNext}
                        className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-150 flex items-center shadow-md"
                    >
                        Next
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                    </button>
                </div>

            </div>
        </div>
    )
}

export default ExamBoards