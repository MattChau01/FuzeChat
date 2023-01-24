export default function FindRoom(hashRoute) {
  const split = hashRoute.split('&');
  return split[1];
}
