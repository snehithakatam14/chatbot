import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export default function OurApp() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [quiz, setQuiz] = useState('');
  const [showQuiz, setShowQuiz] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const responseRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError('Prompt cannot be empty.');
      return;
    }

    setLoading(true);
    setError('');
    setResponse('');
    setQuiz('');
    setShowQuiz(false);

    try {
      const res = await fetch('http://localhost:3000/ask-rpt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        if (res.status === 401) {
          window.location.href = '/login';
          return;
        }
        throw new Error(data.error || `Server error: ${res.status}`);
      }

      setResponse(data.answer || 'No answer found.');
      setQuiz(data.quiz || 'No quiz generated.');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (responseRef.current) {
      responseRef.current.scrollTop = responseRef.current.scrollHeight;
    }
  }, [response]);

  return (
    <div
      className="container mt-4"
      style={{
        maxWidth: 960,
        height: 'calc(100vh - 40px)',
        display: 'flex',
        gap: '24px',
      }}
    >      <div
        style={{
          flex: 2,
          border: '1px solid #ccc',
          borderRadius: '12px',
          backgroundColor: '#fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h2 style={{ textAlign: 'center', margin: '20px 0 10px', color: '#333' }}>Ask RPT</h2>

        {error && (
          <div className="alert alert-danger mt-2 mx-3" role="alert">
            {error}
          </div>
        )}

        <div
          style={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            margin: '0 20px 20px',
            border: '1px solid #ced4da',
            borderRadius: '8px',
            backgroundColor: '#f8f9fa',
            padding: '12px',
            overflow: 'hidden',
          }}
        >
          <div
            ref={responseRef}
            style={{
              flexGrow: 1,
              overflowY: 'auto',
              backgroundColor: '#f8f9fa',
              border: '1px solid #ced4da',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '8px',
              whiteSpace: 'normal',
              wordWrap: 'break-word',
            }}
          >
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p style={{ marginBottom: '1em', lineHeight: '1.6', fontSize: '1rem' }}>{children}</p>
                ),
                code: ({ children }) => (
                  <code
                    style={{
                      backgroundColor: '#e9ecef',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontFamily: 'monospace',
                    }}
                  >
                    {children}
                  </code>
                ),
                strong: ({ children }) => <strong style={{ fontWeight: 'bold' }}>{children}</strong>,
              }}
            >
              {response}
            </ReactMarkdown>
          </div>

          <form onSubmit={handleSubmit} style={{ position: 'relative', marginTop: '8px' }}>
            <textarea
              className="form-control"
              rows={1}
              placeholder="Type your prompt here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
              style={{
                resize: 'none',
                minHeight: '70px',
                fontSize: '1rem',
                padding: '14px 50px 14px 16px',
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                borderColor: '#ddd',
                width: '100%',
              }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
            />

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                borderRadius: '50%',
                width: 36,
                height: 36,
                padding: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: 'none',
                backgroundColor: '#0d6efd',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm text-light" role="status" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="white"
                  className="bi bi-send"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.964.686a.5.5 0 0 1 .013.707l-15 15a.5.5 0 0 1-.854-.354v-4.24a.5.5 0 0 1 .146-.354l5.585-5.586a.5.5 0 0 0-.707-.707L.293 10.293A.5.5 0 0 1 0 9.939V1.5a.5.5 0 0 1 .707-.459l15-1a.5.5 0 0 1 .257.645z" />
                </svg>
              )}
            </button>
          </form>

          {quiz && (
            <button
              className="btn btn-outline-secondary mt-2"
              onClick={() => setShowQuiz(!showQuiz)}
            >
              {showQuiz ? 'Hide Quiz' : 'Show Quiz'}
            </button>
          )}
        </div>
      </div>
      {showQuiz && quiz && (
        <div
          style={{
            flex: 1,
            border: '1px solid #ced4da',
            borderRadius: '12px',
            padding: '16px',
            backgroundColor: '#fefefe',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            overflowY: 'auto',
            whiteSpace: 'pre-wrap',
          }}
        >
          <h4 style={{ textAlign: 'center', marginBottom: '16px' }}>Quiz</h4>
          <ReactMarkdown>{quiz}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}