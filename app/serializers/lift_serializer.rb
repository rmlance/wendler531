class LiftSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :workouts
end
