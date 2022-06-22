import { useEffect } from 'react';

export default function Schedule({ results }) {
  return (
    <>
      <div className="max-w-[1200px] mx-auto text-center">
        <h1 className="text-3xl font-bold">Schedule</h1>
        <select className="h-12 w-1/2 bg-blue-200 my-4">
          {[2020, 2021, 2022].map((week) => (
            <option>{week}</option>
          ))}
        </select>
        <div>
          {results.map((game) => (
            <h2>
              <span
                className={
                  game.team_points > game.opponent_points ? 'font-bold' : null
                }
              >
                {game.team} {game.team_points}
              </span>{' '}
              -{' '}
              <span
                className={
                  game.opponent_points > game.team_points ? 'font-bold' : null
                }
              >
                {game.opponent_points} {game.opponent}
              </span>
            </h2>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch('https://ethanrmorris.github.io/v1/schedule.json');
    const results = await res.json();

    return {
      props: { results },
    };
  } catch (err) {
    console.error(err);
  }
}
