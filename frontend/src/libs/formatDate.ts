export const formatDate = (iso: string) => {
  const date = new Date(iso)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${day}-${month}`
}

export const formatWordDate = (iso: string, option?: {timeZone?: string}) =>{
  if (!iso) return ''
  const date = new Date(iso)
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    // hour: '2-digit',
    // minute: '2-digit',
    // hour12: true,
    timeZone: option?.timeZone || 'UTC',
  };

  return new Intl.DateTimeFormat('en-US', defaultOptions).format(date);
}