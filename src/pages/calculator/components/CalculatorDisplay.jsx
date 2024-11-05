const CalculatorDisplay = ({ input, onInputChange, onBackspace }) => {
    return (
        <div className="mb-4">
            <div className="flex">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => onInputChange(e.target.value)}
                    className="w-full bg-gray-800 text-white text-xl p-3 rounded-l focus:outline-none"
                    placeholder="Enter expression..."
                />
                <button
                    onClick={onBackspace}
                    className="bg-gray-700 text-white px-4 rounded-r hover:bg-gray-600"
                >
                    ←
                </button>
            </div>
        </div>
    );
};

export default CalculatorDisplay; 