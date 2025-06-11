// Menunggu sampai seluruh konten halaman HTML dimuat
document.addEventListener('DOMContentLoaded', () => {

    // 1. Mengambil elemen-elemen dari HTML yang kita butuhkan
    const quoteTextElement = document.getElementById('quote-text');
    const quoteAuthorElement = document.getElementById('quote-author');
    const newQuoteBtn = document.getElementById('new-quote-btn');

    // 2. Daftar kutipan yang sudah kamu kumpulkan (aku masukkan ke dalam array of objects)
    const quotes = [
        { text: "Jangan pernah menyerah, karena hanya orang yang berani mencoba yang bisa meraih sukses.", author: null },
        { text: "Keberanian adalah kunci untuk membuka semua pintu.", author: null },
        { text: "Buanglah rasa takutmu, karena takut hanya akan menghalangi langkahmu menuju kesuksesan.", author: null },
        { text: "Saat kamu merasa lelah, ingatlah bahwa setiap langkahmu adalah bagian dari perjuangan menuju impianmu.", author: null },
        { text: "Keberhasilan tidak datang dengan sendirinya, tapi dengan kerja keras dan tekad yang bulat.", author: null },
        { text: "Hidup bukanlah tentang 'Aku Bisa', namun juga tentang 'Aku Mencoba'.", author: "Ir. Soekarno" },
        { text: "Jadilah pribadi yang berani bermimpi besar dan berusaha untuk mewujudkannya.", author: null },
        { text: "Kamu adalah arsitek dari masa depanmu, jadi bangunlah dengan kuat dan teguh.", author: null },
        { text: "Jangan pernah takut gagal, karena kegagalan adalah batu loncatan menuju keberhasilan.", author: null },
        { text: "Ketika kamu merasa down, berhenti sejenak dan ingatlah betapa berharganya hidupmu.", author: null },
        { text: "Pendidikan merupakan sebuah senjata paling mematikan di dunia, karena dengan pendidikan, Anda dapat mudah mengubah dunia.", author: "Nelson Mandela" },
        { text: "Hiduplah seolah engkau mati besok. Belajarlah seolah engkau hidup selamanya.", author: "Mahatma Gandhi" },
        { text: "Belajar tanpa berpikir itu tidaklah berguna, tapi berpikir tanpa belajar itu sangatlah berbahaya.", author: "Ir. Soekarno" },
        { text: "Jangan menghabiskan seluruh hidup tanpa menikmatinya karena kamu akan menyesal saat melihat ke belakang.", author: null },
        { text: "Kamu tidak tahu apa yang ada di depan, jadi nikmati saat ini dan hargai setiap momen kehidupan.", author: null },
        { text: "Dalam hidup, setiap momen dipenuhi dengan kebahagiaan yang hanya perlu kamu lihat dan nikmati.", author: null },
        { text: "Hidup saat ini, lupakan masa lalu, dan jangan khawatirkan masa depan.", author: null },
        { text: "Jangan takut dengan tantangan karena hidup tanpa tantangan itu tidak menyenangkan.", author: null }
    ];

    // 3. Fungsi untuk menampilkan kutipan baru
    function displayNewQuote() {
        // Mendapatkan indeks acak dari array 'quotes'
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];

        // Menampilkan teks kutipan
        quoteTextElement.textContent = `"${randomQuote.text}"`;

        // Memeriksa apakah ada nama penulisnya
        if (randomQuote.author) {
            quoteAuthorElement.textContent = `- ${randomQuote.author}`;
        } else {
            quoteAuthorElement.textContent = ""; // Kosongkan jika tidak ada penulis
        }
    }

    // 4. Menambahkan event listener ke tombol
    // Fungsi displayNewQuote akan dijalankan setiap kali tombol diklik
    newQuoteBtn.addEventListener('click', displayNewQuote);

});