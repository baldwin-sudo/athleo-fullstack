from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

import sys
from pathlib import Path

# Ajoutez cette ligne en haut du fichier
sys.path.insert(0, str(Path(__file__).parent.parent))

# Puis votre import normal
from model.inference_model import UserLevelPredictor

app = FastAPI()
predictor = UserLevelPredictor()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict")
async def predict_level(user_data: dict):
    try:
        level = predictor.predict(user_data)
        return {"level": level}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)