class Workout < ApplicationRecord
  validates :format, presence: true

  has_many :setts
  belongs_to :lift
end
