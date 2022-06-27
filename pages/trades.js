import Link from 'next/link';
import TradePart from '../components/TradePart';

import { supabase } from '../utils/supabaseClient';

export default function Home({ results }) {
  return (
    <div>
      <h1>{results.length}</h1>
      {results.map((trade) => (
        <div key={trade.id}>
          <p>
            #{trade.id} - {trade.date}
          </p>
          <div>
            <TradePart owner={trade.id_1.team} piece={trade.players_1} />
            <TradePart owner={trade.id_2.team} piece={trade.players_2} />
            {trade.owner_3 && (
              <TradePart owner={trade.id_3.team} piece={trade.players_3} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  try {
    const { data: results } = await supabase
      .from('trades')
      .select(
        `
        id,
        year,
        date,
        owner_1,
        id_1 (
          team
        ),
        players_1,
        owner_2,
        id_2 (
          team
        ),
        players_2,
        owner_3,
        id_3 (
          team
        ),
        players_3
      `
      )
      // .or('owner_1.eq.ethan,owner_2.eq.ethan,owner_3.eq.ethan')
      .order('id', { ascending: false });

    console.log(results);

    return {
      props: { results },
    };
  } catch (err) {
    console.error(err);
  }
}
