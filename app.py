from flask import Flask, render_template, send_file
import subprocess
import os

app = Flask(__name__)
FILE_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'sudoku.json')

@app.route("/")
def home():
    return render_template('index.html')

@app.route("/sudoku")
def sudoku():
    try:
        subprocess.run(['python3', 'generator.py'])
        return render_template("sudoku.html")
    except Exception as e:
        return render_template("error.html")
    
@app.route("/sudoku/sudoku-json")
def get_sudoku():
    return send_file(FILE_PATH)



if __name__ == "__main__":
    app.run(debug=True)