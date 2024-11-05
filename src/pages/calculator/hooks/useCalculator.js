import { useState, useCallback } from 'react';
import { useMathOperations } from './useMathOperations';

export const useCalculator = () => {
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");
    const [steps, setSteps] = useState([]);
    const [mode, setMode] = useState("Calculator");
    const [loading, setLoading] = useState(false);

    const { evaluate, generateSteps, solveWithCohere } = useMathOperations();

    const handleInput = useCallback((value) => {
        setInput(prev => {
            switch (value) {
                case "sin":
                case "cos":
                case "tan":
                case "log":
                case "ln":
                    return `${prev}${value}(`;
                case "sqrt":
                    return `${prev}√(`;
                case "^2":
                    return prev ? `(${prev})²` : "";
                case "pi":
                    return `${prev}π`;
                case "e":
                    return `${prev}e`;
                case "!":
                    return prev ? `${prev}!` : "";
                default:
                    return prev + value;
            }
        });
    }, []);

    const handleSolve = async () => {
        setLoading(true);
        try {
            if (mode === "Calculator") {
                // Dynamically import mathjs only when needed
                const { evaluate: mathEvaluate } = await import('mathjs');
                const result = mathEvaluate(input);
                setResult(result.toString());
                setInput(result.toString());
                generateSteps(input, result);
            } else {
                await solveWithCohere(input);
            }
        } catch (error) {
            toast.error("An error occurred while solving the problem.");
            setResult("Error");
            setSteps([]);
        }
        setLoading(false);
    };

    // ... other handlers

    return {
        mode,
        input,
        result,
        steps,
        loading,
        handleModeChange: setMode,
        handleInput,
        handleSolve,
        handleClear: () => {
            setInput("");
            setResult("");
            setSteps([]);
        },
        handleBackspace: () => setInput(prev => prev.slice(0, -1))
    };
};
