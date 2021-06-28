import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'


export default function Home() {
  return (
    <div className="container disable-select">
      <Link href="/"><a><p className="title"><strong>Ultraspeaking <span className="oss"><em>opensource</em></span></strong></p></a></Link>
                <h1>Conquer Your Fear</h1>
                <p className="gamedesc">The objective of this game is to let your brain's autocomplete function take the center stage. Speak before you think!</p>
      <nav className="menu">
        <article className="content">
          <ul className="menu-items">
            <li className="menu-item">
              <Link href="/analogy">
                <a className="menu-item__link">Analogies and Metaphors</a>
              </Link>
            </li>
            <li className="menu-item">
              <Link href="/livecommentary">
                <a className="menu-item__link">
                  Live Commentary
                </a>
                </Link>
            </li>
            <li className="menu-item">
              <Link href="/catchemall">
                <a className="menu-item__link">
                  Catch'em All
                </a>
                </Link>
            </li>
            <li className="menu-item">
              <Link href="/speakyourheart">
                <a className="menu-item__link">
                  Speak Your Heart
                </a>
                </Link>
            </li>
          </ul>      
        </article>
      </nav>
    </div>
  )
}
