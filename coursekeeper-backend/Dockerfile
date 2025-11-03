# coursekeeper-backend/Dockerfile

FROM node:20-alpine

# Cria pasta de trabalho
WORKDIR /app

# Instala dependências básicas do Alpine para build do Prisma
RUN apk add --no-cache bash build-base python3 make g++

# Copia package.json e package-lock.json primeiro para cache do npm
COPY package*.json ./

# Instala dependências
RUN npm ci

# Copia todo o backend (incluindo prisma/)
COPY . .

# Gera o Prisma Client
RUN npx prisma generate --schema=./prisma/schema.prisma

# Build do NestJS
RUN npm run build

# Expõe a porta padrão do backend
EXPOSE 3000

# Comando para rodar em produção
CMD ["npm", "run", "start:prod"]
