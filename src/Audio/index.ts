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
        default: { 
            audioSFX.src = ''
            break; 
        } 
    }
    audioSFX.play()
}