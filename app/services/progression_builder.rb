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
    all_lifts.each do |lift|
      workout_formats.each do |format|
        Workout.create(format: format, projected_1rm: lift.initial_1rm, lift_id: lift.id)
      end
    end
    build_sets()
  end

  def build_sets
    all_workouts = Workout.all
    count = 0
    all_workouts.each do |workout|
      count += 3
      puts count
    end
  end

end
