import { useEffect } from "react"

export function ParticlesBackground() {
  useEffect(() => {
    // Dynamically load particles.js
    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/npm/particlesjs@2.2.3/dist/particles.min.js"
    script.async = true

    script.onload = () => {
      // @ts-ignore - particles.js global
      if (window.Particles) {
        const initParticles = () => {
          const width = window.innerWidth
          const maxParticles = width < 768 ? 50 : width < 1024 ? 80 : 100

          // @ts-ignore
          window.Particles.init({
            selector: ".background",
            sizeVariations: 10,
            color: ["#00bbdd", "#404B69", "#DBEDF3"],
            connectParticles: true,
            maxParticles: maxParticles,
            speed: 0.4,
          })
        }

        initParticles()

        const handleResize = () => {
          initParticles()
        }

        window.addEventListener("resize", handleResize)

        return () => {
          window.removeEventListener("resize", handleResize)
        }
      }
    }

    document.head.appendChild(script)

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  return (
    <canvas
      className="background fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  )
}
