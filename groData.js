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
      allClients.forEach((client) => {})
    })
  } catch (error) {
    console.error(error)
  }
  await ZOHO.embeddedApp.init()
}
