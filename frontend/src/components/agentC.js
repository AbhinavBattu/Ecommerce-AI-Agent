// import React, { useState } from 'react';
// import './agentC.css'; // You'll define the styles here
// import { handleUserRequest } from '../actions/agentActions';
// import bot from "./uploads/bot.png";
// import { useDispatch } from 'react-redux';

// // import {useDispatch} from "react-redux";
// function BotIcon() {
//   const [showPrompt, setShowPrompt] = useState(false);
//   const [userInput, setUserInput] = useState('');
//   const dispatch = useDispatch();

//   const handleIconClick = () => {
//     setShowPrompt(!showPrompt);
//   };

//   const handleSubmit = async(e) => {
//     if (userInput.trim()) {
//       // console.log(userInput);
//       e.preventDefault();
//       await handleUserRequest(userInput,dispatch); // The function you already have for processing the input
//       setUserInput(''); // Clear the input field
//       setShowPrompt(false); // Hide the prompt after submitting
//     }
//   };

//   return (
//     <div>
//       {/* Floating Icon */}
//       <div className="bot-icon" onClick={handleIconClick}>
//         <img src={bot} alt="Chatbot Icon" />
//       </div>
//       {/* Input Prompt */}
//       {showPrompt && (
//         <div className="bot-prompt">
//           <input
//             type="text"
//             value={userInput}
//             onChange={(e) => setUserInput(e.target.value)}
//             placeholder="What can I help you with?"
//           />
//           <button onClick={handleSubmit}>Submit</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default BotIcon;


import React, { useState } from 'react';
import './agentC.css'; // You'll define the styles here
import { handleUserRequest } from '../actions/agentActions';
import bot from "./uploads/bot.png";
import { useDispatch } from 'react-redux';

function BotIcon() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [listening, setListening] = useState(false); // To track the listening state
  const dispatch = useDispatch();

  // Initialize SpeechRecognition
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = false; // Stop automatically after capturing the input
  recognition.interimResults = false; // Do not return interim results
  recognition.lang = 'en-US'; // Set language to English

  recognition.onresult = (event) => {
    const speechResult = event.results[0][0].transcript;
    setUserInput(speechResult);
    console.log('Voice Input:', speechResult);
    setListening(false); // Stop listening after receiving the input
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    setListening(false); // Stop listening if there's an error
  };

  const handleIconClick = () => {
    setShowPrompt(!showPrompt);
  };

  const handleVoiceInput = () => {
    if (listening) {
      recognition.stop(); // Stop listening if already active
      setListening(false);
    } else {
      recognition.start(); // Start listening for voice input
      setListening(true);
    }
  };

  const handleSubmit = async (e) => {
    if (userInput.trim()) {
      e.preventDefault();
      await handleUserRequest(userInput, dispatch); // Process the input
      setUserInput(''); // Clear the input field
      setShowPrompt(false); // Hide the prompt after submitting
    }
  };

  return (
    <div>
      {/* Floating Icon */}
      <div className="bot-icon" onClick={handleIconClick}>
        <img src={bot} alt="Chatbot Icon" />
      </div>
      {/* Input Prompt */}
      {showPrompt && (
        <div className="bot-prompt">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="What can I help you with?"
          />
          <button style={{backgroundColor:"#FFC000",margin:"3px"}} onClick={handleSubmit}>Submit</button>
          <button style={{backgroundColor:"#FFC000",margin:"3px"}} onClick={handleVoiceInput}>
            {listening ? 'Stop Listening' : 'Speak'}
          </button>
        </div>
      )}
    </div>
  );
}

export default BotIcon;



// import React, { useState } from 'react';
// import './agentC.css'; // Update your CSS file path if necessary
// import { handleUserRequest } from '../actions/agentActions';
// import bot from "./uploads/bot.png";
// import { useDispatch } from 'react-redux';
// import {useNavigate} from 'react-router-dom';
// function BotIcon() {

//   const [showPrompt, setShowPrompt] = useState(false);
//   const [userInput, setUserInput] = useState('');
//   const [listening, setListening] = useState(false);
//   const [showAnimation, setShowAnimation] = useState(false);
//   const dispatch = useDispatch();

//   const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//   const recognition = new SpeechRecognition();

//   recognition.continuous = false;
//   recognition.interimResults = false;
//   recognition.lang = 'en-US';

//   recognition.onresult = (event) => {
//     const speechResult = event.results[0][0].transcript;
//     setUserInput(speechResult);
//     console.log('Voice Input:', speechResult);
//     setListening(false);

//     // Trigger animation after 2 seconds
//     setTimeout(() => {
//       setShowAnimation(true);

//       // Remove animation after 3 seconds
//       setTimeout(() => {
//         setShowAnimation(false);
//       }, 10000);
//     }, 5000);
//   };

//   recognition.onerror = (event) => {
//     console.error('Speech recognition error:', event.error);
//     setListening(false);
//   };

//   const handleIconClick = () => {
//     setShowPrompt(!showPrompt);
//   };

//   const handleVoiceInput = () => {
//     if (listening) {
//       recognition.stop();
//       setListening(false);
//     } else {
//       recognition.start();
//       setListening(true);
//     }
//   };
//   // const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     if (userInput.trim()) {
//       e.preventDefault();
//       await handleUserRequest(userInput, dispatch);
//       setUserInput('');
//       setShowPrompt(false);
//     }
//   };

//   return (
//     <div>
//       <div className={`bot-icon ${showAnimation ? 'speaking' : ''}`} onClick={handleIconClick}>
//         <img src={bot} alt="Chatbot Icon" />
//       </div>
//       {showPrompt && (
//         <div className="bot-prompt">
//           <input
//             type="text"
//             value={userInput}
//             onChange={(e) => setUserInput(e.target.value)}
//             placeholder="What can I help you with?"
//           />
//           <button style={{ backgroundColor: "#FFC000", margin: "3px" }} onClick={handleSubmit}>Submit</button>
//           <button style={{ backgroundColor: "#FFC000", margin: "3px" }} onClick={handleVoiceInput}>
//             {listening ? 'Stop Listening' : 'Speak'}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default BotIcon;






// import React, { useState } from 'react';
// import './agentC.css'; // Update your CSS file path if necessary
// import { handleUserRequest } from '../actions/agentActions';
// import bot from "./uploads/bot.png";
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// function BotIcon() {
//   const [showPrompt, setShowPrompt] = useState(false);
//   const [userInput, setUserInput] = useState('');
//   const [listening, setListening] = useState(false);
//   const [showAnimation, setShowAnimation] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = vigate(); // Use navigate

//   const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//   const recognition = new SpeechRecognition();

//   recognition.continuous = false;
//   recognition.interimResults = false;
//   recognition.lang = 'en-US';

//   recognition.onresult = (event) => {
//     const speechResult = event.results[0][0].transcript;
//     setUserInput(speechResult);
//     console.log('Voice Input:', speechResult);
//     setListening(false);

//     // Trigger animation after 2 seconds
//     setTimeout(() => {
//       setShowAnimation(true);

//       // Remove animation after 3 seconds
//       setTimeout(() => {
//         setShowAnimation(false);
//       }, 10000);
//     }, 5000);
//   };

//   recognition.onerror = (event) => {
//     console.error('Speech recognition error:', event.error);
//     setListening(false);
//   };

//   const handleIconClick = () => {
//     setShowPrompt(!showPrompt);
//   };

//   const handleVoiceInput = () => {
//     if (listening) {
//       recognition.stop();
//       setListening(false);
//     } else {
//       recognition.start();
//       setListening(true);
//     }
//   };

//   const handleSubmit = async (e) => {
//     if (userInput.trim()) {
//       e.preventDefault();
//       await handleUserRequest(userInput, dispatch, navigate); // Pass navigate here
//       setUserInput('');
//       setShowPrompt(false);
//     }
//   };

//   return (
//     <div>
//       <div className={`bot-icon ${showAnimation ? 'speaking' : ''}`} onClick={handleIconClick}>
//         <img src={bot} alt="Chatbot Icon" />
//       </div>
//       {showPrompt && (
//         <div className="bot-prompt">
//           <input
//             type="text"
//             value={userInput}
//             onChange={(e) => setUserInput(e.target.value)}
//             placeholder="What can I help you with?"
//           />
//           <button style={{ backgroundColor: "#FFC000", margin: "3px" }} onClick={handleSubmit}>Submit</button>
//           <button style={{ backgroundColor: "#FFC000", margin: "3px" }} onClick={handleVoiceInput}>
//             {listening ? 'Stop Listening' : 'Speak'}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default BotIcon;
