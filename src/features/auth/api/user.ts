import type { UserProfile } from '../../../types/User';
const BASE_URL = 'https://unhygienically-fluxional-sharolyn.ngrok-free.dev'; 

export const userApi = {
  // 2. Указываем возвращаемый тип. Теперь TS знает, что тут будет UserProfile
  getMe: (): Promise<Response> =>
    fetch(`${BASE_URL}/api/users/me`, {
      method: 'GET',
      headers: { 
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }),

  // 3. Используем Partial<UserProfile>, чтобы можно было обновлять только часть полей
  updateMe: (userId: string, data: Partial<UserProfile>): Promise<Response> =>
    fetch(`${BASE_URL}/api/users/me`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true', // Не забываем про ngrok здесь!
        'X-Auth-User-Id': userId, 
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    })
};

// export const userApi = {
//     getMe: () =>
//     fetch(`${BASE_URL}/api/users/me`, {
//       method: 'GET',
//       headers: { 
//         'Accept': '*/*',
//         'ngrok-skip-browser-warning': 'true',
//         'Authorization': `Bearer ${localStorage.getItem('token')}`
//       }
//     }),
//     updateMe: (userId: string, data: any) =>
//     fetch(`${BASE_URL}/api/users/me`, {
//       method: 'PUT',
//       headers: { 
//         'Content-Type': 'application/json',
//         'Accept': '*/*',
//         'X-Auth-User-Id': userId 
//       },
//       body: JSON.stringify(data)
//     })
// }