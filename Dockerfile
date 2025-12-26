# 1. Базовый образ
FROM node:20-alpine

# 2. Рабочая директория внутри контейнера
WORKDIR /usr/src/app

# 3. Копируем только package.json/lock для кеша зависимостей
COPY package*.json ./

# Если у тебя yarn:
# COPY package.json yarn.lock ./

# 4. Устанавливаем зависимости
RUN npm ci
# или если yarn:
# RUN yarn install --frozen-lockfile

# 5. Копируем остальной код
COPY . .

# 6. Собираем NestJS
RUN npm run build
# или: RUN yarn build

# 7. Стартуем prod-сборку
CMD ["node", "dist/main.js"]
