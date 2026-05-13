import { type University } from '../types/university';
import { type UserProfile } from '../types/User';

export const MOCK_UNIVERSITIES: University[] = [
  {
    id: 1,
    name: "ННГУ им. Лобачевского",
    city: "Нижний Новгород",
    rating: 4.7,
    tags: ["Информатика", "ИИ", "Робототехника"],
    description: "Ведущий технический вуз России..."
  },
  {
    id: 2,
    name: "ВШЭ",
    city: "Нижний Новгород",
    rating: 4.9,
    tags: ["Программирование", "Data Science", "Квантовые технологии"],
    description: "Первый неклассический университет..."
  }
];

export const MOCK_USER_PROFILE: UserProfile = {
  id: 101,
  fullName: "Иван Иванов",
  email: "ivan.ivanov@example.com",
  // avatarUrl: "https://via.placeholder.com/150", // Можно раскомментировать, если есть ссылка
  status: 'Абитуриент',
  registrationDate: "15.01.2026",
  targetSpecialties: ["Прикладная информатика", "Программная инженерия", "ИИ"],
  preferredCities: ["Москва", "Санкт-Петербург", "Нижний Новгород"],
  averageEgeScore: 85.5
};