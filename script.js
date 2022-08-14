var player_col = ''
var matrix = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
]

free_rows = [5, 5, 5, 5, 5, 5, 5]

var [current_player, other_player] = [1, 2]

var deltas = [
    [0, -1],
    [1, 0],
    [1, 1],
    [1, -1]
]

function normalize_player_pos(player, look_at, field){
    var lst = []
    for(var i = 0; i < deltas.length; i++){
        var pos_row = look_at[0] + 1
        var pos_col = look_at[1]
        var [row_delta, col_delta] = [deltas[i][0], deltas[i][1]]
        while(0 <= pos_row && pos_row < matrix.length && 0 <= pos_col && pos_col < matrix[0].length && matrix[pos_row][pos_col] == player){
            pos_row -= row_delta
            pos_col -= col_delta
        }
        lst.push([pos_row + row_delta, pos_col + col_delta])
    }
    return lst
}


function check_for_win_condition(player, look_at, field){
    var lst = []
    for(var i = 0; i < deltas.length; i++){
        var counter = 0
        var pos_row = look_at[i][0]
        var pos_col = look_at[i][1]
        var [row_delta, col_delta] = [deltas[i][0], deltas[i][1]]
        while(0 <= pos_row && pos_row < matrix.length && 0 <= pos_col && pos_col < matrix[0].length && matrix[pos_row][pos_col] == player){
            counter += 1
            pos_row += row_delta
            pos_col += col_delta
        }
        lst.push(counter == 4)
    }
    var out = false
    for(var i = 0; i < lst.length; i++){
        if(lst[i] == true){
            out = true
            break
        }
    }
    return out
}


$('.col').click(function(){
    col_clicked = $(this).attr('id')
    player_col = col_clicked - 1
    
    if(free_rows[player_col] != -1){
        matrix[free_rows[player_col]][player_col] = current_player
        var element = $('#row' + free_rows[player_col].toString() + player_col.toString())
        if(current_player == 1){
            element.css('background-color', 'coral')
        }else{
            element.css('background-color', 'lightblue')
        }
        free_rows[player_col] -= 1

        var pos = [free_rows[player_col], player_col]
        pos = normalize_player_pos(current_player, pos, matrix)
        if(check_for_win_condition(current_player, pos, matrix)){
            console.log(current_player)
            $('.end-screen').css('display', 'block')
            $('h1').text('PLAYER ' + current_player.toString() + ' WINS!')
            $('.bord').css('pointer-events', 'none')
        }else{
            current_player = [other_player, other_player = current_player][0]
        }



    }
})

$('#play-again').click(function(){
    location.reload();
})
