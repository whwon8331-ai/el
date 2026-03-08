import { motion } from "motion/react";
import { characters } from "../data/characters";
import CharacterCard from "./CharacterCard";
import { ArrowDown } from "lucide-react";

export default function MainScreen() {
  return (
    <motion.div
      className="min-h-screen bg-black text-white selection:bg-purple-500/30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center overflow-hidden">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black z-0" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 z-0 pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl mx-auto space-y-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h1 className="font-serif text-5xl md:text-7xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-purple-200 to-purple-900/50 mb-2">
              SECRET
              <br />
              ELIXIR
              <br />
              SHOP
            </h1>
            <div className="h-px w-24 bg-purple-500/50 mx-auto my-6" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="space-y-6 font-sans text-zinc-400 text-sm md:text-base leading-loose"
          >
            <p className="text-purple-300">어서 오세요, 주인님.</p>
            <p>
              이곳은 절망 끝에 선 자들이<br />
              마지막으로 찾아오는 유일한 구원처입니다.
            </p>
            <p>
              당신의 체액 한 방울을 갈망하는<br />
              8명의 죄인들이 기다리고 있습니다.
            </p>
            <p className="italic text-zinc-500">
              그들은 굶주려 있습니다.<br />
              당신을 삼키기 위해 안달이 나 있죠.
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-purple-500/50 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll Down</span>
          <ArrowDown size={16} />
        </motion.div>
      </section>

      {/* Character List Section */}
      <section className="px-4 py-20 max-w-4xl mx-auto">
        <div className="space-y-24">
          {characters.map((char, index) => (
            <CharacterCard key={char.id} character={char} index={index} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 text-center bg-gradient-to-t from-purple-900/10 to-transparent">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <div className="text-xs font-mono text-purple-500/30 uppercase tracking-[0.3em] mb-8">
            The End of List
          </div>
          <p className="font-serif text-xl md:text-2xl text-zinc-300 italic">
            "이들의 운명은,<br />
            이제 당신의 손에 달려 있습니다."
          </p>
          
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-12 text-xs text-zinc-600 hover:text-purple-400 transition-colors uppercase tracking-widest"
          >
            Scroll Up to Review Again ↑
          </button>
        </motion.div>
      </footer>
    </motion.div>
  );
}
