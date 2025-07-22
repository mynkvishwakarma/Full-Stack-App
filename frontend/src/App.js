import React, { useState, useEffect } from 'react';

// Define styles outside the component (before using them)
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px'
  },
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    padding: '20px',
    margin: '20px 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  form: {
    display: 'flex',
    margin: '20px 0'
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px 0 0 4px'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '0 4px 4px 0',
    cursor: 'pointer'
  },
  response: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#e9ecef',
    borderRadius: '4px'
  }
};

// Component definition
export default function App() {
  const [message, setMessage] = useState('');
  const [inputData, setInputData] = useState('');
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/message');
        const data = await res.json();
        setMessage(data.message);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchMessage();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: inputData })
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Full-Stack Challenge</h1>
      <div style={styles.card}>
        <h2>Backend Response:</h2>
        <p>{message || 'Loading...'}</p>
      </div>
      
      <div style={styles.card}>
        <h2>Send to Backend:</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input 
            type="text" 
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            placeholder="Enter data"
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Submit</button>
        </form>
        {response && (
          <div style={styles.response}>
            <h3>Backend Confirmation:</h3>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}