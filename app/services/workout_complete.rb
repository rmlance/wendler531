class WorkoutComplete
  def initialize(associated_lift, set_updates)
    @associated_lift = associated_lift
    @set_updates = set_updates
  end

  def make_updates
    todays_workout = @associated_lift.workouts.detect { |workout| workout.completed == false }
    todays_setts = todays_workout.setts[0..2]
    todays_setts.each_with_index do |set, index|
      set.weight = @set_updates[index]
      if index == 2
        set.weight = @set_updates[index]
        set.reps = @set_updates[3]
      end
      set_new_1rm(set, @set_updates[index])
      set.save
    end
    todays_workout.completed = true
    todays_workout.projected_1rm = set_new_1rm(todays_workout.setts[2], @set_updates[2])
    todays_workout.save
  end

  def set_new_1rm(set, new_weight)
    calculated_1rm = (((new_weight * set.reps * 0.0333) + new_weight) / 5).floor * 5
    set.projected_1rm = calculated_1rm
  end
end
