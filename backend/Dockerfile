FROM node:20-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires
COPY package*.json ./

RUN npm install -g nodemon
RUN npm install

# Copier tout le code source
COPY . .

# Exposer le port utilisé par le backend
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "run", "dev"]
