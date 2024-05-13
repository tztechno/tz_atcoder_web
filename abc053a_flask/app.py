from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/', methods=['POST'])
def process_form():
    N = int(request.form['N'])
    ANS = "ABC" if N < 1200 else "ARC"
    return f"RATE: {N}<br>CONTEST: {ANS}"

if __name__ == '__main__':
    app.run(debug=True)
