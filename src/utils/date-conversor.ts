export default function dateConveror(date: string) {
  const dateConverted = new Date(date + "T00:00").toLocaleDateString();
  return dateConverted;
}
