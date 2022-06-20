import Link from 'next/link';
import Image from 'next/image';

import styles from '../styles/Layout.module.scss';

export default function Layout({ children }) {
  return (
    <>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <Image src="/mlb.svg" width={80} height={50} alt={'Logo'} />
          <div className={styles.navWrapper}>
            <nav className={styles.nav}>
              <ul className={styles.mainNav}>
                <li className={styles.mainNavLink}>
                  <Link href="/">
                    <a>Home</a>
                  </Link>
                </li>
                <li className={styles.mainNavLinks}>
                  <Link href="/bible">
                    <a>Bible</a>
                  </Link>
                </li>
                <li className={styles.mainNavLink}>
                  <Link href="/trades">
                    <a>Trades</a>
                  </Link>
                </li>
                <li className={styles.mainNavLink}>
                  <Link href="/stats">
                    <a>Stats</a>
                  </Link>
                </li>
                <li className={styles.mainNavLink}>
                  <Link href="/owners">
                    <a>Owners</a>
                  </Link>
                  {/* <div className={styles.subWrapper}> */}
                  <ul className={styles.subNav}>
                    <li className={styles.subNavLink}>
                      <Link href="/owners/1">
                        <a>Ethan</a>
                      </Link>
                    </li>
                    <li className={styles.subNavLink}>
                      <Link href="/owners/2">
                        <a>Jacob</a>
                      </Link>
                    </li>
                    <li className={styles.subNavLink}>
                      <Link href="/owners/3">
                        <a>Scott</a>
                      </Link>
                    </li>
                    <li className={styles.subNavLink}>
                      <Link href="/owners/4">
                        <a>Morgan</a>
                      </Link>
                    </li>
                  </ul>
                  {/* </div> */}
                </li>
                <li className={styles.mainNavLink}>
                  <Link href="/players">
                    <a>Players</a>
                  </Link>
                </li>
                <li className={styles.mainNavLink}>
                  <Link href="/supabase">
                    <a>Supabase</a>
                  </Link>
                </li>
              </ul>
            </nav>
            <div>Toggle</div>
          </div>
        </header>
        <div className={styles.subNavWrapper}></div>
      </div>
      <main className={styles.main}>{children}</main>
    </>
  );
}
