document.addEventListener('keydown', onKeyDown);
const recordButtons = [document.getElementById('record1'), document.getElementById('record2'), document.getElementById('record3'), document.getElementById('record4')];
const playButtons = [document.getElementById('play1'), document.getElementById('play2'), document.getElementById('play3'), document.getElementById('play4')];
const playAllButton = document.getElementById('playAll');
let isRecording = false;
let lastKeyPressTime = 0;
let currentChannelIndex = -1;
const recordedSounds = [
  { isRecording: false, recordedKeys: [] },
  { isRecording: false, recordedKeys: [] },
  { isRecording: false, recordedKeys: [] },
  { isRecording: false, recordedKeys: [] }
];

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
};

function onKeyDown(event) {
  const sound = KeyToSound[event.key];
  if (isRecording) {
    const currentTime = new Date().getTime();
    const timeSinceLastKeyPress = currentTime - lastKeyPressTime;
    if (currentChannelIndex !== -1) {
      recordKey(event.key, timeSinceLastKeyPress, currentChannelIndex);
    }
    lastKeyPressTime = currentTime;
  }
  playSound(sound);
}

function playSound(sound) {
  if (sound) {
    sound.currentTime = 0;
    sound.play();
  }
}

function recordKey(key, timeSinceLastKeyPress, channelIndex) {
  recordedSounds[channelIndex].recordedKeys.push({ type: 'key', value: key, duration: timeSinceLastKeyPress });
}

function startRecording(channel, recordBtn, index) {
  channel.isRecording = true;
  channel.recordedKeys = [];
  recordBtn.textContent = "Stop";
  currentChannelIndex = index;
  lastKeyPressTime = new Date().getTime();
}

function stopRecording(channel, recordBtn) {
    recordBtn.textContent = "Record";
    channel.isRecording = false;
    currentChannelIndex = -1;
    displayTotalTime(recordedSounds.indexOf(channel));
  }

function displayTotalTime(channelIndex) {
  const channelElement = document.getElementById(`channel${channelIndex + 1}`);
  const channel = recordedSounds[channelIndex];
  const totalTime = channel.recordedKeys.reduce((total, entry) => total + entry.duration, 0);
  const formattedTime = formatTime(totalTime);
  channelElement.textContent = `Total Time: ${formattedTime}`;
}

function formatTime(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

recordButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    isRecording = !isRecording;
    const currentChannel = recordedSounds[index];
    if (isRecording) {
      startRecording(currentChannel, button, index);
    } else {
      stopRecording(currentChannel, button);
      displayTotalTime(currentChannelIndex);
    }
  });
});

playButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    playRecordedKeys(index);
  });
});

playAllButton.addEventListener('click', () => {
  playAllChannels();
  setTimeout(() => {
    recordedSounds.forEach((channel, index) => {
      displayTotalTime(index);
    });
  }, 0);
});

function playRecordedKeys(channelIndex) {
  recordedSounds[channelIndex].recordedKeys.forEach((entry, index) => {
    setTimeout(() => {
      playSound(KeyToSound[entry.value]);
    }, entry.duration);
  });
}

function playAllChannels() {
  recordedSounds.forEach((channel, index) => {
    playRecordedKeys(index);
  });
}
  
