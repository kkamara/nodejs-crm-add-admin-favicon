const form = document.querySelector('form.login-form');
form.addEventListener('submit', async function(event) {
  event.preventDefault();
  const email = event.target.elements.email.value;
  const password = event.target.elements.password.value;
  
  let res;
  try{
    res = await axios.post(domain+'/admin', {
      email, password,
    });
    data = res.data;
    localStorage.setItem(
      'auth',
      data.data.auth.token,
    );
    window.location.href='/admin/dashboard';
  } catch(err) {
    console.log(err.response.data.message);
    document.querySelector('.email')
      .classList
      .add('is-invalid');
    const validationEmail = document.querySelector('#validationEmail')
    validationEmail.textContent = err.response.data.message;
    validationEmail.classList
      .remove('hide');
    if (err.response.data.errors) {
      console.log(err.response.data.errors);
      document.querySelector('.email')
        .classList
        .add('is-invalid');
      const validationEmail = document.querySelector('#validationEmail')
      validationEmail.textContent = err.response.data.errors[0];
      validationEmail.classList
        .remove('hide');
    }
  }
});
