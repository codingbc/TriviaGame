var triviaQuestions = [{
	question: "What Are Durin's Folk More Commonly Known As?",
	answerList: ["Hobbits from outside The Shire", "Dwarves", "Forrest Elves", "Great Eagles"],
	answer: 1
},{
	question: "What Kind Of Creatures Are The Spawn Of Ungoliant?",
	answerList: ["Hill Giants", "Uruk-hai", "Giant Spiders", "Flying fell beasts"],
	answer: 2
},{
	question: "Who Participated In The Battle Of Isengard?",
	answerList: ["Saurumon's forces versus King Theoden's Rohirrim.", "Saurumon's forces versus the Ents","Orcs of Dol Guldur versus the Galadhrim of Lothlorien", "The forces of the Dark Lord Sauron versus the forces of Gondor"],
	answer: 1
},{
	question: "Which Of These Weapons Was Not Found In The Troll's Cave?",
	answerList: ["Orcrist the Goblin-cleaver", "Glamdring the Foe-hammer", "Sting", "Angrist"],
	answer: 3
},{
	question: "Who Was Elanor Gardner (Also Known As Elanor The Fair)?",
	answerList: ["The daughter of Samwise Gamgee and Rosie Cotton", "The Queen of Mirkwood and mother of Legolas", "One of the nine humans who was given a Ring of Power", "Wife of Bard the Bowman of Lake-town"],
	answer: 0
},{
	question: "What Did Aragorn, Imrahic, Gandalf, Eomer, Elladan, and Elrohir Decide During The Last Debate?",
	answerList: ["Who to send to destory the Ring of Power", "Who would lead the White Council. Gandalf was elected but declined, so Saruman took over.", "The number of soliders to send to fight Sauron in the Battle of Morannon", "How to punish the newly risen Uruk-hai"],
	answer: 2
},{
	question: "What Sindarin Word Was Aragorn Known By When He Was A Child?",
	answerList: ["Estel - meaning 'hope' or 'trust'.", "Amdir - meaning 'looking up'.", "Aeluim - meaning 'blue lake'.", "Miriel - meaning 'sparklying like jewels'."],
	answer: 0
},{
	question: "What Are Morgul-Wounds?",
	answerList: ["The corrupt mounds of earth from which Uruk-hai are born", "Wounds inflicted by the Nazgul", "Siege towers used by Orcs during the attach on Minas Tirith", "The name given to an Elf who has given up its immortality"],
	answer: 1
},{
	question: "What Do The Elves Call The Hobbits?",
	answerList: ["the Mellon", "The Periannath", "The Onodrim", "The Uruloki"],
	answer: 1
},{
	question: "What Marked the Start of the Third Age?",
	answerList: ["The defeat of Sauron at the hands of Last Alliance of Elves and Men.", "The descruction of Beleriand in the War of Wrath", "The dealth of Sauron after the destruction of the One Ring", "The creation of the Two Trees that gave light and time to the world."],
	answer: 0
},{
	question: "What Happened In The Location Called Wellinghall?",
	answerList: ["It is the Entish castle where the Entmoot is held.", "It is the Fangorn Forest home of the great spider Shelob", "It is the stone tower in Isengard from which Saruman commanded his forces", "It is where Treebread invited Merry and Pippin to stay before the Entmoot."],
	answer: 3
},{
	question: "Who Was Snaga?",
	answerList: ["The Great Goblin that lead the golbins living under the Misty Mountains", "A fire drake that lived within Lonely Mountain, where he protected his hoard of gold.", "An Orc-chieftain of Moria, who led the Orcs during the Battle of Five Armies", "An orc who died at the hands of Samwise Gamgee in the Tower of Cirith Ungol."],
	answer: 3
},{
	question: "Which Of These Is Not An Elvish Language?",
	answerList: ["Quendya", "Tailska", "Telerin", "Sindarin"],
	answer: 1
},{
	question: "How Does Farmer Maggot Keep People Off His Farm, Bamfurlong?",
	answerList: ["A pack of trained dogs", "A pack of trained wolves", "A shape-shifting man/bear", "A swarm of angree bees"],
	answer: 0
},{
	question: "'What Are The Palantiri, And How Many Are There?",
	answerList: ["Three Rings of Power given to the Elves", "Seven Seeing-Stones", "Three jewels created by Feanor", "Three strands of Galadriels hair given to Gimli"],
	answer: 1
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
    
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
    
    $('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;

    time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); 
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');

    if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}