import Link from 'next/link';
import TradePart from '../components/TradePart';
import styles from '../styles/Trade.module.scss';
import { supabase } from '../utils/supabaseClient';

export default function Home({ results }) {
  return (
    <div>
      <h1>{results.length}</h1>
      {results.map((trade) => (
        <div key={trade.id} className={styles.card}>
          <p className={styles.cardTitle}>
            #{trade.id} - {trade.date}
          </p>
          <div className={styles.parts}>
            <TradePart owner={trade.owner_1} piece={trade.players_1} />
            <TradePart owner={trade.owner_2} piece={trade.players_2} />
            {trade.owner_3 && (
              <TradePart owner={trade.owner_3} piece={trade.players_3} />
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
      .select('*')
      // .or('owner_1.eq.ethan,owner_2.eq.ethan,owner_3.eq.ethan')
      .order('id', { ascending: false });

    return {
      props: { results },
    };
  } catch (err) {
    console.error(err);
  }
}
