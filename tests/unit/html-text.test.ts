import { describe, expect, it } from "vitest";
import { decodeEntities, htmlToText, inlineText, stripTags } from "@/lib/html-text";
import { getInterviewLinks } from "@/lib/insights";

describe("decodeEntities (single pass — no double unescaping)", () => {
  it("decodes the common entities", () => {
    expect(decodeEntities("Tom &amp; Jerry &lt;3 &quot;hi&quot; it&#39;s &#x41;&#66;")).toBe(`Tom & Jerry <3 "hi" it's AB`);
  });
  it("keeps the literal text '&amp;lt;' as '&lt;', not '<'", () => {
    expect(decodeEntities("&amp;lt;script&amp;gt;")).toBe("&lt;script&gt;");
  });
  it("ignores invalid code points", () => {
    expect(decodeEntities("x&#99999999;y")).toBe("x&#99999999;y");
  });
});

describe("stripTags", () => {
  it("cannot be tricked into reassembling a tag", () => {
    const out = stripTags("<<b>script>alert(1)<</b>/script>");
    expect(out).not.toMatch(/<|>/);
  });
});

describe("htmlToText", () => {
  it("removes script and style blocks even with sloppy closing tags", () => {
    const html = `<p>Keep</p><script>bad()</script ><SCRIPT type="x">worse()</SCRIPT foo><style>p{}</style >`;
    const text = htmlToText(html);
    expect(text).toBe("Keep");
  });
  it("drops an unterminated script to the end of the document", () => {
    expect(htmlToText("<p>Job</p><script>never closed")).toBe("Job");
  });
  it("turns block tags into lines and decodes entities once", () => {
    expect(htmlToText("<li>React &amp; Redux</li><li>&amp;lt;b&amp;gt;</li>")).toBe("React & Redux\n&lt;b&gt;");
  });
});

describe("inlineText", () => {
  it("returns clean single-line text", () => {
    expect(inlineText("<b>Senior</b>\n  <i>Engineer</i> &amp; Lead")).toBe("Senior Engineer & Lead");
  });
});

describe("interview research links", () => {
  it("encodes the company name so it cannot add parameters or a fragment", () => {
    for (const { url } of getInterviewLinks("Acme & Co&evil=1#frag")) {
      const u = new URL(url);
      expect(u.hash).toBe("");
      expect([...u.searchParams.keys()]).not.toContain("evil");
      expect(u.protocol).toBe("https:");
    }
  });
});
