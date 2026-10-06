const https = require('https');

const BUCKET = 'ishaleeh.firebasestorage.app';
const PREFIX = 'screens/';
const URL = `https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o?prefix=${PREFIX}`;

https.get(URL, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      if (!response.items || response.items.length === 0) {
        console.log('لا يوجد صور في هذا المسار أو المسار محمي.');
        return;
      }

      console.log('✅ تم العثور على الصور التالية:\n');
      
      response.items.forEach(item => {
        const fileName = item.name.replace(PREFIX, '');
        const encodedName = encodeURIComponent(item.name);
        
        // إذا كان هناك Token سيتم إضافته، وإلا سيتم جلب الرابط العام
        const token = item.downloadTokens ? `&token=${item.downloadTokens}` : '';
        const downloadUrl = `https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o/${encodedName}?alt=media${token}`;
        
        console.log(`- اسم الصورة: ${fileName}`);
        console.log(`  الرابط: ${downloadUrl}\n`);
      });
      
    } catch (e) {
      console.error('حدث خطأ أثناء قراءة البيانات:', e.message);
    }
  });
}).on('error', (e) => {
  console.error('حدث خطأ في الاتصال:', e.message);
});
