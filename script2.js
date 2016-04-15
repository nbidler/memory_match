/**
 * Created by Nick on 4/11/2016.
 */

function GameArea() {
    var self = this;
    this.first_card_clicked = null;
    this.second_card_clicked = null;
    this.total_possible_matches  = 9;
    this.match_counter = 0; // is 'matches' in instructions
    this.attempts = 0;
    this.accuracy = 0;
    this.games_played = 0;

    this.deck = [];
    this.currentFaces = [];

    //create array of possible card backs/faces
    //use random to choose an image and set img src as "images/" + text, i.e. "images/RuneHunter.jpg"

    // backs.length is 17
    this.backs = ["RuneAnti-Clockwise_Metamorphosis.png",
        "RuneArcane_Lake.jpg",
        "RuneBeast.jpg",
        "RuneBlood_Rapture.jpg",
        "RuneClawmark.jpg",
        "RuneClockwise_Metamorphosis.jpg",
        "RuneCommunion.jpg",
        "RuneCorruption.jpg",
        "RuneEye.png",
        "RuneFormless_Oedon.jpg",
        "RuneGreat_Deep_Sea.jpg",
        "RuneHeir.jpg",
        "RuneHunter.jpg",
        "RuneMilkweed.jpg",
        "RuneMoon.jpg",
        "RuneOedon_Writhe.jpg",
        "RuneRadiance.jpg"];
    // faces.length is 36
    this.faces = ["Amygdalan_arm.jpg",
        "Beast_Claw.png",
        "Beast_cutter.jpg",
        "Beasthunters_saif.jpg",
        "Blade_of_Mercy.png",
        "Bloodletter.jpg",
        "BloodVial.png",
        "Boom_hammer.jpg",
        "Burial_Blade.png",
        "Cannon.png",
        "Chikage.png",
        "Church_cannon.jpg",
        "Church_pick.jpg",
        "Evelyn.jpg",
        "Fist_of_Gratia.png",
        "Flamesprayer.png",
        "Gatling_Gun.png",
        "Holy_moonlight_sword.jpg",
        "HunterAxe.png",
        "HunterBlunderbuss.png",
        "HunterPistol.png",
        "Kirkhammer.png",
        "Logarius_Wheel.png",
        "LudwigsHolyBlade.png",
        "LudwigsRifle.png",
        "Rakuyo.jpg",
        "Reiterpallasch.png",
        "RepeatingPistol.png",
        "RifleSpear.png",
        "Rosmarinus.jpg",
        "SawCleaver.png",
        "SawSpear.png",
        "Simons_bowblade.jpg",
        "ThreadedCane.png",
        "Tonitrus.jpg",
        "Torch.png",
        "Whirligig_Saw.jpg"];

    /*
    * card - basic unit of the game
    *   contains:
    *   back - picture of card 'back'
    *   position - position on game board
    *   pair - cards that share this # are a matching pair (and a face image)
    * */
    this.gameCard = function(){
        this.back = null;
        this.position = null;
        this.pair = null;
    };

    this.resetGame = function() {
        //reset game values and board to original

        //remove lock/matched/selected classes from cards on board
        $('.card').removeClass('lock');
        $('.card').removeClass('matched');
        $('.card').removeClass('selected');
        //return cards to 'face-down' position on board
        //   'down' class is removed from backs and given to fronts
        $('.front').addClass('down');
        $('.back').removeClass('down');
        //win message is reset
        $('#win_message').addClass('dismissed');
        $('.win_msg1').removeClass('win_msg1');
        $('.win_msg2').removeClass('win_msg2');
        //
        self.first_card_clicked  = null;
        self.second_card_clicked  = null;
        //version 1.0 additions
        self.games_played++;
        self.reset_stats();
        self.display_stats();

        //deal 'new cards'

        //create array of card positions, numbered 1-18
        var positions = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];
        //randomize positions (to be later assigned to cards) with Fisher Yates shuffle
        //  FISHER YATES SHUFFLE
        //  THIS MAY BE USABLE ELSEWHERE BUT UNTIL SUCH POINT IT'S JUST IN THIS FUNCTION
        var counter = positions.length;

        while (counter > 0){
            //pick random index
            var index = Math.floor(Math.random() * counter);
            //reduce available indices
            counter--;

            //switch value positions using temp to hold values
            var tempPos = positions[counter];
            positions[counter] = positions[index];
            positions[index] = tempPos;
        }
        //  END FISHER YATES SHUFFLE

        //assign card pairs their faces
        //use same as above to shuffle and just loop to choose images and set img src as "images/" + text, i.e. "images/RuneHunter.jpg"
        counter = self.faces.length;

        while (counter > 0){
            //pick random index
            var selected = Math.floor(Math.random() * counter);
            //reduce available indices
            counter--;

            //switch value positions using temp to hold values
            var tempFace = self.faces[counter];
            self.faces[counter] = self.faces[selected];
            self.faces[selected] = tempFace;
        }

        //having shuffled card faces, assign them to pairs
        self.currentFaces = [];
        for (var j = 0; j < 9; j++) {
            console.log(j, self.faces[j]);
            self.currentFaces.push(self.faces[j]);
        }
        //console.log(self.currentFaces);

        //create empty deck, populate deck of 18 cards
        self.deck = [];

        for (var i = 0; i < 18; i++){
            //  make a card object to put values into
            var card = new self.gameCard();
            //  assign cards positions from the randomized list
            card.position = positions[i];
            //  assign cards their pair (and by extension, faces)
            card.pair = (i % 9);
            //give card a random back, for flavor
            card.back = self.backs[Math.floor(Math.random() * 17)];
            //  put card into deck
            self.deck.push(card);
        }
        //console.log(self.deck);

        //change card appearance to match randomized backs and faces
        for (var k = 0; k < 18; k++){
            //console.log('back', "images/" + self.deck[k].back);
            //console.log('front', "images/" + self.currentFaces[self.deck[k].pair]);

            var current = $("[data-position = '" + self.deck[k].position + "']");
            //set face
            current.find('.front').find('img')
                .attr('src', "images/" + self.currentFaces[self.deck[k].pair]);
            //set back
            current.find('.back').find('img')
                .attr('src', "images/" + self.deck[k].back +"");
        }

    };

    this.cardFlip = function(toFlip){
        $(toFlip).find('.back').toggleClass('down');
        $(toFlip).find('.front').toggleClass('down');
    };

    this.noMatch = function(){
        self.cardFlip('.selected');
        //un-select cards, reset for next attempt
        $('.selected').removeClass('selected');
        $('.card').removeClass('lock');
        self.first_card_clicked  = null;
        self.second_card_clicked  = null;
    };

    this.display_stats = function(){
        $('.games-played .value').html(self.games_played);
        $('.attempts .value').html(self.attempts);
        $('.accuracy .value').html(self.accuracy + '%');
    };

    this.reset_stats = function(){
        self.match_counter = 0; // is 'matches' in instructions
        self.attempts = 0;
        self.accuracy = 0;
        self.display_stats();
    };

    this.card_clicked = function(target){
        //flip card, set front 'up' and back 'down'
        self.cardFlip(target);

        //find AND store card img src
        //second_card_clicked = $(target).find('.front').find('img').attr('src');
        //console.log(temp);

        //sets card as one of the selected
        //if it's clicked a second time, it's unselected
        $(target).toggleClass('selected');

        //check if first card of pair
        if (self.first_card_clicked  == null)
        {
            //store first card
            for (var k = 0; k < 18; k++)
            {
                if (self.deck[k].position == $(target).attr('data-position'))
                {
                    self.first_card_clicked  = self.deck[k].pair;
                    break;
                }
            }

        }
        //if not first of pair, is second
        else
        {
            //store second card
            for (var k = 0; k < 18; k++)
            {
                if (self.deck[k].position == $(target).attr('data-position'))
                {
                    self.second_card_clicked  = self.deck[k].pair;
                    break;
                }
            }

            console.log(self.first_card_clicked, self.second_card_clicked);
            //attempt to match is made
            self.attempts++;
            //if second, check if card matches first
            if (self.first_card_clicked  == self.second_card_clicked)
            {
                //card matches AND is not same card
                if ($('.selected').length > 1)
                {
                    self.match_counter +=1;
                }
                //if last match, game won!
                if(self.match_counter == self.total_possible_matches)
                {
                    var winMsg = $('.win_message').find('p');
                    //different messages!
                    if (self.accuracy < 50)
                    {
                        winMsg.html('PREY SLAUGHTERED');
                        winMsg.addClass('win_msg1');
                    }
                    else
                    {
                        winMsg.html('NIGHTMARE SLAIN');
                        winMsg.addClass('win_msg2');
                    }
                    $('.win_message').removeClass('dismissed')
                }
                //lock cards in place
                //$('.selected').hide();
                $('.selected').addClass('matched');
                //un-select cards, reset for next attempt
                $('.selected').removeClass('selected');
                self.first_card_clicked  = null;
                self.second_card_clicked  = null;
            }
            //no match
            else {
                //return to face-down
                $('.card').addClass('lock');
                setTimeout(self.noMatch, 2000);
            }
            //update stats
            self.accuracy = (self.match_counter / self.attempts) *10000;//make large to use round
            self.accuracy = Math.round(self.accuracy) / 100;//reduce down to a percent
            self.display_stats();
        }
        //console.log(temp);
    };

}

$(document).ready(function(){

    var game = new GameArea();
    game.resetGame();
    console.log(game.deck);

    //reset game
    $('button').click(function(){
        game.resetGame();
    });

    //determine when clicked
    $('.card').click(function() {
        //if locked, do nothing
        if ($(this).hasClass('lock') || $(this).hasClass('matched')) {
            return;
        }
        //otherwise, compare
        else {
            game.card_clicked(this);
        }
    });

    $('.win_message').click(function() {
        $('.win_message').addClass('dismissed')
    });

    game.display_stats();
});