export default function NewUser(hashRoute) {
  const first = hashRoute.split('?');
  const second = first[2].split('=');
  return second[0];
}
