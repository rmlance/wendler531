class CreateSetts < ActiveRecord::Migration[5.2]
  def change
    create_table :setts do |t|
      t.integer :reps, null: false
      t.integer :weight, null: false
      t.integer :projected_1rm
      t.timestamps null: false

      t.belongs_to :workout
    end
  end
end
