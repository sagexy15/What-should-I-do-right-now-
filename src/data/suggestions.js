// Gentle, kind suggestions — no productivity pressure.
// mood: null = general; or tired, anxious, bored, overwhelmed, okay, playful
// style: minimal | playful
// energy: calming | energizing

export const suggestions = [
  { text: 'drink some water 💧', mood: null, energy: 'calming', style: 'minimal' },
  { text: 'take three slow breaths.', mood: null, energy: 'calming', style: 'minimal' },
  { text: 'look out a window for a minute.', mood: null, energy: 'calming', style: 'minimal' },
  { text: 'stretch your arms above your head.', mood: null, energy: 'calming', style: 'minimal' },
  { text: 'put on a song you love.', mood: null, energy: null, style: 'minimal' },
  { text: 'step outside for one breath of fresh air.', mood: null, energy: 'calming', style: 'minimal' },
  { text: 'close your eyes and count to ten slowly.', mood: 'anxious', energy: 'calming', style: 'minimal' },
  { text: 'name three things you can see right now.', mood: 'anxious', energy: 'calming', style: 'minimal' },
  { text: 'put your hand on your chest and feel your heartbeat.', mood: 'anxious', energy: 'calming', style: 'minimal' },
  { text: 'say out loud: "i don\'t have to figure it all out right now."', mood: 'overwhelmed', energy: 'calming', style: 'minimal' },
  { text: 'write one small thing that would feel good to do — no pressure.', mood: 'overwhelmed', energy: 'calming', style: 'minimal' },
  { text: 'close your eyes and just sit. that\'s enough.', mood: 'overwhelmed', energy: 'calming', style: 'minimal' },
  { text: 'lie down for five minutes. set a timer if you like.', mood: 'tired', energy: 'calming', style: 'minimal' },
  { text: 'have a small snack if your body wants one.', mood: 'tired', energy: 'calming', style: 'minimal' },
  { text: 'do nothing on purpose for a little bit.', mood: 'tired', energy: 'calming', style: 'minimal' },
  { text: 'doodle something silly — no skill required.', mood: 'bored', energy: null, style: 'playful' },
  { text: 'hum or sing a little. nobody\'s listening.', mood: 'bored', energy: 'energizing', style: 'playful' },
  { text: 'find one thing in the room that makes you smile.', mood: 'bored', energy: null, style: 'minimal' },
  { text: 'text someone you haven\'t talked to in a while — just to say hi.', mood: 'okay', energy: null, style: 'minimal' },
  { text: 'move your body in a way that feels good — even just a little.', mood: 'okay', energy: 'energizing', style: 'minimal' },
  { text: 'make a warm drink and hold the cup for a minute.', mood: 'okay', energy: 'calming', style: 'minimal' },
  { text: 'do a tiny silly dance. really.', mood: 'playful', energy: 'energizing', style: 'playful' },
  { text: 'say something nice to yourself out loud.', mood: 'playful', energy: null, style: 'playful' },
  { text: 'stand up and shake out your hands and feet.', mood: null, energy: 'energizing', style: 'minimal' },
  { text: 'open a window and listen.', mood: null, energy: 'calming', style: 'minimal' },
  { text: 'rest your eyes away from the screen for sixty seconds.', mood: null, energy: 'calming', style: 'minimal' },
  { text: 'notice one thing that\'s okay right now.', mood: null, energy: 'calming', style: 'minimal' },
  { text: 'it\'s okay to do nothing. try it for a minute.', mood: null, energy: 'calming', style: 'minimal' },
  { text: 'put on something cozy — a blanket, a sweater.', mood: null, energy: 'calming', style: 'minimal' },
  { text: 'write down one thought and then let it go.', mood: null, energy: 'calming', style: 'minimal' },
];

export const moods = [
  { id: 'tired', label: 'tired' },
  { id: 'anxious', label: 'anxious' },
  { id: 'bored', label: 'bored' },
  { id: 'overwhelmed', label: 'overwhelmed' },
  { id: 'okay', label: 'okay' },
  { id: 'playful', label: 'playful' },
];

// Category filter for dashboard — maps to energy/style
export const categories = [
  { id: 'reset', title: 'Reset', description: 'Breathing and grounding', icon: '🌬', energy: 'calming', style: 'minimal' },
  { id: 'move', title: 'Move', description: 'Gentle physical action', icon: '🚶', energy: 'energizing', style: 'minimal' },
  { id: 'pause', title: 'Pause', description: 'Small intentional breaks', icon: '☕', energy: 'calming', style: 'minimal' },
  { id: 'focus', title: 'Focus', description: 'Light structured tasks', icon: '🧠', energy: 'calming', style: 'minimal' },
  { id: 'create', title: 'Create', description: 'Creative reset', icon: '🎨', energy: null, style: 'playful' },
  { id: 'relax', title: 'Relax', description: 'Music or calming games', icon: '🎧', energy: 'calming', style: 'minimal' },
];

export function pickSuggestion(options = {}) {
  const { mood = null, energy = null, style = 'minimal', excludeText = null, category = null, searchQuery = null } = options;
  let pool = suggestions.filter((s) => s.text !== excludeText);

  if (searchQuery && searchQuery.trim()) {
    const q = searchQuery.trim().toLowerCase();
    const searchMatch = pool.filter((s) => s.text.toLowerCase().includes(q));
    if (searchMatch.length) pool = searchMatch;
  }

  const cat = category ? categories.find((c) => c.id === category) : null;
  const useEnergy = cat ? cat.energy : energy;
  const useStyle = cat ? cat.style : style;
  const useMood = mood === 'unsure' ? null : mood;

  if (useMood) {
    const moodMatch = pool.filter((s) => s.mood === useMood);
    if (moodMatch.length) pool = moodMatch;
  }
  if (useEnergy) {
    const energyMatch = pool.filter((s) => s.energy === useEnergy || s.energy === null);
    if (energyMatch.length) pool = energyMatch;
  }
  if (useStyle) {
    const styleMatch = pool.filter((s) => s.style === useStyle || s.style === null);
    if (styleMatch.length) pool = styleMatch;
  }

  return pool[Math.floor(Math.random() * pool.length)] || suggestions[0];
}
