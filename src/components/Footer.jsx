const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative mt-32 py-16 border-t-4 border-black/40">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6">
          <h3 className="text-4xl md:text-5xl font-black text-black/90 cinematic-text tracking-widest"
            style={{ 
              textShadow: '0 2px 10px rgba(0,0,0,0.3), 0 4px 20px rgba(0,0,0,0.2)',
              letterSpacing: '0.15em'
            }}>
            $GUNCOIN
          </h3>
          <p className="text-xl md:text-2xl text-black/80 font-bold tracking-wide">
            Since 2014
          </p>
          <p className="text-lg md:text-xl text-black/70 font-semibold italic max-w-2xl mx-auto">
            The hottest beta play to $BUTTCOIN now.
          </p>
          
          <div className="pt-8 mt-8 border-t-2 border-black/30">
            <p className="text-sm md:text-base text-black/60 font-medium">
              © {currentYear} $GUNCOIN. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

