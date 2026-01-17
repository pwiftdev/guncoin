import { useState, useEffect } from 'react'
import { FaGun, FaRotateRight, FaBolt } from 'react-icons/fa6'
import Pistol3D from './Pistol3D'

const Hero = () => {
  const [mounted, setMounted] = useState(false)
  const [shootAnimation, setShootAnimation] = useState(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleShoot = (type) => {
    setShootAnimation(type)
  }

  return (
    <div className="relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        {/* Title Section */}
        <div className={`text-center transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl md:text-7xl font-black mb-2">
            <span className="text-white drop-shadow-2xl">$GUNCOIN</span>
          </h1>
          <p className="text-xl md:text-3xl font-bold text-black/80 mb-4 drop-shadow-lg">
            Since 2014
          </p>
        </div>

        {/* 3D Pistol Section */}
        <div className="mt-4 mb-8">
          <Pistol3D shootAnimation={shootAnimation} setShootAnimation={setShootAnimation} />
        </div>

        {/* Animation Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 mb-4">
          <button
            onClick={() => handleShoot('shoot1')}
            disabled={shootAnimation !== null}
            className="px-8 py-4 bg-black/90 hover:bg-black text-white rounded-xl font-bold text-lg transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
          >
            <FaGun className="text-xl" />
            Shoot
          </button>
          <button
            onClick={() => handleShoot('shoot2')}
            disabled={shootAnimation !== null}
            className="px-8 py-4 bg-black/90 hover:bg-black text-white rounded-xl font-bold text-lg transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
          >
            <FaRotateRight className="text-xl" />
            Reload
          </button>
          <button
            onClick={() => handleShoot('shoot3')}
            disabled={shootAnimation !== null}
            className="px-8 py-4 bg-black/90 hover:bg-black text-white rounded-xl font-bold text-lg transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
          >
            <FaBolt className="text-xl" />
            Slide
          </button>
        </div>

        {/* Instructions */}
        <p className="text-center text-black/70 text-sm mt-4 mb-2">
          Drag to rotate • Scroll to zoom • Click buttons to animate
        </p>
      </div>
    </div>
  )
}

export default Hero

