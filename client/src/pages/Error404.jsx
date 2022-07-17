import Img404 from "../images/oops-404.gif";
const Error404 = () => {
  return (
    <div id="payment-status-page" className="text-center">
      <h1 className="font-bold text-8xl animate__animated animate__repeat-2 animate__headShake">404</h1>
      <h3 className="font-bold text-2xl my-3 animate__animated animate__fadeInDown">Oops!</h3>
      <p className="animate__animated animate__fadeInDown">We couldn't find this page.</p>
      <div className="flex justify-center">
        <img className="my-5 animate__animated animate__fadeIn" src={Img404} alt="404" />
      </div>
    </div>
  );
};

export default Error404;
