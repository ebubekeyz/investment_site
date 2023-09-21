const preloader = document.querySelector('.preloader');

window.addEventListener('load', function () {
  preloader.classList.add('hide-preloader');
});



const chevronDOM = document.querySelector('.chevron')

chevronDOM.addEventListener('click',() => {
    window.history.back()
})



const oldPasswordInput = document.querySelector('#old-password')
const newPasswordInput = document.querySelector('#new-password')
const updateBtn = document.querySelector('#update-btn')
const alertDOM = document.querySelector('.alert')

updateBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    const oldPassword = oldPasswordInput.value
    const newPassword = newPasswordInput.value
   
    try{
        alertDOM.innerHTML = `<div class="loading"></div>`
        const response = await fetch('/api/v1/users/updateUserPassword', {
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({oldPassword, newPassword})
        })

        const data = await response.json()

        if(response.status === 200){
            oldPasswordInput.value = '';
            newPasswordInput.value = '';
            alertDOM.classList.add('show')
            alertDOM.textContent = `Password Successfully Updated`
            setInterval(() => {
              alertDOM.classList.remove('show')
            },5000)
            updateBtn.textContent = 'Password Updated'
        }
        else {
            alertDOM.classList.add('show')
            alertDOM.textContent = data.msg
            setInterval(() => {
              alertDOM.classList.remove('show')
            },5000)
            updateBtn.textContent = 'Update Password'
        }

    }
    catch(error){
        console.log(error)
    }
})

