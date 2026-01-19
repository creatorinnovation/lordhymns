import React, { useState } from 'react';
import { Info, X, CheckCircle, AlertTriangle } from 'lucide-react'; // Lucide Icons का उपयोग

// Modal component
const MainModal = ({ show, onClose, title, children, icon: Icon, color }) => {
    if (!show) return null;

    // Background color classes based on the 'color' prop
    const iconColorClass = {
        blue: 'text-blue-600 bg-blue-100',
        green: 'text-green-600 bg-green-100',
        yellow: 'text-yellow-600 bg-yellow-100',
    }[color] || 'text-gray-600 bg-gray-100';

    return (
        // Overlay (Background)
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-75 transition-opacity duration-300"
            aria-modal="true"
            role="dialog"
        >
            {/* Modal Container */}
            <div
                className="w-full max-w-lg mx-auto bg-white rounded-xl shadow-2xl transition-all duration-300 transform scale-100 opacity-100"
                onClick={(e) => e.stopPropagation()} // Click inside modal doesn't close it
            >
                <div className="p-6 sm:p-8">
                    {/* Header and Close Button */}
                    <div className="flex justify-between items-start">
                        <button
                            onClick={onClose}
                            className="p-1 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-600 transition"
                            aria-label="Close modal"
                        >
                            <X size={20} />
                        </button>
                        <div className='flex items-center'>
                            {Icon && (
                                <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${iconColorClass} mb-4`}>
                                    <Icon size={24} />
                                </div>
                            )}
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
                        </div>
                        <div></div>

                    </div>

                    {/* Icon and Title Section */}
                    <div className="text-center">
                        {/* {Icon && (
              <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${iconColorClass} mb-4`}>
                <Icon size={24} />
              </div>
            )}
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3> */}
                        <div className="text-sm text-gray-500">
                            {children}
                        </div>
                    </div>

                    {/* Action Buttons (Optional) */}
                    <div className="mt-6 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                        <button
                            onClick={onClose}
                            className={`w-full sm:w-auto px-4 py-2 text-sm font-medium rounded-lg shadow-sm transition ${color === 'blue' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        >
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainModal;