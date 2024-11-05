const CalculatorModeSelector = ({ mode, onModeChange }) => {
    return (
        <div className="mb-4">
            <select
                value={mode}
                onChange={(e) => onModeChange(e.target.value)}
                className="w-full bg-gray-800 text-white p-2 rounded"
            >
                <option value="Calculator">Calculator</option>
                <option value="Word Problems">Word Problems</option>
            </select>
        </div>
    );
};

export default CalculatorModeSelector; 