class Sett < ApplicationRecord
  validates :reps, :weight, :timestamps, :workout_id, presence: true, numericality: true

  belongs_to :workout
end
