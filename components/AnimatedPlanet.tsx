"use client";

import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import PlanetVisual from "./PlanetVisual";

interface AnimatedPlanetProps {
  isRTL?: boolean;
}

export default function AnimatedPlanet(props: AnimatedPlanetProps = {}) {
  void props;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative flex items-center justify-center w-full select-none">
      {/* 3D Interactive Planet Canvas with Tilt & Glare */}
      <div className="relative flex items-center justify-center p-2 sm:p-4">
        
        {/* Soft Multi-Layer Diffused Ambient Glow (Zero hard edges, pure radial decay) */}
        <div
          className={`absolute w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] md:w-[520px] md:h-[520px] rounded-full pointer-events-none transition-all duration-700 ease-out blur-3xl -z-10 ${
            isHovered ? "scale-110 opacity-100" : "scale-100 opacity-80"
          }`}
          style={{
            background: isHovered
              ? "radial-gradient(circle, rgba(34, 211, 238, 0.36) 0%, rgba(0, 112, 243, 0.22) 35%, rgba(139, 92, 246, 0.12) 55%, rgba(34, 211, 238, 0.02) 70%, transparent 78%)"
              : "radial-gradient(circle, rgba(34, 211, 238, 0.24) 0%, rgba(0, 112, 243, 0.15) 35%, rgba(139, 92, 246, 0.08) 55%, rgba(34, 211, 238, 0.01) 70%, transparent 78%)",
          }}
        />

        {/* Secondary Core Ambient Cyan Glow */}
        <div
          className="absolute w-52 h-52 sm:w-60 sm:h-60 rounded-full pointer-events-none blur-2xl -z-10 transition-opacity duration-700"
          style={{
            background: "radial-gradient(circle, rgba(34, 211, 238, 0.26) 0%, rgba(0, 112, 243, 0.14) 45%, transparent 70%)",
            opacity: isHovered ? 1 : 0.75,
          }}
        />

        {/* Idle Floating Motion Container: translateY oscillating over 4s */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* React Parallax Tilt Wrapper */}
          <Tilt
            tiltMaxAngleX={18}
            tiltMaxAngleY={18}
            perspective={1000}
            scale={1.05}
            transitionSpeed={1400}
            gyroscope={true}
            glareEnable={true}
            glareMaxOpacity={0.32}
            glareColor="#22D3EE"
            glarePosition="all"
            glareBorderRadius="50%"
            className="relative cursor-grab active:cursor-grabbing select-none"
          >
            {/* Outer Subtle Orbit Guide Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -inset-6 sm:-inset-8 rounded-full border border-[#22D3EE]/20 pointer-events-none border-dashed"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#22D3EE] shadow-[0_0_10px_#22D3EE]" />
            </motion.div>

            {/* Planet Graphic with Slow Ambient Continuous Rotation */}
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[350px] lg:h-[350px] max-w-full flex items-center justify-center p-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 28,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="relative w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)]"
              >
                <PlanetVisual className="w-full h-full pointer-events-none select-none drop-shadow-[0_0_25px_rgba(34,211,238,0.25)]" />
              </motion.div>
            </div>
          </Tilt>
        </motion.div>
      </div>
    </div>
  );
}
