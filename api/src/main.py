from fastapi import FastAPI, Depends, HTTPException
from database import get_db
from typing import List
from models import Product
from bson import ObjectId
from bson.errors import InvalidId
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["http://localhost:8081"]  

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", response_model=List[Product])
async def read_products(db=Depends(get_db)):
    products = await db.products.find().to_list()
    return products

@app.get("/{product_id}", response_model=Product)
async def read_product(product_id: str, db=Depends(get_db)):
    try:
        obj_id = ObjectId(product_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid product ID format")
    
    product = await db.products.find_one({"_id": obj_id})
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@app.post("/", response_model=Product)
async def create_product(product: Product, db=Depends(get_db)):
    product_dict = product.dict()
    result = await db.products.insert_one(product_dict)
    product_dict["_id"] = str(result.inserted_id)
    return product_dict

@app.delete("/{product_id}", response_model=dict)
async def delete_product(product_id: str, db=Depends(get_db)):
    try:
        obj_id = ObjectId(product_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid product ID format")
    
    result = await db.products.delete_one({"_id": obj_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return {"message": "Product deleted successfully"}
