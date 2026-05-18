// src/pages/ChatPage.tsx
import React, { useState, useMemo } from 'react';
import { MessageSquare, Search, PlusCircle, ArrowUp, CheckCircle2, Award, ExternalLink, X, HelpCircle, ChevronRight } from 'lucide-react';

interface DiscussionThread {
  id: number;
  title: string;
  preview: string;
  tags: string[];
  author: {
    name: string;
    role: 'student' | 'applicant';
    university?: string;
  };
  answersCount: number;
  upvotes: number;
  hasAcceptedAnswer: boolean;
  createdAt: string;
}

export const ChatPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('Все темы');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [upvotedThreads, setUpvotedThreads] = useState<number[]>([]);
  
  // Состояния для новой публикации
  const [newTitle, setNewTitle] = useState('');
  const [newPreview, setNewPreview] = useState('');
  const [newTag, setNewTag] = useState('Поступление');

  // Состояние для открытия просмотра конкретной карточки (вместо alert)
  const [activeThread, setActiveThread] = useState<DiscussionThread | null>(null);

  const tags = ['Все темы', 'Поступление', 'Общежития', 'Учеба', 'Олимпиады', 'Стипендии'];

  const [threads, setThreads] = useState<DiscussionThread[]>([
    {
      id: 1,
      title: 'Каковы реальные условия в общежитии №4 на ИТ-направлениях?',
      preview: 'Правда ли, что там обновили коворкинг на первом этаже и как обстоят дела с проводным интернетом в комнатах?',
      tags: ['Общежития', 'Учеба'],
      author: { name: 'Алексей Иванов', role: 'applicant' },
      answersCount: 14,
      upvotes: 28,
      hasAcceptedAnswer: true,
      createdAt: '2 часа назад'
    },
    {
      id: 2,
      title: 'Сложно ли сдавать дифференциальные уравнения на 1 курсе?',
      preview: 'Слышал, что на этой дисциплине самый большой процент отчислений. Подскажите, к какому преподавателю лучше ходить на дополнительные занятия?',
      tags: ['Учеба'],
      author: { name: 'Мария К.', role: 'student', university: 'НИУ ВШЭ' },
      answersCount: 8,
      upvotes: 42,
      hasAcceptedAnswer: false,
      createdAt: 'Вчера'
    },
    {
      id: 3,
      title: 'Публикация списков поступающих по БВИ: реальные сроки',
      preview: 'В приемной комиссии говорят одно, а на сайте информация старая. Кто уже сталкивался в прошлом году, когда обновляют базы данных?',
      tags: ['Поступление', 'Олимпиады'],
      author: { name: 'Дмитрий Л.', role: 'applicant' },
      answersCount: 3,
      upvotes: 15,
      hasAcceptedAnswer: false,
      createdAt: '3 дня назад'
    },
    {
      id: 4,
      title: 'Повышенная государственная академическая стипендия (ПГАС) за науку',
      preview: 'Какое количество публикаций в РИНЦ/ВАК нужно иметь первокурснику магистратуры, чтобы пройти по квоте факультета?',
      tags: ['Стипендии', 'Учеба'],
      author: { name: 'Иван Демидов', role: 'student', university: 'МФТИ' },
      answersCount: 19,
      upvotes: 56,
      hasAcceptedAnswer: true,
      createdAt: '4 дня назад'
    },
    {
      id: 5,
      title: 'Как распределяются места в общежитиях квартирного типа?',
      preview: 'Интересует конкретно распределение для льготных категорий и БВИшников. Дают ли блоки на двоих или сразу селят по 4 человека?',
      tags: ['Общежития', 'Поступление'],
      author: { name: 'Елена Родионова', role: 'applicant' },
      answersCount: 0,
      upvotes: 7,
      hasAcceptedAnswer: false,
      createdAt: '5 дней назад'
    },
    {
      id: 6,
      title: 'Всерос по информатике: засчитают ли диплом 2024 года?',
      preview: 'Подскажите, подтверждается ли диплом призера Всероссийской олимпиады школьников баллами ЕГЭ (75+) или он дает БВИ безусловно?',
      tags: ['Олимпиады', 'Поступление'],
      author: { name: 'Константин', role: 'applicant' },
      answersCount: 5,
      upvotes: 31,
      hasAcceptedAnswer: true,
      createdAt: 'Неделю назад'
    }
  ]);

  const filteredThreads = useMemo(() => {
    return threads.filter(thread => {
      const matchesTag = selectedTag === 'Все темы' || thread.tags.includes(selectedTag);
      const matchesSearch = thread.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            thread.preview.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTag && matchesSearch;
    });
  }, [threads, selectedTag, searchQuery]);

  const handleUpvote = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (upvotedThreads.includes(id)) {
      setUpvotedThreads(upvotedThreads.filter(threadId => threadId !== id));
      setThreads(threads.map(t => t.id === id ? { ...t, upvotes: t.upvotes - 1 } : t));
    } else {
      setUpvotedThreads([...upvotedThreads, id]);
      setThreads(threads.map(t => t.id === id ? { ...t, upvotes: t.upvotes + 1 } : t));
    }
  };

  // Публикация нового топика прямо в стейт
  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newPreview.trim()) return;

    const newDiscussion: DiscussionThread = {
      id: Date.now(),
      title: newTitle,
      preview: newPreview,
      tags: [newTag],
      author: { name: 'Вы', role: 'applicant' },
      answersCount: 0,
      upvotes: 1,
      hasAcceptedAnswer: false,
      createdAt: 'Только что'
    };

    setThreads([newDiscussion, ...threads]);
    setNewTitle('');
    setNewPreview('');
    setIsModalOpen(false);
  };

  return (
    <div className="page-content" style={{ display: 'flex', gap: '32px', padding: '24px', position: 'relative' }}>
      
      {/* Стили для плавной анимации карточек (инжектируем один раз) */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animated-card {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>

      {/* ЛЕВАЯ ЧАСТЬ: Поиск, Фильтры и Список Обсуждений */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Хедер страницы */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '24px', color: 'var(--text-primary)', margin: 0 }}>Обсуждения сообщества</h1>
            <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0 0', fontSize: '14px' }}>
              Задавайте вопросы студентам и делитесь опытом поступления
            </p>
          </div>
          <button style={askButtonStyle} onClick={() => setIsModalOpen(true)}>
            <PlusCircle size={18} />
            <span>Задать вопрос</span>
          </button>
        </div>

        {/* Панель поиска */}
        <div style={searchBarContainerStyle}>
          <Search size={18} color="var(--text-secondary)" />
          <input
            type="text"
            placeholder="Поиск по ключевым словам в вопросах..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={searchInputStyle}
          />
          {searchQuery && (
            <X size={16} color="var(--text-secondary)" style={{ cursor: 'pointer' }} onClick={() => setSearchQuery('')} />
          )}
        </div>

        {/* Фильтрация */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {tags.map((tag) => {
            const isActive = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                style={{
                  ...tagFilterStyle,
                  background: isActive ? 'var(--accent-color)' : 'var(--bg-sidebar)',
                  color: isActive ? '#fff' : 'var(--text-primary)',
                  border: isActive ? '1px solid var(--accent-color)' : '1px solid var(--border-color)',
                }}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Лента тредов */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredThreads.length > 0 ? (
            filteredThreads.map((thread, index) => {
              const isUpvoted = upvotedThreads.includes(thread.id);
              return (
                <div 
                  key={thread.id} 
                  className="animated-card"
                  style={{ 
                    ...threadCardStyle, 
                    animationDelay: `${index * 0.04}s` // Ступенчатое красивое появление
                  }} 
                  onClick={() => setActiveThread(thread)}
                >
                  
                  {/* Апвоуты */}
                  <div 
                    onClick={(e) => handleUpvote(thread.id, e)}
                    style={{
                      ...upvoteBoxStyle,
                      background: isUpvoted ? 'rgba(var(--accent-color-rgb), 0.2)' : 'var(--border-color)',
                      color: isUpvoted ? 'var(--accent-color)' : 'var(--text-primary)',
                      border: isUpvoted ? '1px solid var(--accent-color)' : '1px solid transparent'
                    }}
                  >
                    <ArrowUp size={16} />
                    <span style={{ fontWeight: 600, fontSize: '14px' }}>{thread.upvotes}</span>
                  </div>

                  {/* Контент карточки */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                      <h3 style={threadTitleStyle}>{thread.title}</h3>
                      {thread.hasAcceptedAnswer && (
                        <span style={acceptedBadgeStyle}>
                          <CheckCircle2 size={14} /> Решено
                        </span>
                      )}
                    </div>
                    
                    <p style={threadPreviewStyle}>{thread.preview}</p>

                    <div style={threadFooterStyle}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {thread.tags.map(t => (
                          <span key={t} style={miniTagStyle}>#{t.toLowerCase()}</span>
                        ))}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                        <span style={{ color: thread.author.role === 'student' ? 'var(--accent-color)' : 'var(--text-primary)', fontWeight: 500 }}>
                          {thread.author.name} {thread.author.university ? `(${thread.author.university})` : '• Абитуриент'}
                        </span>
                        <span>•</span>
                        <span>{thread.createdAt}</span>
                        <span>•</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-primary)', fontWeight: 500 }}>
                          <MessageSquare size={14} /> {thread.answersCount} ответов
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', background: 'var(--bg-sidebar)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <HelpCircle size={36} color="var(--text-secondary)" style={{ marginBottom: '12px', opacity: 0.6 }} />
              <p style={{ color: 'var(--text-primary)', margin: 0, fontWeight: 500 }}>Ничего не найдено</p>
            </div>
          )}
        </div>
      </div>

      {/* ПРАВАЯ ЧАСТЬ: Контекстный Сайдбар */}
      <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Виджет: Топ Экспертов */}
        <div style={widgetCardStyle}>
          <h4 style={widgetTitleStyle}>
            <Award size={18} color="gold" /> Лучшие эксперты недели
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={expertRowStyle}>
              <div style={avatarStyle}>МВ</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>Максим Волков</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Студент 3 курса • RWB</div>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--accent-color)', fontWeight: 600 }}>+142</span>
            </div>
            <div style={expertRowStyle}>
              <div style={avatarStyle}>АН</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>Анна Николаева</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Амбассадор U-Choice</div>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--accent-color)', fontWeight: 600 }}>+98</span>
            </div>
          </div>
        </div>

        {/* Виджет: Популярные Вузы */}
        <div style={widgetCardStyle}>
          <h4 style={widgetTitleStyle}>Обсуждаемые вузы сегодня</h4>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <li style={uniLinkRowStyle}>
              <span style={{ color: 'var(--text-primary)', fontSize: '13px' }}>МГУ им. Ломоносова</span>
              <ExternalLink size={14} color="var(--text-secondary)" />
            </li>
            <li style={uniLinkRowStyle}>
              <span style={{ color: 'var(--text-primary)', fontSize: '13px' }}>МФТИ (Физтех)</span>
              <ExternalLink size={14} color="var(--text-secondary)" />
            </li>
            <li style={uniLinkRowStyle}>
              <span style={{ color: 'var(--text-primary)', fontSize: '13px' }}>НИУ ВШЭ</span>
              <ExternalLink size={14} color="var(--text-secondary)" />
            </li>
          </ul>
        </div>
      </div>

      {/* МОДАЛЬНОЕ ОКНО: ЗАДАТЬ ВОПРОС */}
      {isModalOpen && (
        <div style={modalOverlayStyle} onClick={() => setIsModalOpen(false)}>
          <form onSubmit={handlePublish} style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', margin: 0, color: 'var(--text-primary)' }}>Новое обсуждение</h2>
              <X size={20} style={{ cursor: 'pointer', color: 'var(--text-secondary)' }} onClick={() => setIsModalOpen(false)} />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Четкий заголовок вашего вопроса</label>
                <input 
                  type="text" 
                  required
                  placeholder="Например: Каковы условия поступления по олимпиадам на ИТ-направления?" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  style={modalInputStyle} 
                />
              </div>
              
              <div>
                <label style={labelStyle}>Детальное описание ситуации</label>
                <textarea 
                  rows={4} 
                  required
                  placeholder="Опишите подробности, чтобы студенты и эксперты могли развернуто ответить вам..." 
                  value={newPreview}
                  onChange={(e) => setNewPreview(e.target.value)}
                  style={{ ...modalInputStyle, resize: 'none' }} 
                />
              </div>

              <div>
                <label style={labelStyle}>Выберите категорию (тег)</label>
                <select 
                  style={modalInputStyle}
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                >
                  {tags.slice(1).map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
                <button type="button" style={cancelButtonStyle} onClick={() => setIsModalOpen(false)}>Отмена</button>
                <button type="submit" style={submitButtonStyle}>Опубликовать</button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* ПЛАВНОЕ ПРЕВЬЮ ОТВЕТОВ НА ВОПРОС (ВМЕСТО ALERT) */}
      {activeThread && (
        <div style={modalOverlayStyle} onClick={() => setActiveThread(null)}>
          <div style={{ ...modalContentStyle, width: '650px', maxHeight: '85vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
                  {activeThread.tags.map(t => <span key={t} style={miniTagStyle}>#{t.toLowerCase()}</span>)}
                </div>
                <h2 style={{ fontSize: '20px', margin: 0, color: 'var(--text-primary)', lineHeight: '1.4' }}>{activeThread.title}</h2>
              </div>
              <X size={20} style={{ cursor: 'pointer', color: 'var(--text-secondary)', marginLeft: '12px' }} onClick={() => setActiveThread(null)} />
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px', margin: 0 }}>
              {activeThread.preview}
            </p>

            {/* Имитация ответов студентов */}
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '14px', color: 'var(--text-primary)', margin: 0 }}>Ответы экспертов ({activeThread.answersCount})</h3>
              
              <div style={commentBoxStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 600, fontSize: '13px', color: 'var(--accent-color)' }}>Никита Соколов (Студент РВБ)</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>1 час назад</span>
                </div>
                <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-primary)', lineHeight: '1.5' }}>
                  Все зависит от факультета, но в целом комиссия лояльная. Самое главное — вовремя подать оригиналы документов через Госуслуги или лично, базы обновляют каждые полчаса в пиковые дни!
                </p>
              </div>

              <div style={commentBoxStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)' }}>Дарья М. (Куратор курса)</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Вчера</span>
                </div>
                <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-primary)', lineHeight: '1.5' }}>
                  Полностью согласна с предыдущим ответом. Если возникнут трудности — пишите напрямую амбассадорам вуза в личные карточки, они всегда на связи и помогут разобраться с путаницей в списках.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

// --- СТИЛИ —--
const askButtonStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  background: 'var(--accent-color)',
  color: '#fff',
  border: 'none',
  padding: '10px 16px',
  borderRadius: '10px',
  fontWeight: 500,
  cursor: 'pointer',
  fontSize: '14px',
  transition: 'opacity 0.2s'
};

const searchBarContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  background: 'var(--bg-sidebar)',
  border: '1px solid var(--border-color)',
  borderRadius: '12px',
  padding: '12px 16px'
};

const searchInputStyle: React.CSSProperties = {
  flex: 1,
  background: 'transparent',
  border: 'none',
  outline: 'none',
  color: 'var(--text-primary)',
  fontSize: '14px'
};

const tagFilterStyle: React.CSSProperties = {
  padding: '6px 14px',
  borderRadius: '20px',
  fontSize: '13px',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  fontWeight: 500
};

const threadCardStyle: React.CSSProperties = {
  display: 'flex',
  gap: '20px',
  background: 'var(--bg-sidebar)',
  border: '1px solid var(--border-color)',
  borderRadius: '16px',
  padding: '20px',
  transition: 'transform 0.2s, border-color 0.2s',
  cursor: 'pointer',
  opacity: 0, // Управляется анимацией fadeIn
};

const upvoteBoxStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '10px',
  width: '44px',
  height: '52px',
  gap: '4px',
  cursor: 'pointer',
  transition: 'all 0.2s'
};

const threadTitleStyle: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: 600,
  color: 'var(--text-primary)',
  margin: 0
};

const acceptedBadgeStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  background: 'rgba(82, 196, 26, 0.12)',
  color: '#52c41a',
  padding: '2px 8px',
  borderRadius: '6px',
  fontSize: '12px',
  fontWeight: 500
};

const threadPreviewStyle: React.CSSProperties = {
  fontSize: '14px',
  color: 'var(--text-secondary)',
  margin: 0,
  lineHeight: '1.5'
};

const threadFooterStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '8px',
  flexWrap: 'wrap',
  gap: '12px'
};

const miniTagStyle: React.CSSProperties = {
  fontSize: '12px',
  color: 'var(--accent-color)',
  background: 'rgba(24, 144, 255, 0.08)',
  padding: '2px 8px',
  borderRadius: '6px',
  fontWeight: 500
};

const widgetCardStyle: React.CSSProperties = {
  background: 'var(--bg-sidebar)',
  border: '1px solid var(--border-color)',
  borderRadius: '16px',
  padding: '16px'
};

const widgetTitleStyle: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: 600,
  color: 'var(--text-primary)',
  margin: '0 0 16px 0',
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
};

const expertRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  borderBottom: '1px solid var(--border-color)',
  paddingBottom: '12px'
};

const avatarStyle: React.CSSProperties = {
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  background: 'var(--border-color)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
  fontWeight: 'bold',
  color: 'var(--text-primary)'
};

const uniLinkRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px 10px',
  borderRadius: '8px'
};

const modalOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0, 0, 0, 0.4)',
  backdropFilter: 'blur(4px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000
};

const modalContentStyle: React.CSSProperties = {
  background: 'var(--bg-sidebar)',
  border: '1px solid var(--border-color)',
  borderRadius: '16px',
  width: '500px',
  padding: '24px',
  boxShadow: '0 12px 40px rgba(0,0,0,0.25)'
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '13px',
  color: 'var(--text-secondary)',
  marginBottom: '6px',
  fontWeight: 500
};

const modalInputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: '8px',
  border: '1px solid var(--border-color)',
  background: 'transparent',
  color: 'var(--text-primary)',
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box'
};

const cancelButtonStyle: React.CSSProperties = {
  background: 'transparent',
  border: '1px solid var(--border-color)',
  color: 'var(--text-primary)',
  padding: '8px 16px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '14px'
};

const submitButtonStyle: React.CSSProperties = {
  background: 'var(--accent-color)',
  border: 'none',
  color: '#fff',
  padding: '8px 16px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 500
};

const commentBoxStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.02)',
  border: '1px solid var(--border-color)',
  borderRadius: '12px',
  padding: '14px'
};