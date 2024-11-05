/* eslint-disable no-unused-vars */
import { lazy, Suspense } from "react";
import BgUI from "../../components/common/BgUI";
import CalculatorModeSelector from "./components/CalculatorModeSelector.jsx";
import CalculatorDisplay from "./components/CalculatorDisplay.jsx";
import UploadSection from "./components/UploadSection.jsx";
import { useCalculator } from "./hooks/useCalculator";

// Lazy load components
const BasicButtons = lazy(() => import("./components/BasicButtons.jsx"));
const FunctionButtons = lazy(() => import("./components/FunctionButtons.jsx"));
const ResultDisplay = lazy(() => import("./components/ResultDisplay.jsx"));
const SolutionSteps = lazy(() => import("./components/SolutionSteps.jsx"));

const CalculatorPage = () => {
	const {
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
	} = useCalculator();

	return (
		<div className="min-h-screen bg-black -ml-20 sm:ml-0 flex flex-col items-center relative">
			<BgUI />
			<div className="w-full max-w-6xl pl-20 relative z-10">
				{/* Header */}
				<img
					src="assets/images/Logo.png"
					alt="Zgjidhje.AI"
					className="w-auto h-32 mx-auto mb-4"
				/>
				<p className="text-gray-600 mb-8 text-center text-2xl italic font-bold">
					Calculator
				</p>

				<div className="bg-gray-900 bg-opacity-80 rounded-lg shadow-lg p-4 sm:p-6">
					<CalculatorModeSelector mode={mode} onModeChange={handleModeChange} />

					<Suspense fallback={<div>Loading...</div>}>
						<CalculatorDisplay
							input={input}
							onInputChange={handleInput}
							onBackspace={handleBackspace}
						/>

						{mode === "Calculator" ? (
							<>
								<BasicButtons onButtonClick={handleInput} />
								<FunctionButtons onButtonClick={handleInput} />
							</>
						) : (
							<UploadSection onFileUpload={handleFileUpload} />
						)}

						<button
							className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
							onClick={handleSolve}
							disabled={loading}
						>
							{loading ? "Solving..." : "Solve"}
						</button>

						{result && <ResultDisplay result={result} onClear={handleClear} />}
						{steps.length > 0 && <SolutionSteps steps={steps} />}
					</Suspense>
				</div>
			</div>
		</div>
	);
};

export default CalculatorPage;
