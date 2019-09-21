$(function() {
    var classError;
    var charsCheck = /^[A-Za-z1-99999]+$/;
    var prepositions = new Array("a", "abaft", "aboard", "about", "above", "absent", "across", "afore", "after", "against", "along", "alongside", "amid", "amidst", "among", "amongst", "an", "apropos", "apud", "around", "as", "aside", "astride", "at", "athwart", "atop", "barring", "before", "behind", "below", "beneath", "beside", "besides", "between", "beyond", "but", "by", "circa", "concerning", "despite", "down", "during", "except", "excluding", "failing", "following", "for", "from", "given", "in", "including", "inside", "into", "lest", "like", "mid", "midst", "minus", "modulo", "near", "next", "notwithstanding", "of", "off", "on", "onto", "opposite", "out", "outside", "over", "pace", "past", "per", "plus", "pro", "qua", "regarding", "round", "sans", "save", "since", "than", "through", "throughout", "till", "times", "to", "toward", "towards", "under", "underneath", "unlike", "until", "unto", "up", "upon", "versus", "vs.", "via", "vice", "with", "within", "without", "worth", "according", "to", "ahead", "of", "apart", "from", "as", "for", "as", "of", "as", "per", "as", "regards", "aside", "from", "back", "to", "because", "of", "close", "to", "due", "to", "except", "for", "far", "from", "into", "inside", "of", "instead", "of", "left", "of", "near", "to", "next", "to", "on", "to", "out", "from", "out", "of", "outside", "of", "owing", "to", "prior", "to", "pursuant", "to", "rather", "than", "regardless", "of", "right", "of", "subsequent", "to", "thanks", "to", "that", "of", "up", "to", "where", "as", "as", "far", "as", "as", "long", "as", "as", "opposed", "to", "as", "soon", "as", "as", "well", "as", "regarding");
    var words;

    function getUserInput() {
        let userInput = $('.para').val();
        userInput = userInput.toString();
        return userInput;
    }

    $('.delete').click(function() {
        $('.para').val('');
        let userInput = getUserInput();
        classError = new ErrorState('block');
        let state = classError.returnCurrentState();
        if (userInput == '' && state == 'none') {
            infoState('none');
        }
    });

    $('.printBtn').click(function() {
        window.print();
    });

    $('.analyze').click(function() {
        let userInput = getUserInput();
        var numOfWords;
        let sentenceCount = 0;
        let punctuationCount = 0;
        let punctuation = ['?', '.', '!', ',', ';', ':', '"', "'", '-'];
        let punctuationLength = punctuation.length;
        let charCountWithWhitespace = userInput.length;
        let prepositionCount = 0;

        if (userInput == '') {
            classError = new ErrorState('block');
            classError.check();
        }
        else if (userInput[0].match(charsCheck) || userInput[1].match(charsCheck)) {

            classError = new ErrorState('none');
            classError.check();

            for (let i = 0; i <= charCountWithWhitespace; i++) {
                if (userInput[i] == '.' || userInput[i] == '!' || userInput[i] == '?') {
                    sentenceCount += 1;
                }

                for (let a = 0; a < punctuationLength; a++) {
                    if (userInput[i] == punctuation[a]) {
                        punctuationCount += 1;
                    }
                }
            }

            $('#numOfSentences').html('Number Of Sentences: ' + sentenceCount);
            $('#otherInfo').css('display', 'block');
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
            for (let j = 0; j <= charCountWithWhitespace; j++) {
                if (userInput[j] == " ") {
                    numOfSpaces += 1;
                }
            }
            let charCountWithoutWhitespace = (charCountWithWhitespace - numOfSpaces);

            $('#wordCount').html('Word Count: ' + numOfWords);
            $('#characterCountWithWhitespace').html('Character Count With Whitespace: ' + charCountWithWhitespace);
            $('#punctutationMarks').html('Punctuation Marks: ' + punctuationCount);
            $('#characterCountWithoutWhitespace').html('Character Count Without Whitespace: ' + charCountWithoutWhitespace);
            $('#preposition').html('Number of Prepositions: ' + prepositionCount);
        }
        else {
            classError = new ErrorState('block');
            classError.check();
        }
    });

    function infoState(state) {
        if (state == 'block') {
            $('#otherInfo').css('display', 'block');
        }
        else if (state == 'none') {
            $('#otherInfo').css('display', 'none');
        }
    }

    class ErrorState {
        constructor(state) {
            this.state = state;
        }

        check() {
            if (this.state == 'block' && $('#otherInfo').css('display') == 'block') {
                infoState('none');
            }
            else if (this.state == 'none' && $('#otherInfo').css('display') == 'none') {
                infoState('block');
            }
            $('.error').css('display', this.state);
        }


        returnCurrentState() {
            return $('.error').css('display');
        }


    }

});
