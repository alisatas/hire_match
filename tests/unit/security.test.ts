import { describe, expect, it } from "vitest";
import { BlockedUrlError, isPrivateIp, parsePublicUrl } from "@/lib/server/safe-fetch";
import { safeHttpUrl } from "@/lib/utils";

describe("SSRF guard: private addresses", () => {
  const blocked = ["127.0.0.1", "10.1.2.3", "172.16.0.1", "172.31.255.255", "192.168.1.1", "169.254.169.254",
    "100.64.0.1", "0.0.0.0", "224.0.0.1", "198.18.0.1", "::1", "::", "fd00::1", "fe80::1", "::ffff:127.0.0.1",
    "::ffff:7f00:1", "64:ff9b::7f00:1", "2002:7f00:1::", "not-an-ip"];
  const allowed = ["8.8.8.8", "1.1.1.1", "172.32.0.1", "2606:4700:4700::1111"];
  for (const ip of blocked) it(`blocks ${ip}`, () => expect(isPrivateIp(ip)).toBe(true));
  for (const ip of allowed) it(`allows ${ip}`, () => expect(isPrivateIp(ip)).toBe(false));
});

describe("SSRF guard: URL screening", () => {
  const bad = ["http://127.0.0.1/", "http://localhost:3000/", "http://[::1]/", "http://2130706433/", "http://0x7f.1/",
    "http://metadata.google.internal/", "http://example.com:22/", "http://user:pass@example.com/",
    "file:///etc/passwd", "gopher://example.com/", "http://printer.local/", "http://" + "a".repeat(2100) + ".com/"];
  for (const url of bad) {
    it(`rejects ${url.slice(0, 50)}`, () => expect(() => parsePublicUrl(url)).toThrow(BlockedUrlError));
  }
  it("accepts a normal https URL", () => {
    expect(parsePublicUrl("https://www.linkedin.com/jobs/view/123/").hostname).toBe("www.linkedin.com");
  });
});

describe("safeHttpUrl", () => {
  it("passes http(s) links", () => expect(safeHttpUrl("https://example.com/a")).toBe("https://example.com/a"));
  for (const bad of ["javascript:alert(1)", "data:text/html,<b>x</b>", "vbscript:x", "", "not a url", "//evil.com"]) {
    it(`blocks ${bad || "(empty)"}`, () => expect(safeHttpUrl(bad)).toBeNull());
  }
});

import { pathOf, scrub } from "@/lib/scrub";

describe("log scrubbing", () => {
  it("removes emails, long numbers and query strings, and truncates", () => {
    const out = scrub("Failed for jane.doe@example.com at https://x.com/a?token=abc phone 0612345678 " + "x".repeat(400));
    expect(out).not.toMatch(/jane\.doe/);
    expect(out).not.toMatch(/token=abc/);
    expect(out).not.toMatch(/0612345678/);
    expect(out.length).toBeLessThanOrEqual(300);
  });
  it("keeps only the path of a URL", () => {
    expect(pathOf("https://cvxray.com/blog/x?email=a@b.c#s=abc")).toBe("/blog/x");
    expect(pathOf(undefined)).toBe("");
  });
});
