// src/pages/FaqPage.tsx
import React, { useState } from 'react';
import { ChevronDown, HelpCircle, GraduationCap, FileText, Home } from 'lucide-react';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: 'general' | 'admission' | 'docs';
  icon: React.ReactNode;
}

export const FaqPage = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const faqData: FaqItem[] = [
    {
      id: 1,
      category: 'general',
      icon: <GraduationCap size={18} />,
      question: 'Как рассчитывается внутренний рейтинг вузов на MyChoice?',
      answer: 'Рейтинг формируется на основе честных отзывов студентов, проходных баллов за прошлый год, доступности общежитий и уровня трудоустройства выпускников. Вы можете сами влиять на рейтинг, оставляя оценки кафедрам в своем профиле.'
    },
    {
      id: 2,
      category: 'admission',
      icon: <HelpCircle size={18} />,
      question: 'Можно ли подать документы в вуз напрямую через платформу?',
      answer: 'На данный момент MyChoice помогает выбрать идеальный университет, сравнить направления подготовки и оценить шансы. Для подачи документов платформа перенаправит вас на официальный суперсервис «Поступление в вуз онлайн» или личный кабинет приемной комиссии выбранного вуза.'
    },
    {
      id: 3,
      category: 'docs',
      icon: <FileText size={18} />,
      question: 'Что такое коды направлений (например, 09.03.01)?',
      answer: 'Это общероссийские коды специальностей (ОКСО). Первые две цифры означают укрупненную группу (09 — Информатика и вычислительная техника), третья цифра — уровень образования (3 — Бакалавриат, 4 — Магистратура), последние две — конкретный профиль.'
    },
    {
      id: 4,
      category: 'general',
      icon: <Home size={18} />,
      question: 'Где найти информацию о наличии общежития у факультета?',
      answer: 'При переходе на детальную страницу университета во вкладке «Факультеты» отображаются теги инфраструктуры. Если у факультета есть места в общежитии, там будет соответствующая отметка и ссылка на условия заселения.'
    }
  ];

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="page-content" style={{ padding: '24px', maxWidth: '800px', margin: '0 auto', color: 'var(--md-sys-color-on-background)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
        <HelpCircle size={28} style={{ color: 'var(--md-sys-color-primary-fixed)' }} />
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 600, color: 'var(--md-sys-color-on-background)' }}>
          Часто задаваемые вопросы (FAQ)
        </h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {faqData.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              style={{
                background: 'var(--md-sys-color-surface-container-low)',
                borderRadius: '12px',
                border: '1px solid var(--md-sys-color-outline-variant)',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease'
              }}
            >
              {/* Шапка вопроса */}
              <button
                type="button"
                onClick={() => toggleAccordion(item.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '18px 20px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  color: 'var(--md-sys-color-on-surface)',
                  fontFamily: 'inherit'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: 'var(--md-sys-color-primary-fixed)', display: 'flex' }}>
                    {item.icon}
                  </span>
                  <span style={{ fontWeight: 500, fontSize: '15px' }}>{item.question}</span>
                </div>
                <ChevronDown
                  size={18}
                  style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.25s ease',
                    color: 'var(--md-sys-color-on-surface-variant)',
                    opacity: 0.8
                  }}
                />
              </button>

              {/* Блок ответа */}
              <div
                style={{
                  maxHeight: isOpen ? '240px' : '0',
                  opacity: isOpen ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease, opacity 0.25s ease',
                  padding: isOpen ? '0 20px 20px 50px' : '0 20px'
                }}
              >
                <p style={{ 
                  margin: 0, 
                  color: 'var(--md-sys-color-on-surface-variant)', 
                  fontSize: '14px', 
                  lineHeight: '1.6' 
                }}>
                  {item.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};