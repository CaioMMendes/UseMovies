interface TimeConversorProps {
  time: number;
}

export default function timeConversor({ time }: TimeConversorProps) {
  if (time === 60) return "1 hora";
  if (time < 60) return `${time} minutos`;
  if (time % 60 === 0) return `${Math.floor(time / 60)}horas`;
  if (time % 60 > 0) return `${Math.floor(time / 60)}h ${time % 60} minutos`;
}
