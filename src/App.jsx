import { useState, useRef } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import TokenInfo from './components/TokenInfo'
import Lore from './components/Lore'
import Links from './components/Links'
import Footer from './components/Footer'
import Loader from './components/Loader'
import FloatingImages from './components/FloatingImages'
import MusicController from './components/MusicController'

function App() {
  const [showLoader, setShowLoader] = useState(true)
  const audioRef = useRef(null)

  const handleEnter = () => {
    setShowLoader(false)
    // Start playing music after a short delay to ensure smooth transition
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(err => {
          console.log('Audio play failed:', err)
        })
      }
    }, 300)
  }

  if (showLoader) {
    return <Loader onEnter={handleEnter} />
  }

  return (
    <>
      {/* Background Music */}
      <audio
        ref={audioRef}
        src="/gunmusic.mp4"
        loop
        volume={0.5}
        preload="auto"
      />
      
      {showLoader ? (
        <Loader onEnter={handleEnter} />
      ) : (
        <div className="min-h-screen relative" style={{ backgroundColor: '#f9971f' }}>
          <FloatingImages maxImages={12} />
          <MusicController audioRef={audioRef} />
          <div className="relative z-10">
            <Header />
            <Hero />
            <div id="token-info">
              <TokenInfo />
            </div>
            <div id="lore">
              <Lore />
            </div>
            <div id="links">
              <Links />
            </div>
            <Footer />
          </div>
        </div>
      )}
    </>
  )
}

export default App

