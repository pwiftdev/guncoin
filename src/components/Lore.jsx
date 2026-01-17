const Lore = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
      <div className="relative bg-black/90 backdrop-blur-xl rounded-3xl border-2 border-white/10 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
        {/* Subtle shine effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>
        
        <div className="relative z-10 p-8 md:p-16">
          <h2 className="text-5xl md:text-7xl font-black mb-16 text-center text-white cinematic-text tracking-widest"
            style={{
              textShadow: '0 0 60px rgba(255,255,255,0.3), 0 5px 25px rgba(0,0,0,0.8), 0 10px 50px rgba(0,0,0,0.6)',
              letterSpacing: '0.15em'
            }}>
            THE LEGEND
          </h2>
          
          <div className="space-y-10 text-xl md:text-2xl text-white/95 leading-relaxed">
            <div className="relative pl-8 md:pl-12 border-l-8 border-guncoin-background shadow-[0_0_30px_rgba(249,151,31,0.3)]">
              <p className="mb-6 cinematic-text" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                <span className="font-black text-3xl md:text-4xl text-guncoin-background drop-shadow-[0_0_20px_rgba(249,151,31,0.8)]">$GUNCOIN</span>{' '}
                was first mentioned by{' '}
                <span className="font-bold text-white">@ButtCoin</span> on{' '}
                <span className="font-bold text-guncoin-background">November 14, 2014</span>.
              </p>
              <p className="mb-6 cinematic-text" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                A decade later, the legend was revived when{' '}
                <span className="font-bold text-white">@ButtCoin</span> mentioned{' '}
                <span className="font-black text-3xl md:text-4xl text-guncoin-background drop-shadow-[0_0_20px_rgba(249,151,31,0.8)]">"GUNCOIN"</span>{' '}
                again in a tweet.
              </p>
              <p className="text-2xl md:text-3xl font-black text-guncoin-background mt-10 cinematic-text"
                style={{ 
                  textShadow: '0 0 30px rgba(249,151,31,0.8), 0 0 60px rgba(249,151,31,0.5), 0 4px 15px rgba(0,0,0,0.9)',
                  letterSpacing: '0.05em'
                }}>
                The prophecy has been fulfilled. The hottest beta play to $BUTTCOIN is here.
              </p>
            </div>
            
            <div className="mt-16 pt-12 border-t-4 border-white/20 relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-20 h-1 bg-gradient-to-r from-transparent via-guncoin-background to-transparent"></div>
              </div>
              <p className="text-center text-2xl md:text-3xl text-white italic font-light cinematic-text"
                style={{ 
                  textShadow: '0 0 40px rgba(255,255,255,0.3), 0 4px 20px rgba(0,0,0,0.9)',
                  letterSpacing: '0.1em'
                }}>
                "Since 2014, we've been waiting. Now it's time."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Lore

