const sentences = [
    { part: "طُبِعَ فُلان عَلَى", options: ["الْكَرَمِ", "الْحِرْصِ", "الأَرْيَحِيَّةِ", "الْبُخْل"], correct: 0 },
    { part: "وَجُبِلَ عَلَى", options: ["الأَرْيَحِيَّةِ", "الْبُخْل", "الشَّرِّ", "الْمُرُوءة"], correct: 0 },
    { part: "وَنُحِتَ عَلَى", options: ["الْمُرُوءة", "الشَّرِّ", "الْكَرَمِ", "الْجُبْن"], correct: 0 },
    { part: "وَطُوِيَ عَلَى", options: ["الْبُخْل", "الْكَرَمِ", "الشَّرِّ", "الْحِرْصِ"], correct: 2 },
    { part: "وَبُنِيَ عَلَى", options: ["الأَرْيَحِيَّةِ", "الْمُرُوءة", "الْجُبْن", "الْحِرْصِ"], correct: 3 },
    { part: "وَرُكِّبَ فِي طَبْعِهِ", options: ["الشَّرِّ", "الْحِرْصِ", "الْبُخْل", "الْكَرَمِ"], correct: 2 },
    { part: "وَرُكِزَ فِي طَبِيعَتِهِ", options: ["الْجُبْن", "الأَرْيَحِيَّةِ", "الشَّرِّ", "الْمُرُوءة"], correct: 0 }
];

let currentSentenceIndex = 0;
let score = 0;
let attempts = 0;

function startGame() {
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("game-screen").classList.remove("hidden");
    showSentence();
}

function showSentence() {
    const sentence = sentences[currentSentenceIndex];
    const shuffledOptions = shuffleArrayWithCorrectIndex(sentence.options, sentence.correct);
    document.getElementById("sentence").innerText = sentence.part;
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    shuffledOptions.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("button-default");
        button.onclick = () => checkAnswer(index, shuffledOptions.correct);
        optionsDiv.appendChild(button);
    });
    document.getElementById("next-button").classList.add("hidden");
}

function checkAnswer(selectedIndex, correctIndex) {
    attempts++;
    const buttons = document.querySelectorAll("#options button");
    if (selectedIndex === correctIndex) {
        score++;
        buttons[selectedIndex].classList.remove("button-default");
        buttons[selectedIndex].classList.add("button-correct");
        document.getElementById("correct-sound").play();
    } else {
        buttons[selectedIndex].classList.remove("button-default");
        buttons[selectedIndex].classList.add("button-wrong");
        document.getElementById("wrong-sound").play();
    }
    buttons[correctIndex].classList.add("button-correct");
    Array.from(buttons).forEach(btn => {
        btn.disabled = true;
    });
    document.getElementById("next-button").classList.remove("hidden");
}

function nextSentence() {
    currentSentenceIndex++;
    if (currentSentenceIndex < sentences.length) {
        showSentence();
    } else {
        endGame();
    }
}

function endGame() {
    document.getElementById("game-screen").classList.add("hidden");
    document.getElementById("end-screen").classList.remove("hidden");
    document.getElementById("score").innerText = `النقاط: ${score}`;
    document.getElementById("attempts").innerText = `عدد المحاولات: ${attempts}`;
}

function restartGame() {
    currentSentenceIndex = 0;
    score = 0;
    attempts = 0;
    document.getElementById("end-screen").classList.add("hidden");
    document.getElementById("start-screen").classList.remove("hidden");
}

function shuffleArrayWithCorrectIndex(array, correctIndex) {
    const correctValue = array[correctIndex];
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    const newCorrectIndex = shuffledArray.indexOf(correctValue);
    return { options: shuffledArray, correct: newCorrectIndex };
}
