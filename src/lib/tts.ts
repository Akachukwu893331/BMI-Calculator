export async function speak(text: string): Promise<void> {
  if (!window.speechSynthesis) {
    console.warn('Text-to-speech is not supported in this browser.');
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;

  return new Promise((resolve) => {
    utterance.onend = () => resolve();
    window.speechSynthesis.speak(utterance);
  });
}
