import { useState } from 'react'
import { FaCopy, FaCheck } from 'react-icons/fa6'

const TokenInfo = () => {
  const contractAddress = 'EgupCWYtBuVySuUyioHLws3nNcboEXoLx5FZjqgZpump'
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
      <h2 className="text-5xl md:text-7xl font-black mb-12 text-center text-black cinematic-text tracking-widest"
        style={{
          textShadow: '0 4px 20px rgba(0,0,0,0.3), 0 8px 40px rgba(0,0,0,0.2)',
          letterSpacing: '0.15em'
        }}>
        CONTRACT ADDRESS
      </h2>
      
      <button
        onClick={copyToClipboard}
        className="w-full group/btn relative overflow-hidden bg-black/90 hover:bg-black backdrop-blur-sm text-white rounded-2xl p-6 md:p-8 transition-all duration-300 transform hover:scale-[1.02] shadow-[0_20px_60px_rgba(0,0,0,0.5)] hover:shadow-[0_25px_80px_rgba(0,0,0,0.7)] border-2 border-white/10"
      >
        <div className="relative z-10 flex items-center justify-between gap-4">
          <code className="flex-1 font-mono text-base md:text-xl font-bold break-all text-left">
            {contractAddress}
          </code>
          <div className="flex-shrink-0 text-3xl md:text-4xl">
            {copied ? <FaCheck className="animate-bounce" /> : <FaCopy />}
          </div>
        </div>
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
      </button>
      
      <p className="text-center text-black/80 text-sm md:text-base mt-6 font-bold tracking-wide">
        {copied ? '✓ CONTRACT COPIED TO CLIPBOARD!' : 'CLICK TO COPY CONTRACT ADDRESS'}
      </p>
    </div>
  )
}

export default TokenInfo

