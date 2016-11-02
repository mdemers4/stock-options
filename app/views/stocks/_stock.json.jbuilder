json.extract! stock, :id, :exchange_symbol, :stock_symbol, :option_day, :option_month, :option_year, :created_at, :updated_at
json.url stock_url(stock, format: :json)