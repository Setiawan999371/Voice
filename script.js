
// Mendapatkan elemen DOM
const startBtn = document.getElementById('start-btn');
const questionElement = document.getElementById('question');
const answerElement = document.getElementById('answer');

// Daftar pertanyaan dan jawaban
const qaDatabase = {
  "apa itu javascript": "JavaScript adalah bahasa pemrograman yang digunakan untuk membuat halaman web interaktif.",
  "siapa presiden pertama indonesia": "Presiden pertama Indonesia adalah Ir. Soekarno.",
  "apa fungsi html": "HTML digunakan untuk membuat struktur halaman web.",
  "bagaimana cara belajar pemrograman": "Mulailah dengan mempelajari dasar-dasar seperti HTML, CSS, dan JavaScript."
};

// Fungsi untuk menangani pengenalan suara
function startListening() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'id-ID'; // Bahasa Indonesia

  recognition.start();

  recognition.onstart = () => {
    questionElement.textContent = "PERTANYAAN: Mendengarkan...";
    answerElement.textContent = "JAWABAN: ";
  };

  recognition.onspeechend = () => {
    recognition.stop();
  };

  recognition.onresult = (event) => {
    const speechToText = event.results[0][0].transcript.toLowerCase();
    questionElement.textContent = `PERTANYAAN: ${speechToText}`;

    // Mencari jawaban berdasarkan database
    const answer = qaDatabase[speechToText] || "Maaf, saya tidak mengerti pertanyaan Anda.";
    answerElement.textContent = `JAWABAN: ${answer}`;
  };

  recognition.onerror = (event) => {
    answerElement.textContent = `Error: ${event.error}`;
  };
}

// Menambahkan event listener ke tombol
startBtn.addEventListener('click', startListening);
