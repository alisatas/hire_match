import Link from "next/link";
import { CONTACT_EMAIL, SUPPORT } from "@/lib/site";
import type { LegalPages } from "./types";

const contact = CONTACT_EMAIL
  ? <><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> adresine e-posta gönderin</>
  : <>Lemon Squeezy&apos;nin size gönderdiği makbuz e-postasını yanıtlayın</>;

export const LEGAL: LegalPages = {
  privacy: {
    title: "Gizlilik Politikası",
    description: "CVXray CV'nizi asla saklamaz. Hangi verilerin nerede ve ne kadar süreyle işlendiğini, analitik ve ödeme verilerini ve haklarınızı açıklıyoruz.",
    intro: <p>CVXray, CV&apos;niz size ait kalsın diye tasarlandı. Bu sayfa neyin, nerede ve ne kadar süreyle işlendiğini açıklar. CVXray, Hollanda&apos;da yaşayan bir birey tarafından işletilir; site için veri sorumlusu bu kişidir.</p>,
    sections: [
      { title: "CV'niz", body: <ul>
        <li><strong>Yapıştırılan metin</strong> tarayıcınızdan hiç çıkmaz. Uyum analizi tamamen cihazınızda çalışır.</li>
        <li><strong>Yüklenen PDF&apos;ler</strong> yalnızca metni çıkarmak için sunucumuza gönderilir; metin tarayıcınıza geri gönderilir. Dosya ve metni hemen silinir; hiçbir veritabanına, dosyaya veya kayda yazılmaz.</li>
        <li>CV içeriği hiçbir zaman analitik, reklam veya herhangi bir modelin eğitimi için kullanılmaz.</li>
      </ul> },
      { title: "İş ilanları", body: <p>Bir ilan bağlantısı yapıştırırsanız sunucumuz bu herkese açık sayfayı getirir, metnini çıkarır ve tarayıcınıza gönderir. Bağlantı ve sayfa içeriği saklanmaz.</p> },
      { title: "Tarayıcınızda saklananlar", body: <p>Tarayıcınız son üç uyum skorunuzu (skor, etiket ve beceri sayıları; CV metni yok) ve çerez tercihinizi saklar; böylece site bunları bir sonraki ziyaretinizde gösterebilir. Silmek için tarayıcınızın site verilerini temizleyin.</p> },
      { title: "Analitik ve reklam ölçümü", body: <>
        <p>Yalnızca çerez bandında &ldquo;Tümünü kabul et&rdquo;e tıklarsanız Google Tag Manager, Google Analytics&apos;i ve Google Ads ölçümünü yükler. Bunlar sayfa görüntülemeleri ve bir analizin tamamlanıp tamamlanmadığı gibi anonim kullanım bilgilerini kaydeder; CV&apos;nizin veya iş ilanının içeriğini asla kaydetmez. Tercihinizi alt menüdeki &ldquo;Çerez ayarları&rdquo; ile istediğiniz zaman değiştirebilirsiniz.</p>
        <p>Ayrıca sayfa görüntülemelerini çerez kullanmadan ve sizi tanımlamadan sayan Vercel Web Analytics&apos;i kullanıyoruz.</p>
      </> },
      { title: "Ödemeler", body: <p>İsteğe bağlı destek ödemeleri, satıcı sıfatıyla (merchant of record) Lemon Squeezy tarafından işlenir. Lemon Squeezy ödeme bilgilerinizi kendi gizlilik politikası kapsamında toplar; kart bilgilerinizi biz hiçbir zaman görmeyiz. Hizmeti yürütmek ve iadeleri işlemek için gereken sipariş bilgilerini alırız: adınız, e-posta adresiniz, tutar ve ülke.</p> },
      { title: "Barındırma ve güvenlik", body: <p>Site Vercel tarafından barındırılır. Sayfaları sunmak ve siteyi kötüye kullanıma karşı korumak için IP adresiniz sunucu kayıtlarında işlenir ve hız sınırlaması için yaklaşık bir dakika bellekte tutulur.</p> },
      { title: "Haklarınız", body: <p>GDPR kapsamında, hakkınızda tuttuğumuz kişisel verilere erişmeyi, bunların düzeltilmesini veya silinmesini isteyebilir ya da kullanımına itiraz edebilirsiniz. CV verisi saklamadığımız için, vergi amacıyla saklamak zorunda olduğumuz ödeme kayıtları dışında genellikle silinecek bir şey yoktur. Hollanda veri koruma kurumuna (Autoriteit Persoonsgegevens) şikâyette de bulunabilirsiniz.</p> },
      { title: "İletişim", body: <p>Gizlilikle ilgili sorularınız için {contact}.</p> },
    ],
  },
  terms: {
    title: "Kullanım Koşulları",
    description: "Ücretsiz CV analiz aracı CVXray'in koşulları: kabul edilebilir kullanım, verileriniz, sorumluluk ve Lemon Squeezy ile isteğe bağlı destek ödemeleri.",
    intro: <p>Bu koşullar, cvxray.com adresindeki CVXray&apos;i kullandığınızda geçerlidir. CVXray, Hollanda&apos;da yaşayan bir birey tarafından işletilir. Siteyi kullanarak bu koşulları kabul etmiş olursunuz. Kabul etmiyorsanız lütfen siteyi kullanmayın.</p>,
    sections: [
      { title: "CVXray ne yapar", body: <p>CVXray bir CV&apos;yi bir iş ilanıyla karşılaştırır ve uyum skoru, eşleşen ve eksik beceriler, anahtar kelimeler ve kurs önerileri gösterir. Araç ücretsizdir; hesap ve kullanım sınırı yoktur. Sonuçlar, CV&apos;nizi uyarlamanıza yardımcı olan otomatik yönlendirmelerdir. Herhangi bir mülakat, iş teklifi veya işe alım kararının tahmini ya da garantisi değildir.</p> },
      { title: "Siteyi kullanma", body: <>
        <p>CVXray&apos;i kendi iş aramanız veya başkalarının iş aramasına yardım etmek için kullanabilirsiniz. Şunları yapmamayı kabul edersiniz:</p>
        <ul>
          <li>kullanma hakkınız olmayan içerikleri veya başkalarının kişisel verilerini izinleri olmadan yüklemek;</li>
          <li>siteye saldırmak, siteyi aşırı yüklemek, içeriğini toplu olarak kazımak veya güvenlik önlemlerini ya da hız sınırlarını aşmaya çalışmak;</li>
          <li>ilan bağlantısı özelliğini herkese açık iş ilanları dışında bir şey getirmek için kullanmak;</li>
          <li>siteyi hukuka aykırı herhangi bir amaçla kullanmak.</li>
        </ul>
        <p>Bu kuralları ihlal eden erişimi engelleyebiliriz.</p>
      </> },
      { title: "CV'niz ve verileriniz", body: <p>CV&apos;niz asla saklanmaz. CV metninin, iş ilanlarının, analitik ve ödeme verilerinin nasıl işlendiği <Link href="/tr/privacy">Gizlilik Politikası</Link>&apos;nda açıklanmıştır.</p> },
      { title: "İsteğe bağlı destek ödemeleri", body: <>
        <p>CVXray gönüllü, tek seferlik bir destek ödemesi sunabilir (€{SUPPORT.minimumEur} ve üzeri herhangi bir tutar). Destek ödemeleri hiçbir özelliğin kilidini açmaz; ödeme yapsanız da yapmasanız da araç ücretsiz kalır.</p>
        <p>Ödemeler, satıcı sıfatıyla (merchant of record) hareket eden <a href="https://www.lemonsqueezy.com" target="_blank" rel="noopener noreferrer">Lemon Squeezy</a> tarafından satılır ve işlenir. Ödeme sayfasını, ödeme güvenliğini, faturaları ve satış vergisi veya KDV&apos;yi Lemon Squeezy yönetir; satın alma için Lemon Squeezy&apos;nin kendi koşulları geçerlidir. Kart bilgilerinizi biz hiçbir zaman görmeyiz.</p>
        <p>{SUPPORT.refundDays} gün içinde tam iade alabilirsiniz; bkz. <Link href="/tr/refund-policy">İade Politikası</Link>.</p>
      </> },
      { title: "Üçüncü taraf bağlantıları", body: <p>Sonuçlar, başkaları tarafından işletilen kurslara, iş sitelerine ve mülakat kaynaklarına bağlantı verir. Bu siteleri kontrol etmiyoruz ve içeriklerinden, fiyatlarından veya erişilebilirliklerinden sorumlu değiliz.</p> },
      { title: "Erişilebilirlik ve değişiklikler", body: <p>CVXray olduğu gibi sunulur. Doğru ve erişilebilir tutmak için çalışıyoruz, ancak her zaman hatasız veya çevrimiçi olacağını vaat edemeyiz; özellikleri istediğimiz zaman değiştirebilir veya durdurabiliriz.</p> },
      { title: "Sorumluluk", body: <p>Yasanın izin verdiği ölçüde, dolaylı veya sonuç olarak ortaya çıkan zararlardan ya da sonuçlara dayanarak verdiğiniz kararlardan sorumlu değiliz. Bu koşullardaki hiçbir hüküm, yasayla sınırlanamayan sorumluluğu veya tüketici olarak yasal haklarınızı sınırlamaz.</p> },
      { title: "Bu koşullardaki değişiklikler", body: <p>Bu koşulları güncelleyebiliriz. En üstteki tarih en son sürümü gösterir. Bir değişiklikten sonra siteyi kullanmaya devam etmeniz, güncellenmiş koşulları kabul ettiğiniz anlamına gelir.</p> },
      { title: "Uygulanacak hukuk", body: <p>Bu koşullar Hollanda hukukuna tabidir. Tüketiciyseniz yaşadığınız ülkenin emredici yasalarının sağladığı korumadan da yararlanmaya devam edersiniz.</p> },
      { title: "İletişim", body: <p>Bu koşullarla ilgili sorularınız için {contact}.</p> },
    ],
  },
  refunds: {
    title: "İade Politikası",
    description: `CVXray destek ödemeleri ${SUPPORT.refundDays} gün içinde, gerekçe sorulmadan tamamen iade edilir. İade talebinde nasıl bulunacağınızı burada açıklıyoruz.`,
    intro: <p>CVXray ücretsizdir. CVXray&apos;in sunabileceği tek ödeme, Lemon Squeezy tarafından işlenen gönüllü, tek seferlik bir destek ödemesidir (€{SUPPORT.minimumEur} ve üzeri herhangi bir tutar). Ödeme yapıp fikrinizi değiştirirseniz paranızı geri alırsınız.</p>,
    sections: [
      { title: `${SUPPORT.refundDays} gün içinde tam iade`, body: <p>Bir destek ödemesinin tamamının iadesini, ödeme tarihinden itibaren {SUPPORT.refundDays} gün içinde isteyebilirsiniz. Gerekçe gerekmez ve hiçbir kesinti yapılmaz.</p> },
      { title: "İade nasıl istenir", body: <ul>
        <li>Lemon Squeezy&apos;den aldığınız makbuz e-postasını yanıtlayın, veya</li>
        <li><a href="https://app.lemonsqueezy.com/my-orders" target="_blank" rel="noopener noreferrer">Lemon Squeezy siparişleriniz</a> arasında siparişi bulun ve oradan destek ekibine ulaşın{CONTACT_EMAIL ? ", veya" : "."}</li>
        {CONTACT_EMAIL && <li>ödeme yaptığınız adresten <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> adresine e-posta gönderin.</li>}
      </ul> },
      { title: "Para ne zaman geri gelir", body: <p>İadeler orijinal ödeme yöntemine yapılır. Lemon Squeezy iadeyi hemen başlatır; bankanızın veya kart sağlayıcınızın tutarı göstermesi genellikle 5–10 iş günü sürer.</p> },
      { title: `${SUPPORT.refundDays} günden sonra`, body: <p>Yanlışlıkla veya mükerrer yapılan ödemeler, ne zaman fark ederseniz edin her zaman iade edilir. {SUPPORT.refundDays} günden sonraki diğer durumlar için bizimle iletişime geçin, birlikte değerlendirelim.</p> },
      { title: "Yasal haklarınız", body: <p>Bu politika, tüketici olarak sahip olduğunuz yasal haklara ek olarak geçerlidir ve bunları sınırlamaz. Ayrıca bkz. <Link href="/tr/terms">Kullanım Koşulları</Link>.</p> },
    ],
  },
};
