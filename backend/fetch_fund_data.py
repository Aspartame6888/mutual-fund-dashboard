import requests

def fetch_fund_data(fund_symbol):
    api_url = f"https://api.example.com/funds/{fund_symbol}"
    response = requests.get(api_url)
    return response.json()
