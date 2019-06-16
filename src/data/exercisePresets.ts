import { Exercise, ExerciseType } from 'types/'

const exerciseDuration = 40
const exerciseRestDuration = 20
const warmUpDuration = 30
const warmUpRestDuration = 5

export const pause = (name: string = 'Pause'): Exercise => ({
  type: ExerciseType.Pause,
  duration: 0,
  name,
})

export const exerciseRest: Exercise = {
  type: ExerciseType.Rest,
  duration: exerciseRestDuration,
  name: 'Rest',
}

export const exerciseRoundRest: Exercise = {
  type: ExerciseType.Rest,
  duration: 40,
  name: 'Rest',
}

export const warmUpRest: Exercise = {
  type: ExerciseType.Rest,
  duration: warmUpRestDuration,
  name: 'Rest',
}

export const pushUps: Exercise[] = [
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Push ups',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Stagger push ups',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Commander push ups',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Narror push ups',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Side by side push ups',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Wide push ups',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Side plank push ups',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Alligator push ups',
    description: 'Подводишь колено к локтю в нижней части'
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Limb raise push ups',
    description: 'В верхней фазе поднимаешь противоположные ногу и руку вверх и в сторону'
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Narrow to wide push ups',
    description: 'Переходишь из узких в широкие отжимания "прыжком"'
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Plyo push ups',
    description: 'В верхней фазе делаешь прыжок и дотрагиваешься руками до груди'
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Push ups shoulder taps',
    description: 'Касаешься плеча противоположной рукой в верхней фазе'
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Typewriter push ups',
    description: 'Руки широко, при отжиманиях поочередно переносишь тело к одной из рук, в верхней фазе в центре'
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Single leg push ups',
    description: 'Поочередно поднимаешь одну ногу'
  },
]

export const pullUps: Exercise = {
  type: ExerciseType.Exercise,
  duration: exerciseDuration,
  name: 'Pull ups',
}

export const handStandPushUps: Exercise = {
  type: ExerciseType.Exercise,
  duration: exerciseDuration,
  name: 'Stand by hand push ups',
}

export const optionalExercisesPart1: Exercise[] = [
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Russian twist',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Low plank knee to elbow',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'High plank knee to elbow',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Beetle',
    description: 'На спине, подтягиваешь ноги и касаешься пяток руками',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Bicycle crunches',
    description: 'Велосипед на спине, касаешься локтями коленей в верхней фазе',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'High plank knee crosses',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Low plank knee crosses',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'High plank limb raises',
    description: 'Стоишь в планке, поднимаешь противоположные руку и ногу вверх и в сторону',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Leg raises',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Knee tuck crunches',
    description: 'Подтягиваешь колени к груди в V стойке',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'High side plank',
    needPair: true,
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Low side plank',
    needPair: true,
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Low side plank leg lift',
    needPair: true,
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Low side plank star',
    description: 'Нижняя планка на боку с поднятыми вверх рукой и ного (взезда)',
    needPair: true,
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Side plank oblique crunch',
    description: 'Нижняя планка на боку, двигаешь таз вверх/вниз',
    needPair: true,
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Low plank arm reaches',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Low plank crunches',
    description: 'В нижней планке сводишь противоположные колено и локоть',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Low plank twist',
    description: 'В нижней планке поворачиваешь корпус (таз) и касаешься бедром пола',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Reverse plank',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Crunches',
    description: 'Чуть приподнимаешь тело, верхний пресс',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Table top crunches',
    description: 'Чуть приподнимаешь тело, верхний пресс, ноги 90 градусов и согнуты в коленях',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Scissor kicks',
    description: 'Ножницы ногами',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Superman pull',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Superman',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Prone X',
    description: 'Как супермен, но разводишь руки и ноги в стороны',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Skier ABS',
    description: 'Стоишь в высокой планке, прыжком переводишь ноги вперед и в сторону',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'V-ups',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Triceps dip',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'High plank leg lift',
  },
]

export const optionalExercisesPart2: Exercise[] = [
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Rockstars',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Jumping jacks',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Clap jacks',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: '180 jumps',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Mountain clumbers',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Wide mountain clumbers',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Speed skaters',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Squats',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Narrow squats',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Overhead squats',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Prisoner squats',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Squat to high knee',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Pistol squats',
    switchInTheMiddle: true,
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Plie squats',
    description: 'Приседания с широко расставленными ногами (на ширине борда)',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Wall sit',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Marching wall sit',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Backward lunges',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Forward lunges',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Twist forward lunges',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Touchdown lunges',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Pivot lunges',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Lunge to high knee',
    switchInTheMiddle: true,
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Pendulum lunges',
    description: 'Из заднего переходим сразу в передний',
    switchInTheMiddle: true,
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Curtsy lunges',
    description: 'Отводишь ногу в сторону'
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Calf raises',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Crab bridge',
    description: 'Стоишь буквой П и опускаешь таз до пола и обратно',
  },
  {
    type: ExerciseType.Exercise,
    duration: exerciseDuration,
    name: 'Bridge',
  },

]

export const warmUpBody: Exercise[] = [
  {
    type: ExerciseType.WarmUp,
    duration: warmUpDuration,
    name: 'Catcow',
  },
  {
    type: ExerciseType.WarmUp,
    duration: warmUpDuration,
    name: 'Plank do down dog',
  },
  {
    type: ExerciseType.WarmUp,
    duration: warmUpDuration,
    name: 'Star toe touches',
  },
  {
    type: ExerciseType.WarmUp,
    duration: warmUpDuration,
    name: 'Quadruped limb raises',
  },
]

export const warmUpArms: Exercise[] = [
  {
    type: ExerciseType.WarmUp,
    duration: warmUpDuration,
    name: 'Arm circles forward',
  },
  {
    type: ExerciseType.WarmUp,
    duration: warmUpDuration,
    name: 'Arm circles backward',
  },
  {
    type: ExerciseType.WarmUp,
    duration: warmUpDuration,
    name: 'Wall lateral pull downs',
  },
  {
    type: ExerciseType.WarmUp,
    duration: warmUpDuration,
    name: 'Punches',
  },
]

export const warmUpLegs: Exercise[] = [
  {
    type: ExerciseType.WarmUp,
    duration: warmUpDuration,
    name: 'Squats',
  },
  {
    type: ExerciseType.WarmUp,
    duration: warmUpDuration,
    name: 'Walking high knees',
  },
  {
    type: ExerciseType.WarmUp,
    duration: warmUpDuration,
    name: 'Forward lunges',
  },
  {
    type: ExerciseType.WarmUp,
    duration: warmUpDuration,
    name: 'Backward lunges',
  },
  {
    type: ExerciseType.WarmUp,
    duration: warmUpDuration,
    name: 'Hip openers',
  },
  {
    type: ExerciseType.WarmUp,
    duration: warmUpDuration,
    name: 'Calf raises',
  },
  {
    type: ExerciseType.WarmUp,
    duration: warmUpDuration,
    name: 'Rockstars',
  },
  {
    type: ExerciseType.WarmUp,
    duration: warmUpDuration,
    name: 'Jumping jacks',
  },
]

export const afterWorkout: Exercise[] = [
  warmUpRest,
  {
    type: ExerciseType.Exercise,
    duration: 55,
    name: 'Boarder pulsing squats',
  },
  {
    type: ExerciseType.Exercise,
    duration: 0,
    name: 'Sit ups 100',
  },
  warmUpRest,
  {
    type: ExerciseType.Exercise,
    duration: 60,
    name: 'Boarder pulsing squats',
  },
  {
    type: ExerciseType.Done,
    duration: 0,
    name: 'Workout completed!'
  }
]
