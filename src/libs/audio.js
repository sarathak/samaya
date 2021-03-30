export const playTimerComplete = () => {
    let audio = new Audio('/sounds/timer.mp3');
    audio.play();
}