let clientButtonArray = []
function renderClients(filteredClients) {
  accountOutput.innerHTML = ''
  accntDateTimeOutput.innerHTML = ''

  const accountHtmlArray = filteredClients.map((client, i) => {
    const clientName = client.Account_Name
    const clientId = client.id
    const createdTime = client.Created_Time
    const date = new Date(createdTime.split('T')[0])
    const formattedDate = date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })

    let createdTimeString = ''
    let accountNameString = ''

    // Render Names for Clients
    accountNameString = `<form class="form-link"><a type="button" class="account-menu-button" id="account-menu-button-${i + 1}" value=${clientId} target="_blank">${clientName}</a></form>`
    accountOutput.innerHTML += accountNameString

    clientButtonArray.push(document.querySelector(`#account-menu-button-${i + 1}`)) // push the new button element into the array
    // Render created_time for clients
    createdTimeString = `<form class="form-link"><a type="button" class="account-datetime-button" id="account-datetime-button" target="_blank">${formattedDate}</a></form>`
    accntDateTimeOutput.innerHTML += createdTimeString
  })
  clientButtonEventListener(clientButtonArray)
}
