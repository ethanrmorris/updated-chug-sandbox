import Link from 'next/link';

export default function PlayerCard({ id }) {
  return (
    <>
      <Link href={`/players/${id.player_id}`}>
        <a>
          <div>
            <img
              src={`https://sleepercdn.com/content/nfl/players/${id.player_id}.jpg`}
            ></img>
            <div>
              <h3>{id.full_name}</h3>
              <h5>
                {id.team}
                {' - '}
                {id.number}
              </h5>
            </div>
          </div>
        </a>
      </Link>
    </>
  );
}
