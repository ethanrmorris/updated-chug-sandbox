import { supabase } from '../../utils/supabaseClient';

export default function singleGame({ results }) {
  return (
    <>
      <h1>Single Game</h1>
      <h2>{results.id}</h2>
    </>
  );
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const { data: results } = await supabase.from('game_box_score').select('*');

  // Get the paths we want to pre-render based on posts
  const paths = results.map((game) => ({
    params: { id: game.id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  try {
    const { data } = await supabase
      .from('game_box_score')
      .select(
        '*, team_id:owner_id (id, team, slug), opp_id:opponent_id (id, team, slug)'
      )
      .eq('id', params.id);

    const results = data[0];

    const {
      week: gameWeek,
      year: gameYear,
      owner_id: gameOwner,
      opponent_id: gameOpp,
    } = results;
    console.log('results', results);

    console.log('gameWeek', gameWeek);
    console.log('gameYear', gameYear);
    console.log('gameOwner', gameOwner);
    console.log('gameOpp', gameOpp);

    const { data: stats } = await supabase
      .from('players_games')
      .select('*')
      .eq('year', gameYear)
      .eq('week', gameWeek)
      .or(`owner_id.eq.${gameOwner},owner_id.eq.${gameOpp}`);

    const teamOne = stats.filter((player) => {
      return player.owner_id === gameOwner;
    });

    console.log('teamOne', teamOne);

    return {
      props: { results },
    };
  } catch (err) {
    console.error(err);
  }
}
