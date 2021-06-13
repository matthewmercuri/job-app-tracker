cd ..
cd backend
pipenv run uvicorn main:app --reload
timeout 5
