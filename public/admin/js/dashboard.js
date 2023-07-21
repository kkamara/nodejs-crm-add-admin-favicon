'use strict';

const run = async () => {
  let res = null;
  try {
    const token = localStorage.getItem('auth');
    if (null === token) {
      window.location.href = domain+'/admin';
    }
    res = await axios.post(
      domain+'/admin/authenticate', 
      null,
      {
        headers: {
          'Authorization': `Basic ${token}`,
        },
      },
    );
    const data = res.data;
    console.log(data);
  } catch (err) {
    let message = err.message;
    if (err.response && err.response.data.message) {
      message = err.response.data.message;
    }
    if (err.response && err.response.data.errors) {
      message = err.response.data.errors;
    }
    console.log(message);
  }
};

run();