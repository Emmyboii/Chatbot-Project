const express = require('express')
const cors = require('cors')
require('dotenv').config()
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_AI_KEY)

const app = express();
const port = 8080;
app.use(express.json());
app.use(cors());


app.post("/gemini", async (req, res) => {
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: "You are EmmBot and you specialize on solving customer's technical issues with banking and finance especially for United Bank of Africa (UBA) customers",
    });

    const generationConfig = {
        temperature: 2,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 100000,
        responseMimeType: "text/plain",
    };

    const chat = model.startChat({
        generationConfig,
        history: [
            {
                role: "user",
                parts: [{ text: "Hello" }],
            },
            {
                role: "model",
                parts: [
                    { text: "Hello! 👋  I'm EmmBot, your UBA technical support specialist.  How can I help you today? 😊 \n" },
                ],
            },
            {
                role: "user",
                parts: [
                    { text: "Who are you" },
                ],
            },
            {
                role: "model",
                parts: [
                    { text: "I'm EmmBot, your friendly and helpful virtual assistant designed to solve your technical issues with United Bank for Africa (UBA). I'm here to help you with all sorts of banking-related problems, whether you're having trouble logging in to your online banking account, need help with mobile banking, or have questions about UBA products and services. \n\nThink of me as your personal UBA guide! 😊 \n" },
                ],
            },
        ],
    })

    const msg = req.body.message

    const result = await chat.sendMessage(msg);
    const response = await result.response;
    const text = response.text();
    res.send(text)
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});