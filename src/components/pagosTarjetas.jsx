import React, { useState } from 'react';

const pagosTarjetas = () => {
  const [cardholder, setCardholder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expired, setExpired] = useState({ month: '', year: '' });
  const [securityCode, setSecurityCode] = useState('');
  const [card, setCard] = useState('front');

  const formatCardNumber = () => {
    if (cardNumber.length > 18) {
      return;
    }
    setCardNumber(cardNumber.replace(/\W/gi, '').replace(/(.{4})/g, '$1 '));
  };

  const isValid = () => {
    if (cardholder.length < 5 || cardNumber === '' || (expired.month === '' && expired.year === '') || securityCode.length !== 3) {
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    alert(`You did it ${cardholder}.`);
  };

  return (
    <div className="m-4">
      <div className="credit-card w-full sm:w-auto shadow-lg mx-auto rounded-xl bg-white" data-card={card}>
        <header className="flex flex-col justify-center items-center">
          {/* ... (código del encabezado) */}
        </header>
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">Card payment</h1>
          <div>
            <div className="my-3">
              <input
                type="text"
                className="block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                placeholder="Card holder"
                maxLength="22"
                value={cardholder}
                onChange={(e) => setCardholder(e.target.value)}
              />
            </div>
            {/* ... (código de los campos de entrada) */}
          </div>
        </main>
        <footer className="mt-6 p-4">
          <button
            className="submit-button px-4 py-3 rounded-full bg-blue-300 text-blue-900 focus:ring focus:outline-none w-full text-xl font-semibold transition-colors"
            disabled={!isValid()}
            onClick={onSubmit}
          >
            Pay now
          </button>
        </footer>
      </div>
    </div>
  );
};

export default pagosTarjetas;
