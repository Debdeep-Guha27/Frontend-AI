import { useState } from 'react';
import { UploadCloud, FileCheck } from 'lucide-react';

function ATScheckerpage() {
    const [fileName, setFileName] = useState('');
    const [fileSelected, setFileSelected] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            setFileSelected(true);
        }
    };

    const handleSubmit = () => {
        if (!fileSelected) {
            alert('Please upload a PDF file before submitting.');
            return;
        }
        // Handle submit logic here
        alert(`Submitted: ${fileName}`);
    };

    return (
        <div className="min-h-screen w-full bg-[#0D0D0D] text-white flex items-center justify-center px-4 py-8">
            <div className="max-w-3xl w-full bg-[#1A1A1A] rounded-3xl shadow-2xl p-10 space-y-8">

                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-extrabold tracking-tight">ATS Resume Checker</h1>
                    <p className="text-zinc-400 text-lg">Upload your resume (PDF only) and check its compatibility with Applicant Tracking Systems.</p>
                </div>

                <div className="border-2 border-dashed border-zinc-600 rounded-xl bg-[#2A2A2A] hover:border-indigo-500 transition-all duration-300">
                    <label
                        htmlFor="resumeUpload"
                        className="flex flex-col items-center justify-center space-y-4 py-10 px-6 cursor-pointer"
                    >
                        {fileSelected ? (
                            <FileCheck className="w-12 h-12 text-green-400" />
                        ) : (
                            <UploadCloud className="w-12 h-12 text-zinc-400" />
                        )}
                        <span className="text-base font-medium text-zinc-300">
                            {fileName || "Click or drag a PDF file here"}
                        </span>
                        <input
                            type="file"
                            id="resumeUpload"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={handleSubmit}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold text-lg shadow-md hover:bg-indigo-500 transition-all duration-300 disabled:opacity-50"
                        disabled={!fileSelected}
                    >
                        Submit Resume
                    </button>
                </div>

                <div className="text-center text-sm text-zinc-500">
                    We’ll give you a quick analysis on how well your resume performs in ATS systems.
                </div>
            </div>
        </div>
    );
}

export default ATScheckerpage;
