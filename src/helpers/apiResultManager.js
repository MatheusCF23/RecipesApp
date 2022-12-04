export default function apiResultManager(data) {
  if (data === null) {
    return global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }
  return data;
}
