import { useState, useEffect } from 'react'

const FloatingImages = ({ maxImages = 20 }) => {
  const [images, setImages] = useState([])
  
  const imageSources = [
    '/newlogo.jpg',
    '/buttcoinpost.png'
  ]

  useEffect(() => {
    let intervalId

    const addImage = () => {
      setImages(prev => {
        if (prev.length >= maxImages) {
          if (intervalId) clearInterval(intervalId)
          return prev
        }
        
        const randomImage = imageSources[Math.floor(Math.random() * imageSources.length)]
        const newImage = {
          id: Date.now() + Math.random(),
          src: randomImage,
          x: Math.random() * 100, // Random X position (percentage)
          y: Math.random() * 100, // Random Y position (percentage)
          rotation: Math.random() * 360, // Random rotation
          scale: 0.5 + Math.random() * 0.5, // Random scale between 0.5 and 1
          speedX: (Math.random() - 0.5) * 0.5, // Random horizontal speed
          speedY: (Math.random() - 0.5) * 0.5, // Random vertical speed
          rotationSpeed: (Math.random() - 0.5) * 2, // Random rotation speed
          opacity: 0.3 + Math.random() * 0.4 // Random opacity between 0.3 and 0.7
        }
        return [...prev, newImage]
      })
    }

    // Add first image immediately
    addImage()

    // Add images gradually
    intervalId = setInterval(() => {
      addImage()
    }, 800) // Add a new image every 800ms

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [maxImages])

  // Animate images
  useEffect(() => {
    const animate = () => {
      setImages(prev => prev.map(img => ({
        ...img,
        x: (img.x + img.speedX + 100) % 100,
        y: (img.y + img.speedY + 100) % 100,
        rotation: (img.rotation + img.rotationSpeed + 360) % 360
      })))
    }

    const animationFrame = setInterval(animate, 50) // Update every 50ms for smooth animation
    return () => clearInterval(animationFrame)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {images.map((img) => (
        <div
          key={img.id}
          className="absolute transition-all duration-300"
          style={{
            left: `${img.x}%`,
            top: `${img.y}%`,
            transform: `translate(-50%, -50%) rotate(${img.rotation}deg) scale(${img.scale})`,
            opacity: img.opacity,
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
          }}
        >
          <img
            src={img.src}
            alt="Floating"
            className={`max-w-[120px] md:max-w-[180px] h-auto ${img.src.includes('newlogo') ? 'rounded-full' : ''}`}
            style={{
              animation: 'float 6s ease-in-out infinite',
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        </div>
      ))}
    </div>
  )
}

export default FloatingImages

