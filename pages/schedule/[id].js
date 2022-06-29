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
      .select('*, owner_id (team, slug), opponent_id (team, slug)')
      .eq('id', params.id);

    const results = data[0];

    console.log(results);

    return {
      props: { results },
    };
  } catch (err) {
    console.error(err);
  }
}
