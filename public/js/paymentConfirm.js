// preloader
const preloader = document.querySelector('.preloader');

const statusInput = document.querySelector('#status')
const confirmBtn = document.querySelector('#confirm')
const alertDOM = document.querySelector('.alert')

const params2 = window.location.search;
const urlID = new URLSearchParams(params2).get('id');

window.addEventListener('load', function () {
    preloader.classList.add('hide-preloader');
  });



  confirmBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    let status = statusInput.value;
    status = 'paid'
    console.log(status)

    try {
      confirmBtn.innerHTML = `<div class="loading"></div>`
      const response = await fetch(`/api/v1/payment/${urlID}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({status})
      })
      const data = await response.json()

      if(response.status === 200){
        statusInput.value = ''
        confirmBtn.textContent = 'Payment Confirmed'
        alertDOM.classList.add('show')
        alertDOM.textContent = `Payment has been confirmed successfully`
        setInterval(() => {
          alertDOM.classList.remove('show')
        },5000)
       
      } else{
        alertDOM.classList.add('show')
        alertDOM.textContent = data.msg
        setInterval(() => {
          alertDOM.classList.remove('show')
        },5000)
        console.log(data.msg)
      }
    } catch(error){
      console.log(error)
    }
  })





  