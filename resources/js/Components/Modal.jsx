export default function Modal({ show, onClose, title, children }) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-black"
                >
                    ✕
                </button>

                {title && (
                    <h2 className="text-xl font-semibold mb-4 text-center">
                        {title}
                    </h2>
                )}

                {children}
            </div>
        </div>
    );
}
