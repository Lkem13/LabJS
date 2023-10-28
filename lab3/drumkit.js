document.addEventListener('keypress', onKeyPress)
const recordButton = document.getElementById('record');
const playButton = document.getElementById('play');
let isRecording = false;
const recordedSounds = [];
const recordedKeys = [];

const main = document.querySelector('main')

const KeyToSound = {
    'a': document.querySelector('#s1'),
    's': document.querySelector('#s2'),
    'd': document.querySelector('#s3'),
    'f': document.querySelector('#s4'),
    'g': document.querySelector('#s5'),
    'h': document.querySelector('#s6'),
    'j': document.querySelector('#s7'),
    'k': document.querySelector('#s8'),
    'l': document.querySelector('#s9')
}

function onKeyPress(event) {
    const sound = KeyToSound[event.key]
    playSound(sound);
    recordKey(event.key);
}
function playSound(sound) {
    if(sound){
    sound.currentTime = 0
    sound.play();
    }
    
}

function recordKey(key){
    recordedKeys.push(key);
}

function startRecording(){
    recordedKeys.length = 0;
}

function stopRecording(){
    recordedKeys.length > 0 ? recordedSounds.push([...recordedKeys]) : null;
    main.innerHTML = `Queue: ${[recordedKeys]}`
}

recordButton.addEventListener('click', ()=>{
    if(!isRecording){
        startRecording();
        recordButton.textContent = 'Stop';
    }else{
        stopRecording();
        recordButton.textContent = 'Record';
    }
    isRecording = !isRecording;
})

playButton.addEventListener('click', ()=>{
    playRecordedKeys();
})