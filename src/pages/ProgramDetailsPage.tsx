// src/pages/ProgramDetailsPage.tsx
import React, { useState, useEffect } from 'react';
import { useProgramDetails } from '../features/university/hooks/useUniversity';
import { useMyReview, useProgramReviews, useSaveReview } from '../features/university/hooks/useReview';
import { useProfile } from '../features/auth/api/user';
import { type ReviewResponse } from '../types/university';

interface ProgramDetailsPageProps {
  programId: number;
}

const getDegreeLabel = (degree: string) => {
  switch (degree) {
    case 'BACHELOR': return 'Бакалавриат';
    case 'MASTER': return 'Магистратура';
    case 'PHD': return 'Аспирантура / Докторантура';
    default: return degree;
  }
};

export const ProgramDetailsPage: React.FC<ProgramDetailsPageProps> = ({ programId }) => {
  // 1. Получаем профиль юзера для проверки роли студента
  const { data: user } = useProfile(undefined, true);
  const isStudent = user?.role === 'STUDENT'; // Проверка роли

  // 2. Получаем данные программы и отзывов через TanStack Query
  const { data: program, isLoading: isProgramLoading } = useProgramDetails(programId);
  const { data: myReview, isLoading: isMyReviewLoading } = useMyReview(programId);
  const { data: reviewsData, isLoading: isReviewsLoading } = useProgramReviews(programId);
  const saveReviewMutation = useSaveReview(programId);

  // 3. Стейты формы отзывов
  const [comment, setComment] = useState('');
  const [score, setScore] = useState(5);
  const [isEditing, setIsEditing] = useState(false);

  // Синхронизируем поля формы при редактировании или получении свежего отзыва
  useEffect(() => {
    if (myReview) {
      setComment(myReview.comment || '');
      setScore(myReview.score);
    } else {
      setComment('');
      setScore(5);
    }
  }, [myReview, isEditing]);

  if (isProgramLoading || isMyReviewLoading || isReviewsLoading) {
    return <div style={{ color: 'var(--text-primary)', padding: '20px' }}>Загрузка данных программы и отзывов...</div>;
  }

  if (!program) return <div style={{ color: 'var(--text-primary)', padding: '20px' }}>Данные программы не найдены</div>;

  // Исключаем наш собственный отзыв из общего списка, чтобы он не дублировался внизу
  const otherReviews = reviewsData?.content.filter(rev => rev.id !== myReview?.id) || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveReviewMutation.mutate(
      {
        programId,
        score,
        comment: comment.trim() ? comment : undefined
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        }
      }
    );
  };

  return (
    <div className="program-details" style={{ padding: '20px', paddingBottom: '60px' }}>
      {/* Шапка деталей программы */}
      <span style={{
        display: 'inline-block',
        padding: '4px 12px',
        background: 'var(--accent-color)',
        color: '#fff',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 'bold',
        marginBottom: '12px'
      }}>
        {getDegreeLabel(program.degree)}
      </span>

      <h1 style={{ fontSize: '26px', marginBottom: '8px', color: 'var(--text-primary)' }}>
        {program.name}
      </h1>
      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
        Код направления: <strong style={{ color: 'var(--text-primary)' }}>{program.direction?.code || 'Н/Д'}</strong> ({program.direction?.name})
      </p>
      <p style={{ color: 'var(--accent-color)', fontWeight: 'bold', marginBottom: '24px' }}>
        Рейтинг программы: {program.rating?.toFixed(1) || '0.0'} ★
      </p>

      {program.description && (
        <div style={{ color: 'var(--text-primary)', lineHeight: '1.6', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>О программе</h3>
          <p>{program.description}</p>
        </div>
      )}

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '32px 0' }} />

      {/* СЕКЦИЯ ОТЗЫВОВ */}
      <h2 style={{ fontSize: '22px', marginBottom: '20px', color: 'var(--text-primary)' }}>
        Отзывы о направлении
      </h2>

      {/* ВЕРХНИЙ БЛОК: Форма или личный отзыв (Только для студентов) */}
      <div style={{ marginBottom: '36px' }}>
        {!isStudent ? (
          // Если юзер не студент — блокируем интерфейс создания отзыва
          <div style={{
            padding: '16px',
            background: 'rgba(255, 180, 0, 0.05)',
            border: '1px dashed #ffb400',
            borderRadius: '12px',
            color: 'var(--text-secondary)',
            fontSize: '14px'
          }}>
            Оставлять отзывы и оценивать направления подготовки могут только верифицированные <strong>Студенты</strong>.
          </div>
        ) : myReview && !isEditing ? (
          // Отображение уже созданного личного отзыва студента
          <div style={{
            padding: '20px',
            background: 'var(--bg-main)',
            border: '2px solid var(--accent-color)',
            borderRadius: '12px',
            position: 'relative'
          }}>
            <span style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              fontSize: '12px',
              color: 'var(--accent-color)',
              fontWeight: 'bold',
              background: 'rgba(var(--accent-color-rgb), 0.1)',
              padding: '2px 8px',
              borderRadius: '4px'
            }}>
              Ваш отзыв
            </span>
            <h4 style={{ margin: '0 0 6px 0', color: 'var(--text-primary)' }}>Вы оставили отзыв</h4>
            <div style={{ color: '#ffb400', fontSize: '18px', marginBottom: '10px' }}>
              {'★'.repeat(myReview.score)}{'☆'.repeat(5 - myReview.score)}
            </div>
            {myReview.comment ? (
              <p style={{ color: 'var(--text-primary)', margin: '0 0 16px 0', lineHeight: '1.5' }}>
                {myReview.comment}
              </p>
            ) : (
              <p style={{ color: 'var(--text-secondary)', margin: '0 0 16px 0', fontStyle: 'italic' }}>
                Вы оставили оценку без текстового комментария.
              </p>
            )}
            <button 
              onClick={() => setIsEditing(true)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent-color)',
                cursor: 'pointer',
                fontWeight: 'bold',
                padding: 0,
                fontSize: '14px'
              }}
            >
              Редактировать отзыв
            </button>
          </div>
        ) : (
          // Форма написания нового или изменения существующего отзыва
          <form onSubmit={handleSubmit} style={{
            padding: '20px',
            background: 'var(--bg-main)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px'
          }}>
            <h3 style={{ fontSize: '16px', margin: '0 0 16px 0', color: 'var(--text-primary)' }}>
              {myReview ? 'Редактирование отзыва' : 'Поделитесь вашим мнением о программе'}
            </h3>
            
            {/* Рендер интерактивных звезд */}
            <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Ваша оценка:</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setScore(star)}
                    style={{
                      fontSize: '24px',
                      cursor: 'pointer',
                      color: star <= score ? '#ffb400' : 'var(--border-color)',
                      transition: 'color 0.2s'
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <textarea
              placeholder="Расскажите о качестве преподавания, дисциплинах или сложностях обучения..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-main)',
                color: 'var(--text-primary)',
                fontFamily: 'inherit',
                resize: 'none',
                boxSizing: 'border-box',
                marginBottom: '12px'
              }}
            />

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="submit"
                disabled={saveReviewMutation.isPending}
                style={{
                  background: 'var(--accent-color)',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}
              >
                {myReview ? 'Сохранить изменения' : 'Опубликовать'}
              </button>
              
              {isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  style={{
                    background: 'none',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-secondary)',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Отмена
                </button>
              )}
            </div>
          </form>
        )}
      </div>

      {/* НИЖНИЙ БЛОК: Отзывы других студентов */}
      <div style={{ display: 'grid', gap: '16px' }}>
        {otherReviews.length > 0 ? (
          otherReviews.map((rev: ReviewResponse) => (
            <div 
              key={rev.id}
              style={{
                padding: '16px',
                background: 'var(--bg-main)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <div style={{ color: '#ffb400', fontSize: '14px' }}>
                  {'★'.repeat(rev.score)}{'☆'.repeat(5 - rev.score)}
                </div>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  {new Date(rev.createdAt).toLocaleDateString()}
                </span>
              </div>
              {rev.comment ? (
                <p style={{ color: 'var(--text-primary)', margin: '0', fontSize: '15px', lineHeight: '1.5' }}>
                  {rev.comment}
                </p>
              ) : (
                <p style={{ color: 'var(--text-secondary)', margin: '0', fontSize: '14px', fontStyle: 'italic' }}>
                  Пользователь оставил оценку без комментария.
                </p>
              )}
            </div>
          ))
        ) : (
          <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>
            Других отзывов об этой программе пока нет.
          </p>
        )}
      </div>
    </div>
  );
};