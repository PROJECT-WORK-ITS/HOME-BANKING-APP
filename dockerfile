# Immagine base
FROM node:16-alpine

# Imposta la directory di lavoro per il back-end
WORKDIR /app/back-end

# Copia il file package.json e package-lock.json del back-end
COPY back-end/package*.json ./

# Installa le dipendenze per il back-end
RUN npm install 

# Copia tutto il codice del back-end
COPY back-end/ ./

# Imposta la directory di lavoro per il front-end
WORKDIR /app/front-end

# Copia il file package.json e package-lock.json del front-end
COPY front-end/package*.json ./

# Installa le dipendenze per il front-end
RUN npm install 

# Copia tutto il codice del front-end
COPY front-end/ ./

# Espone le porte necessarie per il back-end e il front-end (se necessario)
EXPOSE 3000 4200 

# Comando di avvio (modifica in base a come avvii il tuo progetto)
CMD npm start  
