import { useState, useEffect } from 'react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10 shadow-lg">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <img 
                src="/newlogo.jpg" 
                alt="$GUNCOIN Logo" 
                className="h-12 w-12 md:h-16 md:w-16 object-contain"
              />
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-black text-white">
                  $GUNCOIN
                </span>
                <span className="text-xs md:text-sm text-gray-300 -mt-1">
                  Since 2014
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => scrollToSection('token-info')}
                className="relative text-white hover:text-guncoin-background transition-colors font-bold text-lg group"
              >
                Token Info
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-guncoin-background transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button
                onClick={() => scrollToSection('lore')}
                className="relative text-white hover:text-guncoin-background transition-colors font-bold text-lg group"
              >
                Lore
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-guncoin-background transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button
                onClick={() => scrollToSection('links')}
                className="relative text-white hover:text-guncoin-background transition-colors font-bold text-lg group"
              >
                Links
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-guncoin-background transition-all duration-300 group-hover:w-full"></span>
              </button>
              <a
                href="https://x.com/guncoiners"
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden px-8 py-3 bg-black/90 hover:bg-black text-white rounded-xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 border-2 border-white/10 group"
              >
                <span className="relative z-10">Follow on X</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative z-50 text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Full Screen Mobile Menu */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/95 backdrop-blur-xl"
          onClick={() => setIsMenuOpen(false)}
        ></div>
        
        {/* Menu Content */}
        <div className={`relative h-full flex flex-col items-center justify-center transition-all duration-500 ${isMenuOpen ? 'translate-y-0' : '-translate-y-10'}`}>
          {/* Menu Items */}
          <div className="space-y-8 text-center">
            <button
              onClick={() => scrollToSection('token-info')}
              className="block text-white hover:text-guncoin-background transition-all duration-300 font-black text-4xl hover:scale-110 transform"
            >
              Token Info
            </button>
            <button
              onClick={() => scrollToSection('lore')}
              className="block text-white hover:text-guncoin-background transition-all duration-300 font-black text-4xl hover:scale-110 transform"
            >
              Lore
            </button>
            <button
              onClick={() => scrollToSection('links')}
              className="block text-white hover:text-guncoin-background transition-all duration-300 font-black text-4xl hover:scale-110 transform"
            >
              Links
            </button>
          </div>

          {/* Join Community Button */}
          <div className="mt-16">
            <a
              href="https://x.com/guncoiners"
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden inline-block px-12 py-5 bg-black hover:bg-black/80 text-white rounded-2xl font-black text-2xl transition-all duration-300 shadow-2xl hover:scale-105 border-2 border-white/20 group"
            >
              <span className="relative z-10">Follow on X</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </a>
          </div>

          {/* Footer Text */}
          <div className="absolute bottom-12 text-center">
            <p className="text-white/40 text-sm font-semibold tracking-widest">
              $GUNCOIN • SINCE 2014
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header

