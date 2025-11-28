// frontend/src/App.js - FIXED VERSION
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

// Create a separate component for Example Cards to avoid hook rules violation
const ExampleCard = ({ example, onUseExample }) => {
  return (
    <div className="example-card">
      <h4>{example.title}</h4>
      <p>{example.text}</p>
      <button 
        onClick={() => onUseExample(example)}
        className="use-example-btn"
      >
        Use Example
      </button>
    </div>
  );
};

function App() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedExample, setSelectedExample] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const fileInputRef = React.useRef(null);

  // Professional examples data
  const examples = {
    Finance: [
      {
        title: "Investment Prospectus Q4 2024",
        text: "Quarterly investment report showing strong growth in technology sectors with 15% YoY increase. Portfolio diversification strategies implemented across emerging markets.",
        category: "Business"
      },
      {
        title: "Financial Report Summary", 
        text: "Annual financial statements reveal increased revenue streams and improved profit margins. Key performance indicators show positive trends across all business units.",
        category: "Business"
      }
    ],
    Legal: [
      {
        title: "Contract Agreement Review",
        text: "Legal document outlining terms and conditions for service provision. Includes clauses for termination, confidentiality, and dispute resolution mechanisms.",
        category: "Politics"
      }
    ],
    Healthcare: [
      {
        title: "Medical Diagnosis Notes",
        text: "Patient case study detailing symptoms, diagnostic procedures, and treatment recommendations. Includes lab results and specialist consultations.",
        category: "Science"
      }
    ],
    Customer: [
      {
        title: "Customer Feedback Analysis",
        text: "Comprehensive review of customer satisfaction surveys showing 92% approval rating. Key improvement areas identified for product enhancement.",
        category: "Business"
      }
    ],
    Academic: [
      {
        title: "Research Paper on AI Ethics",
        text: "Academic study exploring ethical implications of artificial intelligence in healthcare. Discusses privacy concerns and regulatory frameworks needed for responsible AI deployment.",
        category: "Science"
      }
    ],
    Media: [
      {
        title: "News Article Summary",
        text: "Breaking news coverage of recent technological advancements in renewable energy. Industry experts predict significant market shifts in coming years.",
        category: "Technology"
      }
    ]
  };

  const recentResults = [
    { title: "Investment Prospectus Q4 2024", category: "Finance Report", confidence: 86 },
    { title: "Customer Feedback Analysis", category: "Market Research", confidence: 88 },
    { title: "Research Paper on AI Ethics", category: "Academic Study", confidence: 68 }
  ];

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check if it's a text file
    if (file.type !== 'text/plain' && !file.name.endsWith('.txt')) {
      alert('Please upload a .txt file');
      return;
    }

    setUploadedFileName(file.name);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target.result;
      setText(fileContent);
      setSelectedExample(`Uploaded: ${file.name}`);
      setResult(null);
    };
    reader.readAsText(file);
  };

  // Function to trigger file input click
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const classifyDocument = async () => {
    if (!text.trim()) {
      alert("Please enter some text to classify!");
      return;
    }

    setLoading(true);
    setResult({ status: 'processing' });
    
    try {
      const response = await axios.post('http://localhost:8000/classify', {
        text: text
      });
      
      setResult(response.data);
    } catch (error) {
      console.error('Error classifying document:', error);
      setResult({
        category: 'Error',
        confidence: 0,
        status: 'error',
        message: 'Failed to classify document'
      });
    }
    setLoading(false);
  };

  const useExample = (example) => {
    setText(example.text);
    setSelectedExample(example.title);
    setUploadedFileName('');
    setResult(null);
  };

  // Function to clear the text area
  const clearText = () => {
    setText('');
    setSelectedExample('');
    setUploadedFileName('');
    setResult(null);
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Technology': return '#2563eb';
      case 'Sports': return '#059669';
      case 'Business': return '#d97706';
      case 'Politics': return '#dc2626';
      case 'Entertainment': return '#7c3aed';
      case 'Science': return '#0891b2';
      default: return '#6b7280';
    }
  };

  const getCategoryEmoji = (category) => {
    switch (category) {
      case 'Technology': return;
      case 'Sports': return;
      case 'Business': return;
      case 'Politics': return;
      case 'Entertainment': return;
      case 'Science': return;
      default: return;
    }
  };

  // Function to handle example selection from the main input section
  const handleChooseExample = () => {
    setActiveTab('examples');
  };

  return (
    <div className="App">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".txt,text/plain"
        style={{ display: 'none' }}
      />
      
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <h1>DocClassify AI</h1>
          </div>
          <nav className="main-nav">
            <button 
              className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </button>
            <button 
              className={`nav-btn ${activeTab === 'examples' ? 'active' : ''}`}
              onClick={() => setActiveTab('examples')}
            >
              Examples
            </button>
            <button 
              className={`nav-btn ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              History
            </button>
          </nav>
        </div>
      </header>

      <div className="app-container">
        {/* Main Content */}
        {activeTab === 'dashboard' && (
          <div className="dashboard">
            {/* Hero Section */}
            <section className="hero-section">
              <div className="hero-content">
                <h1>Classify Documents Instantly</h1>
                <p>Leverage AI to categorize your documents with unparalleled accuracy and speed. Understand your data better.</p>
                <button className="learn-more-btn">Learn More</button>
              </div>
            </section>

            {/* Main Classifier */}
            <div className="classifier-layout">
              <div className="input-section">
                <div className="input-card">
                  <h3>Document Classification</h3>
                  
                  {/* File upload status */}
                  {uploadedFileName && (
                    <div className="upload-status">
                      <span className="upload-filename">{uploadedFileName}</span>
                      <button 
                        onClick={clearText}
                        className="clear-upload-btn"
                      >
                        ×
                      </button>
                    </div>
                  )}
                  
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste your document text here... or upload a .txt file"
                    rows="12"
                  />
                  
                  <div className="input-actions">
                    <button 
                      className="action-btn secondary"
                      onClick={handleUploadClick}
                    >
                      📎 Upload File
                    </button>
                    <button 
                      className="action-btn secondary"
                      onClick={handleChooseExample}
                    >
                       Choose Example
                    </button>
                    {text && (
                      <button 
                        className="action-btn secondary"
                        onClick={clearText}
                      >
                         Clear
                      </button>
                    )}
                  </div>

                  <button 
                    onClick={classifyDocument} 
                    disabled={loading || !text.trim()}
                    className="classify-btn primary"
                  >
                    {loading ? '🧠 Classifying...' : ' Classify Document'}
                  </button>

                  {selectedExample && !uploadedFileName && (
                    <div className="selected-example">
                      Using: <strong>{selectedExample}</strong>
                    </div>
                  )}
                </div>

                {/* Recent Results */}
                <div className="recent-results">
                  <h4>Recent Results</h4>
                  {recentResults.map((item, index) => (
                    <div key={index} className="recent-item">
                      <div className="recent-info">
                        <div className="recent-title">{item.title}</div>
                        <div className="recent-category">{item.category}</div>
                      </div>
                      <div className="recent-confidence">{item.confidence}%</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Results Section */}
              <div className="results-section">
                {result ? (
                  <div className="results-card">
                    <h3>Classification Result</h3>
                    
                    {result.status === 'processing' ? (
                      <div className="processing-state">
                        <div className="loading-spinner"></div>
                        <p>Analyzing Document...</p>
                        <p className="subtext">This may take a moment.</p>
                      </div>
                    ) : result.status === 'success' ? (
                      <div className="success-results">
                        <div className="main-prediction">
                          <div className="prediction-badge" style={{ backgroundColor: getCategoryColor(result.category) }}>
                            {getCategoryEmoji(result.category)} {result.category}
                          </div>
                          <div className="confidence-score">{result.confidence}% Confidence</div>
                        </div>

                        <div className="confidence-meter">
                          <div 
                            className="confidence-fill"
                            style={{ 
                              width: `${result.confidence}%`,
                              backgroundColor: getCategoryColor(result.category)
                            }}
                          ></div>
                        </div>

                        {/* All Probabilities */}
                        {result.all_probabilities && (
                          <div className="all-probabilities">
                            <h4>All Categories</h4>
                            {Object.entries(result.all_probabilities)
                              .sort((a, b) => b[1] - a[1])
                              .map(([category, prob]) => (
                                <div key={category} className="probability-row">
                                  <span className="prob-category">
                                    {getCategoryEmoji(category)} {category}
                                  </span>
                                  <div className="prob-bar-container">
                                    <div 
                                      className="prob-bar"
                                      style={{ 
                                        width: `${prob}%`,
                                        backgroundColor: getCategoryColor(category)
                                      }}
                                    ></div>
                                    <span className="prob-value">{prob}%</span>
                                  </div>
                                </div>
                              ))}
                          </div>
                        )}

                        <div className="result-actions">
                          <button 
                            className="action-btn secondary"
                            onClick={() => navigator.clipboard.writeText(`${result.category} - ${result.confidence}% confidence`)}
                          >
                             Copy Result
                          </button>
                          <button 
                            className="action-btn secondary"
                            onClick={() => {
                              const resultText = `Document Classification Result:\nCategory: ${result.category}\nConfidence: ${result.confidence}%\n\nAll Probabilities:\n${Object.entries(result.all_probabilities || {})
                                .map(([cat, prob]) => `${cat}: ${prob}%`)
                                .join('\n')}`;
                              const blob = new Blob([resultText], { type: 'text/plain' });
                              const url = URL.createObjectURL(blob);
                              const a = document.createElement('a');
                              a.href = url;
                              a.download = 'classification_result.txt';
                              a.click();
                              URL.revokeObjectURL(url);
                            }}
                          >
                            📥 Export Report
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="error-state">
                        <p>Error processing document. Please try again.</p>
                        {result.message && <p className="error-detail">{result.message}</p>}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="placeholder-results">
                    <h3>Classification Result</h3>
                    <p>Enter text, upload a file, or choose an example to see classification results.</p>
                    <div className="placeholder-tips">
                      <div className="tip"> <strong>Supported formats:</strong> Plain text (.txt files)</div>
                      <div className="tip"> <strong>File size:</strong> Up to 1MB</div>
                      <div className="tip"> <strong>Best for:</strong> Articles, reports, emails, documents</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Examples Tab */}
        {activeTab === 'examples' && (
          <div className="examples-tab">
            <div className="examples-header">
              <h1>Examples</h1>
              <div className="search-box">
                <input type="text" placeholder="Search by keyword or category..." />
              </div>
            </div>

            <div className="categories-filter">
              {Object.keys(examples).map(category => (
                <button key={category} className="category-filter-btn">
                  {category}
                </button>
              ))}
            </div>

            <div className="examples-grid">
              {Object.entries(examples).map(([category, categoryExamples]) => (
                <div key={category} className="examples-category">
                  <h3>{category}</h3>
                  <div className="category-examples">
                    {categoryExamples.map((example, index) => (
                      <ExampleCard 
                        key={index}
                        example={example}
                        onUseExample={useExample}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="history-tab">
            <h1>Classification History</h1>
            <p>Your recent document classifications will appear here.</p>
            <div className="empty-state">
              <p>No classification history yet.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;