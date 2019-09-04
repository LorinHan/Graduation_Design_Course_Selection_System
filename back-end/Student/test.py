from flask import Blueprint, render_template
import json

test1 = Blueprint('test1', __name__)
@test1.route('/test')
def test():
    return json.dumps({"code": 200})