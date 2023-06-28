function submitPassword(){
    console.log('Hi Form Submit Password ')
    const urlParams = new URLSearchParams(window.location.search);
   console.log(urlParams)
   const email = urlParams.get('email');
   console.log(email)

   const pass = document.getElementById("confirmPassword").value;
   console.log('Password is ' , pass) ;

   // Srver Requets to set password
   const passandEmail = {
    'Email': email ,
    'Password': pass
    };

  const url = "/passStoreInStorage";
  fetch(url, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(passandEmail),
  })
  .then(response =>
         response.json())
        .then(responseData => {
         console.log('Response from server:', responseData.message);
         if(responseData.message=='Password Set Successfully')
         {
            alert('Password set Successfully')
            window.location.href = "http://localhost:5500/";
         }
         else{
            alert('Password Not Set Try Again')
         }
         })
  .catch(error => {
    console.error('Error:', error);
  });



}
