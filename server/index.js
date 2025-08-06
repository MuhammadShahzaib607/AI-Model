import dotenv from "dotenv"
import express from "express"
import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from "cors"
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

const genAI = new GoogleGenerativeAI(process.env.API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

app.post("/", async (req, res) => {
    try {
        const { prompt } = req.body
const finalPrompt = `You are an expert assistant. Whenever you answer, use this format: 1. Start with a clear heading or title (use emoji if suitable).2. Divide the response into sections with subheadings.3. After eachheading, explain in 2–5 lines with examples if helpful.4. Use bullet points or numbered lists if the topic has multiple items.5. Keep the tone professional yet friendly.6. Make the response long and detailed like ChatGPT or Gemini Pro. Now answer this question ${prompt}`
        const result = await model.generateContent(finalPrompt);
        const response = await result.response;
        const text = await response.text();
        res.json({
            status: true,
            data: text
        })
    } catch (error) {
        console.log(error)
    }
})

app.get("/", (req, res) => {
    res.json({
        status: false,
        message: "API Testing"
    })
})

if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

export default app;
