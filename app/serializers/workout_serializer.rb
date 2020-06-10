class WorkoutSerializer < ActiveModel::Serializer
  attributes :id, :format, :projected_1rm, :completed, :created_at, :updated_at, :lift_id

  has_many :setts
end
