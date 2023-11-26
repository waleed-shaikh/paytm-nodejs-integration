import React from 'react';

const Failure = () => {
   const message = new URLSearchParams(window.location.search).get('message');
    return (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center">
                <div className="alert alert-danger text-center">
                    <h4 className="alert-heading">Oops, something went wrong!</h4>
                </div>
            </div>
          </div>
            <div className="d-flex flex-column align-items-center">
              <h3 className='text-center w-75 mb-3 mt-5 text-danger'>{message}</h3>
              <a href='/'>Back to Home</a>
            </div>
        </div>
      );
}

export default Failure
