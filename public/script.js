$(function() {

  var charsCheck = /^[A-Za-z1-99999]+$/;
  var prepositions = new Array("a", "abaft", "aboard", "about", "above", "absent", "across", "afore", "after", "against", "along", "alongside", "amid", "amidst", "among", "amongst", "an", "apropos", "apud", "around", "as", "aside", "astride", "at", "athwart", "atop", "barring", "before", "behind", "below", "beneath", "beside", "besides", "between", "beyond", "but", "by", "circa", "concerning", "despite", "down", "during", "except", "excluding", "failing", "following", "for", "from", "given", "in", "including", "inside", "into", "lest", "like", "mid", "midst", "minus", "modulo", "near", "next", "notwithstanding", "of", "off", "on", "onto", "opposite", "out", "outside", "over", "pace", "past", "per", "plus", "pro", "qua", "regarding", "round", "sans", "save", "since", "than", "through", "throughout", "till", "times", "to", "toward", "towards", "under", "underneath", "unlike", "until", "unto", "up", "upon", "versus", "vs.", "via", "vice", "with", "within", "without", "worth", "according", "ahead", "apart", "regards", "back", "because", "close", "due", "far", "instead", "left", "owing", "prior", "pursuant", "rather", "regardless", "right", "subsequent", "thanks", "that", "where", "long",  "opposed",  "soon",  "well");
  var words;
  var numOfWords = 0;
  var sentenceCount = 0;
  var punctuationCount = 0;
  var punctuation = ['?', '.', '!', ',', ';', ':', '"', "'", '-'];
  var punctuationLength = punctuation.length;
  var prepositionCount = 0;

  var state;
  var change;
  $(".submitText").click(function() {
    state = $('.slider').css('background-color');
    state = new String(state);

    let textContent = $('#text').val();
    var changedText;

    if (state == 'rgb(42, 185, 52)') {
      change = 'capital';
    } else if (state == "rgb(202, 34, 34)") {
      change = 'lower';
    }

    if (change == 'capital') {
      changedText = textContent.toUpperCase();
      $('#text').val(changedText)

    } else if (change == 'lower') {
      changedText = textContent.toLowerCase();
      $('#text').val(changedText)
    }
  });

    function getUserInput() {
        let userInput = $('.para').val();
        userInput = userInput.toString();
        return userInput;
    }

    $('.eraseBtn').click(function() {
        $('.para').val('');
        $('.para').keyup();
    });

    $('.printBtn').click(function() {
        window.print();
    });

    $('.para').keyup(function() {
        var userInput = getUserInput();
        var charCountWithWhitespace = 0;
        var charCountWithoutWhitespace = userInput.length;
        prepositionCount = 0;
        sentenceCount = 0;
        punctuationCount = 0;

        if (userInput[0] == undefined) {
          sentenceCount = 0;
          punctuationCount = 0;
          charCountWithWhitespace = 0;
          charCountWithoutWhitespace = 0;
          prepositionCount = 0;
          numOfWords = 0;
        }
        else if (userInput[0].match(charsCheck) || userInput[1].match(charsCheck)) {
            console.log(charCountWithoutWhitespace);
            for (let i = 0; i <= charCountWithoutWhitespace; i++) {
                if (userInput[i] == '.' || userInput[i] == '!' || userInput[i] == '?') {
                    sentenceCount += 1;
                    console.log(sentenceCount);
                }

                for (let a = 0; a < punctuationLength; a++) {
                    if (userInput[i] == punctuation[a]) {
                        punctuationCount += 1;
                    }
                }
            }

            $('.sentenceNum').html(sentenceCount);
            userInput = userInput.toLowerCase();
            words = userInput.split(' ');

            numOfWords = userInput.split(' ').length;

            for (let b = 0; b <= numOfWords; b++) {
                for (let r = 0; r < prepositions.length; r++) {
                    if (words[b] == prepositions[r]) {
                        prepositionCount += 1;
                    }
                }
            }
            let numOfSpaces = 0;
            for (let j = 0; j <= charCountWithoutWhitespace; j++) {
                if (userInput[j] == " ") {
                    numOfSpaces += 1;
                }
            }
            charCountWithoutWhitespace = (charCountWithoutWhitespace - numOfSpaces);
            charCountWithWhitespace = (charCountWithoutWhitespace + numOfSpaces);
        }
        $('#wordCount').html(numOfWords);
        $('#characterCountWithWhitespace').html(charCountWithWhitespace);
        $('#punctutationMarks').html(punctuationCount);
        $('#characterCountWithoutWhitespace').html(charCountWithoutWhitespace);
        $('#preposition').html(prepositionCount);
    });
});
