import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const animationComponents = {
    variable_declaration: ({ obj, value }) => (
        <motion.div
            className="p-4 bg-blue-500 text-white rounded-lg shadow-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <strong>{obj}</strong> = {value}
        </motion.div>
    ),

    loop: ({ details }) => (
        <motion.div
            className="p-4 bg-purple-600 text-white rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            🔁 Loop: {details.value}
        </motion.div>
    ),

    assignment: ({ details }) => (
        <motion.div
            className="p-4 bg-yellow-500 text-black rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            ➕ {details.value}
        </motion.div>
    ),

    console_output: ({ details }) => (
        <motion.div
            className="p-4 bg-green-500 text-black rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            🖨️ {details.value}
        </motion.div>
    ),
};

const CodeVisualizer = ({ steps }) => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [visibleSteps, setVisibleSteps] = useState([]);

    useEffect(() => {
        if (!steps || steps.length === 0) return;

        const playSteps = async () => {
            for (let i = 0; i < steps.length; i++) {
                setVisibleSteps((prev) => [...prev, steps[i]]);
                await delay(1000);
                setCurrentStepIndex(i + 1);
            }
        };

        setVisibleSteps([]);
        setCurrentStepIndex(0);
        playSteps();
    }, [steps]);

    return (
        <div className="min-h-screen w-full bg-black text-white flex flex-col items-center p-6">
            <h1 className="text-2xl font-bold mb-6">Code Animation</h1>

            <div className="flex flex-col gap-4 items-center">
                <AnimatePresence>
                    {visibleSteps.map((step, idx) => {
                        const { animation } = step;
                        const AnimationComponent = animationComponents[animation.type];
                        return (
                            <motion.div
                                key={idx}
                                className="w-full flex justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                {AnimationComponent ? (
                                    <AnimationComponent
                                        obj={animation.objects?.[0]}
                                        details={animation.details}
                                        value={animation.details.value}
                                    />
                                ) : (
                                    <div className="p-4 bg-red-400 rounded-md">⚠️ Unknown animation type</div>
                                )}
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CodeVisualizer;
