import { useMemo, useState } from 'react';

const severityColor = {
  low: 'bg-blue-500/20 text-blue-200',
  medium: 'bg-yellow-500/20 text-yellow-200',
  high: 'bg-orange-500/20 text-orange-200',
  critical: 'bg-red-500/20 text-red-200'
};

export default function AIDiagnosisTool() {
  const [description, setDescription] = useState('');
  const [errorLog, setErrorLog] = useState('');
  const [diagnosis, setDiagnosis] = useState(null);
  const [fixPlan, setFixPlan] = useState(null);
  const [loadingDiagnosis, setLoadingDiagnosis] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [error, setError] = useState('');

  const terminalOutput = useMemo(() => diagnosis?.terminalLogs ?? [], [diagnosis]);

  const runDiagnosis = async () => {
    setLoadingDiagnosis(true);
    setError('');
    setFixPlan(null);

    try {
      const response = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, errorLog })
      });

      if (!response.ok) throw new Error('Diagnosis failed. Please try again.');
      const data = await response.json();
      setDiagnosis(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingDiagnosis(false);
    }
  };

  const generateFixPlan = async () => {
    if (!diagnosis) return;

    setLoadingPlan(true);
    setError('');

    try {
      const response = await fetch('/api/fix-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, errorLog, diagnosis })
      });

      if (!response.ok) throw new Error('Unable to generate fix plan right now.');
      const data = await response.json();
      setFixPlan(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingPlan(false);
    }
  };

  return (
    <section className="glow rounded-xl border border-accent/30 bg-panel p-6 terminal-scanlines">
      <h2 className="mb-4 text-2xl font-bold text-accent">AI Diagnosis Console</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe what is broken in your app..."
          className="h-40 rounded-lg border border-accent/30 bg-bg p-3 text-sm outline-none placeholder:text-muted focus:border-accent"
        />
        <textarea
          value={errorLog}
          onChange={(e) => setErrorLog(e.target.value)}
          placeholder="Paste optional error logs..."
          className="h-40 rounded-lg border border-accent/30 bg-bg p-3 text-sm outline-none placeholder:text-muted focus:border-accent"
        />
      </div>

      <button
        type="button"
        onClick={runDiagnosis}
        disabled={!description || loadingDiagnosis}
        className="mt-4 rounded-lg bg-accent px-5 py-2 text-sm font-bold text-black disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loadingDiagnosis ? 'Running Diagnosis...' : 'Run AI Diagnosis'}
      </button>

      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

      {diagnosis && (
        <div className="mt-6 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className={`rounded-full px-3 py-1 text-xs uppercase ${severityColor[(diagnosis.severity || '').toLowerCase()] || 'bg-white/10'}`}>
              Severity: {diagnosis.severity}
            </span>
            <span className="text-sm text-muted">Estimated fix time: {diagnosis.estimatedFixTime}</span>
            <span className="text-sm text-muted">Confidence: {diagnosis.confidence}%</span>
          </div>

          <div className="rounded-lg border border-accent/20 bg-bg p-4">
            <h3 className="text-sm text-accent">Root Causes</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
              {(diagnosis.rootCauses || []).map((cause) => (
                <li key={cause}>{cause}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-accent/20 bg-black p-4 font-mono text-xs text-green-300">
            {(terminalOutput.length ? terminalOutput : ['No terminal logs generated yet.']).map((line, index) => (
              <p key={`${line}-${index}`} className="animate-pulse">$ {line}</p>
            ))}
          </div>

          <button
            type="button"
            onClick={generateFixPlan}
            disabled={loadingPlan}
            className="rounded-lg border border-accent px-5 py-2 text-sm text-accent disabled:opacity-50"
          >
            {loadingPlan ? 'Generating Plan...' : 'Generate Fix Plan'}
          </button>

          {fixPlan && (
            <div className="rounded-lg border border-accent/20 bg-bg p-4">
              <h3 className="text-sm text-accent">Step-by-step Fix Plan</h3>
              <ul className="mt-2 space-y-2 text-sm text-muted">
                {(fixPlan.steps || []).map((step, index) => (
                  <li key={`${step.title}-${index}`}>
                    {index + 1}. {step.title} <span className="text-accent">[{step.autoFixable ? 'Auto-fixable' : 'Manual'}]</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-white">Hosting recommendation: <span className="text-accent">{fixPlan.hostingRecommendation}</span></p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
