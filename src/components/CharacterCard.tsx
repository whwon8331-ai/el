import { motion } from "motion/react";
import { Character } from "../data/characters";
import { useState } from "react";
import React from "react";

interface CharacterCardProps {
  character: Character;
  index: number;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="w-full max-w-md mx-auto mb-12 bg-zinc-900/80 border border-purple-900/30 overflow-hidden shadow-2xl shadow-black relative group"
    >
      {/* Card Header / Number - Removed as requested */}


      {/* Image Slot (Top 50% approx) */}
      <div 
        className="relative aspect-[4/5] overflow-hidden cursor-pointer"
        onClick={() => setIsHovered(!isHovered)}
      >
        <motion.img
          src={character.imageUrl}
          alt={character.name}
          className={`w-full h-full object-cover transition-all duration-700 ${isHovered ? 'filter-none scale-110' : 'grayscale scale-100'}`}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-90" />
        
        {/* Dialogue Overlay on Image */}
        <div className="absolute bottom-6 left-6 right-6 text-center">
          <p className="font-serif italic text-lg text-white/90 drop-shadow-lg leading-relaxed">
            "{character.dialogue}"
          </p>
        </div>
      </div>

      {/* Content Slot */}
      <div className="p-6 space-y-4 relative bg-zinc-900">
        {/* Title & Name */}
        <div className="border-b border-purple-900/30 pb-4">
          <h3 className="text-purple-400 text-xs uppercase tracking-widest mb-1">{character.title}</h3>
          <h2 className="text-xl font-serif text-white tracking-wide">{character.name}</h2>
          <div className="flex gap-4 mt-2 text-xs text-zinc-400 font-mono">
            <span>Age: {character.age}</span>
            <span>Height: {character.height}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 text-xs text-zinc-500 font-mono">
          {character.tags.map(tag => (
            <span key={tag} className="bg-zinc-800/50 px-2 py-1 rounded">{tag}</span>
          ))}
        </div>

        {/* Description */}
        <p className="text-zinc-400 text-sm leading-relaxed font-sans">
          {character.description}
        </p>

        {/* Hidden Voice */}
        <div className="pt-4 flex flex-col gap-2 text-xs font-mono border-t border-purple-900/30 mt-4">
          <span className="text-zinc-600 uppercase tracking-widest">Hidden Voice:</span>
          <span className="text-purple-300 italic">
            {character.hiddenVoice}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default CharacterCard;
