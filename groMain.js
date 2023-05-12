const dealMenuOutput = document.getElementById('deal-menu')
const dealInfo = document.getElementById('dealInfo')
const clientDealOutput = document.getElementById('client-deal-output')
const dealDatetimeOutput = document.getElementById('deal-datetime-output')
const dealStageOutput = document.getElementById('deal-stage')
const groContainer = document.querySelector('#gro-container')
const productContainer = document.querySelector('#gro-products-container')
const taskContainer = document.querySelector('#gro-tasks-container')
const clientContainer = document.querySelector('#gro-clients-container')
const dealButton = document.querySelector('#gro-button')
const productButton = document.querySelector('#gro-product-button')
const taskButton = document.querySelector('#gro-task-button')
const accountContainer = document.querySelector('#accounts-menu-container')
const accountOutput = document.querySelector('#accounts-menu')
const accntDateTimeOutput = document.querySelector('#account-datetime-output')
const salesOrderOutput = document.querySelector('#sales-order-output')
let startDate = null
let endDate = null
let globalStartDateTime = null
let globalEndDateTime = null
let startOfThisMonth = null
let endOfThisMonth = null
let startOfLastMonth = null
let endOfLastMonth = null

async function initializeWidget() {
  try {
    // Wait for page load event
    console.log('Waiting for page load...')
    await ZOHO.embeddedApp.on('PageLoad', async function (data) {
      console.log('Page loaded!')
      // Get current user ID and name
      const currentUser = ZOHO.CRM.CONFIG.getCurrentUser()
      const user = await currentUser
      const userId = user.users[0].id
      const username = user.users[0].full_name
      console.log(`Current user: ${username} (${userId})`)

      // Get all clients and filter by owner
      const allClientsResponse = ZOHO.CRM.API.getAllRecords({ Entity: 'Accounts', sort_order: 'asc', per_page: 100, page: 1 })
      const allClients = (await allClientsResponse).data.filter((client) => {
        const ownerId = client.Owner && client.Owner.id
        // Check for invalid dates
        const clientDate = new Date(client.Created_Time.split('T')[0])
        if (isNaN(clientDate.getTime())) {
          // Invalid date, skip this client
          return false
        }
        return ownerId === userId
      })
      // Get all deals and filter by owner
      const allDealsResponse = ZOHO.CRM.API.getAllRecords({ Entity: 'Deals', sort_order: 'asc', per_page: 100, page: 1 })
      const allDeals = (await allDealsResponse).data.filter((deal) => {
        const ownerId = deal.Owner && deal.Owner.id

        return ownerId === userId
      })
      // create array for allDeals
      console.log('All Deals:', allDeals)
      renderDeals(allDeals)
      const clientDealsPromises = allClients.map((client) => ZOHO.CRM.API.getRelatedRecords({ Entity: 'Accounts', RecordID: client.id, RelatedList: 'Deals', page: 1, per_page: 200 }))
      const clientDealsResponse = await Promise.all(clientDealsPromises)
      const relatedClientDeals = clientDealsResponse.map((response) => response.data).flat()
      console.log('RelatedClientDeals', relatedClientDeals)

      // Render Client Deal Total Contract Price
      // const dealTotalsOutput = document.getElementById('deal-totals')
      // dealTotalsOutput.innerHTML = '' // clear previous deals
      // relatedClientDeals.forEach((clientDeals) => {
      //   const clientDealName = clientDeals[0].Deal_Name
      //   const clientDealValue = clientDeals.reduce((total, deal) => {
      //     const dealAmount = Number(deal.Contract_Amount)
      //     if (isNaN(dealAmount) || dealAmount === '') {
      //       return total + 0
      //     } else {
      //       return total + dealAmount
      //     }
      //   }, 0)
      //   // Create Element for Client Deal Total Contract Price
      //   const clientDealEl = document.createElement('div')
      //   clientDealEl.classList.add('deal-totals-div')
      //   clientDealEl.innerHTML = `
      //     <div class="deal-totals-button">$${clientDealValue}</div>
      //   `
      //   dealTotalsOutput.appendChild(clientDealEl)
      // })

      // Find global start and end dates
      const dates = allClients.map((client) => new Date(client.Created_Time))
      startDate = new Date(Math.min(...dates))
      endDate = new Date(Math.max(...dates))
      globalStartDateTime = new Date(Math.min(...dates))
      globalEndDateTime = new Date(Math.max(...dates))

      console.log('All Accounts:', allClients)

      // Get related tasks for each deal
      const relatedTasksPromises = allDeals.map((deal) => ZOHO.CRM.API.getRelatedRecords({ Entity: 'Deals', RecordID: deal.id, RelatedList: 'Tasks', page: 1, per_page: 200 }))
      const relatedTasksResponses = await Promise.all(relatedTasksPromises)
      const relatedTasks = relatedTasksResponses.map((response) => response.data)
      console.log('Related Tasks:', relatedTasks)

      // Get related products for each deal
      const relatedProductsPromises = allDeals.map((deal) => ZOHO.CRM.API.getRelatedRecords({ Entity: 'Deals', RecordID: deal.id, RelatedList: 'Products', page: 1, per_page: 200 }))
      const relatedProductsResponses = await Promise.all(relatedProductsPromises)
      const relatedProducts = await relatedProductsResponses.map((response) => response.data)
      console.log('Related Products:', relatedProducts)
      // Get related sales orders to Client
      const salesOrderPromises = allClients.map((client) => ZOHO.CRM.API.getRelatedRecords({ Entity: 'Accounts', RecordID: client.id, RelatedList: 'SalesOrders', page: 1, per_page: 200 }))
      const salesOrderPromisesResponse = await Promise.all(salesOrderPromises)
      const relatedClientSalesOrder = salesOrderPromisesResponse.map((response) => response.data).flat()
      console.log('relatedSalesOrders', relatedClientSalesOrder)
      // Render Client Sales Order Totals To The DOM
      // const clientTotalsOutput = document.getElementById('client-totals')
      // clientTotalsOutput.innerHTML = '' // clear previous Contract Price
      // relatedClientSalesOrder.forEach((clientOrder) => {
      //   console.log('clientOrder', clientOrder)
      //   let salesOrderCount
      //   if (!clientOrder || clientOrder.length === 0) {
      //     salesOrderCount = false
      //   } else {
      //     salesOrderCount = clientOrder.length
      //   }
      //   const clientContractEl = document.createElement('div')
      //   clientContractEl.classList.add('client-totals-div')

      //   if (!clientOrder || clientOrder.length === 0) {
      //     clientContractEl.innerHTML = `
      //       <div class="client-totals-button">No Sales Orders</div>
      //     `
      //   } else {
      //     let clientContractValue = 0 // Initialize the total value to 0
      //     clientOrder.forEach((salesOrder) => {
      //       const grandTotal = salesOrder.Grand_Total
      //       const clientValueTotals = Number(grandTotal)
      //       if (!isNaN(clientValueTotals)) {
      //         clientContractValue += clientValueTotals // Accumulate the Grand_Total values
      //       }
      //     })

      //     if (clientContractValue === 0 || isNaN(clientContractValue) || typeof clientContractValue === 'undefined') {
      //       clientContractEl.innerHTML = `
      //         <div class="client-totals-button">No Sales Orders</div>
      //       `
      //     } else {
      //       const formattedValue = clientContractValue.toLocaleString(undefined, {
      //         style: 'currency',
      //         currency: 'USD',
      //         minimumFractionDigits: 2,
      //         maximumFractionDigits: 2,
      //       })

      //       clientContractEl.innerHTML = `
      //         <div class="client-totals-button">${formattedValue} (Total Count: ${salesOrderCount})</div>
      //       `
      //     }
      //   }

      //   clientTotalsOutput.appendChild(clientContractEl)
      // })
      // Get Zoho Sign Documents Related to Client
      const zohoSignDocsPromises = allClients.map((client) => ZOHO.CRM.API.getRelatedRecords({ Entity: 'Accounts', RecordID: client.id, RelatedList: 'ZohoSign_Documents', page: 1, per_page: 200 }))
      const zohoSignDocsPromisesResponse = await Promise.all(zohoSignDocsPromises)
      const relatedZohoSignDocs = zohoSignDocsPromisesResponse.map((response) => response.data)
      // Get Tasks related to Client
      const clientTasksPromises = allClients.map((client) => ZOHO.CRM.API.getRelatedRecords({ Entity: 'Accounts', RecordID: client.id, RelatedList: 'Tasks', page: 1, per_page: 200 }))
      const clientTasksPromisesResponse = await Promise.all(clientTasksPromises)
      const relatedClientTasks = clientTasksPromisesResponse.map((response) => response.data)
      console.log('relatedClientTasks', relatedClientTasks)
      // ... Existing code up to where you create relatedClientTasks ...

      // Create a Map for each property, keyed by client ID
      const dealsByClientId = new Map()
      const salesOrdersByClientId = new Map()
      const zohoSignDocsByClientId = new Map()
      const tasksByClientId = new Map()

      // Populate the maps
      relatedClientDeals.forEach((deal) => {
        if (deal && deal.Account_Name) {
          const clientId = deal.Account_Name.id
          if (clientId) {
            if (!dealsByClientId.has(clientId)) {
              dealsByClientId.set(clientId, [])
            }
            dealsByClientId.get(clientId).push({
              Deal_Name: deal.Deal_Name,
              id: deal.id,
              Account: clientId,
            })
          }
        }
      })
      relatedClientSalesOrder.forEach((salesOrder) => {
        if (salesOrder && salesOrder.Account_Name) {
          const clientId = salesOrder.Account_Name.id
          if (clientId) {
            if (!salesOrdersByClientId.has(clientId)) {
              salesOrdersByClientId.set(clientId, [])
            }
            salesOrdersByClientId.get(clientId).push({
              Subject: salesOrder.Subject,
              id: salesOrder.id,
              Account: clientId,
            })
          }
        }
      })
      // relatedClientSalesOrder.forEach((salesOrder, index) => {
      //   const clientId = allClients[index].id
      //   salesOrdersByClientId.set(clientId, salesOrder)
      // })
      relatedZohoSignDocs.forEach((signDoc, index) => {
        const clientId = allClients[index].id
        zohoSignDocsByClientId.set(clientId, signDoc)
      })
      relatedClientTasks.forEach((task, index) => {
        const clientId = allClients[index].id
        tasksByClientId.set(clientId, task)
      })

      function combineUserData(allClients) {
        return allClients.map((client) => ({
          clients: {
            Account_Name: client.Account_Name,
            id: client.id,
            Created_Time: client.Created_Time,
          },
          Deals: dealsByClientId.get(client.id) || [],
          salesOrder: salesOrdersByClientId.get(client.id) || [],
          zohoSign_Docs: zohoSignDocsByClientId.get(client.id) || [],
          Tasks: tasksByClientId.get(client.id) || [],
        }))
      }

      // Usage:
      const combinedUserData = combineUserData(allClients)
      console.log('Combined User Data:', combinedUserData)

      // function combineUserData(allClients, allDeals, relatedClientSalesOrder, relatedZohoSignDocs, relatedClientTasks) {
      //   return allClients.map((client, index) => ({
      //     clients: {
      //       Account_Name: client.Account_Name,
      //       id: client.id,
      //       Created_Time: client.Created_Time,
      //     },
      //     Deals: allDeals
      //       ? allDeals.map((deal) => ({
      //           Deal_Name: deal.Deal_Name,
      //           id: deal.id,
      //           Account: deal.Account_Name.id,
      //         }))
      //       : [],

      //     salesOrder: relatedClientSalesOrder[index]
      //       ? relatedClientSalesOrder[index].map((salesOrder) => ({
      //           Subject: salesOrder.Subject,
      //           id: salesOrder.id,
      //           Account: salesOrder.Account_Name.id,
      //           Product_Details: salesOrder.Product_Details.map((productDetail) => ({
      //             product: {
      //               id: productDetail.product.id,
      //               name: productDetail.product.name,
      //               code: productDetail.product.Product_Code,
      //               currency: productDetail.product.Currency,
      //               quantity: productDetail.quantity,
      //               discount: productDetail.Discount,
      //               totalAfterDiscount: productDetail.total_after_discount,
      //               netTotal: productDetail.net_total,
      //               tax: productDetail.Tax,
      //               listPrice: productDetail.list_price,
      //               unitPrice: productDetail.unit_price,
      //               total: productDetail.total,
      //               productDescription: productDetail.product_description,
      //             },
      //           })),
      //           Grand_Total: salesOrder.Grand_Total,
      //         }))
      //       : [],
      //     zohoSign_Docs: relatedZohoSignDocs[index]
      //       ? relatedZohoSignDocs[index].map((signDoc) => ({
      //           name: signDoc.Name,
      //           id: signDoc.zohosign__ZohoSign_Document_ID,
      //         }))
      //       : [],
      //     Tasks: relatedClientTasks[index]
      //       ? relatedClientTasks[index].map((task) => ({
      //           name: task.Subject,
      //           id: task.id,
      //           Form: task.Form_Link,
      //         }))
      //       : [],
      //   }))
      // }

      // // Usage:
      // const combinedUserData = combineUserData(allClients, allDeals, relatedClientSalesOrder, relatedZohoSignDocs, relatedClientTasks)
      // console.log('Combined User Data:', combinedUserData)

      // Sort combinedUserData by Name A-Z
      function sortCombinedUserDataByName(combinedUserData) {
        return combinedUserData.sort((a, b) => {
          const nameA = a.clients.Account_Name.toUpperCase() // Ignore case
          const nameB = b.clients.Account_Name.toUpperCase() // Ignore case

          if (nameA < nameB) {
            return -1
          }
          if (nameA > nameB) {
            return 1
          }
          return 0
        })
      }

      // Usage:
      const sortedCombinedUserData = sortCombinedUserDataByName(combinedUserData)
      console.log('Sorted Combined User Data:', sortedCombinedUserData)

      // render dates and clients
      window.initRenderData(sortedCombinedUserData)
      // render relatedClientDeals
      // renderClientDeals(relatedClientDeals)
      //render products
      // renderProducts(relatedProducts)
      // Call clientButtonEventListener with relatedClientDeals defined
      const accountButtonArray = Array.from(document.querySelectorAll('.account-menu-button'))
      clientButtonEventListener(accountButtonArray, relatedClientDeals, relatedClientSalesOrder)
      // clientButtonEventListener(accountButtonArray)
    }) // ZOHO.embeddedApp.on('PageLoad')
  } catch (error) {
    console.error(error)
  }
  await ZOHO.embeddedApp.init()
}
