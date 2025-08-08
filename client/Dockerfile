# Etapa 1: build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Etapa 2: produção
FROM node:18-alpine AS runner

WORKDIR /app

# Instala apenas dependências de produção
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

# Copia arquivos necessários do build
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/postcss.config.mjs ./
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/next-env.d.ts ./
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/package.json ./

EXPOSE 2999

# Comando para rodar o app
CMD ["npm", "start"]
