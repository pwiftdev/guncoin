const TokenInfo = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
      <h2 className="text-5xl md:text-7xl font-black mb-12 text-center text-black cinematic-text tracking-widest"
        style={{
          textShadow: '0 4px 20px rgba(0,0,0,0.3), 0 8px 40px rgba(0,0,0,0.2)',
          letterSpacing: '0.15em'
        }}>
        RELAUNCH
      </h2>
      
      <div className="relative overflow-hidden bg-black/90 backdrop-blur-sm text-white rounded-2xl p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.5)] border-2 border-white/10">
        <div className="relative z-10 text-center">
          <h3 className="text-3xl md:text-5xl font-black mb-6 cinematic-text uppercase tracking-wider"
            style={{
              textShadow: '0 2px 10px rgba(255,255,255,0.3)',
              letterSpacing: '0.2em'
            }}>
            Coming Soon
          </h3>
          <p className="text-lg md:text-2xl font-light text-white/80 tracking-wide">
            The legend returns stronger than ever
          </p>
        </div>
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-[shimmer_3s_ease-in-out_infinite]"></div>
      </div>
      
      <p className="text-center text-black/80 text-sm md:text-base mt-6 font-bold tracking-wide uppercase">
        Stay tuned for the official relaunch
      </p>
    </div>
  )
}

export default TokenInfo

