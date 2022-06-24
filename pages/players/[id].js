import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

import Table from '../../components/careerTable';

import { nflTeams } from '../../utils/nflTeams';

export default function Player({ results }) {
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

  const data = React.useMemo(() => results.stats, []);

  return (
    <div className="bg-white shadow-md">
      <div className="w-full h-60 bg-gradient-to-r from-violet-600 to-purple-900 shadow-md mt-[-1rem]"></div>
      <div className="relative h-36 w-36 bg-white rounded-full mt-[-6rem] mx-auto">
        <Image
          src={`https://sleepercdn.com/content/nfl/players/${results.player_id}.jpg`}
          alt={results.full_name}
          layout="fill"
          objectFit="cover"
          className="rounded-full"
        ></Image>
      </div>
      <div className="flex items-center justify-center py-4 text-3xl font-semibold">
        <h1 className="">{results.full_name}</h1>
        <span className="px-2">|</span>
        <span className="">#{results.number}</span>
      </div>
      <div className="flex items-center justify-center pb-4 text-xl">
        <p>{results.fantasy_positions[0]}</p>
        <span className="px-2">|</span>
        <p>
          {Math.floor(results.height / 12)}&apos;
          {results.height - Math.floor(results.height / 12) * 12}&quot;
        </p>
        <span className="px-2">|</span>
        <p>{results.weight} lb</p>
        <span className="px-2">|</span>
        <p>Age: {results.age}</p>
        <span className="px-2">|</span>
        <p>{results.college}</p>
        <span className="px-2">|</span>
        <div className="flex items-center">
          <div className="relative h-7 w-7">
            <Image
              src={
                results.team
                  ? `https://sleepercdn.com/images/team_logos/nfl/${results.team.toLowerCase()}.png`
                  : `/logo.webp`
              }
              alt="Team Logo"
              layout="fill"
              objectFit="contain"
            ></Image>
          </div>
          <p className="pl-2">{nflTeams[results.team]}</p>
        </div>
      </div>
      <div className="relative h-36 w-36">
        <Image
          src={results.asmc ? `/logo-${results.asmc}.webp` : `/logo.webp`}
          alt="Logo"
          layout="fill"
          objectFit="contain"
        ></Image>
      </div>
      <div className="pt-12">
        <h4>Rushing</h4>
        {!results.stats === [null] ? (
          <Table columns={columns} data={data} />
        ) : (
          'No Stats Accrued'
        )}
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

    const cleanSingle = [];
    careerSingle ? cleanSingle.push(careerSingle) : cleanSingle.push(null);

    const results = {
      ...lastResults,
      asmc: ownerName ? ownerName : null,
      stats: cleanSingle,
    };

    console.log(results);

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
