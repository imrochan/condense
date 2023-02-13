import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState(''); 
  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };  
  const [apiOutput, setApiOutput] = useState('')
const [isGenerating, setIsGenerating] = useState(false)

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}
  return (
    <div className="root">
      <Head>
        <title>Condense</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Condense.LOL</h1>
          </div>
          <div className="header-subtitle">
            <h2>Summarize any website in less than 3 sentences.</h2>
          </div>
          <div className="prompt-container">
          <textarea placeholder="start typing here" className="prompt-box" 
          value={userInput}
          onChange={onUserChangedText}
          />
        
        <div className="prompt-buttons">
          <a className="generate-button" onClick={null}>
            <div className="generate">
              <p>Generate</p>
            </div>
          </a>
        </div>
        {apiOutput && (
  <div className="output">
    <div className="output-header-container">
      <div className="output-header">
        <h3>Output</h3>
      </div>
    </div>
    <div className="output-content">
      <p>{apiOutput}</p>
    </div>
  </div>
)}

        </div>

        </div>
      </div>
      <br></br>
      <br></br>
      <div className="badge-container grow">
        <a
          href="https://twitter.com/sxoulzz"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <p>Made with ❤️ by Rochan</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
