import React, { useState, useEffect } from 'react';

const OPENAI_API_KEY = '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';

export default function ViewAIReport({ audioUrls = [], onClose }) {
  const [loading, setLoading] = useState(false);
  const [transcripts, setTranscripts] = useState([]); // [{ url, text }]
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');

  // Helper: fetch audio blob by URL
  async function fetchAudioBlob(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch audio from ${url}`);
    return await res.blob();
  }

  // Transcribe one file
  async function transcribe(url) {
    const blob = await fetchAudioBlob(url);
    const formData = new FormData();
    formData.append('file', blob, 'audio.webm');
    formData.append('model', 'whisper-1');

    const res = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: formData,
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error.message);
    return data.text;
  }

  // Summarize big text with GPT
  async function summarize(text) {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: `Please summarize the following combined transcripts briefly:\n\n${text}`,
          },
        ],
        temperature: 0.7,
      }),
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error.message);
    return data.choices[0].message.content;
  }

  // When modal opens, process all audios
  useEffect(() => {
    if (audioUrls.length === 0) return;

    async function processAll() {
      setLoading(true);
      setError('');
      setTranscripts([]);
      setSummary('');

      try {
        const results = [];
        for (const url of audioUrls) {
          const text = await transcribe(url);
          results.push({ url, text });
          setTranscripts([...results]); // update UI progressively
        }

        // Combine all transcripts into one string
        const combinedText = results.map(r => r.text).join('\n\n---\n\n');

        // Get summary of combined transcripts
        const combinedSummary = await summarize(combinedText);
        setSummary(combinedSummary);
      } catch (e) {
        setError(e.message);
      }
      setLoading(false);
    }

    processAll();
  }, [audioUrls]);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
      justifyContent: 'center', alignItems: 'center', zIndex: 1000,
    }}>
      <div style={{ backgroundColor: 'white', padding: 20, width: '90%', maxWidth: 700, borderRadius: 8, maxHeight: '90vh', overflowY: 'auto' }}>
        <h2>AI Assist - Combined Audio Summary</h2>
        {loading && <p>Processing audio files, please wait...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        {!loading && !error && (
          <>
            <h3>Combined Summary</h3>
            <p style={{ whiteSpace: 'pre-wrap' }}>{summary || 'No summary available'}</p>

            <hr />

            <h3>Individual Transcripts</h3>
            {transcripts.map(({ url, text }, i) => (
              <div key={i} style={{ marginBottom: 15 }}>
                <strong>Recording {i + 1}:</strong>
                <audio controls src={url} style={{ width: '100%', marginTop: 5, marginBottom: 5 }} />
                <p style={{ whiteSpace: 'pre-wrap' }}>{text}</p>
              </div>
            ))}
          </>
        )}

        <button onClick={onClose} style={{ marginTop: 20 }}>
          Close
        </button>
      </div>
    </div>
  );
}