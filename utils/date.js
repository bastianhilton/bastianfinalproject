function formatDate(dateString) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
  
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    const formattedDate = `${month} ${day}, ${year}`;
  
    return `${formattedDate} at ${formattedTime}`;
  }
  