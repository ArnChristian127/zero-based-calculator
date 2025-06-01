import { useState } from 'react'
import Chart from './Chart'
export default function Calculate() {
    const [result, setResult] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [grades, setGrades] = useState({
        prelims: '',
        midterms: '',
        preFinal: '',
        final: '',
        totalUnits: ''
    });
    const checkGrade = (grades) => {
        const ranges = [
            [97.5, 1.00], [94.5, 1.25], [91.5, 1.50],
            [88.5, 1.75], [85.5, 2.00], [81.5, 2.25],
            [77.5, 2.50], [73.5, 2.75], [69.5, 3.00]
        ];
        for (const [min, grade] of ranges) {
            if (grades >= min) return grade.toFixed(2);
        }
        return "5.00";
    }
    const checkResults = (grades, units) => {
        if (checkGrade(grades) <= units) {
            return (
                <span className="text-blue-500">Passed</span>
            )
        }
        else {
            return (
                <span className="text-red-500">Failed</span>
            )
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
            setGrades((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const handleCalculate = async () => {
        const { prelims, midterms, preFinal, final, totalUnits } = grades;
        if (!prelims || !midterms || !preFinal || !final || !totalUnits) {
            setResult(
                <div className="bg-white shadow-lg p-4 md:p-6 lg:p-8 mt-8 rounded-lg text-gray-700">
                    <div className="text-center">
                        <h1 className="text-red-500">Please input all the requirements!</h1>
                    </div>
                </div>
            )
            return;
        }
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const totalGrade = (parseFloat(prelims) * 0.20) + (parseFloat(midterms) * 0.20) + (parseFloat(preFinal) * 0.20) + (parseFloat(final) * 0.40);
            setResult(
                <div className="bg-white shadow-lg p-4 md:p-6 lg:p-8 mt-8 rounded-lg text-gray-700">
                    <div className="flex items-center justify-center flex-col gap-2">
                        <h1 className="text-lg">The result is {checkResults(totalGrade, totalUnits)}!</h1>
                        <div className="w-full h-auto max-w-[100px]">
                            <Chart score={totalGrade}/>
                        </div>
                    </div>
                </div>
            )
        } finally {
            setIsLoading(false)
        }
    }
    const handleClear = () => {
        setGrades({
            prelims: '',
            midterms: '',
            preFinal: '',
            final: '',
            totalUnits: ''
        });
        setResult(null);
    } 
    return (
        <>
            <div className="bg-white shadow-lg p-4 md:p-6 lg:p-8 mt-8 rounded-lg text-gray-700">
                <h2 className="font-bold text-xl md:text-2xl mb-6">Calculate</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium">Prelims (20%)</label>
                        <input
                            className="w-full outline-none border-2 border-gray-300 p-1 rounded-lg focus:border-blue-500 transition-colors"
                            placeholder="100.0"
                            name='prelims'
                            value={grades.prelims}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium">Midterms (20%)</label>
                        <input
                            className="w-full outline-none border-2 border-gray-300 p-1 rounded-lg focus:border-blue-500 transition-colors"
                            placeholder="100.0"
                            name='midterms'
                            value={grades.midterms}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium">Pre-Final (20%)</label>
                        <input
                            className="w-full outline-none border-2 border-gray-300 p-1 rounded-lg focus:border-blue-500 transition-colors"
                            placeholder="100.0"
                            name='preFinal'
                            value={grades.preFinal}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium">Final (40%)</label>
                        <input
                            className="w-full outline-none border-2 border-gray-300 p-1 rounded-lg focus:border-blue-500 transition-colors"
                            placeholder="100.0"
                            name='final'
                            value={grades.final}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium">Total units</label>
                        <input
                            className="w-full outline-none border-2 border-gray-300 p-1 rounded-lg focus:border-blue-500 transition-colors"
                            placeholder="3.00"
                            name='totalUnits'
                            value={grades.totalUnits}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center gap-2 justify-center" onClick={() => handleCalculate()}>
                        Calculate
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-calculator" viewBox="0 0 16 16">
                            <path d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                            <path d="M4 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"/>
                        </svg>
                    </button>
                    <button className="w-full bg-red-600 hover:bg-red-700 focus:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center gap-2 justify-center" onClick={() => handleClear()}>
                        Clear
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eraser-fill" viewBox="0 0 16 16">
                            <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293z"/>
                        </svg>
                    </button>
                </div>
            </div>
            {isLoading ? (
                <div className="bg-white shadow-lg p-4 md:p-6 lg:p-8 mt-8 rounded-lg text-gray-700">
                    <div className="flex justify-center items-center">
                        <div className="flex justify-center items-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-3 border-blue-500"></div>
                        </div>
                        <span className="ml-3">Calculating your grades...</span>
                    </div>
                </div>
            ) : (
                result
            )}
        </>
    )
}