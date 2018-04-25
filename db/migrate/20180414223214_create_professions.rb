class CreateProfessions < ActiveRecord::Migration[5.1]
  def change
    create_table :professions do |t|
      t.string :title, default: ''
      t.integer :salary, default: 0
      t.integer :savings, default: 0
      t.integer :childCost, default: 0
      t.jsonb :expenses, array: true, default: []
      t.jsonb :debts, array: true, default: []
      t.timestamps
    end
  end
end
