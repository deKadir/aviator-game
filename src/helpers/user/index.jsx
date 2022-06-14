export function getAvatar(socketId) {
  const id = (socketId.charCodeAt(0) % 10) + 1;
  return require(`assets/images/avatars/${id}.png`);
}
