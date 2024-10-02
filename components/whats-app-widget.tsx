'use client'

import React, { useState, useEffect } from 'react'
import { Send } from 'lucide-react'

interface WhatsAppWidgetProps {
  phoneNo: string
  position?: 'left' | 'right'
  headerTitle?: string
  headerCaption?: string
  chatPersonName?: string
  chatMessage?: React.ReactNode
}

export default function WhatsAppWidgetComponent({
  phoneNo = "447378773762",
  position = 'right',
  headerTitle = "Jordan",
  headerCaption = "Online",
  chatPersonName = "Jordan",
  chatMessage = <>Hi there! 👋 How can I help you?</>,
}: WhatsAppWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    const storedIsOpen = localStorage.getItem('whatsappWidgetOpen')
    if (storedIsOpen !== null) {
      setIsOpen(JSON.parse(storedIsOpen))
    } else {
      const openTimer = setTimeout(() => setIsOpen(true), 2000)
      return () => clearTimeout(openTimer)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('whatsappWidgetOpen', JSON.stringify(isOpen))
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      setIsTyping(true)
      const typingTimer = setTimeout(() => {
        setIsTyping(false)
        setShowMessage(true)
      }, 2000)
      return () => clearTimeout(typingTimer)
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      window.open(`https://wa.me/${phoneNo}?text=${encodeURIComponent(message)}`, '_blank')
    }
  }

  return (
    <div className={`fixed bottom-4 ${position}-4 z-50 flex flex-col items-end`}>
      {isOpen && (
        <div className="mb-4 bg-white rounded-lg shadow-lg w-80 overflow-hidden">
          <div className="bg-green-500 p-4 flex items-center">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mr-3 overflow-hidden">
              <img 
                src="https://cms.westmidlandssummerhouses.com/assets/8ad4984a-2aaa-47cf-8507-4e806f7b4e13?width=100&quality=50" 
                alt="Chat user"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-grow">
              <h3 className="text-white font-semibold">{headerTitle}</h3>
              <p className="text-green-100 text-sm">{headerCaption}</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-green-200 text-2xl font-bold w-8 h-8 flex items-center justify-center"
              aria-label="Close chat"
            >
              &times;
            </button>
          </div>
          <div className="h-80 overflow-y-auto p-4 bg-gray-100">
            <div className="bg-white p-3 rounded-lg inline-block">
              <p className="font-semibold">{chatPersonName}</p>
              {isTyping ? (
                <div className="flex space-x-1 mt-2">
                  <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              ) : showMessage ? (
                <p>{chatMessage}</p>
              ) : null}
            </div>
          </div>
          <form onSubmit={handleSubmit} className="p-4 bg-gray-200">
            <div className="flex">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message.."
                className="flex-grow px-3 py-2 rounded-l-lg focus:outline-none"
style={{width: "100px"}}
                aria-label="Type a message"
              />
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-r-lg hover:bg-green-600"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 w-16 h-16 flex items-center justify-center"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <WhatsAppIcon className="w-10 h-10" />
      </button>
    </div>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      className={className}
      fill="currentColor"
    >
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
    </svg>
  )
}