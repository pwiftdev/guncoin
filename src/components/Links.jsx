import { FaXTwitter, FaChartLine, FaArrowRight } from 'react-icons/fa6'

const Links = () => {
  const links = [
    {
      name: 'Follow on X',
      url: 'https://x.com/guncoiners',
      icon: FaXTwitter
    },
    {
      name: 'DEXScreener Chart',
      url: 'https://dexscreener.com/solana/EgupCWYtBuVySuUyioHLws3nNcboEXoLx5FZjqgZpump',
      icon: FaChartLine
    }
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
      <h2 className="text-5xl md:text-7xl font-black mb-16 text-center text-black cinematic-text tracking-widest"
        style={{
          textShadow: '0 4px 20px rgba(0,0,0,0.3), 0 8px 40px rgba(0,0,0,0.2)',
          letterSpacing: '0.15em'
        }}>
        JOIN THE MOVEMENT
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        {links.map((link, index) => {
          const IconComponent = link.icon
          return (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-black/90 hover:bg-black backdrop-blur-sm rounded-3xl p-8 md:p-10 border-2 border-white/10 transition-all duration-300 shadow-[0_25px_70px_rgba(0,0,0,0.5)] hover:shadow-[0_30px_90px_rgba(0,0,0,0.7)] transform hover:scale-105 overflow-hidden"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative z-10 flex flex-col items-center text-center gap-6">
                <div className="text-7xl md:text-8xl text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.5)] transform group-hover:scale-110 transition-transform duration-300">
                  <IconComponent />
                </div>
                <div>
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-3 cinematic-text tracking-wide"
                    style={{ textShadow: '0 4px 15px rgba(0,0,0,0.8), 0 0 30px rgba(255,255,255,0.3)' }}>
                    {link.name}
                  </h3>
                  <p className="text-lg md:text-xl text-white/90 group-hover:text-white transition-colors flex items-center justify-center gap-2 font-semibold">
                    ENTER <FaArrowRight className="text-base group-hover:translate-x-2 transition-transform duration-300" />
                  </p>
                </div>
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default Links

