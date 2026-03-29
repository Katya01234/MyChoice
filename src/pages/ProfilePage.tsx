import React from 'react';
import { UserCircle, Mail, ShieldCheck } from 'lucide-react';
import { MOCK_USER_PROFILE } from '../config/mockData';

export const ProfilePage: React.FC = () => {
  const user = MOCK_USER_PROFILE; 

  return (
    <div className="page-content profile-page">
      <h1 style={{ marginBottom: '32px', fontSize: '24px', color: 'var(--text-primary)' }}>Мой профиль</h1>
      
      {/* Используем классы из index.css вместо инлайн-бэкграундов */}
      <div className="profile-header-card" style={{
        padding: '40px',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '32px',
        marginBottom: '24px',
        width: '100%'
      }}>
        <div style={{ color: 'var(--accent)', flexShrink: 0 }}>
          <UserCircle size={90} strokeWidth={1} />
        </div>

        <div style={{ flexGrow: 1 }}>
          <h2 style={{ fontSize: '32px', margin: '0 0 12px 0', fontWeight: 600, color: 'var(--text-primary)' }}>
            {user.fullName}
          </h2>
          <div className="status-badge">
            {user.status}
          </div>
        </div>
      </div>

      <div className="profile-details-card" style={{
        padding: '32px',
        borderRadius: '16px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px'
      }}>
        <div style={infoBlockStyle}>
          <Mail size={20} style={{ color: 'var(--accent)', marginTop: '4px' }} />
          <div>
            <p style={labelStyle}>Электронная почта</p>
            <p style={valueStyle}>{user.email}</p>
          </div>
        </div>

        <div style={infoBlockStyle}>
          <ShieldCheck size={20} style={{ color: 'var(--accent)', marginTop: '4px' }} />
          <div>
            <p style={labelStyle}>Тип доступа</p>
            <p style={valueStyle}>Полнофункциональный ({user.status})</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const infoBlockStyle = { display: 'flex', alignItems: 'flex-start', gap: '16px' };
const labelStyle = { margin: '0 0 4px 0', fontSize: '13px', color: 'var(--text-secondary)' };
const valueStyle = { margin: 0, fontSize: '17px', color: 'var(--text-primary)', fontWeight: 500 };