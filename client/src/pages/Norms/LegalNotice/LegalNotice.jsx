import { Helmet } from "react-helmet-async";

import "../Norms.css";

export default function LegalNotice() {
  return (
    <>
      <Helmet>
        <title>Legal Notice</title>
        <meta name="description" content="Tips of Iron legal notice page" />
      </Helmet>
      <main className="norms-theme">
        <section className="norms-title">
          <h1>Legal Notice</h1>
        </section>

        <section>
          <h2>Site Publishing:</h2>
          <p>
            The Tips of Iron website is an unofficial, volunteer-run community
            project dedicated to the game Hearts of Iron IV.
          </p>
        </section>
        <section>
          <h2>Publication Director:</h2>
          <p>
            <strong>Thibaut Dona</strong>
          </p>
        </section>
        <section>
          <h2>Contact:</h2>
          <address>
            <a
              className="norms-link"
              href="mailto:donathibaut02@gmail.com"
              aria-label="Send an Email to the Publication Director"
              target="_blank"
              rel="noopener noreferrer"
            >
              donathibaut02@gmail.com
            </a>
          </address>
        </section>
        <section>
          <h2>Hosting:</h2>
          <p>
            The website is hosted by AWS, whose registered office is located at:
          </p>
          <address>
            <a
              className="norms-link"
              href="https://www.google.com/maps/place/38+Av.+John+F.+Kennedy,+1316+Neudorf-Weimershof+Luxembourg/@49.630421,6.166487,713m/data=!3m2!1e3!4b1!4m6!3m5!1s0x47954f674478bbe1:0x21db64699942ac73!8m2!3d49.6304176!4d6.1690619!16s%2Fg%2F11pw3gzx5_?entry=ttu&g_ep=EgoyMDI2MDkwOS4wIKXMDSoASAFQAw%3D%3D"
              aria-label="Google Maps link to the hosting address"
              target="_blank"
              rel="noopener noreferrer"
            >
              38 Avenue John F. Kennedy, L-1855, Luxembourg
            </a>
          </address>
        </section>
        <section>
          <h2>Intellectual Property:</h2>
          <p>
            Hearts of Iron IV is a registered trademark of Paradox Interactive.
            Tips of Iron is not affiliated with, sponsored by, or endorsed by
            Paradox Interactive. Images, logos, and graphic elements related to
            the game remain the exclusive property of their respective owners.
          </p>
        </section>
      </main>
    </>
  );
}
