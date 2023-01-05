export default function NewUser(hashRoute) {
  const first = hashRoute.split('?');

  // console.log('first: ', first);
  const second = first[2].split('=');
  // console.log('second: ', first);
  return second[0];
}
