const formattedDate = (args) => {
  const date = new Date(args);
  return new Intl.DateTimeFormat('eu-DE', {
    year: 'numeric',
    month: 'numeric',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  }).format(date);
};

export default formattedDate;