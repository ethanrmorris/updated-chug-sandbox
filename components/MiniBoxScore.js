import Link from 'next/link';

export default function MiniBoxScore({
  id,
  week,
  year,
  team,
  opponent,
  teamPoints,
  opponentPoints,
}) {
  return (
    <div
      key={id}
      className="min-w-[400px] max-w-[800px] bg-white p-4 shadow-md rounded-md hover:shadow-lg"
    >
      <Link href={`/schedule/${id}`}>
        <a className="grid grid-cols-2">
          <p className="col-span-2">
            Week: {week} - Year: {year}
          </p>
          <div
            className={
              parseInt(teamPoints) > parseInt(opponentPoints)
                ? 'flex justify-between p-6 bg-slate-300'
                : 'flex justify-between p-6 bg-slate-100'
            }
          >
            <h3>{team}</h3>
            <p>{teamPoints}</p>
          </div>
          <div
            className={
              parseInt(opponentPoints) > parseInt(teamPoints)
                ? 'flex justify-between p-6 bg-slate-300'
                : 'flex justify-between p-6 bg-slate-100'
            }
          >
            <p>{opponentPoints}</p>
            <h3>{opponent}</h3>
          </div>
        </a>
      </Link>
    </div>
  );
}
