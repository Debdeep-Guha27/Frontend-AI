import "./App.css";
import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import InterViewQuestions from "./pages/InterViewQuestions";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Profile from "./pages/Profile";
import { Toaster } from "./components/ui/sonner";
import AiGuidence from "./pages/AiGuidence";
import Questionpage from "./pages/Questionpage";
import ATScheckerpage from "./pages/ATScheckerpage";
import ResumeQues from "./pages/Resumeques";
import VideoVisualizer from "./pages/VideoVisualizerPage";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/StartInterview/:userid" element={<Chat />} />
          <Route
            path="/InterView/:course/:level"
            element={<InterViewQuestions />}
          />
          <Route path="/profile/:userid" element={<Profile />} />
          <Route path="/AI-Guidance" element={<AiGuidence />} />
          <Route path="/QuestionBank" element={<Questionpage/>}/>
          <Route path="/Resume-ATS" element={<ATScheckerpage/>}/>
          <Route path="/Resume-Interview" element={<ResumeQues/>}/>
          <Route path="/Code-to-Video" element={<VideoVisualizer/>}/>
        </Routes>
        <Toaster />
      </QueryClientProvider>
    </>
  );
}

export default App;
