/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import SplashScreen from "./components/SplashScreen";
import IntroScene from "./components/IntroScene";
import MainScreen from "./components/MainScreen";

type Scene = "splash" | "intro" | "main";

export default function App() {
  const [scene, setScene] = useState<Scene>("splash");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);

  // Aggressively try to play audio on any user interaction
  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.volume = 0.5;
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setAudioError(null);
          })
          .catch((err) => {
            console.error("Audio play failed:", err);
            // Don't show error for NotAllowedError as it just means we need user interaction
            if (err.name !== 'NotAllowedError') {
              setAudioError("음원을 불러올 수 없습니다. 링크가 만료되었거나 접근할 수 없습니다.");
            }
          });
      }
    };

    // Try immediately (might be blocked by browser)
    playAudio();

    // Try on any interaction
    document.addEventListener('click', playAudio);
    document.addEventListener('touchstart', playAudio);
    document.addEventListener('keydown', playAudio);
    
    return () => {
      document.removeEventListener('click', playAudio);
      document.removeEventListener('touchstart', playAudio);
      document.removeEventListener('keydown', playAudio);
    };
  }, [isPlaying]);

  const handleStart = () => {
    setScene("intro");
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setAudioError(null);
        }).catch((err) => {
          console.error(err);
          setAudioError("음원을 재생할 수 없습니다.");
        });
      }
    }
  };

  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden relative">
      {/* Using Discord CDN link */}
      <audio
        ref={audioRef}
        src="https://cdn.discordapp.com/attachments/1480535996197113991/1480536762756501504/talkf_wzn1ZbKVPt_GaP7EJyLPD6BsXUjxEmV7k_f_1c98ecd5c341.mp3?ex=69b008cf&is=69aeb74f&hm=5d8111a2f33d61bf4e7bc66f356d9a189bdca4d3455785fff88d6e817e0ae6df&"
        loop
        preload="auto"
        onError={(e) => {
          console.error("Audio element error:", e);
          setAudioError("음원 링크를 로드할 수 없습니다. 링크가 만료되었을 수 있습니다.");
        }}
      />
      
      {/* Global Audio Control */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering the global click handler
          toggleMute();
        }}
        className="fixed bottom-6 right-6 z-50 p-3 bg-purple-900/30 border border-purple-500/30 rounded-full text-purple-300 hover:bg-purple-800/50 hover:text-white transition-all backdrop-blur-sm"
        aria-label={isPlaying ? "Mute music" : "Play music"}
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>

      {/* Error Message Display */}
      {audioError && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-red-900/90 text-white px-6 py-3 rounded-lg text-sm backdrop-blur-md border border-red-500/50 shadow-2xl max-w-[90vw] text-center">
          {audioError}
        </div>
      )}

      <AnimatePresence mode="wait">
        {scene === "splash" && (
          <SplashScreen key="splash" onComplete={handleStart} />
        )}
        {scene === "intro" && (
          <IntroScene key="intro" onComplete={() => setScene("main")} />
        )}
        {scene === "main" && (
          <MainScreen key="main" />
        )}
      </AnimatePresence>
    </div>
  );
}
