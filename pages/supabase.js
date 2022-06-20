import { supabase } from '../utils/supabaseClient';

export default function Supabase({ trades }) {
  return (
    <>
      <h2>Supabase</h2>
      {trades.map((alldata) => (
        <p key={alldata.id}>
          {alldata.owner_1}{' '}
          <span>
            {alldata.owner_2} {alldata.year}
          </span>
          <span></span>
        </p>
      ))}
    </>
  );
}

export async function getStaticProps() {
  try {
    const { data: trades } = await supabase
      .from('trades')
      .select('*')
      .eq('owner_1', 'ethan');

    return {
      props: { trades },
    };
  } catch (err) {
    console.error(err);
  }
}
