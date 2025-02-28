FROM node:20-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires
COPY package*.json ./

RUN npm install

# Copier tout le code source
COPY . .

# Build le projet
RUN npm run build

FROM node:20-alpine
WORKDIR /app

# Copier les fichiers de build depuis l'étape précédente
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

# Exposer le port utilisé par le frontend
EXPOSE 3001

# Commande pour démarrer l'application
CMD ["npm", "run", "start"]

