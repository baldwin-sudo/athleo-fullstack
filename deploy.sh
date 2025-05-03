#!/bin/bash

cd /home/ubuntu/athleo-fullstack

# Pull latest code
git pull origin main

# Backend
# cd backend
# npm install
# pm2 restart backend  # ou node server.js, uvicorn main:app --reload, etc.
# Arrêter l'ancienne session screen si elle existe
# screen -S backend -X quit || true
#  Démarrer une nouvelle session screen pour le backend
# screen -dmS backend npm start   # ou node server.js / pm2 non utilisé ici

# Frontend
cd sih-frontend
npm install
npm run build
# Arrêter l'ancienne session screen si elle existe
screen -S frontend -X quit || true
# Démarrer une nouvelle session screen pour le frontend
screen -dmS frontend npm start