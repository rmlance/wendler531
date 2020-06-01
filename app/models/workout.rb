class Workout < ApplicationRecord
  validates :format, :timestamps, presence: true

  has_many :setts
  belongs_to :lift
end
