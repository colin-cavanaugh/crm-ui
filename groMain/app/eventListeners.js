function clientButtonEventListener(clientButtonArray) {
  clientButtonArray.forEach((buttonHtml, i) => {
    const accountButton = document.getElementById(`account-menu-button-${i + 1}`)
    accountButton.addEventListener('click', (event) => {
      // Do something with the client ID
      console.log(`Clicked button for client ID`, accountButton.getAttribute('value'))
    })
  })
}
