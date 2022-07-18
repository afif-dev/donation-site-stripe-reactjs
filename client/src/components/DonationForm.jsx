import React, { useState } from "react";

const currency_sign = "$";
const default_amount = 5;
const min_amount = 1;
const max_amount = 999999;
const payment_types = [
  {
    name: "one-time",
    mode: "payment",
    interval: "",
  },
  {
    name: "monthly",
    mode: "subscription",
    interval: "month",
  },
  {
    name: "yearly",
    mode: "subscription",
    interval: "year",
  },
];
function DonationForm() {
  const [amount, setAmount] = useState(default_amount.toFixed(2));
  const [isOther, setOther] = useState(false);
  const [paymentType, setPaymentType] = useState(payment_types[0]);
  const [isSubmit, setSubmit] = useState(false);

  const setDonationAmount = (am) => {
    if (am < min_amount) {
      am = min_amount;
    } else if (am > max_amount) {
      am = max_amount;
    }
    setAmount(parseFloat(am).toFixed(2));
  };

  const setDonationType = (pt) => {
    setPaymentType(pt);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmit(true);

    let data = new FormData();
    data.append("amount", amount);
    data.append("mode", paymentType.mode);
    data.append("interval", paymentType.interval);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/stripe/create-checkout-session", true);
    xhr.onload = function () {
      window.location.replace(this.responseText);
    };
    xhr.send(data);
  };

  function ButtonAmount(props) {
    const className = "block w-full p-4 bg-indigo-600 text-white font-medium text-lg leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out";
    const classNameActive = "block w-full p-4 bg-pink-600 text-white font-medium text-lg leading-tight uppercase rounded shadow-md";
    const btnAmount = parseFloat(props.amount).toFixed(2);
    return (
      <button
        type="button"
        onClick={() => {
          setDonationAmount(props.amount);
          setOther(false);
        }}
        className={amount === btnAmount ? classNameActive : className}
      >
        {currency_sign}
        {btnAmount}
      </button>
    );
  }

  function ButtonPayType(props) {
    const className = "block w-full p-4 bg-indigo-600 text-white font-medium text-base leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out";
    const classNameActive = "block w-full p-4 bg-pink-600 text-white font-medium text-base leading-tight uppercase rounded shadow-md";
    return (
      <button type="button" onClick={() => setDonationType({ name: props.name, mode: props.mode, interval: props.interval })} className={props.selectedName === props.name ? classNameActive : className}>
        {props.name}
      </button>
    );
  }

  return (
    <section className="donation-form">
      <div className="relative flex py-5 items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-black-800">Donation details</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap items-center justify-center">
          <div className="basis-1/2 p-2">
            <ButtonAmount amount={5} />
          </div>
          <div className="basis-1/2 p-2">
            <ButtonAmount amount={10} />
          </div>
          <div className="basis-1/2 p-2">
            <ButtonAmount amount={25} />
          </div>
          <div className="basis-1/2 p-2">
            <button type="button" onClick={() => setOther(true)} className="block w-full p-4 bg-indigo-600 text-white font-medium text-base leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out">
              Other
            </button>
          </div>

          <div className={isOther ? "basis-full p-2" : "hidden"}>
            <input className="block w-full p-4 text-gray-700 border rounded border-2 bg-transparent dark:text-white border-blue-600 focus:outline-none focus:border-blue-400" type="number" name="amount" value={amount} onChange={(e) => setDonationAmount(e.target.value)} />
          </div>

          {payment_types.map((type, index) => {
            return (
              <div key={index} className="basis-full sm:basis-1/3 p-2">
                <ButtonPayType name={type.name} mode={type.mode} interval={type.interval} selectedName={paymentType.name} />
              </div>
            );
          })}

          <div className="basis-full p-2">
            <input type="hidden" name="mode" value={paymentType.mode} />
            <input type="hidden" name="interval" value={paymentType.interval} />
            {isSubmit ? (
              <button type="submit" className="block w-full p-8 bg-purple-800 text-white font-medium text-lg leading-tight uppercase rounded shadow-md" disabled>
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block align-top" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </button>
            ) : (
              <button type="submit" className="block w-full p-8 bg-purple-700 text-white font-medium text-lg leading-tight uppercase rounded shadow-md hover:bg-purple-800 hover:shadow-lg focus:bg-purple-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-900 active:shadow-lg transition duration-150 ease-in-out">
                Donate {currency_sign}
                {amount}/{paymentType.name}
              </button>
            )}
          </div>
        </div>
      </form>
    </section>
  );
}

export default DonationForm;
