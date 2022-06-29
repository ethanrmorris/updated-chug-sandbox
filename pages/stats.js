import Link from 'next/link';
import React from 'react';

import Table from '../components/careerTable';
import { supabase } from '../utils/supabaseClient';

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
            accessor: 'owner_id.team',
            width: 175,
          },
        ],
      },
      {
        Header: 'Year',
        accessor: 'year',
        width: 60,
        Cell: (e) => (
          <>
            <p className="text-right">{e.value}</p>
          </>
        ),
      },
      {
        Header: 'Week',
        accessor: 'week',
        width: 60,
        Cell: (e) => (
          <>
            <p className="text-right">{e.value}</p>
          </>
        ),
      },
      {
        Header: 'FP',
        accessor: 'fantasy_points',
        width: 50,
        sortType: 'basic',
        Cell: (e) => (
          <>
            <p className="tabular-nums text-right">{e.value.toFixed(2)}</p>
          </>
        ),
      },
      {
        Header: 'Yards',
        accessor: 'pass_yards',
        width: 70,
        Cell: (e) => (
          <>
            <p className="text-right">{e.value}</p>
          </>
        ),
      },
      {
        Header: 'TDs',
        accessor: 'pass_td',
        width: 70,
        Cell: (e) => (
          <>
            <p className="text-right">{e.value}</p>
          </>
        ),
      },
      {
        Header: 'Int',
        accessor: 'pass_int',
        width: 70,
        Cell: (e) => (
          <>
            <p className="text-right">{e.value}</p>
          </>
        ),
      },
      {
        Header: '2 Pt',
        accessor: 'pass_2pt',
        width: 70,
        Cell: (e) => (
          <>
            <p className="text-right">{e.value}</p>
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
    const { data: results } = await supabase
      .from('players_games')
      .select(
        `
        id,
        player_name,
        player_id,
        position, 
        owner_id (
          team
        ),
        year,
        week,
        fantasy_points,
        pass_yards,
        pass_td,
        pass_int,
        pass_2pt
        
      `
      )
      .lt('week', 18)
      .order('fantasy_points', { ascending: false });

    return {
      props: { results },
    };
  } catch (err) {
    console.error(err);
  }
}
