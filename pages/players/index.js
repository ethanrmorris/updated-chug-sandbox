import Link from 'next/link';
import PlayerCard from '../../components/PlayerCard';

export default function Players({ results }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
      <PlayerCard id={results[1234]} />
      <PlayerCard id={results[4881]} />
      <PlayerCard id={results[6813]} />
      <PlayerCard id={results[2505]} />
      <PlayerCard id={results[5012]} />
      <PlayerCard id={results[6801]} />
      <PlayerCard id={results[6151]} />
      <PlayerCard id={results[6794]} />
    </div>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch('https://ethanrmorris.github.io/v1/players.json');
    const results = await res.json();

    console.log(results);

    return {
      props: { results },
    };
  } catch (err) {
    console.error(err);
  }
}
