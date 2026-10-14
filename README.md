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
