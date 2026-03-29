import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// 1. Сначала импортируем все файлы с темами из твоей папки utils
import './utils/css/dark-hc.css'
import './utils/css/dark-mc.css' 
import './utils/css/dark.css'
import './utils/css/light-hc.css'
import './utils/css/light-mc.css' 
import './utils/css/light.css'

// 2. Затем базовые стили (они будут использовать переменные из тем)
import './layouts/LayoutStructure.css' // Сначала каркас
import './index.css' // В конце цвета и переменные
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)