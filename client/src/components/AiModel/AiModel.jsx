import React, { useState, useRef, useEffect } from 'react'
import axios from "axios"
import Card from '../card/Card'
import "./aiModel.scss"

const AiModel = () => {
  const inputRef = useRef()
  const bottomRef = useRef(null)
  const [response, setResponse] = useState([])
  const [loading, setLoading] = useState(false)

  // Load messages from localStorage on mount
  useEffect(() => {
    const storedMessages = localStorage.getItem("chatData")
    if (storedMessages) {
      setResponse(JSON.parse(storedMessages))
    }
  }, [])

  // Scroll to bottom when response updates
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [response])

  const AiResponse = async () => {
    const userInput = inputRef.current.value
    if (!userInput.trim()) return

    const updatedMessages = [
      ...response,
      { sender: "user", message: userInput }
    ]

    setResponse(updatedMessages)
    localStorage.setItem("chatData", JSON.stringify(updatedMessages))
    inputRef.current.value = ""
    setLoading(true)

    try {
      const res = await axios.post("http://localhost:8000/", {
        prompt: userInput
      })

      const aiReply = {
        sender: "ai",
        message: res.data.data
      }

      const finalMessages = [...updatedMessages, aiReply]
      setResponse(finalMessages)
      localStorage.setItem("chatData", JSON.stringify(finalMessages))
    } catch (error) {
      console.log(error)
    }
    
    setLoading(false)
  }

  return (
    <div className='aiModel'>
      <div className={response.length <= 0 ? "aiChatbot" : "messages"}>
        {
          response.length <= 0 ? (
            <div style={{
              color: "#00000033",
              fontSize: "55px",
              alignSelf: "center",
              justifySelf: "center",
              userSelect: "none",
              pointerEvents: "none"
            }}>
              AI Chatbot
            </div>
          ) : (
            <>
              {response.map((msg, index) => (
                <Card key={index} message={msg} />
              ))}
              {loading && <div className="loading">Loading...</div>}
              <div ref={bottomRef} />
            </>
          )
        }
      </div>

      <div className="inputContainer">
        <input type="text" placeholder='Ask Anything' ref={inputRef} />
        <button onClick={AiResponse}>
          <img src="/img/arrow.png" alt="Send" />
        </button>
      </div>
    </div>
  )
}

export default AiModel
