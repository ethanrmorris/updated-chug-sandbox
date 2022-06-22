import { useEffect } from 'react';
import _, { groupBy } from 'underscore';

export default function Schedule({ results }) {
  console.log(results);
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
            <div key={game.id}>
              <p>{game.week}</p>
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
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch('https://ethanrmorris.github.io/v1/schedule.json');
    const data = await res.json();

    const newResults = _.groupBy(data, 'week');

    const results = Object.values(newResults);

    console.log(results);

    return {
      props: { results },
    };
  } catch (err) {
    console.error(err);
  }
}
