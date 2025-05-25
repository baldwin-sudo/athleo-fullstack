import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
import joblib

def generate_synthetic_users(n_users=1000, save_path='synthetic_users.csv'):
    """
    Génère un dataset synthétique d'utilisateurs basé sur le formulaire HTML
    
    Args:
        n_users (int): Nombre d'utilisateurs à générer
        save_path (str): Chemin pour sauvegarder les données
    
    Returns:
        pd.DataFrame: DataFrame contenant les utilisateurs générés
    """
    np.random.seed(42)
    
    # 1. Démographie
    data = {
        'user_id': range(1, n_users+1),
        'age': np.random.randint(13, 100, size=n_users),
        'gender': np.random.choice(['male', 'female', 'other'], 
                                 size=n_users, 
                                 p=[0.48, 0.48, 0.04]),
        'weight': np.round(np.clip(np.random.normal(70, 15, size=n_users), 40, 120), 1),
        'height': np.random.randint(140, 200, size=n_users)
    }
    
    # 2. Habitudes (avec corrélation réaliste)
    fitness_levels = np.random.choice([1, 2, 3, 4, 5], 
                                    size=n_users, 
                                    p=[0.2, 0.3, 0.25, 0.15, 0.1])
    
    data.update({
        'water': np.round(np.clip(
            np.random.normal(1.8, 0.7, size=n_users) + (fitness_levels * 0.2),
            0.5, 5), 2),
        'steps': np.where(
            fitness_levels == 1,
            np.random.randint(3000, 8000, size=n_users),
            np.where(
                fitness_levels < 3,
                np.random.randint(8000, 15000, size=n_users),
                np.random.randint(15000, 30000, size=n_users)
            )
        ),
        'exercise': np.clip(
            np.random.normal(30, 15, size=n_users) + (fitness_levels * 10),
            0, 180).astype(int),
        'sleep': np.round(np.clip(
            np.random.normal(7, 1, size=n_users) + (fitness_levels * 0.1),
            4, 10), 1),
        'fitness_level': fitness_levels,
        'goal': np.random.choice(
            ['habits', 'consistency', 'performance'],
            size=n_users,
            p=[0.5, 0.3, 0.2]
        )
    })
    
    # 3. Calcul du niveau réel
    def calculate_level(row):
        score = (
            (row['steps'] / 1000) + 
            (row['exercise'] / 10) + 
            (row['fitness_level'] * 3) +
            (row['water'] * 2)
        )
        if score < 25: return 1
        elif 25 <= score < 40: return 2
        else: return 3
    
    df = pd.DataFrame(data)
    df['true_level'] = df.apply(calculate_level, axis=1)
    
    # 4. Encodage pour le modèle
    encoders = {
        'gender': LabelEncoder().fit(df['gender']),
        'goal': LabelEncoder().fit(df['goal'])
    }
    
    df['gender_encoded'] = encoders['gender'].transform(df['gender'])
    df['goal_encoded'] = encoders['goal'].transform(df['goal'])
    
    # 5. Sauvegarde
    df.to_csv(save_path, index=False)
    
    # Sauvegarde des encodeurs
    joblib.dump(encoders['gender'], 'gender_encoder.joblib')
    joblib.dump(encoders['goal'], 'goal_encoder.joblib')
    
    print(f"✅ {n_users} utilisateurs générés et sauvegardés dans {save_path}")
    return df

if __name__ == "__main__":
    # Exemple d'utilisation
    df = generate_synthetic_users(n_users=1500)
    print("\nExemple de données générées:")
    print(df.head())
    
    print("\nRépartition des niveaux:")
    print(df['true_level'].value_counts())