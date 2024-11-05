const SolutionSteps = ({ steps }) => {
    return (
        <div className="mt-4 bg-gray-800 p-4 rounded">
            <h3 className="text-white font-bold mb-2">Solution Steps:</h3>
            <div className="space-y-2">
                {steps.map((step, index) => (
                    <div key={index} className="text-gray-300">
                        {step}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SolutionSteps; 