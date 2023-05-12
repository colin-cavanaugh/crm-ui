function renderClients(filteredCombinedData) {
  accountOutput.innerHTML = ''
  accntDateTimeOutput.innerHTML = ''
  const clientButtonArray = []
  console.log('filteredCombinedData from Render Clients', filteredCombinedData)
  filteredCombinedData.map((client, i) => {
    const clientName = client.clients.Account_Name
    console.log('clientName from RenderClients', clientName)
    const clientId = client.clients.id
    const createdTime = client.clients.Created_Time // Update this line
    const date = createdTime ? new Date(createdTime.split('T')[0]) : null // Update this line as well
    const formattedDate = date
      ? date.toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      : 'Created Date Not Defined'

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
  // const clientButtonArray = // Get the clientButtonArray here;
  // add event listeners to client buttons
  return clientButtonArray
  // // Render the client deals
  // renderClientDeals(relatedClientDeals)
}
