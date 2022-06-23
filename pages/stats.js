import Link from 'next/link';
import React from 'react';

import Table from '../components/careerTable';

export default function Stats({ results }) {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Player',
        columns: [
          {
            Header: 'Name',
            accessor: 'player_name',
            width: 200,
            Cell: (e) => (
              <>
                <Link href={`/players/${e.row?.original?.player_id}`}>
                  <a>{e.row?.original?.player_name}</a>
                </Link>
              </>
            ),
          },
          {
            Header: 'Owner',
            accessor: 'owner',
            width: 80,
          },
        ],
      },
      {
        Header: 'FP',
        accessor: 'fantasy_points',
        width: 50,
        Cell: (e) => (
          <>
            <p>{e.value}</p>
          </>
        ),
      },
      {
        Header: 'Yards',
        accessor: 'pass_yards',
        width: 70,
        Cell: (e) => (
          <>
            <p>{e.value}</p>
          </>
        ),
      },
      {
        Header: 'TDs',
        accessor: 'pass_td',
        width: 70,
        Cell: (e) => (
          <>
            <p>{e.value}</p>
          </>
        ),
      },
      {
        Header: 'Int',
        accessor: 'pass_int',
        width: 70,
        Cell: (e) => (
          <>
            <p>{e.value}</p>
          </>
        ),
      },
      {
        Header: '2 Pt',
        accessor: 'pass_2pt',
        width: 70,
        Cell: (e) => (
          <>
            <p>{e.value}</p>
          </>
        ),
      },
      {
        Header: 'Yards',
        accessor: 'rush_yards',
        width: 70,
        Cell: (e) => (
          <>
            <p>{e.value}</p>
          </>
        ),
      },
      {
        Header: 'Tds',
        accessor: 'rush_td',
        width: 70,
        Cell: (e) => (
          <>
            <p>{e.value}</p>
          </>
        ),
      },
      {
        Header: '2 Pt',
        accessor: 'rush_2pt',
        width: 70,
        Cell: (e) => (
          <>
            <p>{e.value}</p>
          </>
        ),
      },
    ],
    []
  );

  const data = React.useMemo(() => results, []);

  return <Table columns={columns} data={data} />;
}

export async function getStaticProps() {
  try {
    const res = await fetch(
      'https://ethanrmorris.github.io/v1/stats/players/games.json'
    );
    const results = await res.json();

    return {
      props: { results },
    };
  } catch (err) {
    console.error(err);
  }
}
