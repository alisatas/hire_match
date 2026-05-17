#!/usr/bin/env node
/**
 * Multi-language marketing campaign for CVXray.
 * Run: node --env-file=.env.local scripts/twitter-campaign.mjs
 * Posts each tweet with a 3s gap. Stops on first error.
 * All tweets verified under 280 chars (URLs count as 23).
 */

import { createHmac, randomBytes } from "node:crypto"

const CONSUMER_KEY    = process.env.TWITTER_API_KEY
const CONSUMER_SECRET = process.env.TWITTER_API_KEY_SECRET
const TOKEN           = process.env.TWITTER_ACCESS_TOKEN
const TOKEN_SECRET    = process.env.TWITTER_ACCESS_TOKEN_SECRET
const TWEET_URL       = "https://api.twitter.com/2/tweets"

if (!CONSUMER_KEY || !CONSUMER_SECRET || !TOKEN || !TOKEN_SECRET) {
  console.error("❌ Twitter credentials not set in .env.local")
  process.exit(1)
}

function pct(s) {
  return encodeURIComponent(s).replace(/[!'()*]/g, c => "%" + c.charCodeAt(0).toString(16).toUpperCase())
}

function oauthHeader(method, url) {
  const nonce     = randomBytes(16).toString("hex")
  const timestamp = Math.floor(Date.now() / 1000).toString()
  const params = {
    oauth_consumer_key:     CONSUMER_KEY,
    oauth_nonce:            nonce,
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp:        timestamp,
    oauth_token:            TOKEN,
    oauth_version:          "1.0",
  }
  const sorted     = Object.entries(params).sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => `${pct(k)}=${pct(v)}`).join("&")
  const base       = [method.toUpperCase(), pct(url), pct(sorted)].join("&")
  const signingKey = `${pct(CONSUMER_SECRET)}&${pct(TOKEN_SECRET)}`
  params["oauth_signature"] = createHmac("sha1", signingKey).update(base).digest("base64")
  return "OAuth " + Object.entries(params).sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => `${pct(k)}="${pct(v)}"`).join(", ")
}

// Each tweet verified <= 280 chars (URL = 23 chars per Twitter t.co rules)
const tweets = [

  // 1 — English (US/UK) | ~238 chars
  "🇺🇸 75% of CVs never reach a recruiter.\n\nATS filters them out automatically — wrong keywords, wrong format.\n\nCVXray scores your CV against any job in seconds. Free, no sign-up.\n\ncvxray.com\n\n#jobsearch #resumetips #ats #careers",

  // 2 — Turkish (TR) | ~244 chars
  "🇹🇷 CV'n işe alım öncesinde reddediliyor mu?\n\nATS sistemleri başvuruların %75'ini otomatik filtreler.\n\nCVXray, CV'ni herhangi bir iş ilanıyla saniyeler içinde eşleştirir. Ücretsiz.\n\ncvxray.com\n\n#işarama #kariyer #cv #insankaynaklari",

  // 3 — Spanish (ES/LATAM) | ~237 chars
  "🇪🇸 ¿Tu CV es filtrado antes de que alguien lo lea?\n\nEl 75% de candidatos es eliminado automáticamente por ATS.\n\nCVXray analiza tu CV frente a cualquier oferta. Gratis, sin registro.\n\ncvxray.com\n\n#empleo #trabajo #cv #seleccion",

  // 4 — German (DE/AT/CH) | ~243 chars
  "🇩🇪 Wird dein Lebenslauf von ATS aussortiert?\n\n75% aller Bewerbungen kommen nie beim Recruiter an.\n\nCVXray zeigt dir sofort, welche Keywords fehlen. Kostenlos & ohne Anmeldung.\n\ncvxray.com\n\n#jobsuche #bewerbung #karriere #lebenslauf",

  // 5 — French (FR/BE/CH) | ~234 chars
  "🇫🇷 Ton CV est rejeté avant même d'être lu ?\n\n75% des candidatures sont filtrées par les ATS automatiquement.\n\nCVXray analyse ton profil face à n'importe quelle offre. Gratuit.\n\ncvxray.com\n\n#emploi #recrutement #cv #conseils",

  // 6 — Portuguese (BR) | ~238 chars
  "🇧🇷 Seu currículo é rejeitado antes de chegar a um humano?\n\n75% dos CVs são filtrados automaticamente por ATS.\n\nCVXray compara seu currículo com qualquer vaga. Grátis e sem cadastro.\n\ncvxray.com\n\n#emprego #vagas #rh #curriculum",

  // 7 — Arabic (SA/AE/EG) | ~197 chars
  "🇸🇦 هل يُرفض سيرتك الذاتية قبل أن يقرأها أحد؟\n\nأنظمة ATS تُفلتر 75% من الطلبات تلقائياً.\n\nCVXray يحلّل سيرتك مقابل أي وظيفة — مجاناً.\n\ncvxray.com\n\n#وظائف #سيرة_ذاتية #توظيف",

  // 8 — Hindi (IN) | ~252 chars
  "🇮🇳 क्या आपका CV reject हो जाता है interview से पहले?\n\nATS software 75% applications को automatically filter करता है।\n\nCVXray आपके CV को किसी भी job से match करता है। बिल्कुल मुफ़्त।\n\ncvxray.com\n\n#नौकरी #career #resume #jobsearch",

]

async function postTweet(text, index) {
  console.log(`\n📤 Posting tweet ${index + 1}/${tweets.length}...`)
  console.log("─".repeat(55))
  console.log(text)
  console.log("─".repeat(55))
  console.log(`chars: ${text.length}`)

  const res = await fetch(TWEET_URL, {
    method: "POST",
    headers: {
      Authorization:  oauthHeader("POST", TWEET_URL),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`HTTP ${res.status}: ${err}`)
  }

  const data = await res.json()
  console.log(`✅ Posted! ID: ${data?.data?.id}`)
}

async function run() {
  console.log(`🐦 CVXray Global Campaign — ${tweets.length} languages\n`)

  for (let i = 0; i < tweets.length; i++) {
    try {
      await postTweet(tweets[i], i)
      if (i < tweets.length - 1) {
        console.log("⏳ Waiting 3s...")
        await new Promise(r => setTimeout(r, 3000))
      }
    } catch (err) {
      console.error(`\n❌ Failed on tweet ${i + 1}: ${err.message}`)
      process.exit(1)
    }
  }

  console.log(`\n🎉 Done — ${tweets.length} tweets posted across 8 markets!`)
}

run()
