# train_improved_model.py - Supercharged AI training!
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline
import joblib

# TRAINING DATA - Real-world examples
documents = [
    # TECHNOLOGY (15 examples)
    "computer software hardware programming coding development",
    "laptop smartphone internet data cloud server network",
    "apple microsoft google amazon facebook tech company",
    "artificial intelligence machine learning neural networks",
    "programming python java javascript react node",
    "cybersecurity encryption blockchain cryptocurrency bitcoin",
    "virtual reality augmented reality metaverse digital",
    "robotics automation drones self driving cars",
    "data science big data analytics database sql",
    "web development mobile apps ios android",
    "github git version control software engineering",
    "cpu gpu processor chip semiconductor",
    "startup innovation technology digital transformation",
    "api rest microservices docker kubernetes",
    "website ecommerce digital marketing seo",
    
    # SPORTS (15 examples)
    "football basketball soccer game player team",
    "stadium match championship victory tournament",
    "nba world cup olympics competition athletes",
    "training exercise fitness gym workout",
    "coach referee score goal points win",
    "baseball tennis golf swimming running",
    "premier league champions league football league",
    "cricket rugby hockey volleyball baseball",
    "athlete professional contract salary transfer",
    "injury recovery physiotherapy sports medicine",
    "olympic games gold medal silver bronze",
    "world record breaking achievement performance",
    "fan audience stadium arena tickets",
    "strategy tactics formation game plan",
    "doping test anti-doping agency banned",
    
    # BUSINESS (15 examples)
    "money business stock market economy finance",
    "company profit investment sales growth revenue",
    "bank finance corporate merger acquisition deal",
    "entrepreneur startup venture capital funding",
    "management leadership strategy organization",
    "marketing advertising brand customer product",
    "economy inflation recession gdp growth",
    "stock exchange trading shares investors",
    "ceo board directors executive management",
    "banking loans mortgage interest rates",
    "corporate business commercial enterprise",
    "financial statements balance sheet income",
    "investment portfolio assets liabilities",
    "merger acquisition takeover buyout deal",
    "market share competition industry sector",
    
    # POLITICS (15 examples)
    "government president prime minister election",
    "parliament congress senate legislation law",
    "democracy vote election campaign candidate",
    "policy foreign affairs international relations",
    "political party conservative liberal socialist",
    "election voting ballot results democracy",
    "tax reform healthcare education policy",
    "united nations nato eu international",
    "human rights equality justice freedom",
    "immigration border security citizenship",
    "budget deficit debt spending cuts",
    "corruption scandal investigation ethics",
    "diplomacy treaty agreement negotiation",
    "constitution amendment rights supreme court",
    "public opinion polls survey voters",
    
    # ENTERTAINMENT (15 examples)
    "movie film cinema hollywood actor",
    "music song album artist concert",
    "television tv series show streaming",
    "netflix disney amazon prime video",
    "celebrity fame star famous popular",
    "gaming video games esports players",
    "youtube tiktok social media influencer",
    "broadway theater performance drama",
    "oscars grammy awards emmy nominations",
    "comedy humor funny laugh entertainment",
    "dance music festival concert party",
    "marvel dc comics superhero movies",
    "podcast radio broadcast interview",
    "fiction novel book author writing",
    "reality tv show competition series",
    
    # SCIENCE (15 examples)
    "research scientist laboratory experiment study",
    "physics chemistry biology mathematics",
    "space nasa astronaut rocket planet",
    "climate change environment global warming",
    "medical health medicine disease treatment",
    "university college education academic",
    "discovery innovation invention technology",
    "genetics dna biology evolution",
    "quantum physics relativity theory",
    "engineering mechanical electrical civil",
    "psychology human behavior mind brain",
    "astronomy telescope stars galaxy",
    "environmental science ecology nature",
    "mathematics algebra calculus geometry",
    "scientific method hypothesis theory"
]

# The correct answers for ALL our training data
categories = [
    # Technology (15)
    "Technology", "Technology", "Technology", "Technology", "Technology",
    "Technology", "Technology", "Technology", "Technology", "Technology", 
    "Technology", "Technology", "Technology", "Technology", "Technology",
    
    # Sports (15)
    "Sports", "Sports", "Sports", "Sports", "Sports",
    "Sports", "Sports", "Sports", "Sports", "Sports",
    "Sports", "Sports", "Sports", "Sports", "Sports",
    
    # Business (15)
    "Business", "Business", "Business", "Business", "Business",
    "Business", "Business", "Business", "Business", "Business",
    "Business", "Business", "Business", "Business", "Business",
    
    # Politics (15)
    "Politics", "Politics", "Politics", "Politics", "Politics",
    "Politics", "Politics", "Politics", "Politics", "Politics",
    "Politics", "Politics", "Politics", "Politics", "Politics",
    
    # Entertainment (15)
    "Entertainment", "Entertainment", "Entertainment", "Entertainment", "Entertainment",
    "Entertainment", "Entertainment", "Entertainment", "Entertainment", "Entertainment",
    "Entertainment", "Entertainment", "Entertainment", "Entertainment", "Entertainment",
    
    # Science (15)
    "Science", "Science", "Science", "Science", "Science",
    "Science", "Science", "Science", "Science", "Science",
    "Science", "Science", "Science", "Science", "Science"
]

print(" Training SUPER-CHARGED AI brain with 90 examples across 6 categories!")
print(f" Training data: {len(documents)} documents")
print(f" Categories: {set(categories)}")

# Create and train our IMPROVED AI model
model = make_pipeline(
    TfidfVectorizer(max_features=1000, stop_words='english'),
    LogisticRegression(random_state=42, max_iter=1000)
)

# Train the model
model.fit(documents, categories)

# Save the trained model
joblib.dump(model, 'improved_text_classifier.joblib')
print(" SUPER-CHARGED AI brain trained and saved!")
print(" Now your AI can classify: Technology, Sports, Business, Politics, Entertainment, Science!")