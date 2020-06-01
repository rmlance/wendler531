class Workout < ApplicationRecord
  has_many :setts
  belongs_to :lift
end
