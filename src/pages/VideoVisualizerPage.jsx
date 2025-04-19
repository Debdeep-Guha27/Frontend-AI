import CodeVisualizer from '@/components/CodeVisualizer/Codevisualizer';
import React, { useState } from 'react';

function VideoVisualizer() {
    const [code, setCode] = useState('');

    const handleSubmit = () => {
        console.log('Submitted code:', code);
        alert('Code submitted successfully!');
    };
    const demoSteps = [
        {
            step: 1,
            title: "Declare numbers array",
            animation: {
                type: "variable_declaration",
                objects: ["numbers"],
                details: {
                    value: "[3, 7, 2, 9, 4]",
                    position: "center",
                    effect: "fadeIn"
                }
            },
            narration: "We start by declaring an array of numbers."
        },
        {
            step: 2,
            title: "Initialize max variable",
            animation: {
                type: "variable_declaration",
                objects: ["max"],
                details: {
                    value: "numbers[0] = 3",
                    position: "centerRight",
                    effect: "fadeIn"
                }
            },
            narration: "We initialize 'max' to the first element of the array."
        },
        {
            step: 3,
            title: "Loop iteration i = 1",
            animation: {
                type: "loop",
                objects: ["i"],
                details: {
                    value: "i = 1, numbers[1] = 7",
                    position: "top",
                    effect: "highlight"
                }
            },
            narration: "We begin the loop at index 1, checking if numbers[1] is greater than max."
        },
        {
            step: 4,
            title: "Update max",
            animation: {
                type: "assignment",
                objects: ["max", "numbers[1]"],
                details: {
                    value: "max = 7",
                    position: "center",
                    effect: "showArrow"
                }
            },
            narration: "Since 7 is greater than 3, max is updated to 7."
        },
        {
            step: 5,
            title: "Loop iteration i = 2",
            animation: {
                type: "loop",
                objects: ["i"],
                details: {
                    value: "i = 2, numbers[2] = 2",
                    position: "top",
                    effect: "highlight"
                }
            },
            narration: "Now we check numbers[2] = 2."
        },
        {
            step: 6,
            title: "No update to max",
            animation: {
                type: "assignment",
                objects: [],
                details: {
                    value: "2 < 7 → no change",
                    position: "center",
                    effect: "fadeIn"
                }
            },
            narration: "2 is less than 7, so max remains 7."
        },
        {
            step: 7,
            title: "Loop iteration i = 3",
            animation: {
                type: "loop",
                objects: ["i"],
                details: {
                    value: "i = 3, numbers[3] = 9",
                    position: "top",
                    effect: "highlight"
                }
            },
            narration: "We now check numbers[3] = 9."
        },
        {
            step: 8,
            title: "Update max",
            animation: {
                type: "assignment",
                objects: ["max", "numbers[3]"],
                details: {
                    value: "max = 9",
                    position: "center",
                    effect: "showArrow"
                }
            },
            narration: "9 is greater than 7, so max is updated to 9."
        },
        {
            step: 9,
            title: "Loop iteration i = 4",
            animation: {
                type: "loop",
                objects: ["i"],
                details: {
                    value: "i = 4, numbers[4] = 4",
                    position: "top",
                    effect: "highlight"
                }
            },
            narration: "We check the last element, numbers[4] = 4."
        },
        {
            step: 10,
            title: "No update to max",
            animation: {
                type: "assignment",
                objects: [],
                details: {
                    value: "4 < 9 → no change",
                    position: "center",
                    effect: "fadeIn"
                }
            },
            narration: "4 is less than 9, so max remains 9."
        },
        {
            step: 11,
            title: "Print max value",
            animation: {
                type: "console_output",
                objects: ["console.log", "max"],
                details: {
                    value: "Max is 9",
                    position: "consoleArea",
                    effect: "fadeIn"
                }
            },
            narration: "We print the final maximum value."
        }
    ];



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

            <div className="min-h-screen bg-black flex justify-center items-center">
                <CodeVisualizer steps={demoSteps} />
            </div>
        </div>
    );
}

export default VideoVisualizer;

