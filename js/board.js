$(document).ready(function () {
    $('#board-container').html(renderBoard())
    renderCheckers()
})

function renderBoard() {
    return `
        ${renderRow(1)}
        ${renderRow(2)}
        ${renderRow(3)}
        ${renderRow(4)}
        ${renderRow(5)}
        ${renderRow(6)}
        ${renderRow(7)}
        ${renderRow(8)}
    `
}

function renderRow(rowNum) {
    return `
        <div id="row-${rowNum}" class="row">
            ${renderCell(rowNum, 1)}
            ${renderCell(rowNum, 2)}
            ${renderCell(rowNum, 3)}
            ${renderCell(rowNum, 4)}
            ${renderCell(rowNum, 5)}
            ${renderCell(rowNum, 6)}
            ${renderCell(rowNum, 7)}
            ${renderCell(rowNum, 8)}
        </div>
    `
}

function renderCell(rowNum, cellNum) {
    if (cellColor(cellNum, rowNum) === 'white') {
        return `<div id="cell-${rowNum}-${cellNum}" class="cell white"></div>`
    } else
        return `<div id="cell-${rowNum}-${cellNum}" class="cell black"></div>`
}

/*** Helper Methods ***/
function parity(num) {
    return (num % 2 == 1) ? 'even' : 'odd'
}

function cellColor(cellNum, rowNum) {
    return parity(cellNum) == parity(rowNum) ? 'white' : 'black'
}

function moveSelectedCheckerHere() {
    console.log('things')
    if(selectedChecker) {
        console.log(`move checker here`)
        let whiteCell = $(this)
        console.log(`white cell: `, whiteCell)
        let id = whiteCell.attr('id')
        console.log(`id: `, id)
        let idParts = id.split('-')
        console.log(`idParts = `, idParts)

        selectedChecker.row = Number(idParts[1])
        selectedChecker.cell = Number(idParts[2])

        console.log(`the checker I'm moving is `, selectedChecker.color)
        if (selectedChecker.color == `white` && selectedChecker.row == 1) {
            console.log(`I'm moving a black checker to the white home row`)
            selectedChecker.isKing = true
        } else if (selectedChecker.color == `black` && selectedChecker.row == 8) {
            console.log(`I'm moving a red checker to the black home row`)
            selectedChecker.isKing = true
        }

        selectedChecker = undefined
        renderCheckers()
    } else {
        console.log(`select a checker, foo!`)
    }
}

function clearBoard() {
    $(`.white.cell`).html(``)
    $(`.white.cell`).unbind('click')
    $(`.out-of-play`).html(``)
}
