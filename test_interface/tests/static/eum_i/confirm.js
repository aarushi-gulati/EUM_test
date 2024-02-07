var sc_panel = document.getElementById('sc-panel')
console.log(sc_panel)

JSON.parse(localStorage.getItem("eum_i_sc_ordering")).forEach(adjective => {
    console.log(adjective)
    console.log(rowCellTemplate(adjective))
    sc_panel.append(rowCellTemplate(adjective))
})

function rowCellTemplate(adjective) {
    var row_template = document.createElement('tr')
    var data_cell = document.createElement('td')

    data_cell.append(div_cell(adjective))
    row_template.append(data_cell)
    return row_template
}

function div_cell(adjective) {
    var div_adjective = document.createElement('div')
    div_adjective.classList.add("adjective")
    div_adjective.setAttribute("id", adjective)
    div_adjective.innerText = adjective
    div_adjective.addEventListener('ondragstart', onDragStart)
    return div_adjective
}

function onDragStart(event) {
    const draggedElement = event.target;
    event.dataTransfer.setData('text/plain', draggedElement.id);
}


