const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const back5 = document.getElementById('back-5');
const fwd5 = document.getElementById('forward-5');
const progress = document.getElementById('progress');
const trackTitle = document.getElementById('track-title');
const trackTime = document.getElementById('track-time');
const playlistEl = document.getElementById('playlist');

let currentIndex = -1;
let isPlaying = false;

function formatTime(sec){
  if (!isFinite(sec)) return '00:00';
  const m = Math.floor(sec/60).toString().padStart(2,'0');
  const s = Math.floor(sec%60).toString().padStart(2,'0');
  return `${m}:${s}`;
}

function loadTrack(index){
  const items = playlistEl.querySelectorAll('li');
  if (index < 0 || index >= items.length) return;
  items.forEach(i=>i.classList.remove('active'));
  const li = items[index];
  li.classList.add('active');
  const src = li.dataset.src;
  audio.src = src;
  trackTitle.textContent = li.textContent;
  currentIndex = index;
  audio.load();
}

playlistEl.addEventListener('click', (e)=>{
  const li = e.target.closest('li');
  if(!li) return;
  const items = Array.from(playlistEl.querySelectorAll('li'));
  const idx = items.indexOf(li);
  if (idx === currentIndex){
    // toggle play/pause
    togglePlay();
  } else {
    loadTrack(idx);
    play();
  }
});

function play(){
  audio.play().then(()=>{
    isPlaying = true;
    playBtn.textContent = 'Pause';
  }).catch(err=>{
    console.warn('Playback failed:', err);
  });
}

function pause(){
  audio.pause();
  isPlaying = false;
  playBtn.textContent = 'Play';
}

function togglePlay(){
  if (!audio.src) return;
  if (isPlaying) pause(); else play();
}

playBtn.addEventListener('click', ()=>{
  togglePlay();
});

back5.addEventListener('click', ()=>{
  if(!audio.src) return;
  audio.currentTime = Math.max(0, audio.currentTime - 5);
});

fwd5.addEventListener('click', ()=>{
  if(!audio.src) return;
  audio.currentTime = Math.min(audio.duration || Infinity, audio.currentTime + 5);
});

audio.addEventListener('loadedmetadata', ()=>{
  progress.max = Math.floor(audio.duration);
  trackTime.textContent = `0:00 / ${formatTime(audio.duration)}`;
});

audio.addEventListener('timeupdate', ()=>{
  progress.value = Math.floor(audio.currentTime);
  trackTime.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
});

progress.addEventListener('input', (e)=>{
  audio.currentTime = Number(e.target.value);
});

audio.addEventListener('play', ()=>{ isPlaying = true; playBtn.textContent = 'Pause'; });
audio.addEventListener('pause', ()=>{ isPlaying = false; playBtn.textContent = 'Play'; });

// set first track to default (optional)
// loadTrack(0);
