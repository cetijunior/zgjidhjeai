const ResultDisplay = ({ result, onClear }) => {
    return (
        <div className="mt-4">
            <div className="flex justify-between items-center bg-gray-800 p-3 rounded">
                <div className="text-white text-xl">{result}</div>
                <button
                    onClick={onClear}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                    Clear
                </button>
            </div>
        </div>
    );
};

export default ResultDisplay; 