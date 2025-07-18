# 🏠 Realtor Client — Frontend для платформы недвижимости

**Realtor Client** — это клиентская часть веб-приложения для риэлтора, разработанная на **Next.js**. Проект создан с нуля, адаптирован под продакшн, и задеплоен на собственный домен:  
🔗 [https://moskvrealty.ru](https://moskvrealty.ru)  
(если недоступно — включите VPN: сайт работает через Cloudflare DNS + SSL)

---

## 🚀 Стек технологий

- **Next.js** — SSR/SSG, маршрутизация, продакшн-оптимизация
- **TypeScript** — типизация
- **TailwindCSS** — современная адаптивная стилизация
- **Shadcn UI** — UI-компоненты, построенные на Radix UI
- **TanStack Query** — клиентская работа с API
- **React Hook Form** + **Zod** — формы + валидация

---

## 🧩 Архитектура

- **App Router** (Next.js 15)
- **Изоляция UI и логики**
- **Модульный импорт** и `alias`-пути через `tsconfig.json`
- Используются **error** boundary-компоненты
- Роутинг настроен на поддержку как SSG, так и SSR страниц

---

## 🖥️ Возможности

- Каталог объектов недвижимости
- Поддержка адаптивного интерфейса
- Фильтрация и сортировка (будет расширяться)
- Поддержка загрузки изображений
- Коммуникация с backend API через TanStack Query
- Предусмотрены все экраны (загрузки, ошибки, фолбэки)

---

## 📦 Установка и запуск

```bash
# Устанавливаем зависимости
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшна
npm run build
```
