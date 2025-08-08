import os
import pandas as pd
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get MongoDB URI from .env
mongo_uri = os.getenv("MONGO_URL")
if not mongo_uri:
    raise Exception("❌ MONGO_URL not found. Please set it in your .env file.")

# Connect to MongoDB
client = MongoClient(mongo_uri)
db = client["deliverydb"]
stores_col = db["stores"]
products_col = db["products"]

# Load Excel file
excel_file = "Categories.xlsx"
df = pd.read_excel(excel_file)

inserted_count = 0
missing_stores = set()

for index, row in df.iterrows():
    store_name = str(row.get("Store Name", "")).strip()
    if not store_name:
        continue

    store = stores_col.find_one({"name": store_name})
    if not store:
        missing_stores.add(store_name)
        continue

    product = {
        "name": str(row.get("Product Name", "")).strip(),
        "description": str(row.get("Product Description", "")).strip(),
        "price": float(row.get("Product Price", 0)),
        "image": str(row.get("Product Image", "")).strip(),
        "category": str(row.get("Product Category", "")).strip(),
        "stock": int(row.get("Stock Quantity", 0)),
        "storeId": store["_id"]
    }

    products_col.insert_one(product)
    inserted_count += 1

print(f"✅ Inserted {inserted_count} products.")

if missing_stores:
    print(f"⚠️ These stores were missing in MongoDB: {', '.join(missing_stores)}")
