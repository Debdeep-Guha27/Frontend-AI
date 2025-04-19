import { useState } from 'react';
import { UploadCloud, FileCheck } from 'lucide-react';
import useATScheck from '@/hooks/useATScheck';
import { motion, AnimatePresence } from 'framer-motion';

function ATScheckerpage() {
    const [fileName, setFileName] = useState('');
    const [fileSelected, setFileSelected] = useState(false);
    const [jobTitle, setJobTitle] = useState('');
    const { isPending, isSuccess, error, mutateAsync } = useATScheck();
    const [fileBackend, setFile] = useState(null);
    const [apiResponse, setResponse] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        if (file && (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
            setFileName(file.name);
            setFileSelected(true);
        } else {
            alert('Only PDF or DOCX files are allowed.');
        }
    };

    const handleSubmit = async () => {
        setResponse(null); // Clear previous response
        const formdata = new FormData();
        formdata.append('resume', fileBackend);
        formdata.append('job_title', jobTitle);
        const data = await mutateAsync(formdata);
        setResponse(data);
    };

    return (
        <div className="min-h-screen py-20 flex flex-col items-center justify-center bg-[#010922] relative overflow-hidden">
            {/* Background Glow Effect */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#050B2A] via-[#0A0F2C] to-[#0D132E]" />

            {/* Card Container */}
            <div className="relative z-10 w-full max-w-lg bg-[#0A0F2C] rounded-[30px] border border-blue-400/30 backdrop-blur-lg p-8 shadow-[0_0_30px_#2f35ff60] text-white">

                

                {/* Header */}
                <h1 className="text-3xl text-center font-bold mb-6 text-white">ATS Resume Checker</h1>

                {/* Upload Section */}
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

                {/* Job Title Input */}
                <div className="mb-6">
                    <label htmlFor="jobTitle" className="block text-sm text-white mb-2">Job title</label>
                    <div className="relative w-full">
                        <select
                            id="jobTitle"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            className="appearance-none w-full px-10 py-2 rounded-xl bg-[#141a35] text-white border border-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="" disabled>Select a Job Title</option>
                            <option value="Frontend Developer">Frontend Developer</option>
                            <option value="Backend Developer">Backend Developer</option>
                            <option value="Full Stack Developer">Full Stack Developer</option>
                            <option value="Cloud Engineer">Cloud Engineer</option>
                            <option value="Data Scientist">Data Scientist</option>
                            <option value="Machine Learning Engineer">Machine Learning Engineer</option>
                            <option value="Mobile App Developer">Mobile App Developer</option>
                            <option value="UI/UX Designer">UI/UX Designer</option>
                        </select>

                        {/* Custom arrow icon */}
                        <div className="absolute right-5 top-1/2 transform -translate-y-1/2 pointer-events-none text-white">
                            ▼
                        </div>
                    </div>
                </div>

                {/* Button with Loader */}
                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-500 hover:bg-[#04D9FF] text-white py-3 rounded-full text-lg font-semibold transition shadow-lg disabled:opacity-80 flex items-center justify-center gap-2"
                    disabled={!fileSelected || isPending}
                >
                    {isPending ? (
                        <>
                            <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8H4z"
                                ></path>
                            </svg>
                            Checking...
                        </>
                    ) : (
                        'Check Resume'
                    )}
                </button>
            </div>

            {/* API Response Section with Animation */}
            <AnimatePresence>
                {apiResponse && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="relative z-10 w-full max-w-lg mt-8 bg-[#0A0F2C] rounded-[30px] border border-green-400/30 backdrop-blur-lg p-6 shadow-[0_0_30px_#00ff8860] text-white"
                    >
                        <h2 className="text-2xl font-bold text-green-400 mb-4 text-center">ATS Score</h2>
                        <div className="text-center text-4xl font-bold mb-4 text-white">
                            {apiResponse.score}
                        </div>

                        <h3 className="text-lg font-semibold text-blue-400 mb-2">Suggestions to Improve:</h3>
                        <ul className="list-disc list-inside space-y-2 text-zinc-200">
                            {apiResponse.suggestions && apiResponse.suggestions.length > 0 ? (
                                apiResponse.suggestions.map((suggestion, index) => (
                                    <li key={index}>{suggestion}</li>
                                ))
                            ) : (
                                <li>No suggestions. Your resume looks good!</li>
                            )}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default ATScheckerpage;
