"use client"

import { useRef, useEffect } from "react"

interface BlobPatternProps {
  className?: string
  mouseTracking?: boolean
}

export const BlobSVGPattern = ({ className = "", mouseTracking = true }: BlobPatternProps) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const mouseX = useRef(0)
  const mouseY = useRef(0)

  useEffect(() => {
    if (!mouseTracking) return

    const handleMouseMove = (e: MouseEvent) => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect()
        mouseX.current = (e.clientX - rect.left) / rect.width
        mouseY.current = (e.clientY - rect.top) / rect.height
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseTracking])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full ${className}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--tw-color-primary)" stopOpacity="0.35" />
          <stop offset="50%" stopColor="var(--tw-color-accent)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--tw-color-primary)" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <g>
        <path
          d="M200,80 C280,80 340,120 360,180 C380,240 360,300 280,340 C200,380 120,380 80,320 C40,260 20,180 60,120 C100,60 120,80 200,80 Z"
          fill="url(#blobGradient)"
          style={{
            transformOrigin: "200px 200px",
            animation: "blob 10s infinite",
            filter: "blur(1px)",
          }}
        />
        <path
          d="M200,60 C270,70 340,100 370,170 C400,240 380,310 300,350 C220,390 140,380 90,330 C40,280 30,200 50,130 C70,60 130,50 200,60 Z"
          fill="var(--tw-color-accent)"
          style={{
            opacity: 0.12,
            transformOrigin: "200px 200px",
            animation: "blob 12s infinite reverse",
            filter: "blur(2px)",
          }}
        />
        <path
          d="M200,100 C260,100 320,130 340,190 C360,250 340,290 260,330 C180,370 100,360 70,310 C40,260 50,170 80,110 C110,50 140,100 200,100 Z"
          fill="var(--tw-color-primary)"
          style={{
            opacity: 0.08,
            transformOrigin: "200px 200px",
            animation: "blob 14s infinite",
            filter: "blur(3px)",
          }}
        />
      </g>
    </svg>
  )
}

export default BlobSVGPattern
