const FunctionButtons = ({ onButtonClick }) => {
    const functionButtons = [
        { label: "sin", value: "sin" },
        { label: "cos", value: "cos" },
        { label: "tan", value: "tan" },
        { label: "√", value: "sqrt" },
        { label: "x²", value: "^2" },
        { label: "log", value: "log" },
        { label: "ln", value: "ln" },
        { label: "π", value: "pi" }
    ];

    return (
        <div className="grid grid-cols-4 gap-2 mb-4">
            {functionButtons.map((button) => (
                <button
                    key={button.label}
                    onClick={() => onButtonClick(button.value)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    {button.label}
                </button>
            ))}
        </div>
    );
};

export default FunctionButtons; 