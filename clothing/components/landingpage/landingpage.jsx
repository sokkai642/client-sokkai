import "./landingpage.css";
import Image from 'next/image';
import image4 from '../../public/images/landingpage/image6.jpeg';
import image5 from '../../public/images/landingpage/image7.jpg';
import image1 from '../../public/images/landingpage/viratkholi.jpeg';
import image9 from '../../public/images/landingpage/image10.jpg'
const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Top Half with Images */}
      <div className="top-half">
        <Image
          src={image1}  
          alt="Image 2"
          className="image"
        />
        <Image
          src={image9}
          alt="Image 2"
          className="image"
        />
        <Image
          src={image4}
          alt="Image 3"
          className="image"
        />
        <Image
          src={image5}
          alt="Image 4"
          className="image"
        />
      </div>

      <div className="bottom-half">
        <h1 className="heading">
          <span className="letter-s">S</span>
          <span className="letter-o">O</span>
          <span className="letter-k">K</span>
          <span className="letter-k">K</span>
          <span className="letter-a">A</span>
          <span className="letter-i">I</span>
        </h1>
        <p className="subheading">Men Made Better</p>

        {/* Buttons */}
        <div className="button-container">
          <button className="btn login-btn">Login</button>
          <button className="btn signin-btn">Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
