import Link from 'next/link';
import { useState, useEffect } from 'react';
// import Image from 'next/image';

export default function Layout({ children }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.onscroll = function () {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
  }, []);
  return (
    <>
      <div
        className={`bg-[#222222] sticky top-0 ${scrolled ? 'shadow-lg' : null}`}
      >
        <header className="p-4 bg-[#222222] text-white sticky top-0 max-w-[1200px] mx-auto">
          {/* <Image src="/mlb.svg" width={80} height={50} alt={'Logo'} /> */}
          <div className="flex justify-between">
            <nav>
              <ul className="flex gap-4 list-none">
                <li>
                  <Link href="/">
                    <a>Home</a>
                  </Link>
                </li>
                <li>
                  <Link href="/bible">
                    <a>Bible</a>
                  </Link>
                </li>
                <li>
                  <Link href="/trades">
                    <a>Trades</a>
                  </Link>
                </li>
                <li>
                  <Link href="/stats">
                    <a>Stats</a>
                  </Link>
                </li>
                <li>
                  <Link href="/seasons">
                    <a>Seasons</a>
                  </Link>
                </li>
                <li>
                  <Link href="/career">
                    <a>Career</a>
                  </Link>
                </li>
                <li>
                  <Link href="/owners">
                    <a>Owners</a>
                  </Link>
                  {/* <div className={styles.subWrapper}> */}
                  {/* <ul>
                  <li>
                    <Link href="/owners/1">
                      <a>Ethan</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/owners/2">
                      <a>Jacob</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/owners/3">
                      <a>Scott</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/owners/4">
                      <a>Morgan</a>
                    </Link>
                  </li>
                </ul> */}
                  {/* </div> */}
                </li>
                <li>
                  <Link href="/players">
                    <a>Players</a>
                  </Link>
                </li>
                <li>
                  <Link href="/supabase">
                    <a>Supabase</a>
                  </Link>
                </li>
              </ul>
            </nav>
            <div>moon</div>
          </div>
        </header>
      </div>
      <main className="p-4 max-w-[1200px] mx-auto">{children}</main>
    </>
  );
}
