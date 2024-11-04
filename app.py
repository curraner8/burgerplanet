from flask import Flask, render_template, request, session, redirect, url_for, g
from database import get_db, close_db
from flask_session import Session
from werkzeug.security import generate_password_hash, check_password_hash
from forms import RegistrationForm, LoginForm
from functools import wraps

app = Flask(__name__)
app.teardown_appcontext(close_db)
app.config["SECRET_KEY"] = "this-is-my-secret-key"
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

@app.before_request
def logged_in_user():
    g.user = session.get("user_id", None)

def login_required(view):
    @wraps(view)
    def wrapped_view(*args, **kwargs):
        if g.user is None:
            return redirect(url_for("login", next=request.url))
        return view(*args, **kwargs)
    return wrapped_view

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/register", methods=["GET", "POST"])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        user_id = form.user_id.data
        password = form.password.data
        password2 = form.password2.data
        db = get_db()
        possible_clashing_user = db.execute("""SELECT * FROM members
                WHERE user_id = ?;""", (user_id,)).fetchone()
        if possible_clashing_user is not None:
            form.user_id.errors.append("User id already taken!")
        else:
            db.execute("""INSERT INTO members (user_id, password)
                    VALUES (?, ?);""",
                    (user_id, generate_password_hash(password)))
            db.commit()
            return redirect( url_for("login"))
    return render_template("register.html", form=form)

@app.route("/login", methods=["GET","POST"])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        print('here')
        user_id = form.user_id.data
        password = form.password.data
        db = get_db()
        possible_clashing_user = db.execute("""SELECT * FROM members
                        WHERE user_id = ?;""", (user_id,)).fetchone()
        if possible_clashing_user is None:
            form.user_id.errors.append("No such user!")
        elif not check_password_hash(possible_clashing_user["password"], password):
            form.password.errors.append("Incorrect password!")
        else:

            session.clear()
            session["user_id"] = user_id
            next_page = request.args.get("next")
            if not next_page:
                next_page = url_for("game")
            return redirect(url_for("game"))
    return render_template("login.html", form=form)

@app.route("/game")
def game():
    return render_template("game.html")

@app.route("/level_2")
def level_2():
    return render_template("level_2.html")

@app.route("/level_3")
def level_3():
    return render_template("level_3.html")

@app.route("/levels")
def levels():
    return render_template("levels.html")

@app.route("/bonus_level")
def bonus_level():
    return render_template("bonus_level.html")


@app.route("/store_score", methods=["POST"])
def store_score():
    score = int(request.form["score"])
    return "success"

@app.route("/rules")
def rules():
    return render_template("rules.html")