# CVXray for Android

A Trusted Web Activity (TWA): a thin Android app that opens https://cvxray.com full screen,
without browser UI, using Chrome (or another TWA-capable browser) on the device. Every
feature shipped to the website is in the app the moment it is deployed — there is no second
code base.

## Build

Needs JDK 17 and the Android SDK (platform 36, build-tools). From this folder:

```bash
./gradlew assembleDebug        # debug APK: app/build/outputs/apk/debug/
./gradlew bundleRelease        # Play Store bundle: app/build/outputs/bundle/release/
```

Release builds are signed with the upload key named in `keystore.properties`
(not committed — see `keystore.properties.example`).

## Full screen needs Digital Asset Links

The app shows the site without any browser bar only if https://cvxray.com proves it owns
the app. The site serves `/.well-known/assetlinks.json` from the env var
`ANDROID_CERT_SHA256` (comma-separated SHA-256 fingerprints). Add both:

1. the upload key's fingerprint (`keytool -list -v -keystore upload.jks`), and
2. the Play App Signing key's fingerprint (Play Console → Test and release → App integrity).

Without it the app still works, but shows a small URL bar at the top.

## Values

- Package name: `com.cvxray.app` (permanent once published)
- Start URL: `https://cvxray.com/?source=android` (so GA4 can tell app traffic apart)
- Theme, splash and icons follow the site (`#fafafa`, logo from `/logo.png`)
