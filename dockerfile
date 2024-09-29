# Immagine base
FROM node:20-alpine

# Imposta la directory di lavoro per il back-end
WORKDIR /app

# Copia il file package.json e package-lock.json del back-end
COPY ./front-end/package*.json ./front-end/

# Installa le dipendenze per il back-end
RUN cd ./front-end && npm install 

# Copia tutto il codice del back-end
COPY ./front-end ./front-end

RUN cd ./front-end && npm run build

FROM node:20-alpine
# Imposta la directory di lavoro per il front-end
WORKDIR /app

# Copia il file package.json e package-lock.json del front-end
COPY back-end/package*.json ./back-end/

RUN cd ./back-end && npm install

COPY ./back-end ./back-end

# Installa le dipendenze per il front-end
RUN npm install -g typescript

# Costruisci il front-end (assicurati che il tuo comando di build sia corretto)
RUN cd ./back-end && tsc

# Copia i file statici costruiti dal front-end nella directory del back-end
# Assicurati che il tuo comando di build produca i file nella cartella `dist`
COPY --from=build-front-end /app/front-end/dist /app/back-end/dist/public

# Espone la porta necessaria per il back-end
EXPOSE 3000 

# Comando di avvio (modifica in base a come avvii il tuo progetto)
CMD ["node", "./back-end/dist/main.js"]
