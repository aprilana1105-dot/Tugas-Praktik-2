// ================= LOGIN ====================
function login() {
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;

    const user = dataPengguna.find(u => u.email === email && u.password === pass);

    if (!user) {
        openError();
        return;
    }

    localStorage.setItem("loginUser", JSON.stringify(user));
    window.location = "dashboard.html";
}
function openError() {
    document.getElementById("modalError").style.display = "flex";
}

function closeError() {
    document.getElementById("modalError").style.display = "none";
}

function openForgot(){ modalForgot.style.display = "block"; }
function closeForgot(){ modalForgot.style.display = "none"; }
function openRegister(){ modalRegister.style.display = "block"; }
function closeRegister(){ modalRegister.style.display = "none"; }


// ================= TRACKING ====================
function tracking() {
    const nomor = doInput.value.trim();
    const data = dataTracking[nomor];

    if (!data) {
        trackingResult.innerHTML = "<p>Nomor DO tidak ditemukan.</p>";
        return;
    }

    let perjalananHTML = "";
    data.perjalanan.forEach(p => {
        perjalananHTML += `
        <div class="track-step">
            <div class="circle"></div>
            <div class="track-info">
                <b>${p.keterangan}</b><br>
                <small>${p.waktu}</small>
            </div>
        </div>`;
    }
);

    trackingResult.innerHTML = `
        <div class="track-card">
            <h3>${data.nama}</h3>
            <p>Status: <b>${data.status}</b></p>
            <div class="progress-bar"></div>
            <p>Ekspedisi: ${data.ekspedisi}</p>
            <p>Tanggal Kirim: ${data.tanggalKirim}</p>
            <p>Total Pembayaran: ${data.total}</p>

            <h4>Riwayat Perjalanan</h4>
            ${perjalananHTML}
        </div>
    `;
}


// ================= STOK ====================
function loadStok() {

    let html = "";

    dataBahanAjar.forEach(item => {
        html += `
        <div class="stok-card">
            <img src="${item.cover}" alt="cover buku">
            <h3>${item.namaBarang}</h3>
            <p>Kode Lokasi: ${item.kodeLokasi}</p>
            <p>Kode Barang: ${item.kodeBarang}</p>
            <p>Jenis: ${item.jenisBarang}</p>
            <p>Edisi: ${item.edisi}</p>
            <p><b>Stok: ${item.stok}</b></p>
        </div>`;
    });

    document.getElementById("stokList").innerHTML = html;
}

function tambahStok() {
    dataBahanAjar.push({
        kodeLokasi: lokasi.value,
        kodeBarang: kode.value,
        namaBarang: nama.value,
        jenisBarang: jenis.value,
        edisi: edisi.value,
        stok: stok.value,
        cover: "assets/img/pemrograman_berbasisweb.jpeg" 
    });

    loadStok();
}

window.onload = function(){
    if(document.getElementById("stokList")) loadStok();
}