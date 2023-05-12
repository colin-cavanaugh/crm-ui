function renderSalesOrder(filteredCombinedData) {
  salesOrderOutput.innerHTML = ''
  // console.log('renderSalesOrder', filteredCombinedData)

  if (Array.isArray(filteredCombinedData)) {
    filteredCombinedData.forEach((order) => {
      if (order && order.Subject) {
        const orderName = order.Subject
        const orderElement = document.createElement('div')
        orderElement.classList.add('sales-order-div')
        orderElement.innerHTML = `
      <div class="sales-order-button">${orderName}</div>
    `
        salesOrderOutput.appendChild(orderElement)
      }
    })
  } else {
    console.log('No sales orders for this client')
  }

  // No deals found for the selected client
  if (salesOrderOutput.children.length === 0) {
    salesOrderOutput.innerHTML = '<div class="sales-order-button">No Sales Order found for the selected client</div>'
  }
}

window.renderSalesOrder = renderSalesOrder
