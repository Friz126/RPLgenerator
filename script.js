document.addEventListener('DOMContentLoaded', () => {

    // Data Kutipan Berdasarkan Kategori
    const quotesData = {
        "Inspiratif": [
            { text: "Jika Tuhan adalah semua yang Anda miliki, Anda memiliki semua yang Anda butuhkan.", author: null },
            { text: "Tidak peduli di mana Anda berada dalam perjalanan Anda, di situlah Anda harus berada. Jalan berikutnya selalu di depan.", author: null },
            { text: "Orang yang memindahkan gunung memulai dengan membawa batu-batu kecil.", author: null }
        ],
        "Motivasi": [
            { text: "Optimisme adalah satu-satunya kualitas yang lebih terkait dengan kesuksesan dan kebahagiaan daripada yang lain.", author: null },
            { text: "Banyak hal yang bisa menjatuhkanmu. Tapi satu-satunya hal yang benar-benar bisa menjatuhkanmu adalah sikapmu sendiri.", author: "R.A. Kartini" },
            { text: "Ikhtiar! Berjuanglah membebaskan diri. Jika engkau sudah bebas karena ikhtiarmu itu, barulah dapat engkau tolong orang lain.", author: null }
        ],
        "Romantis": [
            { text: "Cinta bukan tentang menemukan seseorang yang sempurna, melainkan tentang melihat seseorang yang tidak sempurna dengan cara yang sempurna.", author: null },
            { text: "Dalam setiap detak jantung, ada cerita cinta yang tak terucapkan.", author: null },
            { text: "Di antara rindu dan kenangan, cintaku untukmu selalu tumbuh tanpa henti.", author: null }
        ],
        "Pendidikan": [
            { text: "Gadis yang pikirannya sudah dicerdaskan, pemandangannya sudah diperluas, tidak akan sanggup lagi hidup di dalam dunia nenek moyangnya.", author: "R.A. Kartini" },
            { text: "Pendidikan adalah senjata paling ampuh yang dapat Anda gunakan untuk mengubah dunia.", author: "Mustafa Kemal Atatürk" },
            { text: "Belajar bukan sekadar mengisi ember, tetapi menyalakan api.", author: null }
        ],
        "Spiritual": [
            { text: "Kehendak Tuhan tidak akan pernah membawamu ke tempat di mana kasih karunia Tuhan tidak akan melindungimu.", author: null },
            { text: "Tuhan punya alasan untuk membiarkan sesuatu terjadi. Kita mungkin tidak selalu memahami kebijaksanaannya, tapi kita hanya perlu mempercayai kehendaknya.", author: null }
        ],
        "Lain-lain": [
            { text: "Apa yang ada di belakang kita dan apa yang ada di depan kita adalah hal-hal kecil dibandingkan dengan apa yang ada di dalam diri kita.", author: null },
            { text: "Bahkan jika kebahagiaan sedikit melupakanmu, jangan pernah benar-benar melupakannya.", author: null },
            { text: "Dari kesulitan tumbuh keajaiban.", author: null }
        ]
    };

    // Elemen-elemen dari HTML
    const screens = {
        start: document.getElementById('start-screen'),
        category: document.getElementById('category-screen'),
        generator: document.getElementById('generator-screen'),
        personal: document.getElementById('personal-quotes-screen')
    };

    const buttons = {
        toPublic: document.getElementById('public-quotes-btn'),
        toPersonal: document.getElementById('personal-quotes-btn'),
        category: document.querySelectorAll('.category-btn'),
        newQuote: document.getElementById('new-quote-btn'),
        backToStartCat: document.getElementById('back-to-start-from-category'),
        backToCatGen: document.getElementById('back-to-category-btn'),
        backToStartPer: document.getElementById('back-to-start-from-personal'),
        usePersonal: document.getElementById('use-personal-quotes-btn')
    };
    
    const personalForm = {
        form: document.getElementById('personal-quote-form'),
        textInput: document.getElementById('personal-quote-input'),
        authorInput: document.getElementById('personal-author-input'),
        list: document.getElementById('personal-quote-list')
    };

    const quoteElements = {
        text: document.getElementById('quote-text'),
        author: document.getElementById('quote-author')
    };

    const copyBtn = document.getElementById('copy-btn');

    let currentCategory = '';
    let personalQuotes = getPersonalQuotes();

    // FUNGSI UNTUK LOCAL STORAGE
    function getPersonalQuotes() {
        return JSON.parse(localStorage.getItem('myPersonalQuotes')) || [];
    }

    function savePersonalQuotes(quotes) {
        localStorage.setItem('myPersonalQuotes', JSON.stringify(quotes));
    }

    // FUNGSI UNTUK MENAMPILKAN/RENDER UI
    function showScreen(screenName) {
        // Hapus class 'active' dari semua layar
        Object.values(screens).forEach(screen => screen.classList.remove('active'));
        // Tambahkan class 'active' hanya ke layar yang dituju
        screens[screenName].classList.add('active');
    }

    function renderPersonalQuotes() {
        const emptyStateMessage = document.getElementById('empty-state-message');
        const listElement = personalForm.list;
        const useButton = buttons.usePersonal;

        // Cek apakah ada kutipan pribadi
        if (personalQuotes.length === 0) {
            // Jika tidak ada, tampilkan pesan halaman kosong dan sembunyikan tombol 'Gunakan'
            emptyStateMessage.style.display = 'block';
            listElement.style.display = 'none';
            useButton.style.display = 'none'; // Sembunyikan tombol jika tidak ada kutipan
        } else {
            // Jika ada, tampilkan daftar kutipan dan tombol 'Gunakan'
            emptyStateMessage.style.display = 'none';
            listElement.style.display = 'block';
            useButton.style.display = 'inline-block'; // Tampilkan kembali tombol
            
            listElement.innerHTML = ''; // Kosongkan dulu untuk diisi ulang
            
            personalQuotes.forEach((quote, index) => {
                const li = document.createElement('li');
                li.innerHTML = `<span>"${quote.text}"<em> - ${quote.author || 'Tanpa Penulis'}</em></span>
                                <button class="delete-btn" data-index="${index}">Hapus</button>`;
                listElement.appendChild(li);
            });
    
            // Tambah event listener untuk tombol hapus yang baru dibuat
            document.querySelectorAll('.delete-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const indexToDelete = parseInt(e.target.dataset.index);
                    personalQuotes.splice(indexToDelete, 1);
                    savePersonalQuotes(personalQuotes);
                    renderPersonalQuotes(); // Panggil ulang fungsi untuk me-render state terbaru
                });
            });
        }
    }

    copyBtn.addEventListener('click', () => {
        const textToCopy = `${quoteElements.text.textContent} ${quoteElements.author.textContent}`;
        
        // Menggunakan Navigator Clipboard API modern untuk menyalin
        navigator.clipboard.writeText(textToCopy.trim()).then(() => {
            // Beri tahu pengguna bahwa teks berhasil disalin
            alert("Kutipan berhasil disalin!");
        }).catch(err => {
            // Tangani error jika terjadi
            console.error('Gagal menyalin teks: ', err);
            alert("Maaf, gagal menyalin teks.");
        });
    });
    
    function displayNewQuote() {
        const source = (currentCategory === 'pribadi') ? personalQuotes : quotesData[currentCategory];
        
        if (!source || source.length === 0) {
            quoteElements.text.textContent = (currentCategory === 'pribadi') 
                ? "Anda belum punya kutipan pribadi. Silakan tambahkan terlebih dahulu." 
                : "Maaf, belum ada kutipan untuk kategori ini.";
            quoteElements.author.textContent = "";
            return;
        }

        const randomIndex = Math.floor(Math.random() * source.length);
        const randomQuote = source[randomIndex];
        quoteElements.text.textContent = `"${randomQuote.text}"`;
        quoteElements.author.textContent = randomQuote.author ? `- ${randomQuote.author}` : "";
    }

    // Event Listeners untuk mengatur alur
     buttons.toPublic.addEventListener('click', () => showScreen('category'));
    buttons.toPersonal.addEventListener('click', () => {
        renderPersonalQuotes();
        showScreen('personal');
    });

    buttons.category.forEach(button => {
        button.addEventListener('click', () => {
            currentCategory = button.dataset.category;
            displayNewQuote();
            showScreen('generator');
        });
    });

    buttons.usePersonal.addEventListener('click', () => {
        currentCategory = 'pribadi';
        displayNewQuote();
        showScreen('generator');
    });

    buttons.newQuote.addEventListener('click', displayNewQuote);
    buttons.backToCatGen.addEventListener('click', () => showScreen('category'));
    buttons.backToStartCat.addEventListener('click', () => showScreen('start'));
    buttons.backToStartPer.addEventListener('click', () => showScreen('start'));
    // Event listener untuk form kutipan pribadi
    personalForm.form.addEventListener('submit', (e) => {
        e.preventDefault(); // Mencegah halaman reload
        const newQuote = {
            text: personalForm.textInput.value,
            author: personalForm.authorInput.value || null
        };
        personalQuotes.push(newQuote);

        savePersonalQuotes(personalQuotes);
        renderPersonalQuotes();
        personalForm.form.reset();
    });

    // Inisialisasi
    showScreen('start');

});