var board = new Array(8);
var currentPlayer = 'Red';
for (var i = 0; i < board.length; i++) {
    board[i] = new Array(8);
}
var figureColor = {
    white: '<div class="white red-checkers"></div>',
    black: '<div class="black black-checkers"></div>'
}

function initBoard() {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            if (i == board.length/2 || i == board.length/2-1) {
                break;
            }
            if (!((i+j)%2)) {
                if (i < board.length/2) {
                    board[i][j] = figureColor.white;
                }
                else {
                    board[i][j] = figureColor.black;
                }
            }
        }
    }
}
initBoard();
document.write('<table><tr><td onclick="myFunction(this)">')
for (var i = 0; i < board.length; i++) {
    board[i] = board[i].join('</td><td onclick="myFunction(this)">');
}
document.write(board.join('</td></tr><tr><td onclick="myFunction(this)">'));
document.write('</td></tr></table>');


var table = document.getElementsByTagName('table')[0];
cells = table.getElementsByTagName('td');
var switcher = true;

var rPlayer = document.getElementById('rPlayerScore');
var bPlayer = document.getElementById('bPlayerScore');
var rPlayerScore = 0;
var bPlayerScore = 0;


function myFunction(x) {
    if ($(x).hasClass('move') ) {
        move(x);
    }
    else if ($(x).hasClass('step') && !($(x).children().length)) {
        step(x);
    }
    if (!($(x).hasClass('selected')) && !($(x).hasClass('step'))) {
        var cellIndex = x.cellIndex;
        var rowIndex = x.parentNode.rowIndex;
        var $thisIndex = cellIndex+rowIndex*8;
        var $this = $(cells[$thisIndex]);
        var $black = $this.children().hasClass('black');
        var $white = $this.children().hasClass('white');
        if ($this.children().length) {
            $(cells).removeClass('selected step move moved');
            if ($black && !switcher) {
                $this.addClass('selected');
                //left step
                if (!($(cells[$thisIndex-9]).children().length) && ($thisIndex)%8) {
                    var $stepIndex1 = $thisIndex-9;
                }
                if ($(cells[$thisIndex-9]).children().hasClass('white') && !($(cells[$thisIndex-18]).children().length) && ($thisIndex-1)%8 && $thisIndex > 15) {
                    $(cells[$thisIndex-18]).addClass('step move');
                    $(cells[$thisIndex-9]).addClass('moved');
                }
                //left back step
                if ($(cells[$thisIndex+9]).children().hasClass('white') && !($(cells[$thisIndex+18]).children().length) && ($thisIndex+2)%8 && $thisIndex < 48) {
                    $(cells[$thisIndex+18]).addClass('step move');
                    $(cells[$thisIndex+9]).addClass('moved');
                }

                //right step
                if (!($(cells[$thisIndex-7]).children().length) && ($thisIndex+1)%8) {
                    var $stepIndex2 = $thisIndex-7;
                }
                if ($(cells[$thisIndex-7]).children().hasClass('white') && !($(cells[$thisIndex-14]).children().length) && ($thisIndex+2)%8 && $thisIndex > 15) {
                    $(cells[$thisIndex-14]).addClass('step move');
                    $(cells[$thisIndex-7]).addClass('moved');
                }
                //right back step
                if ($(cells[$thisIndex+7]).children().hasClass('white') && !($(cells[$thisIndex+14]).children().length) && ($thisIndex-1)%8 && $thisIndex < 48) {
                    $(cells[$thisIndex+14]).addClass('step move');
                    $(cells[$thisIndex+7]).addClass('moved');
                }
            }
            else if ($white && switcher) {
                $this.addClass('selected');
                //left step
                if (!($(cells[$thisIndex+9]).children().length) && ($thisIndex+1)%8) {
                    var $stepIndex1 = $thisIndex+9;
                }
                if ($(cells[$thisIndex+9]).children().hasClass('black') && !($(cells[$thisIndex+18]).children().length) && ($thisIndex+2)%8 && $thisIndex < 48) {
                    $(cells[$thisIndex+18]).addClass('step move');
                    $(cells[$thisIndex+9]).addClass('moved');
                }
                //left back step
                if ($(cells[$thisIndex-9]).children().hasClass('black') && !($(cells[$thisIndex-18]).children().length) && ($thisIndex-1)%8 && $thisIndex > 15) {
                    $(cells[$thisIndex-18]).addClass('step move');
                    $(cells[$thisIndex-9]).addClass('moved');
                }
                //right step
                if (!($(cells[$thisIndex+7]).children().length) && ($thisIndex)%8) {
                    var $stepIndex2 = $thisIndex+7;
                }
                if ($(cells[$thisIndex+7]).children().hasClass('black') && !($(cells[$thisIndex+14]).children().length) && ($thisIndex-1)%8 && $thisIndex < 48) {
                    $(cells[$thisIndex+14]).addClass('step move');
                    $(cells[$thisIndex+7]).addClass('moved');
                }
                //right back step
                if ($(cells[$thisIndex-7]).children().hasClass('black') && !($(cells[$thisIndex-14]).children().length) && ($thisIndex+2)%8 && $thisIndex > 15) {
                    $(cells[$thisIndex-14]).addClass('step move');
                    $(cells[$thisIndex-7]).addClass('moved');
                }
            }
            //monster
            if (($black && $thisIndex < 8) || ($white && $thisIndex > 55)) {
                $this.children().addClass('monster');
                if (($black && $thisIndex < 8)) {
                    bPlayerScore += 3;
                }
                else {
                    rPlayerScore += 3;
                }
                score();
            }
            $(cells[$stepIndex1]).toggleClass('step');
            $(cells[$stepIndex2]).toggleClass('step');
        }
        else {
            $(cells).removeClass('selected step move moved');
        }
    }
}


function move(x) {
    $(cells).removeClass('step');
    if ($('.moved').children().hasClass('white')) {
        bPlayerScore++;
    }
    else if ($('.moved').children().hasClass('black')) {
        rPlayerScore++;
    }
    score();
    $('.moved')[0].innerHTML = '';
    $(cells).removeClass('moved move');
    step(x);
}
function step(x) {
    x.innerHTML = $('.selected')[0].innerHTML;
    $('.selected')[0].innerText = '';
    $(cells).removeClass('selected step moved move');
    switcher = !switcher;
    changePlayer()

}
var changePlayer = function() {
    if (currentPlayer === '<span class="black">Black</span>') {
        currentPlayer = '<span class="red">Red</span>';
    } else {
        currentPlayer = '<span class="black">Black</span>';
    }
    $('#current-player h3').html("Current Turn For: " + currentPlayer);
};
function score() {
    rPlayer.innerHTML = rPlayerScore;
    bPlayer.innerHTML = bPlayerScore;
}

