export default function apiResultManager(data) {
  if (data === null || data === undefined) {
    return global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }
  return data;
}
