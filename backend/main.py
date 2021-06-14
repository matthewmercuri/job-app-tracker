import datetime
from bson.json_util import dumps
import json
from typing import Optional, Literal
from utils import dbutils
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from pymongo import ReturnDocument


class JobApp(BaseModel):
    appID: int
    employer: str
    position: str
    resumeFileName: Optional[str]
    coverLetterFileName: Optional[str]
    dateApplied: datetime.date
    dateUpdated: datetime.date
    status: Literal['planned', 'applied', 'rejected', 'interview',
                    'detailed interview', 'stale', 'offer']
    industry: str
    notes: Optional[str]
    medium: str


class UpdateJobApp(BaseModel):
    appID: int
    employer: Optional[str]
    position: Optional[str]
    resumeFileName: Optional[str]
    coverLetterFileName: Optional[str]
    dateApplied: Optional[datetime.date]
    dateUpdated: Optional[datetime.date]
    status: Optional[Literal['planned', 'applied', 'rejected', 'interview',
                             'detailed interview', 'stale', 'offer']]
    industry: Optional[str]
    notes: Optional[str]
    medium: Optional[str]


app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db = dbutils.connect_to_db()


@app.get('/')
def read_root():
    return {'success': 'welcome to the Job App API'}


@app.get('/get-all-apps/')
def get_all_applications():
    apps = [json.loads(dumps(x)) for x in db.find({})]
    return apps


@app.get('/get-app/{app_id}/')
def get_application(app_id: int):
    app = db.find({"appID": app_id})
    return json.loads(dumps(app))


@app.post('/create-app/')
def create_application(job_app: JobApp):
    # first has to check if ID exists
    _apps = [json.loads(dumps(x)) for x in db.find({})]
    apps = [json.loads(dumps(x)) for x in _apps]
    for app in apps:
        if app['appID'] == job_app.appID:
            # return {'error': f'already have record for ID: {app["appID"]}'}
            raise HTTPException(status_code=409, detail="duplicate entry")

    db.insert_one(jsonable_encoder(job_app))
    return job_app


@app.put('/update-app/')
def update_application(job_app: UpdateJobApp):
    j = {k: v for k, v in job_app.dict().items() if v is not None}
    j['dateUpdated'] = j['dateUpdated'].strftime("%Y-%m-%d")
    app = db.find_one_and_update({"appID": j['appID']}, {"$set": j},
                                 upsert=False,
                                 return_document=ReturnDocument.AFTER)
    return json.loads(dumps(app))


@app.delete('/delete-all/')
def delete_all_applications():
    db.delete_many({})
    return {'successMessage': 'deleted all job applications'}


@app.delete('/delete-app/{app_id}/')
def delete_application(app_id: int):
    db.remove({'appID': app_id})
    return {'successMessage': f'deleted job with id: {app_id}'}
