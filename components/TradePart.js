import Link from 'next/link';
import styles from '../styles/Trade.module.scss';

export default function TradePark({ owner, piece }) {
  return (
    <div>
      <h2 className={styles.title}>
        {owner.charAt(0).toUpperCase().concat(owner.slice(1))}
        {' Acquires'}
      </h2>
      {JSON.parse(piece).map((player, index) => (
        <Link href={`/players/${player.id}`} key={index}>
          <div>
            <a className={styles.player}>
              {player.name}
              {player.player ? (
                <div className={styles.team}>{`(${player.player}, ${player.position} - ${player.team})`}</div>
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
