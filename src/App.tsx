/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import SplashScreen from "./components/SplashScreen";
import IntroScene from "./components/IntroScene";
import MainScreen from "./components/MainScreen";

type Scene = "splash" | "intro" | "main";

export default function App() {
  const [scene, setScene] = useState<Scene>("splash");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (scene !== "splash" && audioRef.current) {
      audioRef.current.volume = 0.5; // Set volume to 50%
      audioRef.current.play().catch((err) => console.error("Audio play failed:", err));
    }
  }, [scene]);

  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden">
      <audio
        ref={audioRef}
        src="https://drive.google.com/uc?export=download&id=1c-r785WHI24878jXu8rGwoWEphWcoyng"
        loop
      />
      <AnimatePresence mode="wait">
        {scene === "splash" && (
          <SplashScreen key="splash" onComplete={() => setScene("intro")} />
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
