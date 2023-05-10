// import { dealMenuOutput, dealInfo, dealDatetimeOutput, dealStageOutput } from './dom.js'
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

      // Data to be rendered goes here //
      const dealHtmlArray = allDeals.map((deal) => {
        const dealName = deal.Deal_Name
        const dealId = deal.id
        const dealStage = deal.Stage
        const createdTime = deal.Created_Time
        const relatedAccount = deal.Account_Name.name
        const relatedAccountId = deal.Account_Name.id
        const dealPipeline = deal.Pipeline
        let createdTimeString = ''
        let relatedAccntHtml = ''
        let stageOutput = ''
        let dealMenuHtml = ''
        if (dealPipeline === 'Sales Pipeline') {
          stageOutput += `<a type="button" class="deal-stage-button" target="_blank">${dealStage}</a>`
        } else if (dealPipeline === 'Proposal Pipeline') {
          stageOutput += `<a type="button" class="deal-proposalpipeline-button" target="_blank">${dealStage}</a>`
        } else if (dealPipeline === 'Onboarding') {
          stageOutput += `<a type="button" class="deal-onboarding-button" target="_blank">${dealStage}</a>`
        }
        // Render Stages for Deals
        dealStageOutput.innerHTML += stageOutput
        // Render Names for Deals
        dealMenuHtml = `<form class="form-link"><a type="button" class="deal-menu-button" id="deal-menu-button-${dealId}" onclick='showProducts()' value=${dealId} target="_blank">${dealName}</a></form>`
        dealMenuOutput.innerHTML += dealMenuHtml
        // Render created Time for deals
        createdTimeString = `<form class='form-link'><a type="button" class="deal-date-button" target="_blank">${createdTime}</a></form>`
        dealDatetimeOutput.innerHTML += createdTimeString
        // Render related Accounts for Deals
        relatedAccntHtml = `<form class='form-link'><a type="button" class="client-name-button" href="https://one.zoho.com/zohoone/groportal/home/cxapp/crm/org802475965/tab/Accounts/${relatedAccountId}" target="_blank">${relatedAccount}</a></form>`
        dealInfo.innerHTML += relatedAccntHtml
      })
    }) // ZOHO.embeddedApp.on('PageLoad')
  } catch (error) {
    console.error(error)
  }
  await ZOHO.embeddedApp.init()
}
