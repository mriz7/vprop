'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Music, VolumeX, Volume2, ChevronRight, MessageCircleHeart } from 'lucide-react';

export default function ValentineProposal() {
  const [stage, setStage] = useState('welcome');
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [hasMovedNo, setHasMovedNo] = useState(false);
  const [currentMemoryIndex, setCurrentMemoryIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showMemoryDetail, setShowMemoryDetail] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMusicPrompt, setShowMusicPrompt] = useState(true);
  const audioRef = useRef(null);
  const noButtonRef = useRef(null);

  // ============================================
  // CUSTOMIZE YOUR CONTENT HERE!
  // ============================================
  const partnerName = "Nithya"; // Change to your partner's name
  const songFile = "/song.mp3"; // Add your song to /public folder
  
  const memories = [
    { 
      id: 1, 
      image: "/memories/first-meet.jpg", // Add your photos to /public/memories/
      placeholder: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=400&fit=crop",
      date: "The Day We Met", 
      caption: "I knew from that moment my life would never be the same...", 
      fullStory: "Remember how nervous we both were? I couldn't stop smiling for days after." 
    },
    { 
      id: 2, 
      image: "/memories/first-date.jpg",
      placeholder: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=600&h=400&fit=crop",
      date: "Our First Date", 
      caption: "Moments turned into memories and walking along with you......", 
      fullStory: "We We talked until the moon shined bright. I never wanted that night to end" 
    },
    { 
      id: 3, 
      image: "/memories/adventure.jpg",
      placeholder: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=600&h=400&fit=crop",
      date: "Our First Adventure", 
      caption: "Every adventure is better with you by my side", 
      fullStory: "Getting lost in the bliss with each other was the best thing that happened to us that day." 
    },
    { 
      id: 4, 
      image: "/memories/cozy.jpg",
      placeholder: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=400&fit=crop",
      date: "Cozy Moments", 
      caption: "My favorite place is next to you", 
      fullStory: "Rainy days became my favorite because I got to spend them with you." 
    },
    { 
      id: 5, 
      image: "/memories/celebration.jpg",
      placeholder: "https://images.unsplash.com/photo-1529543544277-750e7e8a0cf6?w=600&h=400&fit=crop",
      date: "Celebrating Us", 
      caption: "Every moment with you is worth celebrating", 
      fullStory: "You make ordinary days feel extraordinary. Let's explore the world more together" 
    },
  ];

  const questions = [
    { id: 'q1', question: "What's your favorite memory of us?", options: ["Our first date", "Lazy Sundays together", "Our adventures", "Every single moment"], afterMemory: 1 },
    { id: 'q2', question: "What do you love most about us?", options: ["How we laugh together", "Our deep conversations", "How we support each other", "Everything!"], afterMemory: 2 },
    { id: 'q3', question: "Where should our next adventure be?", options: ["Somewhere tropical 🏝️", "Mountain getaway ⛰️", "City exploration 🌆", "Anywhere with you 💕"], afterMemory: 3 },
    { id: 'q4', question: "What's your dream date night?", options: ["Fancy dinner out", "Movie marathon at home", "Stargazing picnic", "Surprise me!"], afterMemory: 4 },
  ];

  const loveLetterText = `My Dearest ${partnerName},

From the moment you came into my life, everything changed. The colors became brighter, the music became sweeter, and my heart found its home.

Every memory we've made together is a treasure I hold close. Your laugh is my favorite sound, your smile is my favorite sight, and your heart is my favorite place to be.

Thank you for choosing me, for loving me, and for making every day an adventure worth living.

I love you more than words could ever express.

Forever yours,
Your Valentine Riyaz💕`;

  // Floating hearts data
  const [floatingHearts] = useState(() => 
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 4,
      size: 16 + Math.random() * 16,
      opacity: 0.1 + Math.random() * 0.2,
    }))
  );

  // Get image source (use placeholder if actual image doesn't exist)
  const getImageSrc = (memory) => {
    return memory.placeholder; // For demo, use placeholders
    // In production, you would check if the image exists and return memory.image
  };

  // Typing effect for love letter
  useEffect(() => {
    if (stage === 'loveletter' && !isTyping) {
      setIsTyping(true);
      let index = 0;
      const timer = setInterval(() => {
        if (index < loveLetterText.length) {
          setTypedText(loveLetterText.slice(0, index + 1));
          index++;
        } else clearInterval(timer);
      }, 25);
      return () => clearInterval(timer);
    }
  }, [stage, isTyping, loveLetterText]);

  const moveNoButton = () => {
    const maxX = 200;
    const maxY = 150;
    setNoButtonPosition({
      x: (Math.random() - 0.5) * maxX,
      y: (Math.random() - 0.5) * maxY,
    });
    setHasMovedNo(true);
  };

  const handleYesClick = () => {
    setStage('accepted');
    setTimeout(() => setStage('timeline'), 2500);
  };

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
    setTimeout(() => {
      if (currentMemoryIndex < memories.length - 1) {
        setCurrentMemoryIndex(prev => prev + 1);
        setStage('memory');
      } else {
        setStage('loveletter');
      }
    }, 600);
  };

  const nextFromMemory = () => {
    setShowMemoryDetail(false);
    const nextQuestion = questions.find(q => q.afterMemory === currentMemoryIndex + 1);
    if (nextQuestion) {
      setStage('question');
    } else if (currentMemoryIndex < memories.length - 1) {
      setCurrentMemoryIndex(prev => prev + 1);
    } else {
      setStage('loveletter');
    }
  };

  const startWithMusic = () => { 
    setShowMusicPrompt(false); 
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  };
  
  const startWithoutMusic = () => { 
    setShowMusicPrompt(false); 
  };
  
  const toggleMusic = () => { 
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
    }
    setIsPlaying(!isPlaying); 
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-100 via-rose-50 to-red-100">
      {/* Audio Element */}
      <audio ref={audioRef} src={songFile} loop preload="auto" />

      {/* Floating Hearts Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ y: '100vh', opacity: 0, rotate: 0 }}
            animate={{
              y: '-20vh',
              opacity: [0, heart.opacity, heart.opacity, 0],
              rotate: [0, 180, 360],
              x: [0, Math.sin(heart.id) * 50, 0],
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              ease: 'linear',
              repeat: Infinity,
            }}
            style={{ position: 'absolute', left: `${heart.x}%` }}
          >
            <Heart
              className="fill-pink-300 text-pink-300"
              style={{ width: heart.size, height: heart.size }}
            />
          </motion.div>
        ))}
      </div>

      {/* Music Prompt Overlay */}
      <AnimatePresence>
        {showMusicPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white/95 backdrop-blur-md rounded-3xl p-8 text-center max-w-sm shadow-2xl border border-pink-100"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-6"
              >
                <Music className="w-16 h-16 mx-auto text-rose-400" />
              </motion.div>
              <h2 className="text-2xl font-bold text-rose-600 mb-2" style={{ fontFamily: 'Caveat, cursive' }}>
                This experience is best with music
              </h2>
              <p className="text-gray-600 mb-6">Would you like to play our special song?</p>
              <div className="flex flex-col gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startWithMusic}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-red-400 to-pink-500 text-white font-semibold shadow-lg"
                >
                  Yes, play music 🎶
                </motion.button>
                <button
                  onClick={startWithoutMusic}
                  className="w-full py-3 rounded-full border-2 border-gray-200 text-gray-500 font-medium hover:border-gray-300 transition-colors"
                >
                  Continue without
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Music Control Button */}
      {!showMusicPrompt && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={toggleMusic}
          className="fixed top-5 right-5 z-40 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center border border-pink-100"
        >
          {isPlaying ? (
            <Volume2 className="w-5 h-5 text-rose-500" />
          ) : (
            <VolumeX className="w-5 h-5 text-gray-400" />
          )}
        </motion.button>
      )}

      {/* Main Content */}
      <div className="relative flex min-h-screen items-center justify-center px-4">
        <AnimatePresence mode="wait">
          
          {/* Welcome Screen */}
          {stage === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: [0, 10, 0], y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="mb-8"
              >
                <Heart className="w-20 h-20 mx-auto fill-red-400 text-red-400" />
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl text-rose-600 mb-4"
                style={{ fontFamily: 'Caveat, cursive' }}
              >
                Hi {partnerName},
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-xl text-rose-400 mb-12"
                style={{ fontFamily: 'Caveat, cursive' }}
              >
                I have something special for you...
              </motion.p>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStage('proposal')}
                className="px-10 py-4 rounded-full bg-gradient-to-r from-red-400 to-pink-500 text-white text-xl font-semibold shadow-lg"
              >
                Open it 💌
              </motion.button>
            </motion.div>
          )}

          {/* Proposal Screen */}
          {stage === 'proposal' && (
            <motion.div
              key="proposal"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="question-container text-center"
            >
              <motion.div
                animate={{ rotate: [0, 10, 0], y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="mb-8"
              >
                <Heart className="w-16 h-16 md:w-20 md:h-20 mx-auto fill-red-400 text-red-400" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl text-rose-600 mb-12 px-4"
                style={{ fontFamily: 'Caveat, cursive' }}
              >
                Will you be my Valentine?
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-6"
              >
                {/* YES Button */}
                <motion.button
                  onClick={handleYesClick}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(239, 68, 68, 0.4)',
                      '0 0 30px rgba(239, 68, 68, 0.6)',
                      '0 0 20px rgba(239, 68, 68, 0.4)',
                    ],
                  }}
                  transition={{
                    boxShadow: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  className="px-16 py-6 md:px-20 md:py-8 rounded-full bg-gradient-to-r from-red-400 to-pink-500 text-white text-2xl md:text-3xl font-bold shadow-lg"
                >
                  YES! 💕
                </motion.button>

                {/* NO Button */}
                <motion.button
                  ref={noButtonRef}
                  onMouseEnter={moveNoButton}
                  onTouchStart={moveNoButton}
                  animate={{ x: noButtonPosition.x, y: noButtonPosition.y }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="px-8 py-3 md:px-10 md:py-4 rounded-full border-2 border-gray-300 bg-white text-gray-500 text-sm md:text-base font-medium shadow-sm"
                >
                  {hasMovedNo ? '👀' : 'No'}
                </motion.button>
              </motion.div>

              {hasMovedNo && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 text-xl md:text-2xl text-rose-400"
                  style={{ fontFamily: 'Caveat, cursive' }}
                >
                  Oops! That button is shy... 😊
                </motion.p>
              )}
            </motion.div>
          )}

          {/* Accepted Celebration */}
          {stage === 'accepted' && (
            <motion.div
              key="accepted"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="text-center relative z-10"
            >
              {/* Confetti Hearts */}
              {Array.from({ length: 50 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: -20, opacity: 1, rotate: 0 }}
                  animate={{
                    y: typeof window !== 'undefined' ? window.innerHeight + 20 : 800,
                    opacity: [1, 1, 0],
                    rotate: 360,
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    delay: Math.random() * 0.5,
                    ease: 'linear',
                    repeat: Infinity,
                  }}
                  style={{ position: 'fixed', left: `${Math.random() * 100}%`, top: -20 }}
                  className="pointer-events-none"
                >
                  <Heart className="w-6 h-6 md:w-8 md:h-8 fill-red-400 text-red-400" />
                </motion.div>
              ))}

              <div className="mb-8 relative">
                <Heart className="w-24 h-24 md:w-32 md:h-32 mx-auto fill-red-500 text-red-500" />
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute -right-4 -top-4"
                >
                  <Sparkles className="w-8 h-8 fill-yellow-400 text-yellow-400" />
                </motion.div>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-6xl md:text-8xl text-red-500 mb-6"
                style={{ fontFamily: 'Caveat, cursive' }}
              >
                Yay! 🎉
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-2xl md:text-3xl text-rose-600"
                style={{ fontFamily: 'Caveat, cursive' }}
              >
                Let me take you on a journey through our story...
              </motion.p>
            </motion.div>
          )}

          {/* Timeline Introduction */}
          {stage === 'timeline' && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="text-center"
            >
              <motion.div className="mb-8">
                <MessageCircleHeart className="w-16 h-16 mx-auto text-rose-400" />
              </motion.div>

              <h2 className="text-5xl md:text-7xl text-rose-600 mb-4" style={{ fontFamily: 'Caveat, cursive' }}>
                Our Story
              </h2>
              <p className="text-xl text-rose-400 mb-12" style={{ fontFamily: 'Caveat, cursive' }}>
                A journey through our most precious moments...
              </p>

              <div className="flex justify-center gap-4 mb-10">
                {memories.map((_, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: idx * 0.1, type: 'spring' }}
                    className="w-4 h-4 rounded-full bg-gradient-to-r from-red-400 to-pink-500 shadow-md"
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStage('memory')}
                className="px-12 py-5 rounded-full bg-gradient-to-r from-red-400 to-pink-500 text-white text-xl font-semibold shadow-lg inline-flex items-center gap-2"
              >
                Begin Our Journey <ChevronRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}

          {/* Memory Display */}
          {stage === 'memory' && (
            <motion.div
              key={`memory-${currentMemoryIndex}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="w-full max-w-lg"
            >
              {/* Progress dots */}
              <div className="flex justify-center gap-3 mb-6">
                {memories.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      idx <= currentMemoryIndex
                        ? 'bg-gradient-to-r from-red-400 to-pink-500'
                        : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>

              <div className="bg-white/90 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl border border-pink-100">
                <div className="relative h-56 md:h-64 overflow-hidden">
                  <img
                    src={getImageSrc(memories[currentMemoryIndex])}
                    alt={memories[currentMemoryIndex].date}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm text-rose-600 font-semibold text-sm shadow-md">
                    {memories[currentMemoryIndex].date}
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-xl md:text-2xl text-rose-600 mb-4 italic" style={{ fontFamily: 'Caveat, cursive' }}>
                    &quot;{memories[currentMemoryIndex].caption}&quot;
                  </p>

                  <AnimatePresence>
                    {showMemoryDetail ? (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-pink-50 rounded-xl p-4 mb-4"
                      >
                        <p className="text-gray-700">{memories[currentMemoryIndex].fullStory}</p>
                      </motion.div>
                    ) : (
                      <button
                        onClick={() => setShowMemoryDetail(true)}
                        className="text-rose-400 font-medium mb-4 hover:text-rose-500 transition-colors"
                      >
                        Read more... 💭
                      </button>
                    )}
                  </AnimatePresence>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={nextFromMemory}
                  className="w-full py-4 bg-gradient-to-r from-pink-400 to-rose-500 text-white font-semibold text-lg flex items-center justify-center gap-2"
                >
                  Continue Our Story <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Question Screen */}
          {stage === 'question' && (() => {
            const q = questions.find(q => q.afterMemory === currentMemoryIndex + 1);
            if (!q) return null;
            return (
              <motion.div
                key={`question-${q.id}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="text-center w-full max-w-md"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mb-6"
                >
                  <MessageCircleHeart className="w-14 h-14 mx-auto text-rose-400" />
                </motion.div>

                <h2 className="text-3xl md:text-4xl text-rose-600 mb-8" style={{ fontFamily: 'Caveat, cursive' }}>
                  {q.question}
                </h2>

                <div className="flex flex-col gap-3">
                  {q.options.map((option, idx) => (
                    <motion.button
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(q.id, option)}
                      className="w-full py-4 px-6 rounded-2xl bg-white/90 backdrop-blur-sm border-2 border-pink-100 text-gray-700 font-medium text-left shadow-sm hover:border-pink-300 hover:shadow-md transition-all"
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            );
          })()}

          {/* Love Letter */}
          {stage === 'loveletter' && (
            <motion.div
              key="loveletter"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-lg px-2"
            >
              <div className="bg-gradient-to-b from-amber-50 to-orange-50 rounded-lg p-6 md:p-8 shadow-2xl border border-amber-100 max-h-[70vh] overflow-auto">
                <div className="text-center mb-6">
                  <Heart className="w-12 h-12 mx-auto fill-red-400 text-red-400" />
                </div>
                
                <pre className="whitespace-pre-wrap text-gray-700 leading-relaxed" style={{ fontFamily: 'Caveat, cursive', fontSize: '1.25rem' }}>
                  {typedText}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    |
                  </motion.span>
                </pre>

                {typedText.length === loveLetterText.length && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 text-center"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setStage('finale')}
                      className="px-10 py-4 rounded-full bg-gradient-to-r from-red-400 to-pink-500 text-white font-semibold shadow-lg"
                    >
                      See What&apos;s Next... 💕
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* Grand Finale */}
          {stage === 'finale' && (
            <motion.div
              key="finale"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center relative z-10"
            >
              {/* Floating hearts */}
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: '100vh', opacity: 0 }}
                  animate={{ y: '-100vh', opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 5 + Math.random() * 3, delay: Math.random() * 3, repeat: Infinity }}
                  style={{ position: 'fixed', left: `${Math.random() * 100}%` }}
                  className="pointer-events-none"
                >
                  <Heart
                    className="fill-pink-400 text-pink-400"
                    style={{ width: 20 + Math.random() * 30, height: 20 + Math.random() * 30 }}
                  />
                </motion.div>
              ))}

              <h1 className="text-5xl md:text-7xl text-red-500 mb-2" style={{ fontFamily: 'Caveat, cursive' }}>
                Happy Valentine&apos;s Day!
              </h1>
              <h2 className="text-2xl md:text-4xl text-rose-400 mb-8 italic" style={{ fontFamily: 'Caveat, cursive' }}>
                To My Forever Love
              </h2>

              {Object.keys(answers).length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-6 max-w-sm mx-auto shadow-lg border border-pink-100"
                >
                  <h3 className="text-xl text-rose-600 mb-4 font-semibold" style={{ fontFamily: 'Caveat, cursive' }}>
                    Your Answers:
                  </h3>
                  {Object.values(answers).map((answer, i) => (
                    <p key={i} className="text-gray-700 mb-2">💕 {String(answer)}</p>
                  ))}
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-sm mx-auto shadow-lg border border-pink-100"
              >
                <p className="text-gray-700 leading-relaxed">
                  Here&apos;s to many more memories,<br />
                  countless more adventures,<br />
                  and a lifetime of love together.
                </p>
                <p className="text-2xl md:text-3xl text-red-500 mt-4 font-bold" style={{ fontFamily: 'Caveat, cursive' }}>
                  I Love You! 💖
                </p>
              </motion.div>

              <div className="flex justify-center gap-4">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -20, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                  >
                    <Heart className="w-8 h-8 md:w-10 md:h-10 fill-pink-400 text-pink-400" />
                  </motion.div>
                ))}
              </div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setStage('welcome');
                  setCurrentMemoryIndex(0);
                  setAnswers({});
                  setTypedText('');
                  setIsTyping(false);
                  setHasMovedNo(false);
                  setNoButtonPosition({ x: 0, y: 0 });
                }}
                className="mt-8 px-8 py-3 rounded-full bg-white/90 border-2 border-rose-300 text-rose-500 font-semibold shadow-md"
              >
                Relive Our Story 🔄
              </motion.button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
