////// Working for deals and products buttons ////
// import { groContainer, taskContainer, clientContainer, productContainer, dealButton, productButton, taskButton } from './dom.js'

function showDeals() {
  if (groContainer.style.display != 'grid') {
    groContainer.style.display = 'grid'
    productContainer.style.display = 'none'
    taskContainer.style.display = 'none'
    clientContainer.style.display = 'none'
  }
}

function showTasks() {
  if (taskContainer.style.display != 'grid') {
    taskContainer.style.display = 'grid'
    groContainer.style.display = 'none'
    productContainer.style.display = 'none'
    clientContainer.style.display = 'none'
  }
}
function showClients() {
  if (clientContainer.style.display != 'grid') {
    clientContainer.style.display = 'grid'
    groContainer.style.display = 'none'
    productContainer.style.display = 'none'
    taskContainer.style.display = 'none'
  }
}

/////// Show Products ///////
/*
function showProducts() {
  if (productContainer.style.display != 'grid') {
    productContainer.style.display = 'grid'
    groContainer.style.display = 'none'
    taskContainer.style.display = 'none'
    clientContainer.style.display = 'none'
  } else if (productContainer.style.display == 'grid') {
    productContainer.style.display = 'grid'
    groContainer.style.display = 'none'
    taskContainer.style.display = 'none'
    clientContainer.style.display = 'none'
  }
}
*/
