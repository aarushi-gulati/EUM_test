
const defaultOrdering  = ['Rational', 'Sacrificing', 'Gracious', 'Cautious', 'Emotional', 'Competitive', 'Sympathetic', 'Uninhibited', 'Collaborative', 'Dutiful', 'Fair', 'Tactful', 'Tough', 'Dynamic', 'Steady']

var adjectives = JSON.parse(localStorage.getItem("eum_i_si_ordering")) || []

adjectives.forEach((adjective, idx) => {
    const notNull = (adjective) => !adjective.includes("null")
    if (notNull(adjective)) {
        addDraggedToRHS(adjective, idx + 1)
        removeDraggedFromLHS(adjective)
    }
}) 

function addDraggedToRHS(adjectiveText, number) {
  const adjectiveCell = document.getElementById("adjective" + number); 
  const cellDiv = adjectiveCell.querySelector("div"); 

  cellDiv.id = adjectiveText;
  cellDiv.textContent = adjectiveText; 
  cellDiv.draggable = true;
}

function removeDraggedFromLHS(adjective) {
  const lhsAdjective = document.getElementById(adjective)
  lhsAdjective.remove()
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

    saveInterOrdering(event)
}

function saveInterOrdering(event){
  let currentOrdering = [];
  
  const rows = document.querySelectorAll('.draggable');
  rows.forEach((row) => {
    currentOrdering.push(row.id);
  })

  localStorage.setItem("eum_i_si_ordering", JSON.stringify(currentOrdering));
}

const saveOrderingButton = document.getElementById('i-save-si-ordering');
const scSaveOrderingButton = document.getElementById('i-save-sc-ordering');
const opSaveOrderingButton = document.getElementById('i-save-op-ordering');

function siSaveOrdering(event) {
  const siOrderingForm = document.getElementById('i-si-ordering-form');
  const formInput = document.getElementById('i-si-ordering-input');
  console.log('hi')
  console.log(formInput);

  const rows = document.querySelectorAll('.draggable');
  let ids = [];
  rows.forEach((row) =>{
      ids.push(row.id);
  })
  formInput.value = JSON.stringify(ids.join(','));
  window.location.href = '/i_SC_ranking/';
  siOrderingForm.submit();
  
}

function scSaveOrdering(event) {
  
  const scOrderingForm = document.getElementById('i-sc-ordering-form');
  const scFormInput = document.getElementById('i-sc-ordering-input');
  
  console.log(scFormInput);

  const rows = document.querySelectorAll('.draggable');
  let ids = [];
  rows.forEach((row) =>{
      ids.push(row.id);
  })
  scFormInput.value = JSON.stringify(ids.join(','));
  window.location.href = '/i_OP_ranking/';
  scOrderingForm.submit();
  
}

function opSaveOrdering(event) {
  const opOrderingForm = document.getElementById('i-op-ordering-form');
  const opFormInput = document.getElementById('i-op-ordering-input');
  
  const rows = document.querySelectorAll('.draggable');
  let ids = [];
  rows.forEach((row) =>{
      ids.push(row.id);
  })
  opFormInput.value = JSON.stringify(ids.join(','));
  window.location.href = '/i_saved/';
  opOrderingForm.submit();
}

if (saveOrderingButton) {
  saveOrderingButton.addEventListener('click', siSaveOrdering);
}
if (scSaveOrderingButton) {
  scSaveOrderingButton.addEventListener('click', scSaveOrdering);
  }
 if (opSaveOrderingButton) {
  opSaveOrderingButton.addEventListener('click', opSaveOrdering);
 } 

