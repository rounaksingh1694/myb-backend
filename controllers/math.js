numberOfElements = 0;
answer = "";

signList = [];
equation = "";
i = 0;
indexToPlaceDecimalNumber = 0;
number1 = "";
number2 = "";
number3 = "";
score = 0;

getRandomInteger = (max) => {
	return Math.floor(Math.random() * max);
};

shuffleArray = (array) => {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
};

askQuestionAndGiveOptions = (rating) => {
	generateNumberOfElements(rating);
	var Question1 = generateQuestion(rating);
	var Question2 = (Question1.replace("*", "×") + "= ?").replace("/", "÷");
	console.log(Question2);
	try {
		generateAnswer(Question1);
	} catch (e) {
		console.log(e);
	}
};

generateNumberOfElements = (rating) => {
	var ele = Math.floor(rating / 100);
	ele = ele < 2 ? 2 : ele < 6 ? ele : 6;

	numberOfElements = ele;
};

veryEasy = () => {
	var number = getRandomInteger(20) - 9;
	if (score > 5) {
		number = number * 10 + getRandomInteger(20) - 9;
	}
	if (signList[0] === "*") {
		signList.splice(0, 1, "+");
	}
	if (signList[0] === "/") {
		signList.splice(0, 1, "-");
	}
	if (number < 0) {
		equation += "(" + number.toString(10) + ")" + " " + signList[0] + " ";
	} else {
		equation += number.toString(10) + " " + signList[0] + " ";
	}
};

easy = () => {
	number = getRandomInteger(20) - 9;
	if (score > 5) {
		number = number * 10 + getRandomInteger(20) - 9;
	}
	if (number < 0) {
		equation += "(" + number.toString(10) + ")" + " " + signList[0] + " ";
	} else {
		equation += number.toString(10) + " " + signList[0] + " ";
	}
};

hard = () => {
	if (signList[0] == "/") {
		signList.splice(0, 1, "*");
	}
	if (i == 1) {
		indexToPlaceDecimalNumber = getRandomInteger(numberOfElements);
	}
	if (i == indexToPlaceDecimalNumber) {
		var number = Math.random() * 10;
		equation +=
			number.toString(10).substring(0, number.toString(10).indexOf(".") + 2) +
			" " +
			signList[0] +
			" ";
	} else {
		var number = getRandomInteger(10);
		equation +=
			number.toString(10).substring(0, number.toString(10).indexOf(".") + 2) +
			" " +
			signList[0] +
			" ";
	}
};

generateQuestion = (rating) => {
	signList = [];

	signList.push("+");
	signList.push("-");
	signList.push("/");
	signList.push("*");
	equation = "";
	for (var i = 0; i < numberOfElements; i++) {
		shuffleArray(signList);
		console.log("signList:" + signList);

		if (rating <= 100 || (rating > 100 && rating < 200)) {
			veryEasy();
		}

		if (rating >= 200 && rating < 300) {
			easy();
		}
		if (rating >= 300 && rating < 400) {
			hard();
		}
		if (rating >= 400) {
			var whatWeShouldAdd = getRandomInteger(3);

			if (whatWeShouldAdd == 0) {
				veryEasy();
			}
			if (whatWeShouldAdd == 1) {
				easy();
			}
			if (whatWeShouldAdd == 2) {
				hard();
			}
		}
		if (signList[0] == "/") {
			signList.splice(0, 1);
		}
	}

	equation = equation.substring(0, equation.length - 2);
	try {
		generateAnswer(equation);
	} catch (e) {
		// e.printStackTrace();
		console.log("Error in calling for answer in generating equation", e);
	}
	if (String.valueOf(answer) == "") {
		if (isNonTerminating(answer.toString())) {
			console.log("called");
			generateQuestion();
		}
	}
	return equation;
};

generateAnswer = () => {
	answer = eval(equation);
	console.log("equation: " + equation);
	console.log("answer: " + answer);
};

askQuestionAndGiveOptions(600);
