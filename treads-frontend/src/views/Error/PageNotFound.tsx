import React from 'react';
import { useNavigate } from 'react-router-dom';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'; // For a fun touch

const PageNotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#f8f9fa',
        color: '#333',
        textAlign: 'center',
      }}
    >
      <h1
        style={{ fontSize: '5rem', marginBottom: '10px', fontWeight: 'bold' }}
      >
        404
      </h1>
      <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>
        Oops! Page Not Found
      </h2>
      <p
        style={{ fontSize: '1.2rem', maxWidth: '600px', marginBottom: '30px' }}
      >
        The page you are looking for could not be found, might have had its name
        changed, or is temporarily unavailable.
      </p>

      {/* Icon for a modern touch */}
      <InsertEmoticonIcon
        style={{ fontSize: '4rem', color: '#6c757d', marginBottom: '20px' }}
      />

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          padding: '12px 24px',
          fontSize: '1rem',
          fontWeight: 'bold',
          color: '#fff',
          backgroundColor: '#007bff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background 0.3s',
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
      >
        🔙 Go Back
      </button>
    </div>
  );
};

export default PageNotFound;
