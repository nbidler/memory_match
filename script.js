/**
 * Created by Nick on 1/29/2016.
 */
//declare first card
var first_card_clicked  = null;
var second_card_clicked  = null;
var total_possible_matches  = 9;
var match_counter = 0; // is 'matches' in instructions
var attempts = 0;
var accuracy = 0;
var games_played = 0;

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

    display_stats();
});

function resetGame(){
    $('.card').removeClass('lock');
    $('.card').removeClass('matched');
    $('.card').removeClass('selected');
    $('.front').addClass('down');
    $('.back').removeClass('down');
    $('#win_message').addClass('dismissed');
    $('.win_msg1').removeClass('win_msg1');
    $('.win_msg2').removeClass('win_msg2');
    first_card_clicked  = null;
    second_card_clicked  = null;
    //version 1.0 additions
    games_played++;
    reset_stats();
    display_stats();
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

        //attempt to match is made
        attempts++;
        //if second, check if card matches first
        if (first_card_clicked  == second_card_clicked)
        {
            //card matches AND is not same card
            if ($('.selected').length > 1)
            {
                match_counter +=1;
            }
            //if last match, game won!
            if(match_counter == total_possible_matches)
            {
                //different messages!
                if (accuracy < 80)
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
        //update stats
        accuracy = (match_counter / attempts) *10000;//make large to use round
        accuracy = Math.round(accuracy) / 100;//reduce down to a percent
        display_stats();
    }
    //console.log(temp);
}

//dan start
//'reverses' card face
//toFlip is the container 'card' to be flipped
    //the container has two subsections of 'front' and 'back'
    //  having the class 'down' means the subsection is transparent
    //  it is set up such that when one is 'down,' the other is not

//triggered when two cards are selected but do not match
    //turns the selected cards (which are face-up) back to face-down
    //un-select cards, reset for next attempt
    //removes the selected class so that no cards are currently being checked for
    //removes 'lock' on cards so they will react to being clicked again
    //  note: 'lock' separate from 'matched' even though function is same
    //resets values to be compared when card is clicked

//updates the display on the sidebar to display stats (calculated elsewhere)
    //gives games-played an updated value
    //gives attempts an updated value
    //gives accuracy an updated value (plus percent sign)

//dan end
function reset_stats() {
    match_counter = 0; // is 'matches' in instructions
    attempts = 0;
    accuracy = 0;
    display_stats();
}