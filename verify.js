$(function() {
    'use strict';
    var body = $('body');
  
    function goToNextInput(e) {
      var key = e.which,
        t = $(e.target),
        sib = t.next('input');
  
      if (key != 9 && (key < 48 || key > 57)) {
        e.preventDefault();
        return false;
      }
  
      if (key === 9) {
        return true;
      }
  
      if (!sib || !sib.length) {
        sib = body.find('input').eq(0);
      }
      sib.select().focus();
    }
  
    function onKeyDown(e) {
      var key = e.which;
  
      if (key === 9 || (key >= 48 && key <= 57)) {
        return true;
      }
  
      e.preventDefault();
      return false;
    }
    
    function onFocus(e) {
      $(e.target).select();
    }
  
    body.on('keyup', 'input', goToNextInput);
    body.on('keydown', 'input', onKeyDown);
    body.on('click', 'input', onFocus);
  
  })

// Main Code Start FROM HERE
  function verify(){

    console.log('hi from verify from Verify Js')
    
  var inputValue = document.getElementById("1").value+document.getElementById("2").value+document.getElementById("3").value+document.getElementById("4").value;
    
    const otpJson = {
     'enteredOTP' : inputValue 
    };

    const url = "/verifyOTP";
    fetch(url, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(otpJson),
    })
    .then(response =>
      response.json())
     .then(responseData => {
      console.log('Response from server:', responseData.message);
      if(responseData.message=='OTP Verified')
      {
         alert('Email Verified Successfully')
         window.location.href = "http://localhost:5500/";
      }
      else{
        // document.getElementById('inputOfOTP').style.border = '2px solid red' ;         
         alert('OTP Is Incorrrect ! Re-enter')
            document.getElementById("1").value=""
            document.getElementById("2").value=""
            document.getElementById("3").value=""
            document.getElementById("4").value=""

            document.getElementById('1').style.border = '2px solid red' ;         
            document.getElementById('2').style.border = '2px solid red' ;         
            document.getElementById('3').style.border = '2px solid red' ;         
            document.getElementById('4').style.border = '2px solid red' ;         
      }
      })
.catch(error => {
 console.error('Error:', error);
});
  }

    
    

  