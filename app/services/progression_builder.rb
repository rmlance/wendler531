class ProgressionBuilder

  def initialize(new_weight_array)
    @new_weight_array = new_weight_array
  end

  def build_progression
    @new_weight_array.each_with_index do |weight, index|
      case index
      when 0
        lift = "Back Squat"
      when 1
        lift = "Bench Press"
      when 2
        lift = "Deadlift"
      when 3
        lift = "Overhead Press"
      end
      Lift.create(name: lift, initial_1rm: weight, user_id: 1)
    end
    build_workouts()
  end

  def build_workouts
    all_lifts = Lift.all
    workout_formats = ["3x5", "3x3", "5-3-1", "Deload"]
    if first_time_user?()
      all_lifts.each do |lift|
        Workout.create(format: "Initial Data", projected_1rm: lift.initial_1rm, completed: true, lift_id: lift.id)
      end
    end
    all_lifts.each_with_index do |lift, index|
      workout_formats.each do |format|
        Workout.create(format: format, projected_1rm: @new_weight_array[index].to_i, lift_id: lift.id)
      end
    end
    build_sets()
  end

  def build_sets
    all_workouts = Workout.all
    all_workouts.each do |workout|
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

  def first_time_user?
    workout_data = Workout.all
    if workout_data.empty?
      return true
    else
      return false
    end
  end
end
