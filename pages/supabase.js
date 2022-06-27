import { supabase } from '../utils/supabaseClient';

export default function Supabase({ boxScore }) {
  return (
    <>
      <h2>Supabase</h2>
      <h3>Box Score</h3>
      {boxScore.map((score) => (
        <p key={score.id}>
          {score.owner_id?.team} {score.team_points} - {score.opponent_points}{' '}
          {score.opponent_id?.team}
        </p>
      ))}
    </>
  );
}

export async function getStaticProps() {
  try {
    const { data: boxScore } = await supabase.from('game_box_score').select(`
        id, 
        year, 
        week, 
        team, 
        opponent, 
        team_points, 
        opponent_points, 
        difference,
        owner_id (
          team
        ),
        opponent_id (
          team
        )
      `);

    console.log(boxScore);

    return {
      props: { boxScore },
    };
  } catch (err) {
    console.error(err);
  }
}
