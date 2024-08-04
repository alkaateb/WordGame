const sentences = [
    { part: "طُبِعَ فُلان عَلَى", options: ["الْكَرَمِ", "الْحِرْصِ", "الأَرْيَحِيَّةِ", "الْبُخْل"], correct: 0 },
    { part: "وَجُبِلَ عَلَى", options: ["الأَرْيَحِيَّةِ", "الْبُخْل", "الْمُرُوءة", "الشَّرِّ"], correct: 0 },
    { part: "وَنُحِتَ عَلَى", options: ["الْمُرُوءة", "الْكَرَمِ", "الشَّرِّ", "الْجُبْن"], correct: 0 },
    { part: "وَطُوِيَ عَلَى", options: ["الشَّرِّ", "الْحِرْصِ", "الْبُخْل", "الْكَرَمِ"], correct: 0 },
    { part: "وَبُنِيَ عَلَى", options: ["الْحِرْصِ", "الأَرْيَحِيَّةِ", "الْمُرُوءة", "الْجُبْن"], correct: 0 },
    { part: "وَرُكِّبَ فِي طَبْعِهِ", options: ["الْبُخْل", "الْكَرَمِ", "الشَّرِّ", "الْحِرْصِ"], correct: 0 },
    { part: "وَرُكِزَ فِي طَبِيعَتِهِ", options: ["الْجُبْن", "الأَرْيَحِيَّةِ", "الْمُرُوءة", "الشَّرِّ"], correct: 0 }
];

let currentSentenceIndex = 0;
let score = 0;

function startGame() {
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("game-screen").classList.remove("hidden");
    showSentence();
}

function showSentence() {
    const sentence = sentences[currentSentenceIndex];
    document.getElementById("sentence").innerText = sentence.part;
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    sentence.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.onclick = () => checkAnswer(index);
        optionsDiv.appendChild(button);
    });
    document.getElementById("next-button").classList.add("hidden");
}

function checkAnswer(selectedIndex) {
    const sentence = sentences[currentSentenceIndex];
    if (selectedIndex === sentence.correct) {
        score++;
        alert("إجابة صحيحة!");
    } else {
        alert("إجابة خاطئة، حاول مرة أخرى!");
    }
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
}

function restartGame() {
    currentSentenceIndex = 0;
    score = 0;
    document.getElementById("end-screen").classList.add("hidden");
    document.getElementById("start-screen").classList.remove("hidden");
}
