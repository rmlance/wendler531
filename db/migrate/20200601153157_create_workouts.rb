class CreateWorkouts < ActiveRecord::Migration[5.2]
  def change
    create_table :workouts do |t|
      t.string :format, null: false
      t.integer :projected_1rm
      t.boolean :completed, null: false, default: false
      t.timestamps null: false

      t.belongs_to :lift
    end
  end
end
