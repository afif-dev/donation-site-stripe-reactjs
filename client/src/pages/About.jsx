import AboutImg1 from "../images/about-1.jpg";
import AboutImg2 from "../images/about-2.jpg";
import AboutImg3 from "../images/about-3.jpg";
import AboutImg4 from "../images/about-4.jpg";
const About = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 place-content-center">
      <div className="col-span-1 sm:col-span-2">
        <h1 className="text-4xl font-extrabold mb-8">About Us</h1>
        <p className="mb-5">
          Tempor tortor eu platea luctus sem aptent a a pulvinar parturient etiam potenti dis a nullam posuere aenean a parturient ullamcorper. Platea scelerisque fusce himenaeos adipiscing dapibus viverra penatibus ut vulputate est quisque elit dictum quis rhoncus justo parturient. Dictum lacinia arcu a vestibulum scelerisque dolor est nec dignissim interdum suspendisse fames porttitor amet.
          Fringilla nec himenaeos parturient cubilia a elit a dolor est est in adipiscing magna sem scelerisque risus ad primis.
        </p>
        <p className="mb-5">
          Inceptos adipiscing ullamcorper iaculis blandit parturient vestibulum curae mi purus scelerisque et porttitor id facilisi suspendisse morbi a bibendum nascetur ullamcorper parturient molestie turpis pulvinar quis mattis mi. Dignissim a vestibulum parturient cubilia est a nascetur ut vestibulum ornare pretium cubilia blandit malesuada a ullamcorper iaculis lobortis orci a ultrices nulla
          libero parturient dis convallis sit. Ac fringilla tincidunt consectetur cubilia eu a nec himenaeos hac ante sem scelerisque elementum bibendum felis cum dis. Non curae lobortis scelerisque lacinia fusce litora ac ac eros adipiscing sociis condimentum cubilia faucibus turpis. Malesuada convallis consectetur faucibus et condimentum tincidunt habitant ullamcorper metus mollis diam pulvinar
          parturient ornare aliquet adipiscing penatibus blandit sagittis quam ac rhoncus ac tincidunt.
        </p>
      </div>

      <div className="relative overflow-hidden bg-no-repeat bg-cover">
        <img src={AboutImg1} className="hover:scale-110 transition duration-300 ease-in-out" alt="Louvre" />
      </div>
      <div className="relative overflow-hidden bg-no-repeat bg-cover">
        <img src={AboutImg2} className="hover:scale-110 transition duration-300 ease-in-out" alt="Louvre" />
      </div>
      <div className="relative overflow-hidden bg-no-repeat bg-cover">
        <img src={AboutImg3} className="hover:scale-110 transition duration-300 ease-in-out" alt="Louvre" />
      </div>
      <div className="relative overflow-hidden bg-no-repeat bg-cover">
        <img src={AboutImg4} className="hover:scale-110 transition duration-300 ease-in-out" alt="Louvre" />
      </div>
    </div>
  );
};

export default About;
