/**
 * Created by Nick on 1/29/2016.
 */
//declare first card
var first_card_clicked  = null;
var second_card_clicked  = null;
var total_possible_matches  = 2;
var match_counter = 0;

$(document).ready(function(){
    //reset game
    $('button').click(function(){
        resetGame();
    });

    //determine when clicked
    $('.card').click(function() {
        //if locked, do nothing
        if ($(this).hasClass('lock') || $(this).hasClass('matched')) {
            return;
        }
        //otherwise, compare
        else {
            card_clicked(this);
        }
    });

    $('.win_message').click(function() {
        $('.win_message').addClass('dismissed')
    });
});

function resetGame(){
    $('.card').removeClass('lock');
    $('.card').removeClass('matched');
    $('.card').removeClass('selected');
    $('.front').addClass('down');
    $('.back').removeClass('down');
    $('#win_message').addClass('dismissed');
    $('#win_message').removeClass('win_msg1');
    $('#win_message').removeClass('win_msg2');
    first_card_clicked  = null;
    second_card_clicked  = null;
    match_counter = 0;
}

function card_clicked(target){
    //flip card, set front 'up' and back 'down'
    cardFlip(target);

    //find AND store card img src
    //second_card_clicked = $(target).find('.front').find('img').attr('src');
    //console.log(temp);

    //sets card as one of the selected
    //if it's clicked a second time, it's unselected
    $(target).toggleClass('selected');

    //check if first card of pair
    if (first_card_clicked  == null)
    {
        //store first card
        first_card_clicked  = $(target).find('.front').find('img').attr('src');
    }
    //if not first of pair, is second
    else
    {
        //store second card
        second_card_clicked  = $(target).find('.front').find('img').attr('src');

        //if second, check if card matches first
        if (first_card_clicked  == second_card_clicked)
        {
            //card matches
            match_counter +=1;
            //if last match, game won!
            if(match_counter == total_possible_matches)
            {
                //different messages!
                if (Math.random() < 0.75)
                {
                    $('.win_message').find('p').html('PREY SLAUGHTERED');
                    $('.win_message').find('p').addClass('win_msg1');
                }
                else
                {
                    $('.win_message').find('p').html('NIGHTMARE SLAIN');
                    $('.win_message').find('p').addClass('win_msg2');
                }
                $('.win_message').removeClass('dismissed')
            }
            //lock cards in place
            //$('.selected').hide();
            $('.selected').addClass('matched');
            //un-select cards, reset for next attempt
            $('.selected').removeClass('selected');
            first_card_clicked  = null;
            second_card_clicked  = null;
        }
        //no match
        else {
            //return to face-down
            $('.card').addClass('lock');
            setTimeout(noMatch, 2000);
        }
    }
    //console.log(temp);
}


//'reverses' card face
function cardFlip(toFlip){
    $(toFlip).find('.back').toggleClass('down');
    $(toFlip).find('.front').toggleClass('down');
}

function noMatch(){
    cardFlip('.selected');
    //un-select cards, reset for next attempt
    $('.selected').removeClass('selected');
    $('.card').removeClass('lock');
    first_card_clicked  = null;
    second_card_clicked  = null;
}