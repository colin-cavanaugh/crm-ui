function renderClientDeals(filteredCombinedData) {
  // Clear any previous client deal information
  clientDealOutput.innerHTML = ''

  if (Array.isArray(filteredCombinedData)) {
    filteredCombinedData.forEach((deal) => {
      if (deal && deal.Deal_Name) {
        const dealName = deal.Deal_Name
        // console.log('dealName', dealName)

        // Create a new div for each deal and add it to the output element
        const dealElement = document.createElement('div')
        dealElement.classList.add('client-deal-info')
        dealElement.innerHTML = `<div class="client-dealinfo-name">${dealName}</div>`
        clientDealOutput.appendChild(dealElement)
      }
    })
  } else {
    console.log('No deals for this client.')
  }

  // No deals found for the selected client
  if (clientDealOutput.children.length === 0) {
    clientDealOutput.innerHTML = '<div class="client-deal">No deals found for the selected client</div>'
  }
}

window.renderClientDeals = renderClientDeals
