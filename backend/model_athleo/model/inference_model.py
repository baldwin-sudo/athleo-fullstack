import joblib
import numpy as np
import pandas as pd

class UserLevelPredictor:
    def __init__(self):
        self.model = joblib.load('model/user_classifier.joblib')
        self.scaler = joblib.load('model/scaler.joblib')
        self.encoder = joblib.load('model/encoder.joblib')
    
    def predict(self, form_data):
        try:
            features = self._prepare_features(form_data)
            prediction = self.model.predict(features)
            return {1: "Débutant", 2: "Intermédiaire", 3: "Avancé"}[prediction[0]]
        except Exception as e:
            print(f"Prediction error: {e}")
            return "Débutant"
    
    def _prepare_features(self, form_data):
        df = pd.DataFrame([form_data])
        df['gender_encoded'] = self.encoder.transform(df['gender'])
        df['goal_encoded'] = self.encoder.transform(df['goal'])
        
        features = ['age', 'weight', 'height', 'water', 'steps',
                   'exercise', 'sleep', 'fitness_level', 'gender_encoded', 'goal_encoded']
        return self.scaler.transform(df[features])