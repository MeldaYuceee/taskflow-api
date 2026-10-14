# TaskFlow - Görev Yönetim API

Bu proje, bir yazılım ekibinin kendi içindeki iş dağılımını, görev önceliklerini ve tamamlama süreçlerini yönetmesi amacıyla geliştirilmiş bir RESTful API servisidir.

## Proje Mimarisi

- **Çalışma Ortamı:** Node.js
- **Web Çatısı:** Express.js
- **Veri Saklama:** `data/tasks.json` dosyası üzerinden JSON tabanlı kalıcı yönetim
- **İstek Takibi:** Gelen tüm HTTP isteklerini (metot, rota ve yerel saat) terminale basan Logger middleware

---

## Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için adımları takip edin:

1. Bağımlılıkları yükleyin:
```bash
npm install

Sunucuyu başlatın:Bashnode server.js
Varsayılan olarak API http://localhost:3000 portunda ayağa kalkacaktır.API Uç Noktaları (Endpoints)HTTP MetoduEndpointAçıklamaGET/tasksSistemde kayıtlı bütün görevleri listelerGET/tasks/:idID bilgisi verilen spesifik görevin detayını dönerPOST/tasksYeni bir görev oluştururPUT/tasks/:idBelirtilen görevin bilgilerini (durum, başlık vb.) güncellerDELETE/tasks/:idBelirtilen görevi sistemden kalıcı olarak silerÖrnek İstek Gövdesi (POST /tasks)JSON{
  "title": "Veritabanı Tasarımı",
  "description": "Tablolar ilişkilendirilecek",
  "priority": "yuksek",
  "assignee": "Musa"
}
