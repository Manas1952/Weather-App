const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

const form = document.querySelector('form')
form.addEventListener('submit', (e) => {
  e.preventDefault()
  message1.textContent = 'Loading...'
  const input = document.querySelector('input').value
  fetch('/weather?address=' + input).then(response => {
    response.json().then(data => {
      if(data.error) {
        message1.textContent = data.error
        console.log(data.error)
      } else {
        message1.textContent = data.place
        message2.textContent = data.forecastData
      }
    })
  })
})