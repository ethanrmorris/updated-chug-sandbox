import Link from 'next/link';
import React from 'react';

import Table from '../../components/careerTable';

export default function Player({ results, cleanSingle }) {
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

  const data = React.useMemo(() => cleanSingle, []);

  return (
    <div>
      <h3>Players</h3>
      <h5>
        {results.full_name} - {results.number} - {results.asmc}
      </h5>
      <div className="flex">
        <img
          src={`https://sleepercdn.com/content/nfl/players/${results.player_id}.jpg`}
        ></img>
        <img
          src={
            results.team
              ? `https://sleepercdn.com/images/team_logos/nfl/${results.team.toLowerCase()}.png`
              : `/mlb.svg`
          }
        ></img>
      </div>
      <div className="pt-12">
        <h4>Rushing</h4>
        {cleanSingle ? <Table columns={columns} data={data} /> : null}
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://ethanrmorris.github.io/v1/players.json');
  const players = await res.json();
  const newResults = Object.values(players);

  // Get the paths we want to pre-render based on posts
  const paths = newResults.map((player) => ({
    params: { id: player.player_id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  try {
    const [
      playersRes,
      ownersRes,
      rostersRes,
      careerRes,
      seasonsRes,
      detailsRes,
      currentPlayersRes,
    ] = await Promise.all([
      fetch('https://ethanrmorris.github.io/v1/players.json'),
      fetch('https://ethanrmorris.github.io/v1/owners.json'),
      fetch('https://api.sleeper.app/v1/league/784462448236363776/rosters/'),
      fetch('https://ethanrmorris.github.io/v1/stats/players/career.json'),
      fetch(`https://ethanrmorris.github.io/v1/stats/players/seasons.json`),
      fetch('https://ethanrmorris.github.io/v1/stats/players/details.json'),
    ]);
    const [players, owners, rosters, career, seasons, details] =
      await Promise.all([
        playersRes.json(),
        ownersRes.json(),
        rostersRes.json(),
        careerRes.json(),
        seasonsRes.json(),
        detailsRes.json(),
      ]);

    const idsFromRosters = rosters.map((obj) => obj.players).flat();
    const idsFromStats = career.map((obj) => obj.player_id).flat();

    const idsFromCurrentPlayers = [...idsFromRosters, ...idsFromStats];

    const newResults = Object.values(players);

    const newerResults = newResults.filter((x) =>
      idsFromCurrentPlayers.includes(x.player_id)
    );

    const [lastResults] = newerResults.filter((obj) => {
      return obj.player_id === params.id;
    });

    const playerId = lastResults.player_id;

    const currentTeam = rosters.find((team) => team.players.includes(playerId));

    const currentOwner = currentTeam?.roster_id;

    const cleanOwner = owners.find((owner) => owner.id?.includes(currentOwner));

    const ownerName = cleanOwner?.slug;

    const careerResults = Object.values(career);

    const [careerSingle] = careerResults.filter((obj) => {
      return obj.player_id === params.id;
    });

    // console.log(careerSingle);

    // const cleanSingle = [];
    // cleanSingle.push(careerSingle);

    const results = {
      ...lastResults,
      asmc: ownerName ? ownerName : null,
    };

    return {
      props: { results },
    };
  } catch (err) {
    console.error(err);
    return {
      notFound: true,
    };
  }
}
