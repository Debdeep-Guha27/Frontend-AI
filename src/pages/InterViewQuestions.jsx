// Updated InterViewQuestions.jsx with speech synthesis
import Questions from "@/components/InterviewComponents/Questions";
import { Particles } from "@/components/ui/particles";
import UserContext from "@/contexts/UserContext";
import { useAnalysis } from "@/hooks/useAnalysis";
import { ArrowLeft, Loader2, CheckCircle, X } from "lucide-react";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const InterViewQuestions = () => {
  const { course, level, questions } = useContext(UserContext);
  const [answers, setAnswers] = useState({});
  const [apiResponse, setApiResponse] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const navigate = useNavigate();

  const { isPending, isSuccess, error, mutateAsync } = useAnalysis();

  const handleAnswerChange = (index, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [`question${index + 1}`]: questions[index],
      [`answer${index + 1}`]: answer,
    }));
  };

  const handleSubmit = async () => {
    setApiResponse(null);
    try {
      const data = await mutateAsync(answers);
      setApiResponse(data?.data);
      const interviewId = Date.now().toString();
      const existingInterviews = JSON.parse(localStorage.getItem("interviews")) || [];
      const updatedInterviews = [...existingInterviews, { id: interviewId, response: data?.data }];
      localStorage.setItem("interviews", JSON.stringify(updatedInterviews));
    } catch (err) {
      setApiResponse(["Something went wrong. Please try again."]);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  // 📣 Speak the current question aloud when it changes
  useEffect(() => {
    if (questions && questions[currentQuestionIndex]) {
      const utterance = new SpeechSynthesisUtterance(questions[currentQuestionIndex]);
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.lang = 'en-US';
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  }, [currentQuestionIndex, questions]);

  return (
    <div className="bg-black w-screen min-h-screen text-white flex flex-col items-center relative py-10">
      <Particles
        className="absolute inset-0"
        quantity={150}
        ease={80}
        color="#ffffff"
        refresh
      />

      {/* Back Button */}
      <div
        className="fixed top-5 left-5 border border-white rounded-full p-3 hover:bg-white hover:text-black transition-all duration-200 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="w-6 h-6" />
      </div>

      {/* Title */}
      <div className="text-center mb-6 px-6">
        <h1 className="text-3xl md:text-4xl font-bold">
          Questions on <span className="text-blue-500">{course}</span> ({level} Level)
        </h1>
      </div>

      {/* Questions Step UI */}
      {!questions ? (
        <div className="text-lg text-gray-400">Loading questions...</div>
      ) : (
        <>
          <div className="w-full max-w-4xl px-6 pb-10 animate-fade-in flex flex-col items-center justify-center text-center">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full">
              <Questions
                key={currentQuestionIndex}
                question={questions[currentQuestionIndex]}
                onAnswerChange={(answer) => handleAnswerChange(currentQuestionIndex, answer)}
              />
              <button
                onClick={() => {
                  const utterance = new SpeechSynthesisUtterance(questions[currentQuestionIndex]);
                  utterance.lang = 'en-US';
                  window.speechSynthesis.speak(utterance);
                }}
                className="mt-4 text-sm text-blue-400 hover:text-blue-200 underline"
              >
                🔊 Read Question Again
              </button>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              {currentQuestionIndex < questions.length - 1 ? (
                <button
                  onClick={nextQuestion}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 text-lg rounded-xl shadow-md transition"
                >
                  Next Question
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isPending}
                  className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-8 text-lg rounded-xl shadow-md transition flex items-center gap-2"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="animate-spin w-5 h-5" /> Submitting...
                    </>
                  ) : (
                    "Submit All"
                  )}
                </button>
              )}
            </div>
          </div>

          {/* API Response Section */}
          {apiResponse && (
            <div className="mt-6 w-full max-w-2xl bg-gray-900 p-6 rounded-lg shadow-lg transition-all duration-300">
              <h2 className="text-lg text-green-400 font-semibold mb-3">
                AI Feedback:
              </h2>
              <ul className="space-y-2">
                {(typeof apiResponse === "string" ? apiResponse.split("\n") : apiResponse)
                  .filter((line) => line.trim() !== "")
                  .map((line, index) => {
                    const isZeroMark = /Marks:\s*0\//.test(line);
                    const iconColor = isZeroMark ? "text-red-500" : "text-green-400";
                    const textColor = isZeroMark ? "text-red-300" : "text-white";
                    const Icon = isZeroMark ? X : CheckCircle;
                    return (
                      <li
                        key={index}
                        className={`bg-gray-800 p-3 rounded-lg ${textColor} text-sm flex items-start gap-2 shadow-md hover:bg-gray-700 transition`}
                      >
                        <Icon className={`w-5 h-5 ${iconColor}`} />
                        {line}
                      </li>
                    );
                  })}
              </ul>
            </div>
          )}

          {/* Error Handling */}
          {error && (
            <div className="mt-4 text-lg text-red-400 bg-gray-900 p-4 rounded-lg max-w-2xl text-center shadow-lg">
              Something went wrong. Please try again.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default InterViewQuestions;
