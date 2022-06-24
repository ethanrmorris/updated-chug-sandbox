import Image from 'next/image';
import Link from 'next/link';

export default function PlayerCard({ id }) {
  return (
    <>
      <Link href={`/players/${id.player_id}`}>
        <a>
          <div className="flex flex-col items-center bg-white w-full p-4 rounded-md shadow-md hover:shadow-xl">
            <div className="relative h-60 w-60">
              <span
                className={`block absolute inset-0 bg-contain opacity-30`}
              ></span>
              <Image
                src={`https://sleepercdn.com/content/nfl/players/${id.player_id}.jpg`}
                alt={id.full_name}
                layout="fill"
                objectFit="cover"
                className=""
              ></Image>
            </div>
            <div className="text-center">
              <h3 className="text-xl p-4">{id.full_name}</h3>
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
