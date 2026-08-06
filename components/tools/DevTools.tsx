'use client';

import React, { useState } from 'react';

function DevActionControl({ text, onAction, actionLabel }: { text: string; onAction?: () => void; actionLabel?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex gap-2">
      {onAction && actionLabel && (
        <button onClick={onAction} className="rounded-lg bg-violet-600 dark:bg-[#A6FF5D] px-3 py-1.5 text-xs font-semibold text-white dark:text-black hover:opacity-95 transition">
          {actionLabel}
        </button>
      )}
      <button onClick={handleCopy} className="rounded-lg border border-gray-200 dark:border-neutral-800 px-3 py-1.5 text-xs font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-900 transition text-neutral-700 dark:text-neutral-300">
        {copied ? 'Copied ✓' : 'Copy'}
      </button>
    </div>
  );
}

export function JsonFormatter() {
  const [input, setInput] = useState('{"engine": "NextJS 14+", "architecture": "AppRouter", "optimized": true}');
  const [output, setOutput] = useState('');
  const [isError, setIsError] = useState(false);

  const formatJson = (minify = false) => {
    try {
      if(!input.trim()) return;
      const parsed = JSON.parse(input);
      setOutput(minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 2));
      setIsError(false);
    } catch (err: unknown) {
      setOutput(`SyntaxError Analysis failed: ${(err as Error).message}`);
      setIsError(true);
    }
  };

  return (
    <div className="space-y-6 border border-gray-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-6 rounded-2xl shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-[#A6FF5D]">JSON Formatter</h2>
          <p className="text-xs text-gray-500 dark:text-neutral-400">Validate, parse, or compress map string payloads variables.</p>
        </div>
        <DevActionControl text={output} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">Raw Input Target Workspace</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={7} className="w-full p-3 font-mono text-xs border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-black focus:outline-none focus:ring-1 focus:ring-violet-500" placeholder="Paste structural JSON payload here..." />
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">Processed Output Data</label>
          <textarea readOnly value={output} rows={7} className={`w-full p-3 font-mono text-xs border rounded-lg bg-white dark:bg-black focus:outline-none ${isError ? 'text-red-500 border-red-300' : 'text-neutral-800 dark:text-[#A6FF5D] border-gray-200 dark:border-neutral-800'}`} placeholder="Output object matrix tree view..." />
        </div>
      </div>
      <div className="flex gap-4">
        <button onClick={() => formatJson(false)} className="flex-1 py-2 bg-violet-600 dark:bg-neutral-900 text-white dark:text-[#A6FF5D] border dark:border-neutral-800 font-semibold text-xs rounded-lg uppercase tracking-wider hover:opacity-95">Beautify JSON</button>
        <button onClick={() => formatJson(true)} className="flex-1 py-2 bg-gray-600 text-white text-xs font-semibold rounded-lg uppercase tracking-wider hover:opacity-95">Minify Output</button>
      </div>
    </div>
  );
}


export function Base64Tool() {
  const [txt, setTxt] = useState('');
  const [res, setRes] = useState('');

  const handleAction = (mode: 'enc' | 'dec') => {
    try {
      if(!txt.trim()) return;
      setRes(mode === 'enc' ? btoa(txt) : atob(txt));
    } catch {
      setRes('Sequence Error: Invalid Base64 binary parameter validation boundaries match.');
    }
  };

  return (
    <div className="space-y-6 border border-gray-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-6 rounded-2xl shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-[#A6FF5D]">Base64 Encode/Decode</h2>
          <p className="text-xs text-gray-500 dark:text-neutral-400">Convert standard text strings arrays to binary representation formats.</p>
        </div>
        <DevActionControl text={res} />
      </div>

      <textarea value={txt} onChange={(e) => setTxt(e.target.value)} rows={3} placeholder="Enter your data validation stream properties here..." className="w-full p-3 text-xs font-mono border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-black focus:outline-none focus:ring-1 focus:ring-violet-500" />
      
      <div className="flex gap-4">
        <button onClick={() => handleAction('enc')} className="flex-1 py-2 bg-violet-600 dark:bg-neutral-900 text-white dark:text-[#A6FF5D] border dark:border-neutral-800 text-xs font-semibold tracking-wider uppercase rounded-lg">Encode Base64</button>
        <button onClick={() => handleAction('dec')} className="flex-1 py-2 bg-gray-500 text-white text-xs font-semibold tracking-wider uppercase rounded-lg">Decode Base64</button>
      </div>
      
      {res && (
        <div className="p-4 border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-black font-mono text-xs">
          <span className="block text-[9px] uppercase font-bold text-gray-400 mb-1">Resulting Stream Allocation Matrix</span>
          <p className="break-all text-neutral-800 dark:text-neutral-200">{res}</p>
        </div>
      )}
    </div>
  );
}

// 3. ADVANCED JWT DECODER
export function JwtDecoderTool() {
  const [token, setToken] = useState('');
  const [headerStr, setHeaderStr] = useState('');
  const [payloadStr, setPayloadStr] = useState('');

  const decodeJwt = () => {
    try {
      const parts = token.trim().split('.');
      if (parts.length !== 3) throw new Error();
      setHeaderStr(JSON.stringify(JSON.parse(atob(parts[0])), null, 2));
      setPayloadStr(JSON.stringify(JSON.parse(atob(parts[1])), null, 2));
    } catch {
      setHeaderStr('Parse Failure');
      setPayloadStr('Malformed JWT payload token structure layout components.');
    }
  };

  return (
    <div className="space-y-6 border border-gray-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-6 rounded-2xl shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-[#A6FF5D]">JWT Decoder</h2>
          <p className="text-xs text-gray-500 dark:text-neutral-400">Deconstruct token bearer headers and claims values objects blocks.</p>
        </div>
        <DevActionControl text={payloadStr} />
      </div>

      <textarea value={token} onChange={(e) => setToken(e.target.value)} placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiY..." rows={2} className="w-full p-3 text-xs font-mono border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-black focus:outline-none" />
      <button onClick={decodeJwt} className="w-full py-2 bg-violet-600 dark:bg-neutral-900 border dark:border-neutral-800 text-white dark:text-[#A6FF5D] text-xs font-semibold uppercase tracking-wide rounded-lg">Unpack Token Payload</button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3 bg-white dark:bg-black rounded-lg border border-gray-200 dark:border-neutral-800">
          <span className="text-[10px] font-bold tracking-wider text-rose-500 uppercase block mb-1">Decoded Header Segment</span>
          <pre className="text-xs font-mono overflow-auto max-h-40 text-neutral-800 dark:text-neutral-200 whitespace-pre-wrap">{headerStr || '{}'}</pre>
        </div>
        <div className="p-3 bg-white dark:bg-black rounded-lg border border-gray-200 dark:border-neutral-800">
          <span className="text-[10px] font-bold tracking-wider text-violet-600 dark:text-[#A6FF5D] uppercase block mb-1">Decoded Payload Claims</span>
          <pre className="text-xs font-mono overflow-auto max-h-40 text-neutral-800 dark:text-neutral-200 whitespace-pre-wrap">{payloadStr || '{}'}</pre>
        </div>
      </div>
    </div>
  );
}

// 4. ADVANCED UUID GENERATOR
export function UuidGenerator() {
  const [uuids, setUuuids] = useState<string[]>([]);
  const [count, setCount] = useState(5);

  const genV4 = () => {
    const validCount = Math.min(20, Math.max(1, count));
    const list = Array.from({ length: validCount }, () => crypto.randomUUID());
    setUuuids(list);
  };

  return (
    <div className="space-y-6 border border-gray-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-6 rounded-2xl shadow-sm text-left">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-[#A6FF5D]">UUID Generator</h2>
          <p className="text-xs text-gray-500 dark:text-neutral-400">Bulk build cryptographically secure identity keys arrays blocks.</p>
        </div>
        <DevActionControl text={uuids.join('\n')} onAction={genV4} actionLabel="Generate Set" />
      </div>

      <div className="flex items-center gap-3 max-w-xs">
        <label htmlFor="uuid-select" className="text-xs font-semibold uppercase text-gray-400 whitespace-nowrap">Quantity Allocation</label>
        <select id="uuid-select" value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-full p-2 border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-black text-xs text-neutral-700 dark:text-[#A6FF5D] focus:outline-none">
          <option value="1">1 Identity String Key</option>
          <option value="5">5 Identity String Keys</option>
          <option value="10">10 Identity String Keys</option>
          <option value="20">20 Identity String Keys</option>
        </select>
      </div>

      {uuids.length > 0 && (
        <div className="space-y-1.5 bg-white dark:bg-black p-4 rounded-xl border border-gray-200 dark:border-neutral-800 font-mono text-xs">
          {uuids.map((id, index) => (
            <div key={index} className="py-1 border-b border-gray-100 dark:border-neutral-900 last:border-none select-all text-neutral-800 dark:text-neutral-200 hover:text-violet-600 dark:hover:text-[#A6FF5D]">
              {id}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 5. ADVANCED REGEX TESTER
export function RegexTester() {
  const [regex, setRegex] = useState('\\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}\\b');
  const [text, setText] = useState('Contact verification node channels via support@toolverse.in payload paths.');
  const [matchStr, setMatchStr] = useState('');

  const testRegex = () => {
    try {
      if(!regex || !text) return;
      const r = new RegExp(regex, 'gi');
      const matches = text.match(r);
      setMatchStr(matches ? JSON.stringify(matches, null, 2) : 'Zero matching target context validation nodes intersection found.');
    } catch {
      setMatchStr('Invalid tracking configuration regex layout validation syntax compilation failure.');
    }
  };

  return (
    <div className="space-y-6 border border-gray-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-6 rounded-2xl shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-[#A6FF5D]">Regex Tester</h2>
          <p className="text-xs text-gray-500 dark:text-neutral-400">Evaluate text data arrays matches over structural execution patterns fields.</p>
        </div>
        <DevActionControl text={matchStr} />
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <label className="block text-[10px] font-bold uppercase text-gray-400">Regular Expression Pattern Matrix</label>
          <input type="text" value={regex} onChange={(e) => setRegex(e.target.value)} className="w-full p-2.5 font-mono text-xs border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-black focus:outline-none" />
        </div>
        <div className="space-y-1">
          <label className="block text-[10px] font-bold uppercase text-gray-400">Target Core String Data Source</label>
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={2} className="w-full p-2.5 text-xs border border-gray-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-black focus:outline-none" />
        </div>
      </div>
      <button onClick={testRegex} className="w-full py-2 bg-violet-600 dark:bg-neutral-900 border dark:border-neutral-800 text-white dark:text-[#A6FF5D] text-xs font-semibold uppercase rounded-lg">Execute Pattern Analysis</button>
      <pre className="p-3 bg-white dark:bg-black border border-gray-200 dark:border-neutral-800 font-mono text-xs rounded-lg max-h-32 overflow-auto text-neutral-800 dark:text-neutral-200">{matchStr || 'Run search matching diagnostics values...'}</pre>
    </div>
  );
}

// Master Main Grid Wrapper Container Layout
// export default function DevToolsWorkspace() {
//   return (
//     <div className="min-h-screen bg-white text-neutral-950 dark:bg-black dark:text-neutral-100 transition-colors duration-200">
//       <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-gray-200 dark:border-neutral-800 bg-white/90 dark:bg-black/95 backdrop-blur-md">
//         <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 sm:px-8">
//           <div className="text-sm font-extrabold tracking-wide text-violet-600 dark:text-[#A6FF5D] uppercase">Toolverse Dev Workspace</div>
//           <div className="text-[10px] font-mono font-bold text-gray-400 bg-neutral-100 dark:bg-neutral-900 px-2 py-1 rounded border dark:border-neutral-800">COMPILER CORE V1</div>
//         </div>
//       </nav>

//       <main className="mx-auto max-w-4xl px-6 pb-20 pt-24 sm:px-8 text-left">
//         <div className="space-y-2 mb-8">
//           <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">Developer Parsing Engines</h1>
//           <p className="text-sm text-gray-500 dark:text-neutral-400">Encoding translation pipelines and cryptographic identifier runtime generators.</p>
//         </div>

//         <div className="flex flex-col gap-8">
//           <JsonFormatter />
//           <Base64Tool />
//           <JwtDecoderTool />
//           <UuidGenerator />
//           <RegexTester />
//         </div>
//       </main>
//     </div>
//   );
// }
//================================================================================================================================
export default function DevToolsWorkspace() {
  return (
    <div className="min-h-screen bg-white text-neutral-950 dark:bg-black dark:text-neutral-100 transition-colors duration-200">
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-gray-200 dark:border-neutral-800 bg-white/90 dark:bg-black/95 backdrop-blur-md">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 sm:px-8">
          <div className="text-sm font-extrabold tracking-wide text-violet-600 dark:text-[#A6FF5D] uppercase">Toolverse Dev Workspace</div>
          <div className="text-[10px] font-mono font-bold text-gray-400 bg-neutral-100 dark:bg-neutral-900 px-2 py-1 rounded border dark:border-neutral-800">COMPILER CORE V1</div>
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-6 pb-20 pt-24 sm:px-8 text-left">
        <div className="space-y-1.5 mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-violet-600 dark:text-[#A6FF5D]">Developer Parsing Engines</h1>
          <p className="text-sm text-gray-500 dark:text-neutral-400">Encoding translation pipelines and cryptographic identifier runtime generators.</p>
        </div>

        <div className="flex flex-col gap-8">
          <JsonFormatter />
          <Base64Tool />
          <JwtDecoderTool />
          <UuidGenerator />
          <RegexTester />
        </div>
      </main>
    </div>
  );
}


