import { OpenAI } from 'openai';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 8080;
app.use(bodyParser.json());
app.use(cors());

const openai = new OpenAI({
    organization: "org-C663YHai8qJI1Q3NC1hx8iNf",
    apiKey: "sk-None-hcP6L9VlFj4eihF6CAuTT3BlbkFJ2TgwDNOd1HlJDjBvtcZI",
    dangerouslyAllowBrowser: true
});

app.post("/", async (req, res) => {
    const { chats } = req.body;

    const result = await openai.chat.completions.create({
        model: "gpt-4o-mini-2024-07-18",
        messages: [
            {
                role: "system",
                content: "You are EmmyBot. You help to trobleshoot issues"
            },
            ...chats,
        ],
    });

    res.json({
        output: result.data.choices[0].message,
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})