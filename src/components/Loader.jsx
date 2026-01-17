import { useState, useEffect } from 'react'
import FloatingImages from './FloatingImages'

const steps = [
  { 
    text: 'November 14, 2014', 
    delay: 1200, 
    type: 'date',
    style: 'mono'
  },
  { 
    text: '@ButtCoin posted', 
    delay: 1000, 
    type: 'action',
    typewriter: true
  },
  { 
    text: 'GUNCOIN', 
    delay: 1500, 
    type: 'highlight',
    glitch: true
  },
  { 
    text: 'A decade later...', 
    delay: 1200, 
    type: 'transition',
    fade: true
  },
  { 
    text: 'The legend lives on', 
    delay: 1200, 
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
      }, 80) // Speed of typing
      return () => clearTimeout(timeout)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, text, onComplete])

  return <>{displayText}</>
}

const Loader = ({ onEnter }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [showButton, setShowButton] = useState(false)
  const [textFinished, setTextFinished] = useState(false)
  const [typewriterComplete, setTypewriterComplete] = useState(false)

  useEffect(() => {
    let timeoutId
    let currentIndex = 0

    const showNextStep = () => {
      if (currentIndex < steps.length) {
        setCurrentStep(currentIndex)
        setTypewriterComplete(false)
        
        const currentStepData = steps[currentIndex]
        const baseDelay = currentStepData.delay
        const typewriterDelay = currentStepData.typewriter ? currentStepData.text.length * 80 : 0
        
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
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: '#f9971f' }}>
      <FloatingImages maxImages={10} />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 relative z-10">
        {/* Animated Text Steps - Perfectly Centered */}
        {!textFinished && (
          <div className={`w-full max-w-5xl px-4 transition-all duration-500 ${
            textFinished ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
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
                        isActive ? 'opacity-100 translate-y-0 scale-100 z-10' : 'opacity-0 translate-y-8 scale-95 pointer-events-none z-0'
                      }`}
                    >
                      {isActive && (
                        <h2 
                          className="font-mono text-3xl md:text-5xl font-light text-black/90 tracking-[0.3em] cinematic-text"
                          style={{
                            textShadow: '0 2px 8px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.2)',
                            fontVariantNumeric: 'tabular-nums',
                            letterSpacing: '0.3em'
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
                        isActive ? 'opacity-100 translate-y-0 scale-100 z-10' : 'opacity-0 translate-y-8 scale-95 pointer-events-none z-0'
                      }`}
                    >
                      {isActive && (
                        <h2 
                          className="text-4xl md:text-6xl font-semibold text-black cinematic-text"
                          style={{
                            textShadow: '0 3px 12px rgba(0,0,0,0.5), 0 6px 24px rgba(0,0,0,0.3)',
                            letterSpacing: '0.05em'
                          }}
                        >
                          {step.typewriter ? (
                            <TypewriterText text={step.text} onComplete={() => setTypewriterComplete(true)} />
                          ) : (
                            step.text
                          )}
                          {step.typewriter && !typewriterComplete && <span className="animate-pulse">|</span>}
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
                        isActive ? 'opacity-100 translate-y-0 scale-100 z-10' : 'opacity-0 translate-y-8 scale-95 pointer-events-none z-0'
                      }`}
                    >
                      {isActive && (
                        <div className="relative">
                          <h2 
                            className="text-7xl md:text-9xl font-black text-white cinematic-text relative z-10"
                            style={{
                              textShadow: '0 0 50px rgba(0,0,0,1), 0 0 100px rgba(0,0,0,0.8), 0 0 150px rgba(0,0,0,0.6), 0 4px 20px rgba(0,0,0,0.9)',
                              letterSpacing: '0.25em',
                              animation: 'pulse 2s ease-in-out infinite, glow 3s ease-in-out infinite',
                              WebkitTextStroke: '2px rgba(0,0,0,0.5)'
                            }}
                          >
                            {step.text}
                          </h2>
                          {/* Glitch layers */}
                          <h2 
                            className="absolute top-0 left-0 text-7xl md:text-9xl font-black text-red-500/30 cinematic-text"
                            style={{
                              letterSpacing: '0.25em',
                              transform: 'translate(-2px, -2px)',
                              animation: 'glitch1 0.3s infinite'
                            }}
                          >
                            {step.text}
                          </h2>
                          <h2 
                            className="absolute top-0 left-0 text-7xl md:text-9xl font-black text-blue-500/30 cinematic-text"
                            style={{
                              letterSpacing: '0.25em',
                              transform: 'translate(2px, 2px)',
                              animation: 'glitch2 0.3s infinite'
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
                        isActive ? 'opacity-100 translate-y-0 scale-100 z-10' : 'opacity-0 translate-y-8 scale-95 pointer-events-none z-0'
                      }`}
                    >
                      {isActive && (
                        <h2 
                          className="text-3xl md:text-5xl font-light italic text-black/80 cinematic-text"
                          style={{
                            textShadow: '0 2px 10px rgba(0,0,0,0.4)',
                            letterSpacing: '0.15em',
                            animation: 'fadeInScale 1.5s ease-out'
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
                        isActive ? 'opacity-100 translate-y-0 scale-100 z-10' : 'opacity-0 translate-y-8 scale-95 pointer-events-none z-0'
                      }`}
                    >
                      {isActive && (
                        <h2 
                          className="text-4xl md:text-7xl font-black text-black cinematic-text"
                          style={{
                            textShadow: '0 4px 20px rgba(0,0,0,0.6), 0 8px 40px rgba(0,0,0,0.4), 0 0 60px rgba(255,255,255,0.2)',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase'
                          }}
                        >
                          {step.typewriter ? (
                            <TypewriterText text={step.text} onComplete={() => setTypewriterComplete(true)} />
                          ) : (
                            step.text
                          )}
                          {step.typewriter && !typewriterComplete && <span className="animate-pulse">|</span>}
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
              className="px-24 py-8 bg-gradient-to-br from-black via-black to-gray-900 hover:from-gray-900 hover:via-black hover:to-black text-white rounded-3xl font-black text-3xl md:text-5xl transition-all duration-300 transform tracking-widest cinematic-text border-[3px] border-white/40 hover:border-white/60 relative overflow-hidden group"
              style={{
                textShadow: '0 4px 12px rgba(0,0,0,1), 0 8px 24px rgba(0,0,0,0.8), 0 0 40px rgba(255,255,255,0.3)',
                letterSpacing: '0.3em',
                boxShadow: '0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.1) inset, 0 1px 0 rgba(255,255,255,0.2) inset'
              }}
            >
              <span className="relative z-10">ENTER</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loader

