export default function FindRoom(hashRoute) {
  const split = hashRoute.split('=');
  // console.log('split', split);
  return split[1];
}
