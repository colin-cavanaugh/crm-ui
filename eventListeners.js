function clientButtonEventListener(clientButtonArray, filteredCombinedData) {
  clientButtonArray.forEach((buttonHtml, i) => {
    const accountButton = document.getElementById(`account-menu-button-${i + 1}`)
    accountButton.addEventListener('click', async (event) => {
      event.preventDefault()
      // Show the groContainer and hide the other containers
      if (clientContainer.style.display != 'grid') {
        clientContainer.style.display = 'grid'
        groContainer.style.display = 'none'
        productContainer.style.display = 'none'
        taskContainer.style.display = 'none'
      }
      // Do something with the client ID
      const clientId = accountButton.getAttribute('value')
      console.log(`Clicked button for client ID`, clientId)
      console.log('filteredCombinedData', filteredCombinedData)
      console.log('clientId', clientId)
      // Find the client-specific deals
      const clientData = filteredCombinedData.find((clientData) => clientData.clients.id === clientId)
      const clientSpecificDeals = clientData ? clientData.Deals : []
      // find the client-specific products from salesOrders
      const clientSpecificOrders = clientData ? clientData.salesOrder : []

      // Make sure the renderClientDeals function is defined before calling it
      if (typeof window.renderClientDeals === 'function') {
        console.log('clientDealsData before calling renderClientDeals:', clientSpecificDeals)

        // Pass the client-specific deals to the renderClientDeals function
        window.renderClientDeals(clientSpecificDeals)

        console.log('clicked button and clientDealsData are:!?:', JSON.stringify(clientSpecificDeals, null, 2))
      } else {
        console.error('renderClientDeals is not defined')
      }
      // Make sure the renderSalesOrder function is defined before calling it
      if (typeof window.renderSalesOrder === 'function') {
        console.log('clientDealsData before calling renderClientDeals:', clientSpecificDeals)
        // Pass the client-specific salesOrders to the renderSalesOrder function
        window.renderSalesOrder(clientSpecificOrders)
        console.log('clicked button and clientSpecificOrders are:!?:', JSON.stringify(clientSpecificOrders, null, 2))
      } else {
        console.error('renderSalesOrder is not defined')
      }
      filteredCombinedData = [clientData]
    })
  })
}
