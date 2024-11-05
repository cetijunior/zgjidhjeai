import { useCallback } from 'react';

export const useMathOperations = () => {
    const evaluate = useCallback(async (expression) => {
        const { evaluate: mathEvaluate } = await import('mathjs');
        return mathEvaluate(expression);
    }, []);

    const generateSteps = useCallback(async (input, finalResult) => {
        const { parse, simplify, derivative } = await import('mathjs');
        // ... step generation logic
    }, []);

    const solveWithCohere = useCallback(async (input) => {
        const { default: axios } = await import('axios');
        // ... Cohere API logic
    }, []);

    return { evaluate, generateSteps, solveWithCohere };
}; 