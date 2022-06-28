import { supabase } from '../utils/supabaseClient';

export default function Supabase({ results }) {
  return (
    <>
      <h2>Supabase</h2>
    </>
  );
}

// export async function getStaticProps() {
//   try {
//     const res = await fetch('https://api.sleeper.app/v1/players/nfl');
//     const data_players = await res.json();

//     const players = Object.values(data_players);

//     console.log(players);

//     const { data: results } = await supabase.from('players').insert(players);

//     console.log(data);

//     return {
//       props: { results },
//     };
//   } catch (err) {
//     console.error(err);
//   }
// }
