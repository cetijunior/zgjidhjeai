import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';

export const useCalculator = () => {
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");
    const [steps, setSteps] = useState([]);
    const [mode, setMode] = useState("Calculator");
    const [loading, setLoading] = useState(false);

    const handleInput = useCallback((value) => {
        setInput(prev => {
            switch (value) {
                case "sin":
                case "cos":
                case "tan":
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
                case "=":
                    return prev;
                default:
                    return prev + value;
            }
        });
    }, []);

    const generateSteps = useCallback(async (input, finalResult) => {
        try {
            const { parse, simplify, derivative } = await import('mathjs');
            const steps = [];
            const expr = parse(input);
            steps.push(`Original expression: ${expr.toString()}`);

            if (expr.type === "OperatorNode") {
                const simplified = simplify(expr);
                if (simplified.toString() !== expr.toString()) {
                    steps.push(`Simplified: ${simplified.toString()}`);
                }
            }

            steps.push(`Final result: ${finalResult}`);
            setSteps(steps);
        } catch (error) {
            console.error("Error generating steps:", error);
            setSteps([]);
        }
    }, []);

    const handleSolve = async () => {
        if (!input) {
            toast.warning("Please enter an expression");
            return;
        }

        setLoading(true);
        try {
            if (mode === "Calculator") {
                const { evaluate } = await import('mathjs');
                const result = evaluate(input);
                setResult(result.toString());
                await generateSteps(input, result);
            } else {
                // Word problem mode
                toast.info("Word problem solving coming soon!");
            }
        } catch (error) {
            toast.error("Invalid expression");
            setResult("Error");
            setSteps([]);
        } finally {
            setLoading(false);
        }
    };

    const handleClear = useCallback(() => {
        setInput("");
        setResult("");
        setSteps([]);
    }, []);

    const handleBackspace = useCallback(() => {
        setInput(prev => prev.slice(0, -1));
    }, []);

    const handleModeChange = useCallback((newMode) => {
        setMode(newMode);
        handleClear();
    }, [handleClear]);

    return {
        mode,
        input,
        result,
        steps,
        loading,
        handleModeChange,
        handleInput,
        handleSolve,
        handleClear,
        handleBackspace,
    };
};
