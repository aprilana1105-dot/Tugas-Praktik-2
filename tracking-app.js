const app = {
  data() {
    return {
      upbjjList: ["JNE Regular", "JNE Express"],

      paketList: [
        {
          kode: "PAKET-UT-001",
          nama: "Paket Matematika Pemula",
          harga: 120000,
          isi: ["Modul 1", "Modul 2", "Modul 3"]
        },
        {
          kode: "PAKET-UT-002",
          nama: "Paket Ekonomi Dasar",
          harga: 150000,
          isi: ["Modul A", "Modul B"]
        }
      ],

      // Tracking data
      tracking: {
        "DO2026-0001": {
          nim: "123456789",
          nama: "Rina Wulandari",
          status: "Dalam Perjalanan",
          ekspedisi: "JNE",
          tanggalKirim: "2025-08-25",
          paket: "PAKET-UT-001",
          total: 120000,
          perjalanan: [
            { waktu: "2025-08-25 10:12:20", keterangan: "Penerimaan di Loket: TANGSEL" },
            { waktu: "2025-08-25 14:07:56", keterangan: "Tiba di Hub: JAKSEL" },
            { waktu: "2025-08-26 08:44:01", keterangan: "Diteruskan ke Kantor Tujuan" }
          ]
        }
      },

      form: {
        nim: "",
        nama: "",
        ekspedisi: "",
        paket: "",
        tanggalKirim: ""
      }
    };
  },

  computed: {
    // Mendapatkan paket yang dipilih
    selectedPaket() {
      return this.paketList.find(p => p.kode === this.form.paket);
    },

    // Total harga otomatis
    totalHarga() {
      return this.selectedPaket ? this.selectedPaket.harga : 0;
    },

    // List tracking untuk tabel
    trackingList() {
      return Object.entries(this.tracking)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([nomorDO, data]) => ({
          nomorDO,
          ...data
        }));
    },

    // Nomor DO otomatis
    newDONumber() {
      const keys = Object.keys(this.tracking);

      if (keys.length === 0) return `DO${new Date().getFullYear()}-0001`;

      const lastKey = keys.sort().slice(-1)[0];
      const lastNumber = parseInt(lastKey.split("-")[1]);
      const next = (lastNumber + 1).toString().padStart(4, "0");

      return `DO${new Date().getFullYear()}-${next}`;
    }
  },

  methods: {
    saveDO() {
      if (!this.form.nim || !this.form.nama || !this.form.ekspedisi || !this.form.paket) {
        alert("Semua field bertanda * wajib diisi.");
        return;
      }

      this.tracking[this.newDONumber] = {
        nim: this.form.nim,
        nama: this.form.nama,
        ekspedisi: this.form.ekspedisi,
        tanggalKirim: this.form.tanggalKirim || new Date().toISOString().split("T")[0],
        paket: this.form.paket,
        total: this.totalHarga,
        status: "Baru Dibuat",
        perjalanan: []
      };

      alert("Data DO berhasil disimpan!");
      this.resetForm();
    },

    resetForm() {
      this.form = {
        nim: "",
        nama: "",
        ekspedisi: "",
        paket: "",
        tanggalKirim: ""
      };
    }
  }
};

Vue.createApp(app).mount("#app");