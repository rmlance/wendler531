class CreateLifts < ActiveRecord::Migration[5.2]
  def change
    create_table :lifts do |t|
      t.string :name, null: false
      t.integer :initial_1rm, null: false
      t.timestamps null: false

      t.belongs_to :user
    end
  end
end
