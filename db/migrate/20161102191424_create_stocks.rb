class CreateStocks < ActiveRecord::Migration[5.0]
  def change
    create_table :stocks do |t|
      t.string :exchange_symbol
      t.string :stock_symbol
      t.integer :option_day
      t.integer :option_month
      t.integer :option_year

      t.timestamps
    end
  end
end
