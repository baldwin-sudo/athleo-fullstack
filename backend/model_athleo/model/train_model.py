import pandas as pd
import numpy as np
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
import joblib

def generate_data(n_users=1000):
    np.random.seed(42)
    data = {
        'age': np.random.randint(13, 100, size=n_users),
        'gender': np.random.choice(['male', 'female', 'other'], size=n_users, p=[0.48, 0.48, 0.04]),
        'weight': np.round(np.random.uniform(30, 200, size=n_users), 1),
        'height': np.random.randint(100, 250, size=n_users),
        'water': np.round(np.clip(np.random.normal(1.8, 0.7, size=n_users), 0.5, 5), 2),
        'steps': np.random.choice([5000, 7500, 12500, 17500, 30000], size=n_users, p=[0.15, 0.25, 0.3, 0.2, 0.1]),
        'exercise': np.random.randint(0, 180, size=n_users),
        'sleep': np.round(np.clip(np.random.normal(7, 1.5, size=n_users), 4, 12), 1),
        'fitness_level': np.random.choice([1, 2, 3, 4, 5], size=n_users, p=[0.2, 0.3, 0.25, 0.15, 0.1]),
        'goal': np.random.choice(['habits', 'consistency', 'performance'], size=n_users, p=[0.5, 0.3, 0.2])
    }
    return pd.DataFrame(data)

def preprocess(df):
    encoder = LabelEncoder()
    df['gender_encoded'] = encoder.fit_transform(df['gender'])
    df['goal_encoded'] = encoder.fit_transform(df['goal'])
    
    features = ['age', 'weight', 'height', 'water', 'steps', 
               'exercise', 'sleep', 'fitness_level', 'gender_encoded', 'goal_encoded']
    target = 'true_level'
    
    X = df[features]
    y = df[target]
    
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    return X_scaled, y, scaler, encoder

def train():
    df = generate_data()
    df['true_level'] = df.apply(lambda x: determine_level(x), axis=1)
    
    X, y, scaler, encoder = preprocess(df)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
    
    model = GradientBoostingClassifier(
        n_estimators=150,
        max_depth=5,
        learning_rate=0.1,
        random_state=42
    )
    model.fit(X_train, y_train)
    
    joblib.dump(model, 'model/user_classifier.joblib')
    joblib.dump(scaler, 'model/scaler.joblib')
    joblib.dump(encoder, 'model/encoder.joblib')
    
    print(f"Model trained with accuracy: {model.score(X_test, y_test):.2f}")

def determine_level(row):
    score = (row['steps'] / 1000) + (row['exercise'] / 10) + (row['fitness_level'] * 5)
    if score < 30: return 1
    elif 30 <= score < 50: return 2
    else: return 3

if __name__ == "__main__":
    train()