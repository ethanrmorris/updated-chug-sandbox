import Link from 'next/link';

export default function TradePark({ owner, piece }) {
  return (
    <div>
      <h2>
        {owner.charAt(0).toUpperCase().concat(owner.slice(1))}
        {' Acquires'}
      </h2>
      {JSON.parse(piece).map((player, index) => (
        <Link href={`/players/${player.id}`} key={index}>
          <div>
            <a>
              {player.name}
              {player.player ? (
                <div>{`(${player.player}, ${player.position} - ${player.team})`}</div>
              ) : (
                <span>
                  {player.position
                    ? `  ${player.position} - ${player.team}`
                    : null}
                </span>
              )}
            </a>
          </div>
        </Link>
      ))}
    </div>
  );
}
