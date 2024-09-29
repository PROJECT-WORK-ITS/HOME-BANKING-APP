# Stage 1: Build del frontend Angular
FROM node:18-alpine as build-front-end

WORKDIR /app

# Copia il file package.json e installa le dipendenze del frontend
COPY ./front-end/package*.json ./front-end/
RUN cd ./front-end && npm install --force

# Copia il codice sorgente del frontend
COPY ./front-end ./front-end

# Compila il frontend Angular
RUN cd ./front-end && npm run build --prod

# Stage 2: Setup del backend Express
FROM node:18-alpine as build-back-end

WORKDIR /app

# Copia i file package.json e installa le dipendenze del backend
COPY ./back-end/package*.json ./back-end/
RUN cd ./back-end && npm install --force

# Copia il codice sorgente del backend
COPY ./back-end ./back-end

# Installa TypeScript globalmente
RUN npm install -g typescript

# Compila il codice TypeScript in JavaScript
RUN cd ./back-end && tsc

# Copia il frontend costruito nella cartella pubblica del backend
COPY --from=build-front-end /app/front-end/dist /app/back-end/dist/public

# Espone la porta 3000 per l'app Express
EXPOSE 3000

# Comando per avviare il server Express
CMD ["node", "./back-end/dist/index.js"]
