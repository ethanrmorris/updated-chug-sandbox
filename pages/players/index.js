import Link from 'next/link';
import PlayerCard from '../../components/PlayerCard';
import styles from '../../styles/Player.module.scss';

export default function Players({ results }) {
  return (
    <div className={styles.grid}>
      <PlayerCard id={results[1234]} />
      <PlayerCard id={results[4881]} />
      <PlayerCard id={results[6813]} />
      <PlayerCard id={results[2505]} />
      <PlayerCard id={results[5012]} />
      <PlayerCard id={results[6801]} />
      <PlayerCard id={results[6151]} />
      <PlayerCard id={results[6794]} />
      <PlayerCard id={results[42]} />
    </div>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch('https://ethanrmorris.github.io/v1/players.json');
    const results = await res.json();

    return {
      props: { results },
    };
  } catch (err) {
    console.error(err);
  }
}
