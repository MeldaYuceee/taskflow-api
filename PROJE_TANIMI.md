# TASKFLOW - Proje Tanıtım Dokümanı

## 1. Projenin Amacı ve Senaryosu
Modern yazılım geliştirme süreçlerinde ekiplerin iş dağılımını organize etmesi, görevlerin ilerleme durumunu takip etmesi ve sorumlulukları şeffaf bir şekilde yönetmesi kritik bir gerekliliktir. 

TaskFlow, bir yazılım şirketinin operasyonel iş akışını merkezi bir yapıda yönetmek üzere tasarlanmış RESTful bir API servisidir. Sistem; ekip üyelerine görev atanması, işlerin öncelik derecelerinin belirlenmesi, durum güncellemeleri ve yaşam döngüsü tamamlanan işlerin arşivden kaldırılması süreçlerini uçtan uca destekler.

---

## 2. Sistem Mimarisi ve Teknoloji Yığını
Sistem, gereksiz karmaşıklıktan uzak, sürdürülebilir ve modüler bir mimari yaklaşımla geliştirilmiştir:

- **Çalışma Ortamı (Runtime):** Node.js
- **Sunucu Çatısı:** Express.js
- **Mimari Model:** REST (Representational State Transfer) standartlarına tam uyumlu CRUD mimarisi
- **Yönlendirme (Routing):** Uygulama mantığı ana sunucu dosyasından ayrıştırılarak `routes/taskRoutes.js` altında modüler hale getirilmiştir.
- **Kalıcı Depolama Katmanı:** Harici bir veritabanı bağımlılığı olmadan, hafif ve taşınabilir bir dosya tabanlı JSON depolama sistemi (`helpers/storage.js` ve `data/tasks.json`) kullanılmıştır.
- **Benzersiz Kimlik Yönetimi:** Veri çakışmalarını önlemek amacıyla `uuid` kütüphanesi ile benzersiz ID üretimi uygulanmıştır.

---

## 3. Temel Middleware: Logger (İstek İzleme Sistemi)
Sistem güvenliği ve sunucu hareketlerinin izlenebilirliği adına özel bir ara yazılım (middleware) entegre edilmiştir. `middlewares/logger.js` servisi, API'ye ulaşan her HTTP isteğini analiz ederek şu bilgileri konsola kaydeder:
- İstek Metodu (GET, POST, PUT, DELETE)
- Hedef URL / Rota
- İsteğin gerçekleştiği anlık zaman damgası (ISO / Yerel Saat)

Bu sayede harici bir araç gerekmeden API trafiği ve hata durumları canlı olarak izlenebilmektedir.

---

## 4. Desteklenen İş Akışları ve CRUD Operasyonları

Sistem temel iş akışlarını 5 ana uç nokta üzerinden yürütmektedir:

1. **Görev Oluşturma (`POST /tasks`):**
   - Görev başlığı, açıklama, öncelik (`dusuk`, `orta`, `yuksek`) ve sorumlu personel bilgisi girilerek sisteme yeni kayıt eklenir.
   - Varsayılan olarak görevin tamamlanma durumu `completed: false` atanır ve oluşturulma tarihi (`createdAt`) otomatik kaydedilir.

2. **Görev Listeleme (`GET /tasks`):**
   - Sistemde aktif olan tüm kayıtlı görevleri toplam kayıt sayısıyla (`total`) birlikte dizi halinde döndürür.

3. **Tekil Görev Detayı (`GET /tasks/:id`):**
   - URL parametresi üzerinden gönderilen benzersiz ID sorgulanarak doğrudan ilgili görevin detay objesi getirilir. Kayıt bulunamazsa standart `404 Not Found` yanıtı döner.

4. **Görev Güncelleme (`PUT /tasks/:id`):**
   - Görevin başlığı, durumu (`completed: true`) veya önceliği revize edilir; güncellenme tarihi (`updatedAt`) işlenerek yanıt döndürülür.

5. **Görev Silme (`DELETE /tasks/:id`):**
   - İptal edilen ya da tamamlanıp depodan kaldırılması gereken görev kaydı sistemden kalıcı olarak temizlenir.

---

## 5. Doğrulama ve Test Kanıtları
Geliştirilen tüm uç noktaların HTTP durum kodları (`200 OK`, `201 Created`, `404 Not Found`) ve JSON yanıt formatları Postman test aracıyla kapsamlı şekilde doğrulanmış; testlere ait kanıt ekran görüntüleri repo dizinindeki `screenshots/` klasörüne dahil edilmiştir.
