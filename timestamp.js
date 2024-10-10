const now = new Date();

const utcPlus7Time = new Date(now.getTime());

// Format the date and time in ISO 8601 format (YYYY-MM-DDTHH:mm:ss.SSSZ)
const year = utcPlus7Time.getUTCFullYear();
const month = String(utcPlus7Time.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
const day = String(utcPlus7Time.getUTCDate()).padStart(2, '0');
const hours = String(utcPlus7Time.getUTCHours()).padStart(2, '0');
const minutes = String(utcPlus7Time.getUTCMinutes()).padStart(2, '0');
const seconds = String(utcPlus7Time.getUTCSeconds()).padStart(2, '0');
const milliseconds = String(utcPlus7Time.getUTCMilliseconds()).padStart(3, '0');

const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;

console.info(formattedDate);
