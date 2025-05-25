# Étape 1 : Image de base Python 3.12
FROM python:3.12-slim

# Étape 2 : Définir le répertoire de travail
WORKDIR /app

# Étape 3 : Copier les dépendances
COPY api/requirements.txt .

# Étape 4 : Installer les dépendances
RUN pip install --no-cache-dir -r requirements.txt

# Étape 5 : Copier tous les fichiers de ton projet
COPY . .

# Étape 6 : Exposer le port de l'API
EXPOSE 8000

# Étape 7 : Lancer FastAPI
CMD ["uvicorn", "api.app:app", "--host", "0.0.0.0", "--port", "8000"]
