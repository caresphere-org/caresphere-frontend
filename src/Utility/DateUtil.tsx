export const formatDate = (date: any) => {
    if (!date) return undefined;
    const d = new Date(date);
    const day = d.getDate();
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = monthNames[d.getMonth()];
    const year = d.getFullYear();
    
    return `${day} ${month} ${year}`;
  };