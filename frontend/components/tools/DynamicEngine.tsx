"use client";

import React, { useState } from "react";

export interface ToolInputConfig {
  name: string;
  label: string;
  type: string;
  defaultValue?: string | number | boolean;
}

export interface DynamicToolConfig {
  inputs: ToolInputConfig[];
  formula: string;
  resultLabel: string;
  resultUnit?: string;
}

type InputValueType = string | number | boolean;

export default function DynamicEngine({ config }: { config: DynamicToolConfig }) {
  const [inputValues, setInputValues] = useState<Record<string, InputValueType>>(() => {
    const initial: Record<string, InputValueType> = {};
    config?.inputs?.forEach((inp) => {
      initial[inp.name] = inp.defaultValue ?? "";
    });
    return initial;
  });

  const [result, setResult] = useState<string | number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (name: string, value: InputValueType) => {
    setInputValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleExecute = () => {
    setError(null);
    try {
      if (!config.formula) {
        setResult("No calculation formula defined.");
        return;
      }

      const keys = Object.keys(inputValues);
      const values = keys.map((k) => {
        const rawVal = inputValues[k];
        if (typeof rawVal === "number") return rawVal;
        const parsed = parseFloat(String(rawVal));
        return isNaN(parsed) ? 0 : parsed;
      });

      const func = new Function(...keys, `return ${config.formula};`);
      const output = func(...values) as unknown;

      if (typeof output === "number") {
        setResult(isNaN(output) ? "Invalid calculation" : Number(output.toFixed(2)));
      } else {
        setResult(String(output));
      }
    } catch (err: unknown) {
      console.error("Dynamic Execution Error:", err);
      setError("Error executing calculation formula.");
    }
  };

  return (
    <div className="space-y-6 text-left w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {config?.inputs?.map((input) => (
          <div key={input.name} className="space-y-1">
            <label className="text-xs font-bold text-slate-500">{input.label}</label>
            <input
              type={input.type || "number"}
              value={String(inputValues[input.name] ?? "")}
              onChange={(e) => handleInputChange(input.name, e.target.value)}
              className="w-full p-2.5 text-xs border border-slate-200 dark:border-neutral-800 bg-transparent rounded-xl text-slate-900 dark:text-white"
              placeholder={`Enter ${input.label.toLowerCase()}`}
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleExecute}
        className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
      >
        Calculate Result
      </button>

      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-semibold">
          {error}
        </div>
      )}

      {result !== null && !error && (
        <div className="p-4 bg-violet-50 dark:bg-violet-950/30 rounded-xl border border-violet-200 dark:border-violet-900 text-left">
          <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
            {config.resultLabel || "Calculated Result"}
          </p>
          <p className="text-xl font-black text-violet-600 dark:text-[#A6FF5D] mt-1 font-mono">
            {result} {config.resultUnit || ""}
          </p>
        </div>
      )}
    </div>
  );
}