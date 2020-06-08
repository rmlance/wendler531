class LiftSerializer < ActiveModel::Serializer
  attributes :id, :name, :initial_1rm

  has_many :workouts
end
