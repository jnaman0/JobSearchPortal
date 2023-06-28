const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const arrayOfJson = [] ;

signUpButton.addEventListener('click', () =>
container.classList.add('right-panel-active'));

signInButton.addEventListener('click', () =>
container.classList.remove('right-panel-active'));

//document.getElementById("signUpButton1").disabled = true;
document.getElementById("signUpButton1").style.display = 'none' ;


//  Confirim Email Function
function confirmEmail(){
    console.log('hi Confirm Email') ;

    const nameOfUser = document.getElementById("nameofUser").value ;
    console.log(nameOfUser) ;

    const emailOfUser = document.getElementById("emailOfUser").value ;
    console.log(emailOfUser) ;

    const confirmEmailofUser = document.getElementById("confirmEmailofUser").value ;
    console.log(confirmEmailofUser) ;
   
     if(emailOfUser==confirmEmailofUser)
     {
      document.getElementById("emailConfirmation").innerText  = 'Email Matched' ;
      //document.getElementById("signUpButton1").disabled = false ;
      document.getElementById("signUpButton1").style.display = '' ;
     

     }
     else{
        document.getElementById("emailConfirmation").innerText = 'Email Not Matched' ;
        //document.getElementById("signUpButton1").disabled = true;
        document.getElementById("signUpButton1").style.display = 'none'
     }
}

function submitPassword(){
    console.log('Submit password ')

    const nameOfUser = document.getElementById("nameofUser").value ;
    console.log(nameOfUser) ;

   // const emailOfUser = document.getElementById("emailOfUser").value ;
   // console.log(emailOfUser) ;

    const password1 = document.getElementById("newPassword").value ;
    console.log(password1) ;

}


function signUpFunction(){
   // generate V Code
   var digits = '0123456789';
   let OTP = '';
   for (let i = 0; i < 4; i++ ) {
       OTP += digits[Math.floor(Math.random() * 10)];
   }
   console.log('OTP is' , OTP) ; 
  
   // Send OTP on mail

   const emailOfUser = document.getElementById("emailOfUser").value ;
   console.log(emailOfUser) ;

    fetch('/test')
    .then(response => response.text())
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.error(error);
    });

}
