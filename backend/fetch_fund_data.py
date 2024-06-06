import requests

def fetch_fund_data(fund_symbol):
    # 这里需要替换为实际的基金数据API
    api_url = f"https://api.example.com/funds/{fund_symbol}"
    response = requests.get(api_url)
    return response.json()
