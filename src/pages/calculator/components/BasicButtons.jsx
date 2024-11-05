const BasicButtons = ({ onButtonClick }) => {
    const basicButtons = [
        "7", "8", "9", "+",
        "4", "5", "6", "-",
        "1", "2", "3", "*",
        "0", ".", "/", "="
    ];

    return (
        <div className="grid grid-cols-4 gap-2 mb-4">
            {basicButtons.map((button) => (
                <button
                    key={button}
                    onClick={() => onButtonClick(button)}
                    className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                    {button}
                </button>
            ))}
        </div>
    );
};

export default BasicButtons; 