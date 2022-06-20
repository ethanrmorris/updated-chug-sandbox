import styles from '../styles/Bible.module.scss';
import { useEffect } from 'react';

export default function Bible() {
  useEffect(() => {
    window.addEventListener('DOMContentLoaded', () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('id');
          if (entry.intersectionRatio > 0) {
            document
              .querySelector(`nav li a[href="#${id}"]`)
              .parentElement.classList.add('active');
          } else {
            document
              .querySelector(`nav li a[href="#${id}"]`)
              .parentElement.classList.remove('active');
          }
        });
      });

      // Track all sections that have an `id` applied
      document.querySelectorAll('section[id]').forEach((section) => {
        observer.observe(section);
      });
    });
  });

  return (
    <>
      <div className={styles.grid}>
        <nav className={styles.nav}>
          <ol>
            <li>
              <a href="#general">General</a>
            </li>
            <li>
              <a href="#governing-body">Governing Body</a>
            </li>
            <li>
              <a href="#branding">League Branding</a>
            </li>
            <li>
              <a href="#members">League Members</a>
            </li>
            <li>
              <a href="#setup">League Setup</a>
            </li>
          </ol>
        </nav>
        <div className="">
          <h1>Chug Bible</h1>

          <h2 id="general">Article I - General</h2>
          <p>
            The name of this league shall be the Alliance of Sunday Morning
            Chugs Fantasy Football League (hereinafter referred to as “the
            League” or “the ASMC” or “the Chug League”).
          </p>

          <h2 id="governing-body">Article II - Governing Body</h2>

          <h3>Section 1</h3>
          <p>
            Ethan Morris will serve as Commissioner for the League, as he has
            since the founding of the League in 2020.
          </p>

          <h3>Section 2</h3>
          <p>
            The Commissioner will remain in the position until either: a) the
            Commissioner is removed from the position by a supermajority vote (9
            “Yes” votes required); or b) the Commissioner resigns.
          </p>

          <h3>Section 3</h3>
          <p>
            The Commissioner is responsible for running the day-to-day operation
            of the League and will be required to determine the appropriate
            course of action by interpreting the terms outlined in the League
            Bible.
          </p>

          <h2 id="branding">Article III - League Branding</h2>

          <h3>Section 1</h3>
          <p>
            The League will utilize the Sleeper App fantasy football website
          </p>

          <h3>Section 2</h3>
          <p>
            The League will operate a website under the domain
            www.chugleague.com, to be maintained by the Commissioner, and
            utilize the ASMC logo.
          </p>

          <h3>Section 3</h3>
          <p>
            The League will operate an account on Twitch.tv for live streaming
            purposes and a YouTube channel for past live streams, announcements,
            and other videos.
          </p>

          <h2 id="members">Article IV - League Members</h2>

          <h3>Section 1</h3>

          <h4>Section 1.1</h4>
          <p>“Goathouse Alums” - Jorden</p>

          <h4>Section 1.2</h4>
          <p>“Silverbacks” - Ethan</p>

          <h4>Section 1.3</h4>
          <p>“Slayton Slayerz” - Jacob</p>

          <h4>Section 1.4</h4>
          <p>“White Panthers” - Cameron</p>

          <h4>Section 1.5</h4>
          <p>“Outkasts” - Scott</p>

          <h4>Section 1.6</h4>
          <p>“Jeff City Leprechauns” - Caleb</p>

          <h4>Section 1.7</h4>
          <p>TBD - Clint</p>

          <h4>Section 1.8</h4>
          <p>“Macdaddys” - Juice</p>

          <h4>Section 1.9</h4>
          <p>“Kingston Kraken” - Lucas</p>

          <h4>Section 1.10</h4>
          <p>“Direwolves” - Morgan</p>

          <h4>Section 1.11</h4>
          <p>“Quarantine Cowboys” - Brian</p>

          <h4>Section 1.12</h4>
          <p>“45ers” - Shawn</p>

          <h3>Section 2</h3>
          <p>
            Every owner holds the rights to retaining their franchise, assuming
            they are in good standing. An owner can be removed from the League
            by a unanimous vote by the eleven (11) remaining members.
          </p>

          <h3>Section 3</h3>
          <p>
            If an owner decides to relinquish their right as an owner in the
            League, the Commissioner has final say on who will become the newest
            member.
          </p>

          <h2 id="setup">Article V - League Setup</h2>
        </div>
      </div>
    </>
  );
}
