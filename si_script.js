// const containers = document.querySelectorAll('.container')
const containers = document.querySelectorAll('#result-panel')


const defaultOrdering  = ["Emotional", "Cautious", "Gracious", "Sacrificing", "Rational"]

var adjectives = JSON.parse(localStorage.getItem("eum_i_si_ordering")) || defaultOrdering
console.log("hi")
adjectives.forEach(adjective => {
    containers[0].append(createDraggable(adjective))
}) 

function createDraggable(adjective) {
    var element = document.createElement("p")
    element.classList.add("draggable")
    element.setAttribute("id", adjective)
    element.setAttribute("draggable", true)
    element.innerText = adjective
    return element
}


function onDragStart(event) {
  const draggedElement = event.target;
  event.dataTransfer.setData('text/plain', draggedElement.id);
  console.log("ondragstart")
}

function allowDrop(event) {
  event.preventDefault();
  console.log("allowdrop")
}

function dropAdjective(event, number) { 
  event.preventDefault();
  console.log("dropadj")
  const adjectiveText = event.dataTransfer.getData("text/plain"); 
  const adjectiveElement = document.getElementById(adjectiveText); 

  const adjectiveCell = document.getElementById("adjective" + number); 
  const cellDiv = adjectiveCell.querySelector("div"); 

  cellDiv.id = adjectiveText;
  cellDiv.draggable = true;

  adjectiveCell.ondrop = function(){console.log("")};
  adjectiveElement.parentNode.removeChild(adjectiveElement); 
  cellDiv.textContent = adjectiveText; 
}

// const draggables = document.querySelectorAll('.draggable')

// draggables.forEach(draggable => {
//   draggable.addEventListener('dragstart', () => {
//     draggable.classList.add('dragging')
//   })

//   draggable.addEventListener('dragend', () => {
//     draggable.classList.remove('dragging')
//   })
// })

// containers.forEach(container => {
//   container.addEventListener('dragover', e => {
//     e.preventDefault()
//     const afterElement = getDragAfterElement(container, e.clientY)
//     const draggable = document.querySelector('.dragging')
//     if (afterElement == null) {
//       container.appendChild(draggable)
//     } else {
//       container.insertBefore(draggable, afterElement)
//     }
//   })
// })

// function getDragAfterElement(container, y) {
//   const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

//   return draggableElements.reduce((closest, child) => {
//     const box = child.getBoundingClientRect()
//     const offset = y - box.top - box.height / 2
//     if (offset < 0 && offset > closest.offset) {
//       return { offset: offset, element: child }
//     } else {
//       return closest
//     }
//   }, { offset: Number.NEGATIVE_INFINITY }).element
// }

function saveInterOrdering(event){
  let currentOrdering = [];
  const rows = document.querySelectorAll('.draggable');
  rows.forEach((row) => {
    currentOrdering.push(row.id);
  })
  localStorage.setItem("eum_i_si_ordering", JSON.stringify(currentOrdering));
}

draggables.forEach((draggable) => {
    draggable.addEventListener('dragend', saveInterOrdering);
})

const siSaveOrderingButton = document.getElementById('siSaveOrdering');

function siSaveOrdering(event) {
  
  const siOrderingForm = document.getElementById('si-ordering-form');
  const siFormInput = document.getElementById('si-ordering-input');
  
  console.log(siFormInput);

  const rows = document.querySelectorAll('.draggable');
  let ids = [];
  rows.forEach((row) =>{
      ids.push(row.id);
  })
  siFormInput.value = JSON.stringify(ids.join(','));
  window.location.href = '/SC_ranking/';
  siOrderingForm.submit();
}

siSaveOrderingButton.addEventListener('click', siSaveOrdering);