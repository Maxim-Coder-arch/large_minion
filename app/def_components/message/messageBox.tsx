'use client';
import '../../styles/messsageBoxStyles/messageBoxStyle.scss';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: number;
  text: string | React.ReactNode;
  sender: 'bot' | 'user';
  avatar?: string;
}

export default function MessageBox() {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: '👋 Здравствуйте! Меня зовут Людмила, я заводчик питомника Large Minion. Давайте лучше перейдем в вк, там удобнее', 
      sender: 'bot',
      avatar: '/images/hero-section/breeder.png'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Добавляем сообщение пользователя
    setMessages(prev => [...prev, { 
      id: Date.now(), 
      text: message, 
      sender: 'user' 
    }]);
    
    setMessage('');
    setIsTyping(true);

    // Имитация набора текста ботом
    setTimeout(() => {
      setIsTyping(false);
      
      // Сообщение с ссылкой на ВК
      const vkMessage: Message = {
        id: Date.now() + 1,
        sender: 'bot',
        avatar: '/images/hero-section/breeder.png',
        text: (
          <div className="bot-message-with-link">
            <p>Знаете, в чате не очень удобно обсуждать все детали. Давайте продолжим в ВК? Там я смогу отправить фото, документы и ответить на все вопросы ☺️</p>
            <a 
              href="https://vk.com/im/convo/-95911846?entrypoint=community_page&tab=all" 
              target="_blank" 
              rel="noopener noreferrer"
              className="vk-message-link"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="vk-icon">📱</span>
              <span>Перейти в ВК</span>
              <span className="arrow">→</span>
            </a>
          </div>
        )
      };
      
      setMessages(prev => [...prev, vkMessage]);
    }, 2000);
  };

  const openVK = () => {
    window.open('https://vk.com/im/convo/-95911846?entrypoint=community_page&tab=all', '_blank');
  };

  return (
    <div className="message-container">
      <motion.div 
        className="message-icon"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <svg className="message-svg" viewBox="0 0 24 24" fill="white">
          <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z"/>
        </svg>
        
        <AnimatePresence>
          {isHovered && !isOpen && (
            <motion.div 
              className="typing-indicator"
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{ type: "spring" }}
            >
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          className="badge"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          1
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <div className="chat-header">
              <div className="chat-header-info">
                <div className="breeder-info">
                  <div 
                    className="breeder-avatar"
                    style={{ backgroundImage: 'url(/images/hero-section/breeder.png)' }}
                  />
                  <div className="breeder-details">
                    <span className="chat-title">Людмила</span>
                    <span className="chat-status">🟢 Онлайн</span>
                  </div>
                </div>
              </div>
              <button className="close-btn" onClick={() => setIsOpen(false)}>✕</button>
            </div>

            <div className="chat-messages">
              {messages.map((msg) => (
                <motion.div 
                  key={msg.id}
                  className={`message ${msg.sender}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring" }}
                >
                  {msg.sender === 'bot' && msg.avatar && (
                    <div 
                      className="message-avatar"
                      style={{ backgroundImage: `url(${msg.avatar})` }}
                    />
                  )}
                  <div className="message-bubble">
                    {typeof msg.text === 'string' ? msg.text : msg.text}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div 
                  className="message bot typing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div 
                    className="message-avatar"
                    style={{ backgroundImage: 'url(/images/hero-section/breeder.png)' }}
                  />
                  <div className="typing-indicator-message">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="chat-input-form">
              <input 
                type="text" 
                placeholder="Введите сообщение..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="chat-input"
              />
              <button type="submit" className="send-btn">➤</button>
            </form>

            <div className="chat-footer">
              <span>Обычно отвечаю в течение часа</span>
              <button onClick={openVK} className="vk-link">
                Перейти в ВК
                <span className="arrow">→</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}