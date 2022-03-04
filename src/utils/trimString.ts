export default function trimString(title: string, length?: number): string {
  const num = length || 38;
  if (title.length >= num) {
    const index = title.substring(0, num).lastIndexOf(" ");
    const newTitle = `${title.substring(0, index)}...`;
    return newTitle;
  }
  return title;
}
