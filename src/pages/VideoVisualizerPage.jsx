import React, { useState } from 'react';

function VideoVisualizer() {
    const [code, setCode] = useState('');

    const handleSubmit = () => {
        console.log('Submitted code:', code);
        alert('Code submitted successfully!');
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#1b1f3a] via-[#111320] to-[#0b0e1c] px-4 py-10 text-white">
            <div className="w-full max-w-5xl bg-[#131829] rounded-2xl shadow-[0_0_60px_rgba(0,255,255,0.1)] border border-[#2d3748] p-6 relative">


                <h2 className="text-2xl font-bold text-cyan-400 mb-6 text-center font-mono">Live Code Editor</h2>

                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="// Type your code here..."
                    className="w-full h-[400px] bg-[#0f111a] text-[#e2e8f0] font-mono text-sm p-6 rounded-xl border border-[#2d3748] shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none leading-relaxed tracking-wide"
                />

                <div className="mt-6 flex justify-center">
                    <button
                        onClick={handleSubmit}
                        className="bg-gradient-to-r from-cyan-400 to-blue-500 text-[#0f111a] font-semibold px-10 py-3 rounded-full shadow-[0_0_20px_#22d3ee] transition hover:from-cyan-300 hover:to-blue-400 hover:shadow-[0_0_25px_#67e8f9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400"
                    >
                        🚀 Run / Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VideoVisualizer;

