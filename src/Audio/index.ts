export function playSFX(clip: string): void {
  var audioSFX = new Audio();
  switch (clip) {
    case 'jump': {
      audioSFX.src = './assets/audio/sfx/sfx_jump.mp3';
      break;
    }
    case 'collect': {
      audioSFX.src = './assets/audio/sfx/sfx_collect.mp3';
      break;
    }
    case 'gameOverLost': {
      audioSFX.src = './assets/audio/sfx/sfx_game_over_lost.mp3';
      break;
    }
    case 'gameOverWin': {
      audioSFX.src = './assets/audio/sfx/sfx_game_over_win.mp3';
      break;
    }
    case 'gameStart': {
      audioSFX.src = './assets/audio/sfx/sfx_game_start.mp3';
      break;
    }
    case 'lastCollect': {
      audioSFX.src = './assets/audio/sfx/sfx_last_collect.mp3';
      break;
    }
    case 'levelUp': {
      audioSFX.src = './assets/audio/sfx/sfx_level_up.mp3';
      break;
    }
    case 'press_button': {
      audioSFX.src = './assets/audio/sfx/sfx_press_button.mp3';
      break;
    }
    case 'timeUp': {
      audioSFX.src = './assets/audio/sfx/sfx_time_up.mp3';
      break;
    }
    case 'timeWarning': {
      audioSFX.src = './assets/audio/sfx/sfx_time_warning.mp3';
      break;
    }
    case 'trap': {
      audioSFX.src = './assets/audio/sfx/sfx_trap.mp3';
      break;
    }
    default: {
      audioSFX.src = '';
      break;
    }
  }
  audioSFX.play();
}

let audioBg = new Audio();
export function playBgMusic(clip: string): void {
  switch (clip) {
    case 'dinosaurEra': {
      audioBg.src = './assets/audio/bg_music/bg_music_dinosaur_era.mp3';
      break;
    }
    case 'medivalEra': {
      audioBg.src = './assets/audio/bg_music/bg_music_medival_era.mp3';
      break;
    }
    case 'currentEra': {
      audioBg.src = './assets/audio/bg_music/bg_music_current_era.mp3';
      break;
    }

    default: {
      audioBg.src = '';
      break;
    }
  }
  audioBg.play();
}

export function stopBGM() {
  audioBg.pause();
}
