from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from fetch_fund_data import fetch_fund_data
import logging

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.before_request
def before_request():
    if request.path.startswith('/api'):
        request.url = request.url.replace('localhost:3000', 'localhost:5000', 1)

@app.route('/api/fund/<symbol>', methods=['GET'])
def get_fund_data(symbol):
    data = fetch_fund_data(symbol)
    return jsonify(data)

@app.route('/api/analyze/<symbol>', methods=['GET'])
def analyze_fund(symbol):
    fund_data = fetch_fund_data(symbol)
    analysis_response = requests.post('https://genai-large-api.example.com/analyze', json=fund_data)
    analysis_result = analysis_response.json()
    return jsonify(analysis_result)

if __name__ == '__main__':
    logger.info("Server is running...")
    app.run(debug=True, port=3000)

