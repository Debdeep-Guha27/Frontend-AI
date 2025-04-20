import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Questions from '../components/InterviewComponents/Questions';
import { UploadCloud, FileCheck, Loader } from 'lucide-react';
import { useAnalysis } from '@/hooks/useAnalysis';

const ResumeQues = () => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [fileSelected, setFileSelected] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(false);
    const [analysisResult, setAnalysisResult] = useState([]);
    const { isPending, isSuccess, error, mutateAsync } = useAnalysis();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const handleFileChange = (e) => {
        const uploadedFile = e.target.files[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            setFileName(uploadedFile.name);
            setFileSelected(true);
        }
    };

    const handleAnswerChange = (index, answer) => {
        setAnswers((prev) => ({
            ...prev,
            [`question${index + 1}`]: questions[index],
            [`answer${index + 1}`]: answer,
        }));
    };

    const generateQuestions = async () => {
        if (!file) return alert('Please upload a resume PDF.');

        const formData = new FormData();
        formData.append('resume', file);

        try {
            setLoading(true);
            const res = await axios.post('http://localhost:3000/Interview/user/resume/pdf', formData);

            const data = res.data.data || [];
            const filteredQuestions = data.filter(q =>
                !q.startsWith('Here are five interview questions') &&
                !q.startsWith('These questions should help explore both your technical expertise')
            );

            setQuestions(filteredQuestions);
            console.log(filteredQuestions)
        } catch (err) {
            console.error(err);
            alert('Something went wrong while generating questions');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitAllAnswers = async () => {
        try {
            const response = await mutateAsync(answers);
            if (response?.success && response?.data?.length > 0) {
                setAnalysisResult(response.data);
            }
        } catch (error) {
            console.log(error);
            alert("Error submitting answers");
        }
    };
    useEffect(() => {
        if (questions && questions[currentQuestionIndex]) {
          const utterance = new SpeechSynthesisUtterance(questions[currentQuestionIndex]);
          utterance.lang = 'en-US';
          utterance.rate = 1;
          utterance.pitch = 1;
          window.speechSynthesis.cancel();
          window.speechSynthesis.speak(utterance);
        }
      }, [currentQuestionIndex, questions]);
      
    return (
        <div className="min-h-screen w-full bg-[#0A0F2C] text-white px-4 py-10 flex flex-col items-center">
            <div className="w-full max-w-4xl bg-[#14172b] p-8 rounded-2xl shadow-xl space-y-6">
                <h1 className="text-3xl font-bold text-center text-white">ATS Resume Q&A Generator</h1>

                <label
                    htmlFor="resumeUpload"
                    className="w-full border border-blue-500/40 bg-[#141a35] hover:border-blue-500 transition-all duration-300 rounded-2xl p-6 flex flex-col items-center justify-center space-y-3 cursor-pointer mb-6 shadow-inner"
                >
                    {fileSelected ? (
                        <FileCheck className="w-10 h-10 text-green-400 animate-bounce" />
                    ) : (
                        <UploadCloud className="w-10 h-10 text-blue-400 animate-pulse" />
                    )}
                    <p className="text-base text-white">{fileName || 'Upload your resume'}</p>
                    <p className="text-sm text-zinc-400">UPLOAD PDF, 2MB max</p>
                    <input
                        type="file"
                        id="resumeUpload"
                        accept=".pdf,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </label>

                <div className="w-full flex justify-center">
                    <button
                        onClick={generateQuestions}
                        disabled={loading || !fileSelected}
                        className="bg-green-600 hover:bg-[#39FF14] hover:shadow-[0_0_15px_#39FF14] text-white hover:text-black px-14 py-3 rounded-full font-semibold transition disabled:opacity-50"
                    >
                        {loading ? 'Generating...' : 'Generate Questions'}
                    </button>
                </div>

                {questions.length > 0 && questions[currentQuestionIndex] && (
                    <>
                        <div className="mt-6 space-y-6">
                            <Questions
                                key={currentQuestionIndex}
                                question={questions[currentQuestionIndex]}
                                onAnswerChange={(answer) =>
                                    handleAnswerChange(currentQuestionIndex, answer)
                                }
                            />
                        </div>

                        <div className="mt-6 flex justify-center gap-4">
                            {currentQuestionIndex < questions.length - 1 ? (
                                <button
                                    onClick={() => {
                                        if (currentQuestionIndex < questions.length - 1) {
                                            setCurrentQuestionIndex((prev) => prev + 1);
                                        }
                                    }}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 text-lg rounded-xl shadow-md transition"
                                >
                                    Next Question
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmitAllAnswers}
                                    disabled={isPending}
                                    className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-8 text-lg rounded-xl shadow-md transition flex items-center gap-2"
                                >
                                    {isPending ? (
                                        <>
                                            <Loader className="animate-spin w-5 h-5" /> Submitting...
                                        </>
                                    ) : (
                                        "Submit All"
                                    )}
                                </button>
                            )}
                        </div>
                    </>
                )}



                {analysisResult.length > 0 && (
                    <div className="mt-10 bg-[#1f2339] p-6 rounded-2xl shadow-lg space-y-4 text-sm sm:text-base">
                        <h2 className="text-xl font-bold text-green-400">AI Analysis Report</h2>
                        {(() => {
                            const grouped = [];
                            let currentGroup = [];

                            analysisResult.forEach((line) => {
                                if (line.startsWith("Question")) {
                                    if (currentGroup.length) grouped.push(currentGroup);
                                    currentGroup = [line];
                                } else {
                                    currentGroup.push(line);
                                }
                            });

                            if (currentGroup.length) grouped.push(currentGroup);

                            return grouped.map((block, idx) => (
                                <div key={idx} className="p-4 rounded-xl bg-[#2a2f4a] text-zinc-200 space-y-1 border border-white/10">
                                    {block.map((line, i) => (
                                        <p key={i}>{line}</p>
                                    ))}
                                </div>
                            ));
                        })()}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResumeQues;
