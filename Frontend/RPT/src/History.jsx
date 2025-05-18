import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function History() {
  const [historyData, setHistoryData] = useState([]);
  const [history1, setHistory1] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  async function getHistory() {
    try {
      const res = await fetch('http://localhost:3000/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({})
      });

      if (!res.ok && res.status === 401) {
        window.location.href = '/login';
        return;
      }

      const data = await res.json();
      if (data.history.length === 0) setHistory1(true);
      setHistoryData(Array.isArray(data) ? data : data.history || []);
      setCurrentPage(1);
    } catch (err) {
      console.error('Error fetching history:', err);
    }
  }

  const totalPages = Math.ceil(historyData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = historyData.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div style={{
      maxWidth: '900px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#333' }}>History</h2>
        <button
          onClick={getHistory}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={e => (e.currentTarget.style.backgroundColor = '#0056b3')}
          onMouseOut={e => (e.currentTarget.style.backgroundColor = '#007bff')}
        >
          Show History
        </button>
      </div>

      {history1 && (
        <p style={{ color: '#888', textAlign: 'center', fontStyle: 'italic' }}>
          No History Found
        </p>
      )}

      {currentItems.length > 0 && (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {currentItems.map((item, index) => (
              <li key={index} style={{
                backgroundColor: '#fdfdfd',
                border: '1px solid #ddd',
                borderRadius: '10px',
                padding: '20px',
                marginBottom: '20px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)'
              }}>
                <h5 style={{ color: '#007bff', marginBottom: '10px' }}>📝 Prompt:</h5>
                <div style={{ paddingLeft: '10px' }}>
                  <ReactMarkdown>{item.Question}</ReactMarkdown>
                </div>
                <h6 style={{ color: '#28a745', marginTop: '20px', marginBottom: '10px' }}>💬 Response:</h6>
                <div style={{ paddingLeft: '10px' }}>
                  <ReactMarkdown>{item.Output}</ReactMarkdown>
                </div>
              </li>
            ))}
          </ul>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '30px'
          }}>
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                border: '1px solid #ccc',
                backgroundColor: currentPage === 1 ? '#eee' : '#fff',
                color: '#333',
                borderRadius: '5px',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
              }}
            >
              ⬅️ Previous
            </button>
            <span style={{ fontSize: '14px', color: '#666' }}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                border: '1px solid #ccc',
                backgroundColor: currentPage === totalPages ? '#eee' : '#fff',
                color: '#333',
                borderRadius: '5px',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
              }}
            >
              Next ➡️
            </button>
          </div>
        </>
      )}
    </div>
  );
}