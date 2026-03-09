import { motion } from "motion/react";
import { useEffect, useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import React from "react";

interface IntroSceneProps {
  onComplete: () => void;
}

const IntroScene: React.FC<IntroSceneProps> = ({ onComplete }) => {
  const [textVisible, setTextVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [canProceed, setCanProceed] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);

  // The full text to display
  const line1 = "더럽다고요?";
  const line2 = "다... 각자의 사정이 있는 것, 아니겠어요?";

  useEffect(() => {
    // Generate audio on mount
    const generateAudio = async () => {
      setIsLoadingAudio(true);
      try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
          console.error("GEMINI_API_KEY is missing");
          return;
        }

        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash-preview-tts",
          contents: [{ parts: [{ text: "더럽다고요? 후후... 다 각자의 사정이 있는 것, 아니겠어요?" }] }],
          config: {
            responseModalities: ["AUDIO"],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: "Kore" },
              },
            },
          },
        });

        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (base64Audio) {
          const audioBlob = new Blob(
            [Uint8Array.from(atob(base64Audio), (c) => c.charCodeAt(0))],
            { type: "audio/mp3" }
          );
          const url = URL.createObjectURL(audioBlob);
          setAudioUrl(url);
          
          // Auto-play if allowed (might be blocked by browser policy)
          const audio = new Audio(url);
          audio.loop = true;
          audioRef.current = audio;
          audio.onended = () => setIsPlaying(false);
          
          // Try to play automatically
          audio.play().then(() => setIsPlaying(true)).catch(() => {
            console.log("Auto-play prevented");
            setIsPlaying(false);
          });
        }
      } catch (error) {
        console.error("Error generating audio:", error);
      } finally {
        setIsLoadingAudio(false);
      }
    };

    generateAudio();

    const timer = setTimeout(() => {
      setTextVisible(true);
    }, 1000);
    
    return () => {
      clearTimeout(timer);
      // Removed URL.revokeObjectURL to allow audio to continue playing across scenes
    };
  }, []);

  const handlePlayAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-40 text-white p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      {/* Silhouette Placeholder */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />
      
      <div className="relative z-10 max-w-md w-full space-y-8 text-center">
        
        {/* Audio Control */}
        <div className="flex justify-center mb-8 h-8">
          {/* Audio control removed as requested */}
        </div>

        {/* Dialogue */}
        <div className="font-serif text-xl md:text-2xl leading-relaxed space-y-6 min-h-[120px]">
          {textVisible && (
            <>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-gray-200 italic"
              >
                "{line1}"
              </motion.p>
              
              <div className="h-8" />

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 2.5 }}
                onAnimationComplete={() => setCanProceed(true)}
                className="text-gray-200 italic"
              >
                "{line2}"
              </motion.p>
            </>
          )}
        </div>

        {/* Proceed Button */}
        {canProceed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="pt-12"
          >
            <button
              onClick={onComplete}
              className="px-8 py-3 border-b border-purple-500/30 text-purple-200/70 hover:text-purple-100 hover:border-purple-400 transition-all text-sm tracking-[0.2em] uppercase"
            >
              Enter Shop
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default IntroScene;
