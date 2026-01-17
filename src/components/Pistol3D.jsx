import { useRef, useEffect, useState, Suspense } from 'react'
import { useFrame, useLoader, Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import * as THREE from 'three'

const PistolModel = ({ shootAnimation, setShootAnimation, onLoad }) => {
  const pistolRef = useRef()
  const mixerRef = useRef(null)
  const actionsRef = useRef({})
  const fbx = useLoader(FBXLoader, '/Pistol.fbx')
  const [originalPosition] = useState(new THREE.Vector3(0, 0, 0))
  const [originalRotation] = useState(new THREE.Euler(0, 0, 0))
  const animationRef = useRef(null)
  const [availableAnimations, setAvailableAnimations] = useState([])

  useEffect(() => {
    if (fbx) {
      // Scale and position the model
      fbx.scale.setScalar(0.01) // Adjust scale as needed
      fbx.position.copy(originalPosition)
      fbx.rotation.copy(originalRotation)
      
      // Enable shadows
      fbx.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true
          child.receiveShadow = true
        }
      })
      
      // Check for built-in animations
      if (fbx.animations && fbx.animations.length > 0) {
        console.log('Found animations in FBX file:', fbx.animations.length)
        fbx.animations.forEach((clip, index) => {
          console.log(`Animation ${index}:`, clip.name, `Duration: ${clip.duration}s`)
        })
        
        // Set up animation mixer
        mixerRef.current = new THREE.AnimationMixer(fbx)
        const animations = []
        
        fbx.animations.forEach((clip) => {
          const action = mixerRef.current.clipAction(clip)
          // Set animations to play once, not loop
          action.setLoop(THREE.LoopOnce)
          action.clampWhenFinished = true // Keep final frame
          actionsRef.current[clip.name] = action
          animations.push(clip.name)
        })
        
        setAvailableAnimations(animations)
        console.log('Available animation names:', animations)
      } else {
        console.log('No animations found in FBX file')
      }
      
      if (onLoad) {
        onLoad()
      }
    }
  }, [fbx, originalPosition, originalRotation, onLoad])

  // Handle shoot animations - use built-in animations if available, otherwise use manual animations
  useEffect(() => {
    if (!pistolRef.current || !shootAnimation) return

    // If we have built-in animations, use them
    if (mixerRef.current && availableAnimations.length > 0) {
      // Stop all current animations
      Object.values(actionsRef.current).forEach(action => {
        action.stop()
        action.reset()
      })

      // Map shoot1, shoot2, shoot3 to shoot, reload, slide animations
      const animationMap = {
        'shoot1': ['shoot', 'shooting', 'fire', 'shoot_anim', 'Shoot', 'Shooting'],
        'shoot2': ['reload', 'reloading', 'reload_anim', 'Reload', 'Reloading'],
        'shoot3': ['slide', 'sliding', 'slide_anim', 'Slide', 'Sliding']
      }
      
      const targetAnimationNames = animationMap[shootAnimation]
      console.log(`Looking for animation for button "${shootAnimation}"`)
      console.log('Trying names:', targetAnimationNames)
      console.log('Available animations:', availableAnimations)
      
      let actionToPlay = null
      
      if (!targetAnimationNames) {
        console.error(`No mapping found for: ${shootAnimation}`)
        setShootAnimation(null)
        return
      }
      
      // Try each possible name variation
      for (const targetName of targetAnimationNames) {
        // Try exact match first
        if (actionsRef.current[targetName]) {
          actionToPlay = actionsRef.current[targetName]
          console.log(`Found exact match: ${targetName}`)
          break
        }
        
        // Try case-insensitive match
        const lowerTarget = targetName.toLowerCase()
        const foundKey = Object.keys(actionsRef.current).find(
          key => key.toLowerCase() === lowerTarget
        )
        
        if (foundKey) {
          actionToPlay = actionsRef.current[foundKey]
          console.log(`Found case-insensitive match: ${foundKey}`)
          break
        }
      }
      
      // If still not found, try more aggressive partial matching
      if (!actionToPlay) {
        // Try all target names for partial matches
        for (const targetName of targetAnimationNames) {
          const lowerTarget = targetName.toLowerCase()
          const foundPartial = Object.keys(actionsRef.current).find(
            key => {
              const lowerKey = key.toLowerCase()
              // Check if key contains target or target contains key
              return lowerKey.includes(lowerTarget) || lowerTarget.includes(lowerKey)
            }
          )
          
          if (foundPartial) {
            actionToPlay = actionsRef.current[foundPartial]
            console.log(`Found partial match: ${foundPartial} (searched for: ${targetName})`)
            break
          }
        }
        
        // Special fallback for shoot: if reload and slide work, shoot is likely the remaining animation
        if (!actionToPlay && shootAnimation === 'shoot1') {
          console.log('Trying fallback: looking for animation that is NOT reload or slide')
          const knownWorking = ['reload', 'slide'].map(n => n.toLowerCase())
          const shootCandidate = Object.keys(actionsRef.current).find(
            key => {
              const lowerKey = key.toLowerCase()
              return !knownWorking.some(known => lowerKey.includes(known) || known.includes(lowerKey))
            }
          )
          
          if (shootCandidate) {
            actionToPlay = actionsRef.current[shootCandidate]
            console.log(`Using fallback animation: ${shootCandidate}`)
          }
        }
        
        if (!actionToPlay) {
          console.error(`Could not find animation for "${shootAnimation}". Tried:`, targetAnimationNames)
          console.error('Available animations:', availableAnimations)
          console.error('All animation keys:', Object.keys(actionsRef.current))
          // Reset state and return early - don't use manual animations
          setShootAnimation(null)
          return
        }
      }

      if (actionToPlay) {
        console.log(`Playing built-in animation: ${actionToPlay.getClip().name}`)
        
        // Ensure it's set to play once
        actionToPlay.setLoop(THREE.LoopOnce)
        actionToPlay.clampWhenFinished = true
        actionToPlay.reset()
        actionToPlay.play()
        
        // Set up timeout to reset state when animation finishes
        const clipDuration = actionToPlay.getClip().duration * 1000 // Convert to ms
        const timeoutId = setTimeout(() => {
          setShootAnimation(null)
        }, clipDuration + 100) // Add small buffer
        
        return () => {
          clearTimeout(timeoutId)
          if (actionToPlay) {
            actionToPlay.stop()
            actionToPlay.reset()
          }
        }
      } else {
        // If we have animations but couldn't find the right one, reset state
        setShootAnimation(null)
        return
      }
    }

    // Fallback to manual animations ONLY if no built-in animations exist
    const pistol = pistolRef.current
    const startTime = Date.now()
    const duration = 300 // Animation duration in ms

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      if (shootAnimation === 'shoot1') {
        // Recoil animation - kick back
        const kickback = Math.sin(progress * Math.PI) * 0.3
        const recoil = Math.sin(progress * Math.PI) * 0.1
        pistol.position.z = originalPosition.z - kickback
        pistol.rotation.x = originalRotation.x - recoil
      } else if (shootAnimation === 'shoot2') {
        // Side kick animation
        const sideKick = Math.sin(progress * Math.PI) * 0.2
        const rotation = Math.sin(progress * Math.PI) * 0.15
        pistol.position.x = originalPosition.x + sideKick
        pistol.rotation.z = originalRotation.z + rotation
      } else if (shootAnimation === 'shoot3') {
        // Upward kick animation
        const upKick = Math.sin(progress * Math.PI) * 0.25
        const upRotation = Math.sin(progress * Math.PI) * 0.2
        pistol.position.y = originalPosition.y + upKick
        pistol.rotation.x = originalRotation.x + upRotation
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        // Reset to original position
        pistol.position.copy(originalPosition)
        pistol.rotation.copy(originalRotation)
        setShootAnimation(null)
      }
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [shootAnimation, originalPosition, originalRotation, setShootAnimation, availableAnimations])

  useFrame((state, delta) => {
    // Update animation mixer if it exists
    if (mixerRef.current) {
      mixerRef.current.update(delta)
    }
    
    // Subtle idle animation when not shooting
    if (pistolRef.current && !shootAnimation && availableAnimations.length === 0) {
      const time = Date.now() * 0.001
      pistolRef.current.rotation.y = Math.sin(time * 0.5) * 0.05
    }
  })

  if (!fbx) return null

  return <primitive ref={pistolRef} object={fbx} />
}

const Pistol3D = ({ shootAnimation, setShootAnimation }) => {
  const [isLoading, setIsLoading] = useState(true)
  const controlsRef = useRef()

  useEffect(() => {
    if (!isLoading && controlsRef.current) {
      // Start with a nice intro animation
      const startDistance = 3 // Start closer
      const targetDistance = 10 // Zoom out way more
      const duration = 2000 // 2 seconds
      const startTime = Date.now()
      
      // Enable auto-rotate temporarily
      controlsRef.current.autoRotate = true
      controlsRef.current.autoRotateSpeed = 2
      
      const animateIntro = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // Smooth easing function
        const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)
        const easedProgress = easeOutCubic(progress)
        
        // Interpolate camera distance
        const currentDistance = startDistance + (targetDistance - startDistance) * easedProgress
        
        // Update controls target distance
        if (controlsRef.current) {
          const camera = controlsRef.current.object
          const direction = new THREE.Vector3()
          camera.getWorldDirection(direction)
          direction.multiplyScalar(-currentDistance)
          camera.position.copy(direction)
          controlsRef.current.update()
        }
        
        if (progress < 1) {
          requestAnimationFrame(animateIntro)
        } else {
          // Stop auto-rotate after intro
          if (controlsRef.current) {
            controlsRef.current.autoRotate = false
          }
        }
      }
      
      animateIntro()
    }
  }, [isLoading])

  return (
    <div className="w-full h-[600px] md:h-[700px] relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-guncoin-background/50">
          <div className="text-black/80 text-xl font-bold">Loading Pistol...</div>
        </div>
      )}
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 3]} fov={50} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
        <pointLight position={[-5, -5, -5]} intensity={0.4} />
        <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.5} castShadow />
        
        <Suspense fallback={null}>
          <PistolModel 
            shootAnimation={shootAnimation} 
            setShootAnimation={setShootAnimation}
            onLoad={() => setIsLoading(false)}
          />
        </Suspense>
        
        <OrbitControls
          ref={controlsRef}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={4}
          maxDistance={15}
          autoRotate={false}
          autoRotateSpeed={2}
        />
      </Canvas>
    </div>
  )
}

export default Pistol3D

