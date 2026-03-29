export const FeedPage: React.FC = () => {
  return (
    <div className="page-content">
      <h1 style={{ marginBottom: '24px', fontSize: '24px', color: 'var(--text-primary)' }}>Лента новостей</h1>
      
      <div className="feed-card" style={{
        background: 'var(--md-sys-color-surface-container-low)', // Мягкий фон карточки
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid var(--border-color)',
        borderLeft: '4px solid var(--accent)', 
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '14px' }}>АДМИНИСТРАЦИЯ</span>
          <span style={{ color: 'var(--text-secondary)', opacity: 0.6, fontSize: '12px' }}>29.03.2026</span>
        </div>
        <h2 style={{ fontSize: '18px', marginBottom: '10px', color: 'var(--text-primary)' }}>Старт приемной кампании 2026</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          Приветствуем будущих студентов! Мы обновили список доступных ИТ-направлений. 
          Теперь вы можете сравнить учебные планы ведущих вузов в разделе "Рейтинги".
        </p>
      </div>
    </div>
  );
};