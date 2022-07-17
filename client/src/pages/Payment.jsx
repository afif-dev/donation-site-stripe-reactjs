import { useParams, Navigate } from "react-router-dom";
const Payment = () => {
  const params = useParams();
  let payment_title = "";
  let payment_text = "";
  if (params.status === "success") {
    payment_title = "Thank you for your donation";
    payment_text = `Thank you for donating to our community. 
    Because of your generosity, we are now able to offer and serve better services. 
    With your help, we will continue to expand more opportunities to others.`;
  } else if (params.status === "canceled") {
    payment_title = "Payment canceled";
    payment_text = "Donation payment canceled, continue to surf around and make donation when you're ready.";
  } else {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <div id="payment-status-page" className="text-center mx-auto max-w-lg">
      <div className="flex justify-center">
        {params.status === "success" ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 fill-green-500 animate__animated animate__repeat-2 animate__heartBeat" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          ""
        )}
        {params.status === "canceled" ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 stroke-red-500 animate__animated animate__repeat-2 animate__flash" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : (
          ""
        )}
      </div>
      <h1 className="font-bold text-3xl my-5 animate__animated animate__fadeInUp">{payment_title}</h1>
      <p className="animate__animated animate__fadeInUp">{payment_text}</p>
    </div>
  );
};

export default Payment;
