 // Fungsi untuk menampilkan modal form order
 function openOrderModal(productName, productPrice) {
    const modal = document.getElementById('orderModal');
    const productNameElement = document.getElementById('modalProductName');
    const productPriceElement = document.getElementById('modalProductPrice');
    const quantityInput = document.getElementById('quantity');
    const totalInput = document.getElementById('total');
    
    // Set data produk
    productNameElement.textContent = productName;
    productPriceElement.textContent = `Harga: Rp ${formatRupiah(productPrice)}`;
    
    // Set harga dan total awal
    quantityInput.dataset.price = productPrice;
    updateTotal();
    
    // Tampilkan modal
    modal.style.display = 'block';
    
    // Reset form
    document.getElementById('orderForm').reset();
    document.getElementById('btnSubmit').disabled = true;
    
    // Tambahkan event listener untuk validasi form
    document.getElementById('orderForm').addEventListener('input', validateForm);
  }
  
  // Fungsi untuk menutup modal
  function closeModal() {
    document.getElementById('orderModal').style.display = 'none';
  }
  
  // Fungsi untuk memperbarui total pembayaran
  function updateTotal() {
    const quantityInput = document.getElementById('quantity');
    const price = parseInt(quantityInput.dataset.price);
    const quantity = parseInt(quantityInput.value) || 5;
    
    // Validasi minimal pembelian
    if (quantity < 5) {
      alert('Pembelian minimal 5 box');
      quantityInput.value = 5;
      return;
    }
    
    const total = price * quantity;
    document.getElementById('total').value = `Rp ${formatRupiah(total)}`;
  }
  
  // Fungsi untuk memformat angka menjadi format Rupiah
  function formatRupiah(angka) {
    return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  
  // Fungsi untuk validasi form
  function validateForm() {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const quantity = document.getElementById('quantity').value;
    
    // Validasi minimal pembelian
    if (parseInt(quantity) < 5) {
      document.getElementById('btnSubmit').disabled = true;
      return;
    }
    
    // Aktifkan tombol jika semua field wajib terisi
    if (name && phone && address && quantity) {
      document.getElementById('btnSubmit').disabled = false;
    } else {
      document.getElementById('btnSubmit').disabled = true;
    }
  }
  
  // Fungsi untuk mengirim pesan ke WhatsApp
  function sendToWhatsApp(e) {
    e.preventDefault();
    
    const productName = document.getElementById('modalProductName').textContent;
    const productPrice = document.getElementById('modalProductPrice').textContent.replace('Harga: Rp ', '');
    const quantity = document.getElementById('quantity').value;
    const total = document.getElementById('total').value.replace('Rp ', '');
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const notes = document.getElementById('notes').value;
    
    // Format pesan WhatsApp
    let message = `Halo, saya ingin memesan catering dari Dapur Pangeran.%0A%0A`;
    message += `*Detail Pesanan:*%0A`;
    message += `Produk: ${productName}%0A`;
    message += `Harga: Rp ${formatRupiah(parseInt(productPrice))}%0A`;
    message += `Jumlah: ${quantity} box%0A`;
    message += `Total: ${total}%0A%0A`;
    message += `*Data Diri:*%0A`;
    message += `Nama: ${name}%0A`;
    message += `Telepon: ${phone}%0A`;
    message += `Alamat: ${address}%0A`;
    
    if (notes) {
      message += `Catatan: ${notes}%0A%0A`;
    }
    
    message += `Mohon konfirmasi ketersediaan dan detail pembayarannya. Terima kasih.`;
    
    // Nomor WhatsApp tujuan
    const whatsappNumber = '6287781935781';
    
    // Buka WhatsApp
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    
    // Tutup modal setelah mengirim
    closeModal();
  }
  
  // Event listener untuk tombol ORDER
  document.querySelectorAll('.order-btn').forEach(button => {
    button.addEventListener('click', function() {
      const productName = this.getAttribute('data-name');
      const productPrice = parseInt(this.getAttribute('data-price'));
      openOrderModal(productName, productPrice);
    });
  });
  
  // Event listener untuk perubahan jumlah beli
  document.getElementById('quantity').addEventListener('change', updateTotal);
  
  // Event listener untuk submit form
  document.getElementById('orderForm').addEventListener('submit', sendToWhatsApp);
  
  // Event listener untuk menutup modal saat mengklik di luar area modal
  window.addEventListener('click', function(event) {
    const modal = document.getElementById('orderModal');
    if (event.target === modal) {
      closeModal();
    }
  });

  function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    const hamburger = document.querySelector(".hamburger");
    navLinks.classList.toggle("show");
    hamburger.classList.toggle("active");
  }

  document.addEventListener('click', function (event) {
    const navLinks = document.getElementById("navLinks");
    const hamburger = document.querySelector(".hamburger");
    if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
      navLinks.classList.remove("show");
      hamburger.classList.remove("active");
    }
  });

  function tampilkanSection(id) {
    document.querySelectorAll("section").forEach(sec => {
      sec.classList.remove("active");
    });
    const target = document.getElementById(id);
    if (target) {
      target.classList.add("active");
      target.scrollIntoView({ behavior: "smooth" });
    }
    document.getElementById("navLinks").classList.remove("show");
    document.querySelector(".hamburger").classList.remove("active");
  }

  document.addEventListener("DOMContentLoaded", () => {
    tampilkanSection("home");
  });

  window.addEventListener("scroll", function () {
    const scrollBtn = document.getElementById("scrollTopBtn");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      scrollBtn.style.display = "block";
    } else {
      scrollBtn.style.display = "none";
    }
  });


let currentSlide = 0;
const slides = document.querySelectorAll("#hero-slider .slide");
const totalSlides = slides.length;

function changeSlide() {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % totalSlides;
  slides[currentSlide].classList.add("active");
}
setInterval(changeSlide, 4000); // Ganti foto setiap 4 detik


document.getElementById("waForm").addEventListener("submit", function(e) {
  e.preventDefault();

  // Ambil data
  const nama = document.getElementById("nama").value.trim();
  const telepon = document.getElementById("telepon").value.trim();
  const email = document.getElementById("email").value.trim();
  const pesan = document.getElementById("pesan").value.trim();

  // Validasi semua harus diisi
  if (!nama || !telepon || !email || !pesan) {
    alert("Harap isi semua kolom!");
    return;
  }

  // Nomor WhatsApp tujuan (gunakan format internasional tanpa + dan 0 di depan)
  const nomorWA = "6281234567890"; // Ganti dengan nomor penjual

  // Format pesan
  const text = `Halo, saya *${nama}*%0ANo. Telp: ${telepon}%0AEmail: ${email}%0A%0A${pesan}`;

  // Notifikasi sukses
  alert("Pesan Anda siap dikirim via WhatsApp!");

  // Buka WhatsApp
  window.open(`https://wa.me/${nomorWA}?text=${text}`, "_blank");

  // Bersihkan form
  document.getElementById("waForm").reset();
});




// testimoni
const komentarList = document.getElementById('komentarList');
const modal = document.getElementById('modalKomentar');
const avatarSources = Array.from({ length: 30 }, (_, i) => `https://i.pravatar.cc/150?img=${i + 1}`);
const komentarLimit = 10;

const komentarManual = [
  {
    nama: "Admin 👨‍💼",
    komentar: "Selamat berbelanja! 😊 Jika ada pertanyaan, hubungi kami.",
    bintang: 5,
    avatar: avatarSources[3],
    waktu: new Date().toLocaleString(),
    manual: true
  },

  {
    nama: "Rina 💕",
    komentar: "Sudah langganan di sini. Masakannya enak-enak packing rapih dan bagus!",
    bintang: 5,
    avatar: avatarSources[5],
    waktu: new Date().toLocaleString(),
    manual: true
  },

  {
    nama: "Rahul",
    komentar: "Sudah langganan di sini. makanannya enak, fresh dan sedap!",
    bintang: 5,
    avatar: avatarSources[5],
    waktu: new Date().toLocaleString(),
    manual: true
  },
  {
    nama: "Reny 👨‍💼",
    komentar: "Selamat berbelanja! 😊 Jika ada pertanyaan, hubungi kami.",
    bintang: 5,
    avatar: avatarSources[3],
    waktu: new Date().toLocaleString(),
    manual: true
  },

  {
    nama: "Devi 💕",
    komentar: "Sudah langganan di sini. Masakannya enak-enak packing rapih dan bagus!",
    bintang: 5,
    avatar: avatarSources[5],
    waktu: new Date().toLocaleString(),
    manual: true
  },

  {
    nama: "Rahmat",
    komentar: "Sudah langganan di sini. makanannya enak, fresh dan sedap!",
    bintang: 5,
    avatar: avatarSources[5],
    waktu: new Date().toLocaleString(),
    manual: true
  }
];

function loadKomentar() {
  komentarList.innerHTML = "";

  const local = JSON.parse(localStorage.getItem('komentarData')) || [];
  const semuaKomentar = [...komentarManual, ...local];

  // Batasi jumlah komentar tampil (terbaru di bawah)
  const tampilKomentar = semuaKomentar.slice(-komentarLimit);
  tampilKomentar.forEach((item, index) => {
    // Hitung indeks asli di localStorage dengan mengurangi jumlah komentar manual
    const localIndex = index - komentarManual.length;
    tampilkanKomentar(item, localIndex, !item.manual);
  });
}

function tampilkanKomentar({ nama, komentar, bintang, avatar, waktu }, localIndex, bisaHapus) {
  const div = document.createElement('div');
  div.className = "komentar";
  div.innerHTML = `
    <img src="${avatar}" alt="avatar">
    <div class="komentar-content">
      <div class="komentar-nama">${nama}</div>
      <div class="bintang">${'⭐'.repeat(bintang)}</div>
      <div class="waktu">${waktu}</div>
      <p>${komentar}</p>
    </div>
    ${bisaHapus ? `<button class="hapus-btn" onclick="hapusKomentar(${localIndex})">Hapus</button>` : ''}
  `;
  komentarList.appendChild(div);
}

function hapusKomentar(index) {
  const local = JSON.parse(localStorage.getItem('komentarData')) || [];
  if (index >= 0 && index < local.length) {
    local.splice(index, 1);
    localStorage.setItem('komentarData', JSON.stringify(local));
    loadKomentar();
  }
}

document.getElementById('beriKomentarBtn').onclick = () => {
  modal.style.display = 'block';
};

function tutupModal() {
  modal.style.display = 'none';
}

window.onclick = (e) => {
  if (e.target === modal) tutupModal();
};

document.getElementById('kirimKomentarBtn').onclick = () => {
  const nama = document.getElementById('namaInput').value.trim();
  const komentar = document.getElementById('komentarInput').value.trim();
  const bintang = parseInt(document.getElementById('bintangInput').value);
  if (!nama || !komentar) {
    alert("Mohon lengkapi nama dan komentar!");
    return;
  }

  const waktu = new Date().toLocaleString();
  const avatar = avatarSources[Math.floor(Math.random() * avatarSources.length)];
  const newData = { nama, komentar, bintang, avatar, waktu };

  const existing = JSON.parse(localStorage.getItem('komentarData')) || [];
  existing.push(newData);
  localStorage.setItem('komentarData', JSON.stringify(existing));

  loadKomentar();

  const pesan = `Halo Admin!%0ASaya ingin memberi komentar:%0A🧑 Nama: ${nama}%0A💬 Komentar: ${komentar}%0A⭐ Rating: ${'⭐'.repeat(bintang)}%0A🕒 Waktu: ${waktu}`;
  const noWa = "6287781935781";
  window.open(`https://wa.me/${noWa}?text=${pesan}`, "_blank");

  document.getElementById('namaInput').value = "";
  document.getElementById('komentarInput').value = "";
  document.getElementById('bintangInput').value = "5";
  tutupModal();
};
loadKomentar();


// Tab switching
document.querySelectorAll(".tab-link").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tab-link").forEach(btn => btn.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(button.dataset.tab).classList.add("active");
  });
});

// Read more toggle
document.querySelectorAll(".read-more").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const fullText = link.previousElementSibling.querySelector(".full-text");
    const shortText = link.previousElementSibling.querySelector(".short-text");

    if (fullText.style.display === "none") {
      fullText.style.display = "block";
      shortText.style.display = "none";
      link.textContent = "Tutup";
    } else {
      fullText.style.display = "none";
      shortText.style.display = "block";
      link.textContent = "Baca Selengkapnya";
    }
  });
});

// Q & A 
document.querySelectorAll(".accordion-header").forEach(button => {
  button.addEventListener("click", () => {
    const item = button.parentElement;
    item.classList.toggle("active");
  });
});

// === Modal Detil Produk ===
function openDetailModal(name, img, desc) {
  document.getElementById("detailTitle").textContent = name;
  document.getElementById("detailImage").src = img;
  document.getElementById("detailDesc").textContent = desc;

  document.getElementById("detailModal").style.display = "block";
}

function closeDetailModal() {
  document.getElementById("detailModal").style.display = "none";
}

// Event listener untuk semua tombol Detil
document.querySelectorAll(".detail-btn").forEach(btn => {
  btn.addEventListener("click", function () {
    const name = this.getAttribute("data-name");
    const img = this.getAttribute("data-img");
    const desc = this.getAttribute("data-desc");
    openDetailModal(name, img, desc);
  });
});

// Tutup modal saat klik luar
window.addEventListener("click", function (e) {
  const modal = document.getElementById("detailModal");
  if (e.target === modal) {
    closeDetailModal();
  }
});


// tombol scroll atas
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

// === Produk Rekomendasi di Artikel ===
document.addEventListener("DOMContentLoaded", () => {
  const allProducts = Array.from(document.querySelectorAll("#product .product-card"));
  const container = document.getElementById("randomProductContainer");

  if (allProducts.length > 0 && container) {
    // Acak urutan produk
    const shuffled = allProducts.sort(() => 0.5 - Math.random());

    // Ambil minimal 3 produk acak
    const selected = shuffled.slice(0, 3);

    selected.forEach(prod => {
      const cloned = prod.cloneNode(true);

      // === ORDER button re-attach ===
      const orderBtn = cloned.querySelector(".order-btn");
      if (orderBtn) {
        orderBtn.addEventListener("click", function () {
          const productName = this.getAttribute("data-name");
          const productPrice = parseInt(this.getAttribute("data-price"));
          openOrderModal(productName, productPrice);
        });
      }

      // === DETIL button re-attach ===
      const detailBtn = cloned.querySelector(".detail-btn");
      if (detailBtn) {
        detailBtn.addEventListener("click", function () {
          const name = this.getAttribute("data-name");
          const img = this.getAttribute("data-img");
          const desc = this.getAttribute("data-desc");
          openDetailModal(name, img, desc);
        });
      }

      container.appendChild(cloned);
    });
  }
});




