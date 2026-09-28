import React from "react";

interface PlanetVisualProps {
  className?: string;
}

export default function PlanetVisual({ className = "w-full h-full" }: PlanetVisualProps) {
  // Center of 800x800 viewBox
  const cx = 400;
  const cy = 400;
  const R_sphere = 160;

  // Ring geometry
  const rx_out = 290;
  const ry_out = 126;
  const rx_in = 198;
  const ry_in = 86;
  const tilt_deg = -12.5;

  // Full ring path (closed annulus with evenodd fill rule for seamless curvature)
  const fullRingPath = `M -${rx_out} 0 A ${rx_out} ${ry_out} 0 1 0 ${rx_out} 0 A ${rx_out} ${ry_out} 0 1 0 -${rx_out} 0 Z M -${rx_in} 0 A ${rx_in} ${ry_in} 0 1 0 ${rx_in} 0 A ${rx_in} ${ry_in} 0 1 0 -${rx_in} 0 Z`;

  // Front half of ring (sweeping in front of sphere)
  const frontRingPath = `M -${rx_out} 0 A ${rx_out} ${ry_out} 0 0 0 ${rx_out} 0 L ${rx_in} 0 A ${rx_in} ${ry_in} 0 0 1 -${rx_in} 0 Z`;

  // Electric sheen along the front ribbon center
  const rx_mid = (rx_out + rx_in) / 2; // 244
  const ry_mid = (ry_out + ry_in) / 2; // 106
  const frontCrestPath = `M -${(rx_mid * 0.95).toFixed(1)} 0 A ${rx_mid} ${ry_mid} 0 0 0 ${(rx_mid * 0.95).toFixed(1)} 0`;

  // Ambient occlusion shadow cast by the front ring onto the sphere surface
  const aoShadowPath = `M -${rx_in} 0 A ${rx_in} ${ry_in} 0 0 0 ${rx_in} 0 L ${(rx_in * 0.9).toFixed(1)} 28 A ${rx_in} ${ry_in + 28} 0 0 1 -${(rx_in * 0.9).toFixed(1)} 28 Z`;
  const aoTightPath = `M -${rx_in} -2 A ${rx_in} ${ry_in} 0 0 0 ${rx_in} -2 L ${(rx_in * 0.95).toFixed(1)} 10 A ${rx_in} ${ry_in + 10} 0 0 1 -${(rx_in * 0.95).toFixed(1)} 10 Z`;

  return (
    <svg
      viewBox="0 0 800 800"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="geometricPrecision"
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* 1. Sphere Directional Lighting (upper-left light source at ~10:30) */}
        <radialGradient
          id="inovixSphereLighting"
          cx="33%"
          cy="28%"
          r="68%"
          fx="29%"
          fy="24%"
        >
          <stop offset="0%" stopColor="#4E5568" />
          <stop offset="18%" stopColor="#313644" />
          <stop offset="38%" stopColor="#1B1E27" />
          <stop offset="65%" stopColor="#0E1017" />
          <stop offset="85%" stopColor="#05060A" />
          <stop offset="100%" stopColor="#000000" />
        </radialGradient>

        {/* 2. Upper-Left Subtle Specular Reflection */}
        <radialGradient
          id="inovixSphereSpecular"
          cx="30%"
          cy="24%"
          r="32%"
        >
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.32" />
          <stop offset="35%" stopColor="#22D3EE" stopOpacity="0.14" />
          <stop offset="70%" stopColor="#22D3EE" stopOpacity="0.02" />
          <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
        </radialGradient>

        {/* 3. Rim Ambient Light Reflection on Lower-Left (from glowing ring) */}
        <radialGradient
          id="inovixRingBounceLight"
          cx="24%"
          cy="58%"
          r="35%"
        >
          <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.16" />
          <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>

        {/* 4. Ring Shared Seamless Gradient (left lavender -> center electric blue -> right deep indigo) */}
        <linearGradient
          id="inovixRingGradient"
          x1="-290"
          y1="-30"
          x2="290"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="12%" stopColor="#818CF8" />
          <stop offset="28%" stopColor="#3B82F6" />
          <stop offset="46%" stopColor="#0066FF" />
          <stop offset="58%" stopColor="#2563EB" />
          <stop offset="78%" stopColor="#1E1B4B" />
          <stop offset="100%" stopColor="#0A0B1E" />
        </linearGradient>

        {/* 5. Electric Center Sheen along Front Ribbon Spine */}
        <linearGradient
          id="inovixSpineGrad"
          x1="-250"
          y1="0"
          x2="250"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#DDD6FE" stopOpacity="0.2" />
          <stop offset="26%" stopColor="#FFFFFF" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.95" />
          <stop offset="76%" stopColor="#60A5FA" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0" />
        </linearGradient>

        {/* Sphere Boundary Clip */}
        <clipPath id="inovixSphereClip">
          <circle cx="0" cy="0" r={R_sphere} />
        </clipPath>

        {/* Ambient Occlusion Shadow Filters */}
        <filter id="inovixAoSoft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="9" />
        </filter>

        <filter id="inovixAoTight" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>

        {/* Edge Anti-Aliasing Smoothing Filter (1-2px feathering) */}
        <filter id="inovixFeatherFilter" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.45" result="smoothed" />
          <feMerge>
            <feMergeNode in="smoothed" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g transform={`translate(${cx}, ${cy}) rotate(${tilt_deg})`} filter="url(#inovixFeatherFilter)">
        {/* 1. Full Seamless Ring (Back & Sides rendered with unbroken evenodd geometry) */}
        <path
          d={fullRingPath}
          fill="url(#inovixRingGradient)"
          fillRule="evenodd"
          opacity="0.96"
        />

        {/* 2. Central Planet Sphere with Multi-Layer Directional Lighting */}
        <g clipPath="url(#inovixSphereClip)">
          {/* Main Directional Shading */}
          <circle cx="0" cy="0" r={R_sphere} fill="url(#inovixSphereLighting)" />

          {/* Directional Specular Highlight */}
          <circle cx="0" cy="0" r={R_sphere} fill="url(#inovixSphereSpecular)" />

          {/* Ring Bounce Light */}
          <circle cx="0" cy="0" r={R_sphere} fill="url(#inovixRingBounceLight)" />

          {/* 3. Ambient Occlusion Shadow (Deep contact shadow under ring) */}
          <path
            d={aoTightPath}
            fill="#000000"
            opacity="0.92"
            filter="url(#inovixAoTight)"
          />

          {/* 4. Ambient Occlusion Shadow (Soft diffused shadow falloff onto sphere) */}
          <path
            d={aoShadowPath}
            fill="#000000"
            opacity="0.82"
            filter="url(#inovixAoSoft)"
          />
        </g>

        {/* 5. Front Half of Ring (sweeping in front of sphere with zero seams at outer tips) */}
        <path d={frontRingPath} fill="url(#inovixRingGradient)" />

        {/* 6. Vibrant Electric Highlight Spine across Front Ribbon */}
        <path
          d={frontCrestPath}
          fill="none"
          stroke="url(#inovixSpineGrad)"
          strokeWidth="3"
          opacity="0.8"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
