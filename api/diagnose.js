const systemPrompt = `You are VibeFix AI. Analyze broken vibe-coded apps and return JSON with: severity, mainIssue, rootCauses[], affectedAreas[], estimatedFixTime, canAutoFix, confidence, terminalLogs[]`;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { description, errorLog } = req.body || {};
  if (!description) return res.status(400).json({ error: 'Description is required' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' });

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{ role: 'user', content: `App issue description:\n${description}\n\nError logs:\n${errorLog || 'Not provided'}\n\nReturn only valid JSON.` }]
      })
    });

    const payload = await response.json();
    const parsed = JSON.parse(payload?.content?.[0]?.text || '{}');
    return res.status(200).json(parsed);
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Diagnosis request failed' });
  }
}
