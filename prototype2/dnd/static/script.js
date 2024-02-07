const containers = document.querySelectorAll('#SCContainer')

const defaultOrdering  = ["Emotional", "Cautious", "Gracious", "Sacrificing", "Rational"]

var adjectives = JSON.parse(localStorage.getItem("eum_i_sc_ordering")) || defaultOrdering

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

const draggables = document.querySelectorAll('.draggable')
console.log("draggables" , draggables)

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging')
  })

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')
  })
})

containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement)
    }
  })
})

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}

const saveOrderingButton = document.getElementById('saveOrdering');
const orderingForm = document.getElementById('scOrderingForm');
const formInput = orderingForm.querySelector('#orderingInput');

function saveOrdering(event) {
  let currentOrdering = localStorage.getItem("eum_i_sc_ordering");
  formInput.value = currentOrdering;
  orderingForm.submit();
}

function saveInterOrdering(event){
  let currentOrdering = [];
  const rows = document.querySelectorAll('.draggable');
  rows.forEach((row) => {
    currentOrdering.push(row.id);
  })
  localStorage.setItem("eum_i_sc_ordering", JSON.stringify(currentOrdering));
}

draggables.forEach((draggable) => {
    draggable.addEventListener('dragend', saveInterOrdering);
})

saveOrderingButton.addEventListener('click', saveOrdering);
