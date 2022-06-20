import Link from 'next/link';
import { supabase } from '../../utils/supabaseClient';

export default function Player({ results }) {
  return (
    <div>
      <h3>Players</h3>
      <h5>
        {results.full_name} - {results.number} - {results.asmc}
      </h5>
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
    const [playersRes, ownersRes, rostersRes] = await Promise.all([
      fetch('https://ethanrmorris.github.io/v1/players.json'),
      fetch('https://ethanrmorris.github.io/v1/owners.json'),
      fetch('https://api.sleeper.app/v1/league/784462448236363776/rosters/'),
    ]);
    const [players, owners, rosters] = await Promise.all([
      playersRes.json(),
      ownersRes.json(),
      rostersRes.json(),
    ]);

    const newResults = Object.values(players);

    const [lastResults] = newResults.filter((obj) => {
      return obj.player_id === params.id;
    });

    const playerId = lastResults.player_id;

    const currentTeam = rosters.find((team) => team.players.includes(playerId));

    const currentOwner = currentTeam?.roster_id;

    const cleanOwner = owners.find((owner) => owner.id?.includes(currentOwner));

    const ownerName = cleanOwner?.slug;

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
