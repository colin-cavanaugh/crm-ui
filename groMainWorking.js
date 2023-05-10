const dealMenuOutput = document.getElementById('deal-menu')
const dealInfo = document.getElementById('dealInfo')
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
let startDate = null
let endDate = null
let globalStartDateTime = null
let globalEndDateTime = null
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
        return ownerId === userId
      })

      // Find global start and end dates
      const dates = allClients.map((client) => new Date(client.Created_Time.split('T')[0]))
      startDate = new Date(Math.min(...dates))
      endDate = new Date(Math.max(...dates))
      globalStartDateTime = new Date(Math.min(...dates))
      globalEndDateTime = new Date(Math.max(...dates))

      console.log('All Accounts:', allClients)

      const dateFilter = document.getElementById('date-filter')
      const options = [
        { value: 'all', text: 'All Dates' },
        { value: 'this-month', text: 'This Month' },
        { value: 'last-month', text: 'Last Month' },
        { value: 'custom', text: 'Custom Range' },
      ]
      options.forEach(({ value, text }) => {
        const option = document.createElement('option')
        option.value = value
        option.textContent = text
        dateFilter.appendChild(option)
      })

      dateFilter.addEventListener('change', (event) => {
        const selectedValue = event.target.value
        let filteredClients = allClients
        const now = new Date()
        switch (selectedValue) {
          case 'this-month':
            const thisMonthYear = now.getFullYear()
            const thisMonth = now.getMonth()
            const startOfThisMonth = new Date(thisMonthYear, thisMonth, 1)
            const endOfThisMonth = new Date(thisMonthYear, thisMonth + 1, 0)
            filteredClients = allClients.filter((client) => {
              const clientDate = new Date(client.Created_Time.split('T')[0])
              return clientDate >= startOfThisMonth && clientDate <= endOfThisMonth
            })
            break
          case 'last-month':
            // const now = new Date()
            const lastMonthYear = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear()
            const lastMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1
            const startOfLastMonth = new Date(lastMonthYear, lastMonth, 1)
            const endOfLastMonth = new Date(lastMonthYear, lastMonth + 1, 0)
            filteredClients = allClients.filter((client) => {
              const clientDate = new Date(client.Created_Time.split('T')[0])
              return clientDate >= startOfLastMonth && clientDate <= endOfLastMonth
            })
            break
          case 'custom':
            const startInput = document.getElementById('start-date-input')
            const endInput = document.getElementById('end-date-input')
            const start = new Date(startInput.value)
            const end = new Date(endInput.value)
            filteredClients = allClients.filter((client) => {
              const clientDate = new Date(client.Created_Time.split('T')[0])
              return clientDate >= start && clientDate <= end
            })
            break
          default:
            break
        }

        renderClients(filteredClients)
      })

      // Get all deals and filter by owner
      const allDealsResponse = ZOHO.CRM.API.getAllRecords({ Entity: 'Deals', sort_order: 'asc', per_page: 100, page: 1 })
      const allDeals = (await allDealsResponse).data.filter((deal) => {
        const ownerId = deal.Owner && deal.Owner.id
        return ownerId === userId
      })
      console.log('All Deals:', allDeals)
      // Get related tasks for each deal
      const relatedTasksPromises = allDeals.map((deal) => ZOHO.CRM.API.getRelatedRecords({ Entity: 'Deals', RecordID: deal.id, RelatedList: 'Tasks', page: 1, per_page: 200 }))
      const relatedTasksResponses = await Promise.all(relatedTasksPromises)
      const relatedTasks = relatedTasksResponses.map((response) => response.data)
      console.log('Related Tasks:', relatedTasks)

      // Get related products for each deal
      const relatedProductsPromises = allDeals.map((deal) => ZOHO.CRM.API.getRelatedRecords({ Entity: 'Deals', RecordID: deal.id, RelatedList: 'Products', page: 1, per_page: 200 }))
      const relatedProductsResponses = await Promise.all(relatedProductsPromises)
      const relatedProducts = relatedProductsResponses.map((response) => response.data)
      console.log('Related Products:', relatedProducts)
    }) // ZOHO.embeddedApp.on('PageLoad')
  } catch (error) {
    console.error(error)
  }
  await ZOHO.embeddedApp.init()
}
function renderClients(allClients) {
  accountOutput.innerHTML = ''
  accntDateTimeOutput.innerHTML = ''

  const startDateTime = new Date(globalStartDateTime)
  const endDateTime = new Date(globalEndDateTime)

  const formattedStartDate = startOfThisMonth.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  const formattedEndDate = endOfThisMonth.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  const dateRangeString = `${formattedStartDate} - ${formattedEndDate}`

  const accountHtmlArray = allClients
    .filter((client) => {
      const createdTime = new Date(client.Created_Time.split('T')[0])
      return createdTime >= startDateTime && createdTime <= endDateTime
    })
    .map((client) => {
      const clientName = client.Account_Name
      const clientId = client.id
      const createdTime = client.Created_Time
      const date = new Date(createdTime.split('T')[0])
      const formattedDate = date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        // hour: 'numeric',
        // minute: 'numeric',
        // second: 'numeric',
        // timeZoneName: 'short',
      })
      let accountNameString = ''
      let createdTimeString = ''

      // Render Names for Clients
      accountNameString = `<form class="form-link"><a type="button" class="account-menu-button" id="account-menu-button" value=${clientId} target="_blank">${clientName}</a></form>`
      accountOutput.innerHTML += accountNameString
      // Render created_time for clients
      createdTimeString = `<form class="form-link"><a type="button" class="account-datetime-button" id="account-datetime-button" target="_blank">${formattedDate}</a></form>`
      accntDateTimeOutput.innerHTML += createdTimeString
    })

  dealDatetimeOutput.textContent = dateRangeString
}
