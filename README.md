# SERVE CONNECT

## Overview

a full-stack web application designed  for managing volunteer activities. The system allows organizations and individuals to post volunteering opportunities, and users to browse available events.
The project is built with a React frontend and a Django Rest Framework (DRF) backend.

##  Installation
 Clone the repository
### Frontend Setup
1 Navigate to the frontend folder:
```sh

cd frontend
 ```

2.Install dependencies:
```sh
npm install
```

3. Start the frontend server:
```sh
npm run dev
```

### Backend Setup
1. Navigate to the backend folder:
```sh
cd backend
```

2. Install a virtual environment:
```sh
pip install virtualenv
```
3. Create a virtual environment and activate it:
```sh
py -m venv myenv

myenv/scripts/activate
 ```
`myenv` is the name of the environment folder.

Install dependencies:
```sh
py -m pip install -r requirements.txt
```
Make initial migrations:
```bash
python manage.py makemigrations

python manage.py migrate
```
Start the backend development server:
```bash
python manage.py runserver
```








