
withdrawBtn.addEventListener('click', async (e) => {
  e.preventDefault()
  let withdrawalAmount = amountInput.value
  let withdrawalTax = taxInput.value
  let mainWithdrawal = mainAmountInput.value

  console.log(withdrawalAmount)
  console.log(withdrawalTax)
  console.log(mainWithdrawal)

  try {
    withdrawBtn.innerHTML = `<div class="loading"></div>`
    const response = await fetch('/api/v1/withdraw', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({withdrawalAmount, withdrawalTax, mainWithdrawal})
    })

    const data = await response.json()

    if(response.status === 201){
      amountInput.value = '';
      taxInput.value = '';
      mainAmountInput.value = '';
      alertDOM.classList.add('show')
            alertDOM.textContent = `Withdrawal Successful`
            setInterval(() => {
              alertDOM.classList.remove('show')
            },5000)
      withdrawBtn.textContent = 'Successful'
    }
  }
  catch(error){
    console.log(error)
    alertDOM.classList.add('show')
            alertDOM.textContent = data.msg
            setInterval(() => {
              alertDOM.classList.remove('show')
            },5000)
            withdrawBtn.textContent = 'Withdraw'
  }
})