const phoneInput = document.querySelector('#phone')
const passwordInput = document.querySelector('#password')
const alertDOM = document.querySelector('.alert')
const loginSubmitBtn = document.querySelector('#login')

loginSubmitBtn.addEventListener('click',async (e) => {
    e.preventDefault()

    const phone = phoneInput.value
    const password = passwordInput.value

    loginSubmitBtn.innerHTML = `<div class="loading"></div>`
    try{
        const response = await fetch(`/api/v1/auth/login`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ phone, password }),
            withCredentials: true
        })

        const data = await response.json()

        if(response.status === 200){
            phoneInput.value = '';
            passwordInput.value = '';
            loginSubmitBtn.textContent = 'Login Successful'
            window.location = '/dashboard'
        } else {
            console.log(data.msg)
            alertDOM.style.textAlign = 'center'
            alertDOM.textContent = data.msg
            alertDOM.style.width = '100%'
            setInterval(() => {
                alertDOM.style.display = 'none'
            }, 2000)
            window.location = '/'
        }
    } 
    catch(error){
        console.log(error)
    }
})