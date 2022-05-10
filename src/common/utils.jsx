const monthsArray = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const formatDate = (timestamp) => `${timestamp.getDate()} ${
  monthsArray[timestamp.getMonth()]
}, ${timestamp.getFullYear()} 
    `;

export { formatDate };
