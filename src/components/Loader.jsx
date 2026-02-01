import { useState, useEffect, useCallback } from 'react'
import FloatingImages from './FloatingImages'

const steps = [
  { 
    text: 'November 14, 2014', 
    delay: 1000, 
    type: 'date',
    style: 'mono'
  },
  { 
    text: '@ButtCoin posted', 
    delay: 900, 
    type: 'action',
    typewriter: true
  },
  { 
    text: 'GUNCOIN', 
    delay: 1300, 
    type: 'highlight',
    glitch: true
  },
  { 
    text: 'A decade later...', 
    delay: 1000, 
    type: 'transition',
    fade: true
  },
  { 
    text: 'The legend lives on', 
    delay: 1100, 
    type: 'epic',
    typewriter: true
  }
]

const TypewriterText = ({ text, onComplete }) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 60) // Speed of typing - slightly faster for better pacing
      return () => clearTimeout(timeout)
    } else if (onComplete) {
      const completeTimeout = setTimeout(onComplete, 100)
      return () => clearTimeout(completeTimeout)
    }
  }, [currentIndex, text, onComplete])

  return <span className="inline-block">{displayText}</span>
}

const Loader = ({ onEnter }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [showButton, setShowButton] = useState(false)
  const [textFinished, setTextFinished] = useState(false)
  const [typewriterComplete, setTypewriterComplete] = useState(false)
  const [showSkip, setShowSkip] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [assetsLoaded, setAssetsLoaded] = useState(false)

  // Preload assets
  useEffect(() => {
    const imagesToPreload = ['/newlogo.jpg', '/buttcoinpost.png']
    const audioToPreload = '/gunmusic.mp4'
    
    let loadedCount = 0
    const totalAssets = imagesToPreload.length + 1
    
    const updateProgress = () => {
      loadedCount++
      setLoadingProgress((loadedCount / totalAssets) * 100)
      if (loadedCount === totalAssets) {
        setAssetsLoaded(true)
      }
    }

    // Preload images
    imagesToPreload.forEach(src => {
      const img = new Image()
      img.onload = updateProgress
      img.onerror = updateProgress
      img.src = src
    })

    // Preload audio
    const audio = new Audio()
    audio.oncanplaythrough = updateProgress
    audio.onerror = updateProgress
    audio.src = audioToPreload
  }, [])

  // Show skip button after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkip(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleSkip = useCallback(() => {
    setTextFinished(true)
    setShowButton(true)
    setCurrentStep(steps.length - 1)
  }, [])

  useEffect(() => {
    if (!assetsLoaded) return

    let timeoutId
    let currentIndex = 0

    const showNextStep = () => {
      if (currentIndex < steps.length) {
        setCurrentStep(currentIndex)
        setTypewriterComplete(false)
        
        const currentStepData = steps[currentIndex]
        const baseDelay = currentStepData.delay
        const typewriterDelay = currentStepData.typewriter ? currentStepData.text.length * 60 : 0
        
        timeoutId = setTimeout(() => {
          currentIndex++
          if (currentIndex < steps.length) {
            showNextStep()
          } else {
            // Hide text and show button after all steps
            setTimeout(() => {
              setTextFinished(true)
              setTimeout(() => {
                setShowButton(true)
              }, 300)
            }, baseDelay)
          }
        }, baseDelay + typewriterDelay)
      }
    }

    showNextStep()

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [assetsLoaded])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: '#f9971f' }}>
      <FloatingImages maxImages={10} />
      
      {/* Skip Button */}
      {showSkip && !showButton && (
        <button
          onClick={handleSkip}
          className="absolute top-8 right-8 z-50 px-7 py-3 bg-black/30 hover:bg-black/60 text-white rounded-xl font-bold text-xs tracking-[0.2em] transition-all duration-300 backdrop-blur-md border border-white/20 hover:border-white/50 uppercase hover:scale-105 active:scale-95"
          style={{
            animation: 'fadeInScale 0.5s ease-out',
            letterSpacing: '0.2em',
            fontWeight: '600'
          }}
        >
          SKIP
        </button>
      )}

      {/* Loading Progress Bar */}
      {!assetsLoaded && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 z-50">
          <div className="text-center mb-6 text-black font-light text-xl tracking-[0.3em] uppercase cinematic-text">
            Loading Assets
          </div>
          <div className="w-full h-1.5 bg-black/15 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-gradient-to-r from-black via-gray-800 to-black transition-all duration-500 ease-out"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <div className="text-center mt-4 text-black/60 text-base font-mono tracking-[0.2em]">
            {Math.round(loadingProgress)}%
          </div>
        </div>
      )}

      {/* Progress Dots */}
      {assetsLoaded && !textFinished && (
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex gap-3 z-50">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                index <= currentStep 
                  ? 'bg-black scale-110' 
                  : 'bg-black/30 scale-100'
              }`}
              style={{
                boxShadow: index <= currentStep ? '0 0 10px rgba(0,0,0,0.5)' : 'none'
              }}
            />
          ))}
        </div>
      )}

      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 relative z-10">
        {/* Animated Text Steps - Perfectly Centered */}
        {!textFinished && assetsLoaded && (
          <div className={`w-full max-w-5xl px-4 transition-all duration-700 ${
            textFinished ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'
          }`}>
            <div className="relative w-full flex items-center justify-center min-h-[200px]">
              {steps.map((step, index) => {
                const isActive = currentStep === index
                
                // Date style
                if (step.type === 'date') {
                  return (
                    <div
                      key={index}
                      className={`absolute transition-all duration-700 ease-out text-center ${
                        isActive ? 'opacity-100 translate-y-0 scale-100 blur-0 z-10' : 'opacity-0 translate-y-8 scale-95 blur-sm pointer-events-none z-0'
                      }`}
                    >
                      {isActive && (
                        <h2 
                          className="font-mono text-3xl sm:text-4xl md:text-6xl font-thin text-black tracking-[0.5em] cinematic-text uppercase"
                          style={{
                            textShadow: '0 1px 3px rgba(0,0,0,0.2), 0 8px 24px rgba(0,0,0,0.15)',
                            fontVariantNumeric: 'tabular-nums',
                            letterSpacing: '0.5em',
                            animation: 'fadeInScale 0.7s ease-out',
                            fontWeight: '100'
                          }}
                        >
                          {step.text}
                        </h2>
                      )}
                    </div>
                  )
                }
                
                // Action with typewriter
                if (step.type === 'action') {
                  return (
                    <div
                      key={index}
                      className={`absolute transition-all duration-700 ease-out text-center ${
                        isActive ? 'opacity-100 translate-y-0 scale-100 blur-0 z-10' : 'opacity-0 translate-y-8 scale-95 blur-sm pointer-events-none z-0'
                      }`}
                    >
                      {isActive && (
                        <h2 
                          className="text-3xl sm:text-5xl md:text-7xl font-medium text-black cinematic-text px-4"
                          style={{
                            textShadow: '0 2px 8px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.2)',
                            letterSpacing: '0.02em',
                            animation: 'fadeInScale 0.5s ease-out',
                            fontWeight: '500'
                          }}
                        >
                          {step.typewriter ? (
                            <TypewriterText text={step.text} onComplete={() => setTypewriterComplete(true)} />
                          ) : (
                            step.text
                          )}
                          {step.typewriter && !typewriterComplete && <span className="animate-pulse ml-1 font-extralight">|</span>}
                        </h2>
                      )}
                    </div>
                  )
                }
                
                // Highlight with glitch effect
                if (step.type === 'highlight') {
                  return (
                    <div
                      key={index}
                      className={`absolute transition-all duration-700 ease-out text-center ${
                        isActive ? 'opacity-100 translate-y-0 scale-100 blur-0 z-10' : 'opacity-0 translate-y-8 scale-95 blur-sm pointer-events-none z-0'
                      }`}
                    >
                      {isActive && (
                        <div className="relative px-4">
                          <h2 
                            className="text-6xl sm:text-8xl md:text-[12rem] font-black text-white cinematic-text relative z-10 uppercase"
                            style={{
                              textShadow: '0 0 60px rgba(0,0,0,1), 0 0 120px rgba(0,0,0,0.9), 0 0 180px rgba(0,0,0,0.7), 0 6px 30px rgba(0,0,0,0.95)',
                              letterSpacing: '0.15em',
                              animation: 'pulse 2s ease-in-out infinite, glow 3s ease-in-out infinite, fadeInScale 0.6s ease-out',
                              WebkitTextStroke: '3px rgba(0,0,0,0.6)',
                              fontWeight: '900',
                              lineHeight: '0.9'
                            }}
                          >
                            {step.text}
                          </h2>
                          {/* Glitch layers */}
                          <h2 
                            className="absolute top-0 left-0 text-6xl sm:text-8xl md:text-[12rem] font-black text-red-500/40 cinematic-text px-4 uppercase"
                            style={{
                              letterSpacing: '0.15em',
                              transform: 'translate(-3px, -3px)',
                              animation: 'glitch1 0.3s infinite',
                              lineHeight: '0.9'
                            }}
                          >
                            {step.text}
                          </h2>
                          <h2 
                            className="absolute top-0 left-0 text-6xl sm:text-8xl md:text-[12rem] font-black text-cyan-500/40 cinematic-text px-4 uppercase"
                            style={{
                              letterSpacing: '0.15em',
                              transform: 'translate(3px, 3px)',
                              animation: 'glitch2 0.3s infinite',
                              lineHeight: '0.9'
                            }}
                          >
                            {step.text}
                          </h2>
                        </div>
                      )}
                    </div>
                  )
                }
                
                // Transition text
                if (step.type === 'transition') {
                  return (
                    <div
                      key={index}
                      className={`absolute transition-all duration-1000 ease-out text-center ${
                        isActive ? 'opacity-100 translate-y-0 scale-100 blur-0 z-10' : 'opacity-0 translate-y-8 scale-95 blur-sm pointer-events-none z-0'
                      }`}
                    >
                      {isActive && (
                        <h2 
                          className="text-3xl sm:text-4xl md:text-6xl font-extralight italic text-black/75 cinematic-text px-4"
                          style={{
                            textShadow: '0 2px 8px rgba(0,0,0,0.25)',
                            letterSpacing: '0.25em',
                            animation: 'fadeInScale 1.2s ease-out',
                            fontWeight: '200',
                            fontStyle: 'italic'
                          }}
                        >
                          {step.text}
                        </h2>
                      )}
                    </div>
                  )
                }
                
                // Epic finale with typewriter
                if (step.type === 'epic') {
                  return (
                    <div
                      key={index}
                      className={`absolute transition-all duration-700 ease-out text-center ${
                        isActive ? 'opacity-100 translate-y-0 scale-100 blur-0 z-10' : 'opacity-0 translate-y-8 scale-95 blur-sm pointer-events-none z-0'
                      }`}
                    >
                      {isActive && (
                        <h2 
                          className="text-4xl sm:text-5xl md:text-8xl font-extrabold text-black cinematic-text px-4"
                          style={{
                            textShadow: '0 6px 24px rgba(0,0,0,0.5), 0 10px 45px rgba(0,0,0,0.35), 0 0 70px rgba(255,255,255,0.15)',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            animation: 'fadeInScale 0.6s ease-out',
                            fontWeight: '800'
                          }}
                        >
                          {step.typewriter ? (
                            <TypewriterText text={step.text} onComplete={() => setTypewriterComplete(true)} />
                          ) : (
                            step.text
                          )}
                          {step.typewriter && !typewriterComplete && <span className="animate-pulse ml-1 font-thin">|</span>}
                        </h2>
                      )}
                    </div>
                  )
                }
                
                return null
              })}
            </div>
          </div>
        )}

        {/* Enter Button - Centered when text is finished */}
        <div className="w-full flex justify-center px-4 mt-16">
          <div
            className={`transition-all duration-700 ease-out ${
              showButton
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-8 scale-95'
            }`}
          >
            <button
              onClick={onEnter}
              className="px-16 md:px-28 py-6 md:py-9 bg-gradient-to-br from-black via-black to-gray-900 hover:from-gray-900 hover:via-black hover:to-black text-white rounded-3xl font-black text-3xl md:text-6xl transition-all duration-300 transform hover:scale-105 active:scale-95 tracking-widest cinematic-text border-[3px] border-white/40 hover:border-white/60 relative overflow-hidden group"
              style={{
                textShadow: '0 4px 12px rgba(0,0,0,1), 0 8px 24px rgba(0,0,0,0.8), 0 0 40px rgba(255,255,255,0.3)',
                letterSpacing: '0.4em',
                boxShadow: '0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.1) inset, 0 1px 0 rgba(255,255,255,0.2) inset',
                animation: 'pulse 2s ease-in-out infinite',
                fontWeight: '900'
              }}
            >
              <span className="relative z-10">ENTER</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
            <div className="text-center mt-5 text-black/50 text-xs md:text-sm font-light tracking-[0.3em] uppercase animate-pulse">
              Click to enter
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loader

