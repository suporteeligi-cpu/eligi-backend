FROM node:20

WORKDIR /app

# Copia pacotes
COPY package*.json ./

# Instala TODAS dependências (incluindo dev)
RUN npm install

# Copia o restante do código
COPY . .

# O comando do container será definido pelo docker-compose
