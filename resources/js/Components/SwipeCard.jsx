import React from 'react';

// कंपनी कार्ड कंपोनेंट
const SwipeCard = ({ company }) => {
  return (
    // w-full on mobile, lg:w-1/3 on desktop (3 cards visible)
    // flex-shrink-0 ensures the card doesn't try to fit on one line
    <div className="shrink-0 w-full md:w-1/2 lg:w-1/3 p-4">
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 border border-gray-100 h-full">
            {/* लोगो डिस्प्ले */}
            <div className="flex justify-center mb-4">
                <img
                    src={company.logo}
                    alt={`${company.name} Logo`}
                    className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500/50 p-1"
                    // अगर लोगो लोड न हो तो प्लेसहोल्डर टेक्स्ट
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/100x100/f3f4f6/374151?text=${company.name.substring(0, 2)}`;
                    }}
                />
            </div>

            {/* कंपनी का नाम और श्रेणी */}
            <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{company.name}</h3>
                {/* <p className="text-sm text-indigo-600 font-medium bg-indigo-50 p-1 rounded-full inline-block px-3">
                    {company.category}
                </p> */}
            </div>

            {/* विवरण बटन */}
            {/* <div className="mt-4 flex justify-center">
                <button
                    className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-150 shadow-md"
                    onClick={() => console.log(`Viewing details for ${company.name}`)}
                >
                    Read More
                </button>
            </div> */}
        </div>
    </div>
  );
};

export default SwipeCard;