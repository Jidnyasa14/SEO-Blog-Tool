'use client';

import React, { useState } from 'react';

export interface DynamicInputField {
  name: string;
  label: string;
  type: 'number' | 'text' | 'select';
  defaultValue?: string | number;
  options?: string[];
}

export interface DynamicToolConfig {
  inputs: DynamicInputField[];
  operationType: 'math_expression' | 'text_uppercase' | 'text_lowercase' | 'word_count' | string;
  formula?: string;
  outputLabel: string;
}

interface DynamicEngineProps {
  config: DynamicToolConfig;
}

type FormState = Record<string, string | number>;

export default function DynamicEngine({ config }: DynamicEngineProps) {
  const [formData, setFormData] = useState<FormState>(() => {
    const initial: FormState = {};
    if (Array.isArray(config?.inputs)) {
      config.inputs.forEach((input) => {
        initial[input.name] = input.defaultValue ?? '';
      });
    }
    return initial;
  });

  const [result, setResult] = useState<string | number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleCalculate = () => {
    try {
      if (config.operationType === 'math_expression' && config.formula) {
        let mathExpression = config.formula;

        Object.keys(formData).forEach((key) => {
          const rawVal = formData[key];
          const numVal = Number(rawVal) || 0;
          mathExpression = mathExpression.replaceAll(key, numVal.toString());
        });

        const computedResult = new Function(`return ${mathExpression}`)() as unknown;

        if (typeof computedResult !== 'number' || isNaN(computedResult) || !isFinite(computedResult)) {
          throw new Error('Invalid mathematical evaluation');
        }

        setResult(Number.isInteger(computedResult) ? computedResult : Number(computedResult.toFixed(2)));
      } else if (config.operationType === 'text_uppercase') {
        const textVal = String(formData.text || Object.values(formData)[0] || '');
        setResult(textVal.toUpperCase());
      } else if (config.operationType === 'text_lowercase') {
        const textVal = String(formData.text || Object.values(formData)[0] || '');
        setResult(textVal.toLowerCase());
      } else if (config.operationType === 'word_count') {
        const textVal = String(formData.text || Object.values(formData)[0] || '').trim();
        const words = textVal ? textVal.split(/\s+/).length : 0;
        setResult(`${words} Words`);
      } else {
        throw new Error('Unsupported calculation formula type');
      }
    } catch {
      setError('Failed to compute calculation. Please check your inputs.');
      setResult(null);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 text-left">
      <div className="space-y-4">
        {Array.isArray(config?.inputs) &&
          config.inputs.map((input) => (
            <div key={input.name} className="flex flex-col space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-neutral-200">
                {input.label}
              </label>
              {input.type === 'number' || input.type === 'text' ? (
                <input
                  type={input.type}
                  value={formData[input.name] ?? ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(input.name, e.target.value)
                  }
                  placeholder={`Enter ${input.label.toLowerCase()}`}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-[#A6FF5D]"
                />
              ) : input.type === 'select' ? (
                <select
                  value={formData[input.name] ?? ''}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    handleInputChange(input.name, e.target.value)
                  }
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-[#A6FF5D]"
                >
                  {input.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : null}
            </div>
          ))}
      </div>

      <button
        onClick={handleCalculate}
        className="w-full py-3.5 bg-violet-600 hover:bg-violet-700 dark:bg-[#A6FF5D] dark:hover:bg-[#93f244] text-white dark:text-black font-bold rounded-xl transition-all shadow-md active:scale-[0.99]"
      >
        Calculate {config.outputLabel || 'Result'}
      </button>

      {result !== null && (
        <div className="p-5 bg-violet-50 dark:bg-slate-800/80 border border-violet-200 dark:border-[#A6FF5D]/30 rounded-xl space-y-1">
          <span className="text-xs uppercase tracking-wider font-bold text-violet-600 dark:text-[#A6FF5D]">
            {config.outputLabel || 'Output Result'}
          </span>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">{result}</div>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}