from flask import Flask, jsonify, make_response
from flask_cors import CORS
import json
import logging
from fetch_fund_data import fetch_fund_data 
import os
app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.route('/api/fund/<symbol>', methods=['GET'])

def fetch_fund_data(symbol):
    data = {
        "AAPL": {
            "symbol": "AAPL",
            "name": "Apple Inc.",
            "price": 140.99,
            "change": 1.23,
            "change_percent": 0.88
        },
        "GOOGL": {
            "symbol": "GOOGL",
            "name": "Alphabet Inc.",
            "price": 2380.50,
            "change": -10.75,
            "change_percent": -0.45
        },
        "MSFT": {
            "symbol": "MSFT",
            "name": "Microsoft Corporation",
            "price": 252.46,
            "change": 2.17,
            "change_percent": 0.87
        }
    }
    return data.get(symbol, None)

def simulate_analysis(fund_data):
    return {
        "name": fund_data["name"],
        "price": fund_data["price"],
        "change": fund_data["change"],
        "change_percent": fund_data["change_percent"],
        "analysis": f"The current trend for {fund_data['name']} is positive based on the price change."
    }

def get_fund_data(symbol):
    file_path = os.path.join(os.path.dirname(__file__), 'data.json')
    try:
        with open(file_path, 'r') as f:
            data = json.load(f)
        if symbol in data:
            return jsonify(data[symbol])
        else:
            error_response = {"error": "Fund not found"}
            return make_response(jsonify(error_response), 404)
    except FileNotFoundError:
        error_response = {"error": "Data file not found"}
        return make_response(jsonify(error_response), 500)
    except json.JSONDecodeError:
        error_response = {"error": "Error decoding JSON data"}
        return make_response(jsonify(error_response), 500)

@app.route('/api/analyze/<symbol>', methods=['GET'])
def analyze_fund(symbol):
    fund_data = fetch_fund_data(symbol)
    if not fund_data:
        return jsonify({"error": "Fund not found"}), 404
    
    try:
        analysis_result = simulate_analysis(fund_data)
        return jsonify(analysis_result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    logger.info("Server is running...")
    app.run(debug=True, port=3000)
