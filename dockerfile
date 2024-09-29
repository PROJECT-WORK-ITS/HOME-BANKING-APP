# Usa l'immagine ufficiale di Node.js
FROM node:16

# Imposta la directory di lavoro all'interno del container
WORKDIR /app

# Copia i file package.json e package-lock.json nella directory di lavoro
COPY package*.json ./

# Installa le dipendenze necessarie
RUN npm install --production

# Copia tutto il resto del codice dell'app nella directory di lavoro
COPY . .

# Specifica la porta su cui l'app sarà in ascolto
EXPOSE 3000

# Definisci il comando per avviare l'app
CMD ["npm", "start"]
