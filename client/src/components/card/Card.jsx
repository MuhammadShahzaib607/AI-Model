import React from 'react'
import "./card.scss"
import ReactMarkDown from "react-markdown"

const Card = ({ message }) => {
    return (
        <div className={`card ${message.sender}`}>
           <ReactMarkDown
  components={{
    p: ({ node, ...props }) => <p className="markdown-p" {...props} />,
    h1: ({ node, ...props }) => <h1 className="markdown-h1" {...props} />,
    code: ({ node, ...props }) => <code className="markdown-code" {...props} />,
    blockquote: ({ node, ...props }) => <blockquote className="markdown-blockquote" {...props} />,
    a: ({ node, ...props }) => <a className="markdown-a" {...props} />,
  }}
>
  {message.message}
</ReactMarkDown>
        </div>
    )
}

export default Card
