const systemPrompt = `You are VibeFix AI. Generate a practical fix plan for broken vibe-coded apps. Return strict JSON with keys: steps[{title, autoFixable, commandHint}], hostingRecommendation, riskNotes[]`;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { description, errorLog, diagnosis } = req.body || {};

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
        max_tokens: 1200,
        system: systemPrompt,
        messages: [{ role: 'user', content: `Description:\n${description}\n\nError log:\n${errorLog || 'Not provided'}\n\nDiagnosis JSON:\n${JSON.stringify(diagnosis || {}, null, 2)}\n\nPrioritize fastest safe fixes. Return only JSON.` }]
      })
    });

    const payload = await response.json();
    const parsed = JSON.parse(payload?.content?.[0]?.text || '{}');
    return res.status(200).json(parsed);
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Fix plan generation failed' });
  }
}
