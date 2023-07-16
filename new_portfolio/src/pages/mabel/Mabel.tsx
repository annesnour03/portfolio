import "pages/mabel/mabel.css";

export const Mabel = () => {
  return (
    <>
      <body>
        <h1>Zomervakantieplannen 😄</h1>
        <ul>
          <li>
            <a href="#rome">Rome</a>
          </li>
          <li>
            <a href="#waterhout">Camping Waterhout</a>
          </li>
          <li>
            <a href="#section-1">Introductiedagen VU</a>
          </li>
        </ul>
        <p></p>

        <div className="container" id="rome">
          <div className="image-container">
            <img
              src="https://www.vakantievoortieners.nl/wp-content/uploads/Stedentrip-Rome-met-tieners1.jpg"
              alt="Rome"
              className="vakantie-fotos"
            />
          </div>
          <div className="text-container">
            <h1 className="center-text">Rome</h1>
            <div className="bolletjes">
              <p>👩 Lindsay</p>
              <p>🗓️ 12 t/m 16 augustus</p>
              <p>🏨 Hotel Galileo</p>
              <p>✈️ Alitalia</p>
            </div>
            <ul>
              <li> Colloseum</li>
              <li> Trevi fontein</li>
              <li> Vaticaanstad</li>
            </ul>
          </div>
          <div className="experience-container debug">
            <h2 className="center-text">Ervaring</h2>
            <ul>
              <li>testing</li>
              <li>testing1</li>
              <li>aowd</li>
            </ul>
          </div>
        </div>
        <div className="container" id="waterhout">
          <div className="text-container">
            <h1 className="center-text">Camping Waterhout</h1>
            <div className="bolletjes">
              <p>🥰 André en Bianca</p>
              <p>🗓️ 18 tot en met 21 augustus</p>
              <p>🏕️ Camping Waterhout</p>
              <p>🚗 Eigen vervoer</p>
            </div>
            <ul>
              <li> Varen</li>
              <li> Barbecuen</li>
              <li> Honden uitlaten</li>
            </ul>
          </div>
          <div className="image-container">
            <img
              src="https://cdn.prod.v2.camping.info/media/campsites/camping-waterhout/t14MfdhKVoAE.jpg"
              alt="Rome"
              className="vakantie-fotos"
            />
          </div>
        </div>
      </body>
    </>
  );
};
