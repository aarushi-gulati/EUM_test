
const defaultOrdering  = ['Flexible', 'Collaborative', 'Efficient', 'Hierarchical', 'Benevolent', 'Strategic', 'Ethical', 'Informal', 'Caring', 'Diligent', 'Empowering', 'Personalized', 'Decisive', 'Creative', 'Expedient', 'Demanding', 'Diplomatic', 'Ambitious', 'Protective', 'Disciplined']

var adjectives = JSON.parse(localStorage.getItem("eum_o_op_ordering")) || []

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

  localStorage.setItem("eum_o_op_ordering", JSON.stringify(currentOrdering));
}

const saveOrderingButton = document.getElementById('o-save-si-ordering');
const scSaveOrderingButton = document.getElementById('o-save-sc-ordering');
const opSaveOrderingButton = document.getElementById('o-save-op-ordering');

function siSaveOrdering(event) {
  const siOrderingForm = document.getElementById('o-si-ordering-form');
  const formInput = document.getElementById('o-si-ordering-input');
  console.log('hi')
  console.log(formInput);

  const rows = document.querySelectorAll('.draggable');
  let ids = [];
  rows.forEach((row) =>{
      ids.push(row.id);
  })
  formInput.value = JSON.stringify(ids.join(','));
  window.location.href = '/o_OP_ranking/';
  siOrderingForm.submit();
  
}


function scSaveOrdering(event) {
  
  const scOrderingForm = document.getElementById('o-sc-ordering-form');
  const scFormInput = document.getElementById('o-sc-ordering-input');
  
  console.log(scFormInput);

  const rows = document.querySelectorAll('.draggable');
  let ids = [];
  rows.forEach((row) =>{
      ids.push(row.id);
  })
  scFormInput.value = JSON.stringify(ids.join(','));
  window.location.href = '/o_SI_ranking/';
  scOrderingForm.submit();
  
}

function opSaveOrdering(event) {
  const opOrderingForm = document.getElementById('o-op-ordering-form');
  const opFormInput = document.getElementById('o-op-ordering-input');
  
  // console.log(formInput);

  const rows = document.querySelectorAll('.draggable');
  let ids = [];
  rows.forEach((row) =>{
      ids.push(row.id);
  })
  opFormInput.value = JSON.stringify(ids.join(','));
  window.location.href = '/saved/';
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

