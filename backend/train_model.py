# train_model.py - This teaches the computer how to classify text
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline
import joblib

# Training data - we're teaching the computer what each category looks like
documents = [
    "computer software hardware programming coding",  # Technology
    "laptop smartphone internet data cloud",          # Technology
    "football basketball soccer game player",         # Sports
    "stadium match championship victory team",        # Sports
    "money business stock market economy",            # Business
    "company profit investment sales growth",         # Business
    "apple microsoft google amazon facebook",         # Technology
    "nba world cup olympics tournament",              # Sports
    "bank finance corporate merger deal",             # Business
]

# The correct answers for our training data
categories = [
    "Technology", "Technology", "Sports", "Sports", "Business", 
    "Business", "Technology", "Sports", "Business"
]

# Create and train our AI model
print(" Training the AI brain...")
model = make_pipeline(
    TfidfVectorizer(),
    LogisticRegression()
)
model.fit(documents, categories)

# Save the trained model so we can use it later
joblib.dump(model, 'text_classifier_model.joblib')
print(" AI brain trained and saved!")
print("The computer has learned to classify documents!")