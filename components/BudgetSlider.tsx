"use client";

import React, { useState, useEffect, useId, useCallback } from "react";

export interface BudgetSliderProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number, formatted: string) => void;
  label?: string;
  name?: string;
  id?: string;
  error?: string;
}

export function formatBudgetValue(val: number): string {
  if (val >= 50000) {
    return "$50,000+";
  }
  return `$${val.toLocaleString("en-US")}`;
}

export default function BudgetSlider({
  value: controlledValue,
  defaultValue = 10000,
  min = 1000,
  max = 50000,
  step = 1000,
  onChange,
  label = "Estimated Budget",
  name = "budget",
  id: externalId,
  error,
}: BudgetSliderProps) {
  const generatedId = useId();
  const inputId = externalId || `budget-slider-${generatedId}`;

  // Internal state when uncontrolled or initialized
  const [internalValue, setInternalValue] = useState<number>(
    controlledValue !== undefined ? controlledValue : defaultValue
  );

  const currentValue =
    controlledValue !== undefined ? controlledValue : internalValue;

  const percentage = Math.min(
    100,
    Math.max(0, ((currentValue - min) / (max - min)) * 100)
  );

  const formattedValue = formatBudgetValue(currentValue);

  const updateValue = useCallback(
    (newVal: number) => {
      const clamped = Math.min(max, Math.max(min, newVal));
      if (controlledValue === undefined) {
        setInternalValue(clamped);
      }
      onChange?.(clamped, formatBudgetValue(clamped));
    },
    [controlledValue, min, max, onChange]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateValue(Number(e.target.value));
  };

  return (
    <div className="w-full flex flex-col gap-2.5 p-4 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] hover:border-cyan-500/30 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_8px_32px_0_rgba(0,210,255,0.12)] transition-all duration-500 ease-out group">
      {/* ── Top Header: Label & Dynamic Value Badge ── */}
      <div className="flex items-center justify-between">
        <label
          htmlFor={inputId}
          className="text-xs font-mono font-semibold text-[#94A3B8] uppercase tracking-wider select-none cursor-pointer"
        >
          {label}
        </label>

        {/* Dynamic Glowing Value Badge */}
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141A29] border border-[#22D3EE]/40 text-[#22D3EE] font-mono text-xs sm:text-sm font-bold tracking-tight shadow-[0_0_16px_rgba(34,211,238,0.25)] select-none transition-all group-hover:border-[#22D3EE]/60 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.35)]"
          aria-live="polite"
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse shadow-[0_0_6px_#22D3EE]"
            aria-hidden="true"
          />
          <span>{formattedValue}</span>
        </div>
      </div>

      {/* ── Track & Range Slider Area ── */}
      <div className="relative py-3 flex items-center select-none" dir="ltr">
        {/* Inactive Base Track */}
        <div className="w-full h-2 sm:h-2.5 rounded-full bg-[#151923] border border-[#262C3A] relative overflow-hidden">
          {/* Active Cyan-to-Blue Gradient Track */}
          <div
            className="h-full bg-gradient-to-r from-[#22D3EE] via-[#38BDF8] to-[#3B82F6] rounded-full transition-all duration-75"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Ambient Neon Glow Aura directly behind active track */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-2 sm:h-2.5 rounded-full bg-gradient-to-r from-[#22D3EE] to-[#3B82F6] blur-[6px] opacity-70 pointer-events-none transition-all duration-75"
          style={{ width: `${percentage}%` }}
          aria-hidden="true"
        />

        {/* Native Range Slider Input with customized thumb */}
        <input
          id={inputId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onChange={handleChange}
          aria-label={label}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={currentValue}
          aria-valuetext={formattedValue}
          className="budget-range-slider absolute inset-0 w-full h-full cursor-pointer z-10 appearance-none bg-transparent m-0 p-0"
        />
      </div>

      {/* ── Minimal Scale Labels ── */}
      <div
        className="flex items-center justify-between text-[11px] font-mono text-[#64748B] select-none pt-0.5"
        dir="ltr"
      >
        <button
          type="button"
          onClick={() => updateValue(1000)}
          className={`hover:text-[#22D3EE] transition-colors cursor-pointer ${
            currentValue === 1000 ? "text-[#22D3EE] font-semibold" : ""
          }`}
          title="Set budget to $1,000"
        >
          $1,000
        </button>

        <button
          type="button"
          onClick={() => updateValue(25000)}
          className={`hover:text-[#22D3EE] transition-colors cursor-pointer ${
            currentValue === 25000 ? "text-[#22D3EE] font-semibold" : ""
          }`}
          title="Set budget to $25,000"
        >
          $25,000
        </button>

        <button
          type="button"
          onClick={() => updateValue(50000)}
          className={`hover:text-[#22D3EE] transition-colors cursor-pointer ${
            currentValue === 50000 ? "text-[#22D3EE] font-semibold" : ""
          }`}
          title="Set budget to $50,000+"
        >
          $50,000+
        </button>
      </div>

      {/* Hidden input for native form serialization */}
      <input type="hidden" name={name} value={formattedValue} />

      {/* Optional inline error display */}
      {error && (
        <p className="text-xs text-red-400 font-medium mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
