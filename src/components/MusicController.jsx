import { useState, useEffect } from 'react'
import { FaVolumeHigh, FaVolumeXmark } from 'react-icons/fa6'

const MusicController = ({ audioRef }) => {
  const [volume, setVolume] = useState(50)
  const [isMuted, setIsMuted] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100
    }
  }, [volume, isMuted, audioRef])

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value)
    setVolume(newVolume)
    if (newVolume > 0 && isMuted) {
      setIsMuted(false)
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <div 
      className="fixed bottom-6 left-6 z-40 flex items-center gap-3"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Volume Slider */}
      <div 
        className={`transition-all duration-300 overflow-hidden ${
          isExpanded ? 'w-32 opacity-100' : 'w-0 opacity-0'
        }`}
      >
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className="w-full h-2 bg-black/50 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #f9971f 0%, #f9971f ${volume}%, rgba(0,0,0,0.5) ${volume}%, rgba(0,0,0,0.5) 100%)`
          }}
        />
      </div>

      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        className="relative overflow-hidden p-4 bg-black/90 hover:bg-black text-white rounded-xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110 border-2 border-white/10 group"
        aria-label={isMuted ? 'Unmute music' : 'Mute music'}
      >
        <span className="relative z-10 text-2xl">
          {isMuted ? <FaVolumeXmark /> : <FaVolumeHigh />}
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </button>
    </div>
  )
}

export default MusicController

