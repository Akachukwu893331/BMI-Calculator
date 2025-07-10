export function speak(text: string) {
  if (typeof window === 'undefined') return

  const synth = window.speechSynthesis
  const utter = new SpeechSynthesisUtterance(text)
  utter.lang = 'en-US'
  utter.rate = 1
  synth.speak(utter)
}
