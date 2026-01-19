


const ItemCard = ({ id, title, subtitle, isBookmarked, onToggle }) => (

    <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300 transform hover:scale-[1.01] border border-gray-100 flex justify-between items-start">

        {/* शीर्षक और उपशीर्षक */}
        <div className="pr-4 flex-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">{title}</h3>
            <p className="text-gray-600 text-sm">{subtitle}</p>
        </div>

        {/* बुकमार्क बटन */}
        <button
            onClick={() => onToggle(id)}
            className="p-2 rounded-full transition duration-150 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label={isBookmarked ? 'Bookmark हटाएँ' : 'Bookmark जोड़ें'}
        >
            {isBookmarked ? (
                // Filled Bookmark Icon (जब बुकमार्क हो)
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-indigo-600">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"></path>
                </svg>
            ) : (
                // Outline Bookmark Icon (जब बुकमार्क न हो)
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 hover:text-indigo-600">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"></path>
                </svg>
            )}
        </button>
    </div>
);

export default ItemCard;