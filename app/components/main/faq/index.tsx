'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../../styles/faq/faq.scss';
import { faqData } from '@/app/data/faq/faq.data';

export default function Faq() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className='faq-section'>
      <div className="faq-container">
        <div className="faq-header">
          <span className="faq-tag">FAQ</span>
          <h2 className="faq-title">Часто задаваемые вопросы</h2>
          <p className="faq-subtitle">О мейн-кунах и нашем питомнике</p>
        </div>

        <div className="faq-list">
          {faqData.map((item) => (
            <motion.div
              key={item.id}
              className={`faq-item ${openId === item.id ? 'active' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: item.id * 0.1 }}
            >
              <button
                className="faq-question"
                onClick={() => toggleItem(item.id)}
                aria-expanded={openId === item.id}
              >
                <span className="question-text">{item.question}</span>
                <motion.span
                  className="question-icon"
                  animate={{ rotate: openId === item.id ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M10 4V16M4 10H16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </motion.span>
              </button>
              
              <AnimatePresence>
                {openId === item.id && (
                  <motion.div
                    className="faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="answer-content">
                      <p>{item.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="faq-footer">
          <p>Не нашли ответ на свой вопрос?</p>
          <a 
            href="https://vk.com/im/convo/-95911846?entrypoint=community_page&tab=all" 
            target="_blank"
            rel="noopener noreferrer"
            className="faq-contact-link"
          >
            Напишите нам
            <span className="link-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}