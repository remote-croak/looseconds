export function playSFX(clip: string): void {
    let audioSFX = new Audio()
    switch(clip) { 
        case 'jump': { 
            audioSFX.src = './assets/audio/sfx/sfx_jump.mp3'
            break; 
        } 
        case 'collect': { 
            audioSFX.src = './assets/audio/sfx/sfx_collect.mp3'
            break; 
        }
        case 'win': { 
            audioSFX.src = './assets/audio/sfx/sfx_game_over_win.mp3'
            break; 
        }
        case 'lose': { 
            audioSFX.src = './assets/audio/sfx/sfx_game_over_lost.mp3'
            break; 
        } 
        default: { 
            audioSFX.src = ''
            break; 
        } 
    }
    audioSFX.play()
}