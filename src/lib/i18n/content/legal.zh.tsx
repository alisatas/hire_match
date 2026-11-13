import Link from "next/link";
import { CONTACT_EMAIL, SUPPORT } from "@/lib/site";
import type { LegalPages } from "./types";

const contact = CONTACT_EMAIL
  ? <>请发送邮件至 <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></>
  : <>请直接回复 Lemon Squeezy 发给你的收据邮件</>;

export const LEGAL: LegalPages = {
  privacy: {
    title: "CVXray 隐私政策",
    description: "CVXray 绝不保存你的简历。本页说明我们处理哪些数据、在哪里处理、保留多久，以及网站分析、付款和你享有的各项权利。如有疑问，欢迎随时联系我们。",
    intro: <p>CVXray 的设计宗旨是让你的简历始终属于你。本页准确说明我们处理哪些数据、在哪里处理以及保留多久。CVXray 由一位居住在荷兰的个人运营，此人是本网站的数据控制者。</p>,
    sections: [
      { title: "你的简历", body: <ul>
        <li><strong>粘贴的文本</strong>不会离开你的浏览器，匹配分析完全在你的设备上运行。</li>
        <li><strong>上传的 PDF</strong> 只会发送到我们的服务器以提取文本，提取的文本随即返回你的浏览器。文件及其文本会立即丢弃，绝不会写入任何数据库、文件或日志。</li>
        <li>简历内容绝不会用于数据分析、广告或训练任何模型。</li>
      </ul> },
      { title: "职位描述", body: <p>如果你粘贴职位链接，我们的服务器会获取该公开页面、提取文本并返回你的浏览器。链接和页面内容都不会被保存。</p> },
      { title: "保存在你浏览器中的内容", body: <p>你的浏览器会保存你最近三次的匹配度评分（评分、标签和技能数量，不含简历文本）以及你的 Cookie 选择，以便下次访问时显示。清除浏览器中本网站的数据即可将其删除。</p> },
      { title: "网站分析与广告效果衡量", body: <>
        <p>只有在你点击 Cookie 横幅中的“全部接受”后，Google Tag Manager 才会加载 Google Analytics 和 Google Ads 效果衡量。它们记录匿名的使用情况，例如页面浏览量以及是否完成了分析，绝不记录你的简历或职位描述的内容。你可以随时通过页脚的“Cookie 设置”更改选择。</p>
        <p>我们还使用 Vercel Web Analytics，它在不使用 Cookie、不识别你身份的情况下统计页面浏览量。</p>
      </> },
      { title: "付款", body: <p>自愿支持付款由 Lemon Squeezy 作为记录商户（merchant of record）处理。Lemon Squeezy 依据其自身的隐私政策收集你的付款信息，我们绝不会看到你的银行卡信息。我们会收到提供服务和处理退款所需的订单信息：姓名、电子邮箱、金额和国家/地区。</p> },
      { title: "托管与安全", body: <p>本网站由 Vercel 托管。为了提供页面并防止网站被滥用，你的 IP 地址会在服务器日志中被处理，并且为了限制请求频率，会在内存中保留约一分钟。</p> },
      { title: "你的权利", body: <p>根据《通用数据保护条例》（GDPR），你可以要求访问、更正或删除我们持有的关于你的个人数据，或反对我们使用这些数据。由于我们不保存任何简历数据，除了出于税务原因必须保留的付款记录外，通常没有需要删除的内容。你也可以向荷兰数据保护机构（Autoriteit Persoonsgegevens）投诉。</p> },
      { title: "联系我们", body: <p>如有隐私方面的问题，{contact}。</p> },
    ],
  },
  terms: {
    title: "CVXray 服务条款",
    description: "使用免费简历匹配工具 CVXray 的条款：可接受的使用方式、你的数据、责任限制，以及通过 Lemon Squeezy 进行的自愿支持付款和退款安排。",
    intro: <p>当你使用 cvxray.com 上的 CVXray 时，本条款即适用。CVXray 由一位居住在荷兰的个人运营。使用本网站即表示你同意本条款。如果你不同意，请不要使用本网站。</p>,
    sections: [
      { title: "CVXray 的功能", body: <p>CVXray 将简历与职位描述进行对比，并显示匹配度评分、已匹配和缺失的技能、关键词以及课程建议。该工具免费使用，无需账号，也没有使用次数限制。结果是帮助你调整简历的自动化建议，并不代表对任何面试、录用或招聘决定的预测或保证。</p> },
      { title: "使用本网站", body: <>
        <p>你可以将 CVXray 用于自己的求职，或帮助他人求职。你同意不会：</p>
        <ul>
          <li>上传你无权使用的内容，或未经他人许可上传他人的个人数据；</li>
          <li>攻击、超负荷访问或批量抓取本网站，或试图绕过其安全措施或请求频率限制；</li>
          <li>使用职位链接功能获取公开职位以外的任何内容；</li>
          <li>将本网站用于任何违法目的。</li>
        </ul>
        <p>对于违反上述规则的访问，我们可能会予以封禁。</p>
      </> },
      { title: "你的简历和数据", body: <p>你的简历绝不会被保存。简历文本、职位描述、分析数据和付款数据的处理方式见<Link href="/zh/privacy">隐私政策</Link>。</p> },
      { title: "自愿支持付款", body: <>
        <p>CVXray 可能提供一次性的自愿支持付款（{SUPPORT.minimumEur} 欧元起，金额随意）。支持付款不会解锁任何功能：无论是否付款，该工具都保持免费。</p>
        <p>付款由 <a href="https://www.lemonsqueezy.com" target="_blank" rel="noopener noreferrer">Lemon Squeezy</a> 作为记录商户（merchant of record）销售和处理。Lemon Squeezy 负责结账、支付安全、发票以及销售税或增值税，购买行为适用其自身条款。我们绝不会看到你的银行卡信息。</p>
        <p>你可以在 {SUPPORT.refundDays} 天内获得全额退款，详见<Link href="/zh/refund-policy">退款政策</Link>。</p>
      </> },
      { title: "第三方链接", body: <p>结果中会链接到由他人运营的课程、招聘网站和面试资源。我们无法控制这些网站，也不对其内容、价格或可用性负责。</p> },
      { title: "可用性与变更", body: <p>CVXray 按现状提供。我们努力保持其准确和可用，但无法保证它始终没有错误或始终在线，并且我们可能随时更改或停止某些功能。</p> },
      { title: "责任", body: <p>在法律允许的范围内，我们不对间接损失或后果性损失负责，也不对你根据结果做出的决定负责。本条款中的任何内容均不限制法律规定不得限制的责任，也不限制你作为消费者的法定权利。</p> },
      { title: "条款变更", body: <p>我们可能会更新本条款。页面顶部的日期表示最新版本。条款变更后继续使用本网站，即表示你接受更新后的条款。</p> },
      { title: "适用法律", body: <p>本条款受荷兰法律管辖。如果你是消费者，你仍享有你居住国家强制性法律所提供的保护。</p> },
      { title: "联系我们", body: <p>如对本条款有疑问，{contact}。</p> },
    ],
  },
  refunds: {
    title: "CVXray 退款政策",
    description: `对 CVXray 的支持付款可在 ${SUPPORT.refundDays} 天内全额退款，无需说明理由。本页详细说明如何申请退款、退款多久到账，以及超过退款期限后误付或重复付款等情况的处理方式。`,
    intro: <p>CVXray 是免费的。CVXray 唯一可能提供的付款是由 Lemon Squeezy 处理的一次性自愿支持付款（{SUPPORT.minimumEur} 欧元起，金额随意）。如果你付款后改变主意，我们会退还你的钱。</p>,
    sections: [
      { title: `${SUPPORT.refundDays} 天内全额退款`, body: <p>你可以在付款后 {SUPPORT.refundDays} 天内申请全额退还支持付款。无需说明理由，也不会扣除任何费用。</p> },
      { title: "如何申请退款", body: <ul>
        <li>回复你从 Lemon Squeezy 收到的收据邮件；或</li>
        <li>在你的 <a href="https://app.lemonsqueezy.com/my-orders" target="_blank" rel="noopener noreferrer">Lemon Squeezy 订单</a>中找到该订单，并从那里联系客服{CONTACT_EMAIL ? "；或" : "。"}</li>
        {CONTACT_EMAIL && <li>用付款时使用的邮箱发送邮件至 <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>。</li>}
      </ul> },
      { title: "款项何时到账", body: <p>退款会退回原付款方式。Lemon Squeezy 会立即发起退款；你的银行或发卡机构通常会在 5–10 个工作日内显示该款项。</p> },
      { title: `超过 ${SUPPORT.refundDays} 天后`, body: <p>误付或重复付款无论何时发现都会退款。超过 {SUPPORT.refundDays} 天的其他情况，请联系我们，我们会酌情处理。</p> },
      { title: "你的法定权利", body: <p>本政策是对你作为消费者的法定权利的补充，不会对其构成限制。另请参阅<Link href="/zh/terms">服务条款</Link>。</p> },
    ],
  },
};
