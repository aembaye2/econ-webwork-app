### How to run this app

# Clone the app:

git clone https://github.com/aembaye2/econ-webwork-app.git

cd econ-webwork-app

conda create --name myenv python=3.10

conda activate myenv

pip install -r requirements.txt

# then change the .env.example to .env file and edit the username and password

# run the app:

python manage.py runserver

# Access the app at:

http://127.0.0.1:8000/
