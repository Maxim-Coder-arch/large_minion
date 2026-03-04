'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../../styles/faq/faq.scss';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export default function Faq() {
  const [openId, setOpenId] = useState<number | null>(null);

  const faqData: FaqItem[] = [
    {
      id: 1,
      question: 'Какой характер у мейн-кунов?',
      answer: 'Мейн-куны — это дружелюбные и социальные кошки, которых часто называют "кошками-собаками" за их преданность хозяевам. Они отлично ладят с детьми и другими животными, любят участвовать в семейных делах, но при этом ненавязчивы. Несмотря на крупные размеры, они очень деликатны и аккуратны.'
    },
    {
      id: 2,
      question: 'Какого размера достигают мейн-куны?',
      answer: 'Это одна из самых крупных пород домашних кошек. Взрослые коты могут весить 8-12 кг, а кошки — 5-8 кг. В длину они могут достигать 120 см вместе с хвостом. Растут мейн-куны медленно и окончательно формируются только к 3-5 годам.'
    },
    {
      id: 3,
      question: 'Сложно ли ухаживать за шерстью мейн-куна?',
      answer: 'У мейн-кунов водоотталкивающая шерсть, которая меньше путается, чем у других длинношерстных пород. Достаточно расчесывать 1-2 раза в неделю, а в период линьки — 2-3 раза. Особое внимание уделяйте "гриве" и "штанишкам". Купать часто не требуется — они отлично следят за собой сами.'
    },
    {
      id: 4,
      question: 'Сколько живут мейн-куны?',
      answer: 'При хорошем уходе и правильном питании мейн-куны живут 12-15 лет. Известны случаи, когда представители породы доживали до 18-20 лет. Регулярные посещения ветеринара, вакцинация и качественный корм значительно продлевают жизнь питомца.'
    },
    {
      id: 5,
      question: 'Есть ли у породы предрасположенность к заболеваниям?',
      answer: 'Как и у многих крупных пород, у мейн-кунов есть предрасположенность к гипертрофической кардиомиопатии (ГКМП) и дисплазии тазобедренных суставов. Ответственные заводчики проводят генетическое тестирование и УЗИ сердца, чтобы исключить эти проблемы. В нашем питомнике все животные проверены и имеют соответствующие сертификаты.'
    }
  ];

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