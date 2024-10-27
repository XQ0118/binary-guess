export function getRandomTargetNumber(): number {
  return Math.floor(Math.random() * 101);
}
const happyEmojis = [
  '😀', '😃', '😄', '😁', '😆', '😊', '🙂', '🙃', '😉', '😌', 
  '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜',
  '🤪', '🤗', '🤭', '🥳', '🤠', '😎', '🤓', '🧐', '🤡',
];

export function getRandomHappyEmoji(): string {
  const randomIndex = Math.floor(Math.random() * happyEmojis.length);
  return happyEmojis[randomIndex];
}
