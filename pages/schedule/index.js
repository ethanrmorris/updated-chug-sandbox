import Link from 'next/link';
import { useState } from 'react';
import FilterDropdown from '../../components/FilterDropdown';
import MiniBoxScore from '../../components/MiniBoxScore';
// import _, { groupBy } from 'underscore';

const weeks = [
  { week: 1, name: '1' },
  { week: 2, name: '2' },
  { week: 3, name: '3' },
  { week: 4, name: '4' },
  { week: 5, name: '5' },
  { week: 6, name: '6' },
  { week: 7, name: '7' },
  { week: 8, name: '8' },
  { week: 9, name: '9' },
  { week: 10, name: '10' },
  { week: 11, name: '11' },
  { week: 12, name: '12' },
  { week: 13, name: '13' },
  { week: 14, name: '14' },
  { week: 15, name: 'Wildcard Weekend' },
  { week: 16, name: 'Semi Finals' },
  { week: 17, name: 'Chug Cup Final' },
  { week: 18, name: 'Pro Bowl' },
];

const years = [
  { year: 2022, name: '2022' },
  { year: 2021, name: '2021' },
  { year: 2020, name: '2020' },
];

export default function Schedule({ results }) {
  const [week, setWeek] = useState(weeks[0]);
  const [year, setYear] = useState(years[0]);

  const filtered = !year
    ? results
    : results.filter(
        (obj) =>
          obj.year === year.year.toString() && obj.week === week.week.toString()
      );

  return (
    <>
      <div className="max-w-[1200px] mx-auto text-center">
        <h1 className="text-3xl font-bold">Schedule</h1>
        <div className="flex gap-6 w-1/2 mx-auto my-6">
          <FilterDropdown state={week} setState={setWeek} listArray={weeks} />
          <FilterDropdown state={year} setState={setYear} listArray={years} />
        </div>
        <div className="flex flex-col gap-4 max-w-[800px] mx-auto">
          {filtered.map((game) => (
            <MiniBoxScore
              id={game.id}
              week={game.week}
              year={game.year}
              team={game.team}
              opponent={game.opponent}
              teamPoints={game.team_points}
              opponentPoints={game.opponent_points}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch('https://ethanrmorris.github.io/v1/schedule.json');
    // const data = await res.json();
    const results = await res.json();

    // const newResults = _.groupBy(data, 'week');
    // const results = Object.values(newResults);

    console.log(results);

    return {
      props: { results },
    };
  } catch (err) {
    console.error(err);
  }
}
