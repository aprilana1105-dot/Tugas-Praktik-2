var stokApp = new Vue({
    el: "#stokApp",
    data: {
        // ambil dari dataBahanAjar.js
        upbjjList: app.upbjjList,
        kategoriList: app.kategoriList,
        stok: app.stok,

        // filter
        filterUpbjj: "",
        filterKategori: "",
        filterReorder: false,
        sortBy: "judul",

        // tambah data
        newData: {
            kode: "",
            judul: "",
            kategori: "",
            upbjj: "",
            lokasiRak: "",
            qty: 0,
            safety: 0,
            harga: 0,
            catatanHTML: ""
        },

        // edit
        editMode: false,
        editData: {},
        editOriginal: null
    },

    computed: {
        filteredStok() {
            return this.stok.filter(item => {
                if (this.filterUpbjj && item.upbjj !== this.filterUpbjj) return false;
                if (this.filterKategori && item.kategori !== this.filterKategori) return false;

                if (this.filterReorder) {
                    if (!(item.qty < item.safety || item.qty === 0)) return false;
                }

                return true;
            });
        },

        sortedStok() {
            return this.filteredStok.sort((a, b) => {
                if (this.sortBy === "judul") return a.judul.localeCompare(b.judul);
                if (this.sortBy === "qty") return a.qty - b.qty;
                if (this.sortBy === "harga") return a.harga - b.harga;
            });
        }
    },

    methods: {
        resetFilter() {
            this.filterUpbjj = "";
            this.filterKategori = "";
            this.filterReorder = false;
            this.sortBy = "judul";
        },

        statusText(item) {
            if (item.qty === 0) return "Kosong";
            if (item.qty < item.safety) return "Menipis";
            return "Aman";
        },

        statusClass(item) {
            if (item.qty === 0) return "status danger";
            if (item.qty < item.safety) return "status warning";
            return "status safe";
        },

        addData() {
            if (!this.newData.kode || !this.newData.judul) {
                alert("Kode & Judul wajib diisi");
                return;
            }

            this.stok.push({ ...this.newData });

            alert("Data berhasil ditambahkan!");

            this.newData = {
                kode: "",
                judul: "",
                kategori: "",
                upbjj: "",
                lokasiRak: "",
                qty: 0,
                safety: 0,
                harga: 0,
                catatanHTML: ""
            };
        },

        openEdit(item) {
            this.editMode = true;
            this.editData = JSON.parse(JSON.stringify(item));
            this.editOriginal = item;
        },

        saveEdit() {
            Object.assign(this.editOriginal, this.editData);
            this.editMode = false;
            alert("Perubahan disimpan!");
        },

        closeEdit() {
            this.editMode = false;
        }
    }
});