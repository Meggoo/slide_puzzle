export default function format_time(seconds) {
  const secondsInMinute = 60;
  const secondsInHour = secondsInMinute * 60;
  const hours = ~~(seconds / secondsInHour);
  const minutes = ~~((seconds % secondsInHour) / secondsInMinute);

  return { hours, minutes, seconds: ~~(seconds % secondsInMinute) };
}
