/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimatePresence } from "motion/react";
import { useState } from "react";
import SplashScreen from "./components/SplashScreen";
import IntroScene from "./components/IntroScene";
import MainScreen from "./components/MainScreen";

type Scene = "splash" | "intro" | "main";

export default function App() {
  const [scene, setScene] = useState<Scene>("splash");

  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden">
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
