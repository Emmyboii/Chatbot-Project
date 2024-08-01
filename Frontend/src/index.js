import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';
// import { OpenAI } from 'openai'
// import readline from 'readline'

// const openai = new OpenAI({
//   organization: "org-C663YHai8qJI1Q3NC1hx8iNf",
//   apiKey: "sk-None-hcP6L9VlFj4eihF6CAuTT3BlbkFJ2TgwDNOd1HlJDjBvtcZI"
// })

// const userInterface = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// userInterface.prompt();

// userInterface.on("line", async (input) => {
//   await openai.chat.completions.create({
//     model: "gpt-4o-mini",
//     messages: [{ role: "user", content: input }],
//   }).then((result) => {
//     console.log(result.data.choices[0].message.content);
//     userInterface.prompt();
//   }).catch((error) => console.log(error));
// });


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
