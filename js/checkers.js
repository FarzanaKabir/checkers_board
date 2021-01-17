let selectedChecker = undefined

let checkers = [
    {row: 1, cell: 1, color: 'red'},
    {row: 1, cell: 3, color: 'red'},
    {row: 1, cell: 5, color: 'red'},
    {row: 1, cell: 7, color: 'red'},
    {row: 2, cell: 2, color: 'red'},
    {row: 2, cell: 4, color: 'red'},
    {row: 2, cell: 6, color: 'red'},
    {row: 2, cell: 8, color: 'red'},
    {row: 3, cell: 1, color: 'red'},
    {row: 3, cell: 3, color: 'red'},
    {row: 3, cell: 5, color: 'red'},
    {row: 3, cell: 7, color: 'red'},
    {row: 6, cell: 2, color: 'black'},
    {row: 6, cell: 4, color: 'black'},
    {row: 6, cell: 6, color: 'black'},
    {row: 6, cell: 8, color: 'black'},
    {row: 7, cell: 1, color: 'black'},
    {row: 7, cell: 3, color: 'black'},
    {row: 7, cell: 5, color: 'black'},
    {row: 7, cell: 7, color: 'black'},
    {row: 8, cell: 2, color: 'black'},
    {row: 8, cell: 4, color: 'black'},
    {row: 8, cell: 6, color: 'black'},
    {row: 8, cell: 8, color: 'black'},

]

function renderCheckers(){
    clearBoard()
    $(`.white.cell`).click(moveSelectedCheckerHere)
    for(let i=0; i<checkers.length; i++) {
        let checker = checkers[i];
        if (checker.row && checker.cell) {
            $(`#cell-${checker.row}-${checker.cell}`).html(renderChecker(i, checker.color))
            $(`#cell-${checker.row}-${checker.cell}`).unbind('click')
        } else {
            console.log(`put `, checker, ` into out of play`)
            $(`#out-of-play-${checker.color}`).append(`<div class="cell">${renderChecker(i, checker.color)}</div>`)
        }
    }
    $('.checker').click(selectChecker)
}

function renderChecker(i, color) {
    if(checkers[i].isKing) {
        return `
            <div id="checker-${i}" class="checker ${color}-checker" bacon="${i}">
                <i class="fas fa-crown"></i>
            </div>
        `
    } else
        return `<div id="checker-${i}" class="checker ${color}-checker" bacon="${i}"></div>`

}

function selectChecker() {
    let checker = $(this)
    if(checker.hasClass(`selected`)) {
        console.log(`this checker was already selected`)
        remove()
        return
    }

    $(`.selected`).removeClass(`selected`)

    let checkerIndex = checker.attr('bacon')
    console.log(`checkerIndex == `, checkerIndex)

    selectedChecker = checkers[checkerIndex]
    console.log(`Finished selecting checker: `, selectedChecker)

    checker.addClass(`selected`)
}

function remove() {
    console.log(`removing this...`, selectedChecker)
    selectedChecker.row = undefined
    selectedChecker.cell = undefined
    selectedChecker = undefined
    renderCheckers()
}
