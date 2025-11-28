# main.py - UPDATED with improved AI model
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import joblib
import os

# Load our IMPROVED trained AI brain
print("🧠 Loading the SUPER-CHARGED AI brain...")
try:
    model = joblib.load('improved_text_classifier.joblib')
    print("SUPER-CHARGED AI brain loaded and ready!")
    print("Categories available:", model.classes_)
except FileNotFoundError:
    print("ERROR: Improved model not found!")
    print("Please run: python train_improved_model.py")
    exit(1)

# Create our web server
app = FastAPI(title="Smart Document Classifier - IMPROVED")

# Allow our frontend to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define what kind of data we expect
class DocumentRequest(BaseModel):
    text: str

# This is where the magic happens - classifying text!
@app.post("/classify")
async def classify_document(request: DocumentRequest):
    try:
        # Use our IMPROVED AI model to predict the category
        prediction = model.predict([request.text])
        probabilities = model.predict_proba([request.text])[0]
        confidence = max(probabilities)
        
        # Get all probabilities for each category
        categories = model.classes_
        all_probabilities = {category: round(float(prob) * 100, 2) for category, prob in zip(categories, probabilities)}
        
        return {
            "category": prediction[0],
            "confidence": round(float(confidence) * 100, 2),
            "all_probabilities": all_probabilities,
            "status": "success"
        }
    except Exception as e:
        return {"category": "Error", "confidence": 0, "status": "error", "message": str(e)}

# Get available categories
@app.get("/categories")
async def get_categories():
    return {"categories": model.classes_.tolist()}

# Simple test to make sure server is working
@app.get("/")
async def root():
    return {
        "message": "IMPROVED Smart Document Classifier API is running! ", 
        "categories": model.classes_.tolist()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)