export default function MiniBoxScore() {
  <div key={game.id}>
              <Link href={`/schedule/${game.id}`}>
                <a>
                  <p>{game.week}</p>
                  <h2>
                    <span
                      className={
                        parseInt(game.team_points) >
                        parseInt(game.opponent_points)
                          ? 'font-bold'
                          : null
                      }
                    >
                      {game.team} {game.team_points}
                    </span>{' '}
                    -{' '}
                    <span
                      className={
                        parseInt(game.opponent_points) >
                        parseInt(game.team_points)
                          ? 'font-bold'
                          : null
                      }
                    >
                      {game.opponent_points} {game.opponent}
                    </span>
                  </h2>
                </a>
              </Link>
            </div>
}