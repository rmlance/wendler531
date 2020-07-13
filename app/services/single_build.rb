class SingleBuild

  def initialize(new_max, lift_name, current_user)
    @new_max = new_max
    @lift_name = lift_name
    @current_user = current_user
  end

  def find_lift
    all_lift_records = @current_user.lifts
    lift_owner = nil
    all_lift_records.each do |lift|
      if lift.name == @lift_name
        lift_owner = lift
      end
    end
    build_workouts(lift_owner)
  end

  def build_workouts(lift_owner)
    workout_formats = ["3x5", "3x3", "5-3-1", "Deload"]
    workout_formats.each do |format|
      Workout.create(format: format, projected_1rm: @new_max.to_i, lift_id: lift_owner.id)
    end
    array_length = lift_owner.workouts.length
    new_workouts = lift_owner.workouts[array_length - 4..array_length - 1]
    build_sets(new_workouts)
  end

  def build_sets(new_workouts)
    new_workouts.each do |workout|
      case workout.format
      when "3x5"
        working_percentages = [0.65, 0.75, 0.85]
        rep_count = [5, 5, 5]
        build_set(workout.projected_1rm, working_percentages, rep_count, workout.id)
      when "3x3"
        rep_count = [3, 3, 3]
        working_percentages = [0.70, 0.80, 0.90]
        build_set(workout.projected_1rm, working_percentages, rep_count, workout.id)
      when "5-3-1"
        working_percentages = [0.75, 0.85, 0.95]
        rep_count = [5, 3, 1]
        build_set(workout.projected_1rm, working_percentages, rep_count, workout.id)
      when "Deload"
        rep_count = [5, 5, 5]
        working_percentages = [0.40, 0.50, 0.60]
        build_set(workout.projected_1rm, working_percentages, rep_count, workout.id)
      end
    end
  end

  def build_set(one_rep, working_percentages, rep_count, associated_workout)
    working_max = one_rep * 0.9
    working_percentages.each_with_index do |percentage, index_position|
      working_weight = (working_max * percentage / 5).ceil * 5
      Sett.create(reps: rep_count[index_position], weight: working_weight, workout_id: associated_workout)
    end
  end
end
