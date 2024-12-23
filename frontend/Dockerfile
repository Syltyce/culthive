FROM node:20-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires
COPY package*.json ./

RUN npm install -g nodemon
RUN npm install

# Copier tout le code source
COPY . .

# Construire l'application pour la production
# RUN npm run build

# Exposer le port utilisé par le frontend
EXPOSE 3001

# Commande pour démarrer l'application
CMD ["nodemon", "--watch", ".", "--exec", "npm run dev"]

