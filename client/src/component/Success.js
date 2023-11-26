import React from 'react'

const Success = () => {
    const message = new URLSearchParams(window.location.search).get('message');
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
              <div className="alert alert-success text-center">
                  <h4 className="alert-heading">Payment Successfull</h4>
              </div>
          </div>
        </div>
        <div className="d-flex flex-column align-items-center">
          <h3 className='text-center w-75 mb-3 mt-5 text-success'>{message}</h3>
          <a href='/'>Back to Home</a>
        </div>
      </div>
      );
}

export default Success
