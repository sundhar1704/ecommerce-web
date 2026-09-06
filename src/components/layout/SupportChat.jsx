import { useState } from 'react'
import { X, Send } from 'lucide-react'
import './SupportChat.css'

const AUTO_REPLIES = [
  "Thanks for reaching out! A support agent will get back to you shortly.",
  "Your order is on track — check the tracking timeline above for the latest update.",
  "If this is urgent, please email support@groco.com and we'll prioritize your request.",
]

function SupportChat({ onClose }) {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! How can we help with your order today?' },
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    const userMsg = { from: 'user', text: input.trim() }
    const botMsg = { from: 'bot', text: AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)] }
    setMessages((prev) => [...prev, userMsg, botMsg])
    setInput('')
  }

  return (
    <div className="support-chat">
      <div className="support-chat-header">
        <span>Support Chat</span>
        <button onClick={onClose} aria-label="Close chat"><X size={18} /></button>
      </div>

      <div className="support-chat-body">
        {messages.map((m, i) => (
          <div key={i} className={m.from === 'bot' ? 'chat-msg bot' : 'chat-msg user'}>
            {m.text}
          </div>
        ))}
      </div>

      <div className="support-chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend} aria-label="Send"><Send size={16} /></button>
      </div>
    </div>
  )
}

export default SupportChat