from pydantic import BaseModel, Field, constr, conint
from pydantic_mongo import PydanticObjectId
from typing import Optional

class Product(BaseModel):
    id: Optional[PydanticObjectId] = Field(default_factory=PydanticObjectId, alias="_id")
    name: constr(min_length=1, max_length=100)
    description: constr(min_length=0, max_length=500) = ""
    price: conint(gt=0)
    currency: constr(min_length=3, max_length=3) = "USD"

    class Config:
        json_encoders = {
            PydanticObjectId: str
        }
