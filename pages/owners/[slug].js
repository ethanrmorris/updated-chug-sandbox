import Link from 'next/link';

export default function Manager({ results, currentOwner }) {
  return (
    <>
      <h3>{currentOwner[0].team}</h3>
      <div>
        {results.map((player) => (
          <div key={player.id}>
            <Link href={`/players/${player.player_id}`}>
              <a>{`${player.number} ${player.position} ${player.full_name}`}</a>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://ethanrmorris.github.io/v1/owners.json');
  const owners = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = owners.map((owner) => ({
    params: { slug: owner.id },
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

    console.log('slug', parseInt(params.slug));

    const rostersArray = Object.values(rosters);

    const currentRoster = rostersArray.filter((obj) => {
      return obj.roster_id === parseInt(params.slug);
    });

    const currentOwner = owners.filter((obj) => {
      return obj.id === params.slug;
    });

    const filteredUsers = Object.keys(players)
      .filter((key) => currentRoster[0].players.includes(key))
      .reduce((obj, key) => {
        obj[key] = players[key];
        return obj;
      }, {});

    const results = Object.values(filteredUsers).sort((a, b) =>
      a.number > b.number ? 1 : -1
    );

    return {
      props: { results, currentOwner },
    };
  } catch (err) {
    console.error(err);
  }
}
