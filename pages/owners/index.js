import Link from 'next/link';

export default function Owners({ results }) {
  return (
    <>
      <h3>Owners</h3>
      <div>
        {results.map((owner) => (
          <div key={owner.id}>
            <Link href={`/owners/${owner.id}`}>
              <a>{owner.team}</a>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch('https://ethanrmorris.github.io/v1/owners.json');
    const results = await res.json();
    return {
      props: { results },
    };
  } catch (err) {
    console.error(err);
  }
}
