class Lift < ApplicationRecord
  validates :name, presence: true

  has_many :workouts
  belongs_to :user
end
