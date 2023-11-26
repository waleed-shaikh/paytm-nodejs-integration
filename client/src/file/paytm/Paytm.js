import React, { useState } from 'react';
import paytm from '../../image/paytm.png';
import '../paypal/paypal.css';

const Paytm = () => {
    const [loading, setLoading] = useState(false);

    function isDate(val) {
      // Cross realm comptatible
      return Object.prototype.toString.call(val) === "[object Date]";
    }
  
    function isObj(val) {
      return typeof val === "object";
    }
  
    function stringifyValue(val) {
      if (isObj(val) && !isDate(val)) {
        return JSON.stringify(val);
      } else {
        return val;
      }
    }
  
    function buildForm({ action, params }) {
      const form = document.createElement("form");
      form.setAttribute("method", "post");
      form.setAttribute("action", action);
  
      Object.keys(params)?.forEach((key) => {
        const input = document.createElement("input");
        input.setAttribute("type", "hidden");
        input.setAttribute("name", key);
        input.setAttribute("value", stringifyValue(params[key]));
        form.appendChild(input);
      });

      return form
    }
  
    function post(details) {
      const form = buildForm(details);
      document.body.appendChild(form);
      setLoading(false)
      form.submit();
      form.remove();
    }
  
    const getData = (data) => {
      setLoading(false);
      return fetch(`http://localhost:5000/api/payment`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .catch((err) => console.log(err));
    };
  
    const handlePayment = (e) => {
      e.preventDefault();
      setLoading(true);
      setTimeout(() => {
        getData({ amount: 100, email: "codesense24@gmail.com" }).then((response) => {
          var information = {
            // for production only
            action: "https://securegw.paytm.in/order/process",
            params: response,
          };
          console.log(response)
          post(information);
        });
      }, 1500);
    };

  return (
    <>
    <div className='main'>
      <img width={300} src={paytm} alt="" />
      <p>Payment Gateway integration</p>
      <div className='card px-5 py-4 mt-5'>
        <form className='' onSubmit={handlePayment}>
          {!loading? <div className='col-12 center'>
            <button className='w-100 border px-4' type="submit">Pay Now</button>
          </div>
          :
          <div className='col-12 center'>
            <button className='w-100 text-center px-4' type="submit">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </button>
          </div>
          }
        </form>
      </div>
    </div>
    <p>@codesense24</p> 
    </>
  )
}

export default Paytm
