# -*- coding: utf-8 -*-
from flask import Flask, render_template
from Student.test import *

app = Flask(__name__)

app.register_blueprint(test1, url_prefix='/student')

@app.route('/')
def index():
	return render_template("student.html")

@app.route('/teacher')
def teacher():
	return render_template("teacher.html")


if __name__ == '__main__':
	app.run(debug=True)