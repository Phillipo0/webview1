const notes = {
  "C": 261.63, 
  "D": 293.66, 
  "E": 329.63, 
  "F": 349.23, 
  "G": 392.00, 
  "A": 440.00, 
  "B": 493.88  
};

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playNote(note) {
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  osc.type = "sine"; 
  osc.frequency.value = notes[note];

  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);

  osc.start();
  osc.stop(audioCtx.currentTime + 1);
}

document.querySelectorAll(".key").forEach(key => {
  key.addEventListener("click", () => {
    const note = key.getAttribute("data-note");
    playNote(note);
  });
});
