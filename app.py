from flask import Flask, render_template, request, redirect, flash
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SECRET_KEY'] = '45FA49955F631715F46122927A7BC'
db = SQLAlchemy(app)

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)
    society_name = db.Column(db.String(150))
    society_address = db.Column(db.String(150))

# Create the database
with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        society_name = request.form['society_name']
        society_address = request.form['society_address']
        password = request.form['password']

        # Hash the password
        hashed_password = generate_password_hash(password)

        # Create a new user
        new_user = User(username=username, password=hashed_password,
                        society_name=society_name, society_address=society_address)
        db.session.add(new_user)
        db.session.commit()

        flash('Signup successful! Please log in.', 'success')
        return redirect('/login')

    return render_template('signup.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        user = User.query.filter_by(username=username).first()
        if user and check_password_hash(user.password, password):
            flash('Login successful!', 'success')
            return redirect('/admin')
        else:
            flash('Login failed. Please check your username and password.', 'danger')

    return render_template('login.html')

@app.route('/admin')
def admin():
    return "Welcome to the admin page!"

if __name__ == '__main__':
    app.run(debug=True)
