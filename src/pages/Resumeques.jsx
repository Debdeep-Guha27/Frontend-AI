import React, { useState } from 'react';
import axios from 'axios';
import Questions from '../components/InterviewComponents/Questions';
import { UploadCloud, FileCheck } from 'lucide-react';

const ResumeQues = () => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [fileSelected, setFileSelected] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(false);

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
            const filteredQuestions = data.filter(q => !q.startsWith('Here are five interview questions' || 'These questions should help explore both your technical expertise and your ability to communicate complex ideas effectively in a team environment.'));

            setQuestions(filteredQuestions);
        } catch (err) {
            console.error(err);
            alert('Something went wrong while generating questions');
        } finally {
            setLoading(false);
        }
    };
    const handleSubmitAllAnswers = () => {
        console.log("Submitted answers:", answers);
        alert("Answers submitted! Check console for now.");
      };
      


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


                {questions.length > 0 && (
                    <>
                        <div className="mt-6 space-y-6">
                            {questions.map((q, index) => (
                                <Questions
                                    key={index}
                                    question={q}
                                    onAnswerChange={(answer) => handleAnswerChange(index, answer)}
                                />
                            ))}
                        </div>

                        <div className="mt-6 flex justify-center">
                            <button
                                onClick={handleSubmitAllAnswers}
                                className="bg-green-600 hover:bg-[#39FF14] hover:shadow-[0_0_15px_#39FF14] text-white hover:text-black px-10 py-3 rounded-full font-semibold transition"
                            >
                                Submit Answers
                            </button>
                        </div>
                    </>
                )}

            </div>
        </div>
    );
};

export default ResumeQues;
