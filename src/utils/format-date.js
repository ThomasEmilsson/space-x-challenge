export function formatDate(timestamp) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(timestamp));
}

export function formatDateTimeToUserTimeZone(timestamp) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  }).format(new Date(timestamp));
}

export function formatDateTimetoLocalTimeZone(timestamp) {
  const regex = /[+-][0-9]{2}:[0-9]{2}\b/;

  const date = timestamp.replace(regex, "");
  const timeZone = regex.exec(timestamp)[0];
  const minuteZone = timeZone.substring(4, 6);

  const shortTimeZone = `${timeZone.substring(0, 1)}${timeZone.substring(
    1,
    3
  )}`;

  const time = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(new Date(date));

  return `${time} GMT${Number(minuteZone) ? timeZone : Number(shortTimeZone)}`;
}
