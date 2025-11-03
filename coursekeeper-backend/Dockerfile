# coursekeeper-backend/Dockerfile

FROM node:20-alpine

# Diretório de trabalho dentro do container
WORKDIR /app

# Dependências do Alpine necessárias para build do Prisma
RUN apk add --no-cache bash build-base python3 make g++

# Copia apenas package.json e package-lock.json primeiro
COPY package*.json ./

# Instala dependências, ignorando scripts (para não rodar postinstall antes da pasta prisma existir)
RUN npm ci --ignore-scripts

# Copia o restante do backend, incluindo prisma/
COPY . .

# Gera o Prisma Client manualmente
RUN npx prisma generate --schema=./prisma/schema.prisma

# Build do NestJS
RUN npm run build

# Expõe a porta padrão do backend
EXPOSE 3000

# Comando para rodar em produção
CMD ["npm", "run", "start:prod"]
