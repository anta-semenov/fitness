import { Audio } from 'expo-av'
import { AudioEffect, ThunkAction } from 'types/'

export const playSound = (effect: AudioEffect): ThunkAction => async () => {
  const sound = new Audio.Sound()
  try {
    await sound.loadAsync(getSoundFileForEffect(effect))
    await sound.playAsync()
  } catch (error) {
    // An error occurred!
  }
}

const getSoundFileForEffect = (effect: AudioEffect): any => {
  switch (effect) {
    case AudioEffect.Attention: return require('../../assets/sound/Attention.mp3')
    case AudioEffect.Ready: return require('../../assets/sound/Ready.mp3')
    case AudioEffect.Go: return require('../../assets/sound/Go.mp3')
  }
}
