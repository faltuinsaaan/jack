# Complete SEO Setup Guide

This guide contains the exact boilerplate and instructions used on your portfolio to achieve excellent SEO results. You can copy and paste these snippets into any new web project (React, Next.js, plain HTML, etc.) and just replace the placeholder values.

## 1. The `<head>` Boilerplate (`index.html`)

Copy this into the `<head>` section of your new site's `index.html`. 

> [!IMPORTANT]  
> Make sure to find and replace all instances of **`[YOUR_...]`** with the actual details of your new site.

```html
<!-- Primary SEO Meta Tags -->
<title>[YOUR_SITE_TITLE] — [YOUR_TAGLINE]</title>
<meta name="description" content="[YOUR_SITE_DESCRIPTION_150_TO_160_CHARACTERS]" />
<meta name="author" content="[YOUR_NAME_OR_COMPANY]" />
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

<!-- Canonical URL (Crucial for preventing duplicate content) -->
<link rel="canonical" href="https://[YOUR_DOMAIN.com]/" />

<!-- Open Graph / Facebook / LinkedIn -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://[YOUR_DOMAIN.com]/" />
<meta property="og:title" content="[YOUR_SITE_TITLE] — [YOUR_TAGLINE]" />
<meta property="og:description" content="[YOUR_SITE_DESCRIPTION]" />
<meta property="og:site_name" content="[YOUR_SITE_NAME]" />
<meta property="og:locale" content="en_US" />
<!-- Recommended: Add an image for social previews (1200x630px) -->
<meta property="og:image" content="https://[YOUR_DOMAIN.com]/social-preview.jpg" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content="https://[YOUR_DOMAIN.com]/" />
<meta name="twitter:title" content="[YOUR_SITE_TITLE] — [YOUR_TAGLINE]" />
<meta name="twitter:description" content="[YOUR_SITE_DESCRIPTION]" />
<!-- Ensure this matches the og:image -->
<meta name="twitter:image" content="https://[YOUR_DOMAIN.com]/social-preview.jpg" />

<!-- Theme Color for Mobile Browsers -->
<meta name="theme-color" content="#[YOUR_BRAND_HEX_COLOR]" />

<!-- JSON-LD Structured Data (Helps Google understand context) -->
<!-- Note: The below is for a "Person". If it's a company, change "@type" to "Organization" -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person", 
  "name": "[YOUR_NAME]",
  "url": "https://[YOUR_DOMAIN.com]/",
  "email": "[YOUR_EMAIL]",
  "jobTitle": "[YOUR_JOB_TITLE]",
  "description": "[YOUR_SITE_DESCRIPTION]",
  "sameAs": [
    "https://[YOUR_DOMAIN.com]/",
    "[LINK_TO_YOUR_TWITTER]",
    "[LINK_TO_YOUR_LINKEDIN]"
  ],
  "knowsAbout": ["[SKILL_1]", "[SKILL_2]", "[SKILL_3]"]
}
</script>
```

## 2. `robots.txt`

This file belongs in your `public` folder (or the root of your deployed site). It tells search engines what they are allowed to crawl.

**File:** `public/robots.txt`
```text
# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

Sitemap: https://[YOUR_DOMAIN.com]/sitemap.xml
```

## 3. `sitemap.xml`

This file also belongs in your `public` folder. It provides a map of your site for search engines.

**File:** `public/sitemap.xml`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://[YOUR_DOMAIN.com]/</loc>
    <!-- Update this date whenever you launch or make major changes -->
    <lastmod>YYYY-MM-DD</lastmod> 
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```
> [!TIP]
> If your new site has multiple pages, you will need to add a new `<url>` block for each page (e.g., `/about`, `/contact`) inside the `<urlset>`. You can also use tools like `vite-plugin-sitemap` or `next-sitemap` to generate this automatically for multi-page sites.

## 4. Google Search Console Verification

To get data on how your site performs on Google (and to force Google to crawl your site faster):
1. Go to [Google Search Console](https://search.google.com/search-console/about).
2. Add a new Property (use the "URL prefix" method if you don't have DNS access, or "Domain" if you do).
3. Google will give you an HTML verification file (e.g., `google1234abcd.html`).
4. Drop that file into your `public` folder.
5. Deploy your site, then click "Verify" in Search Console.

## 5. Pre-Launch Checklist

- [ ] Replaced all `[YOUR_...]` placeholders in `index.html`.
- [ ] Created a `1200x630` image named `social-preview.jpg` in the `public` folder for social sharing.
- [ ] Created `robots.txt` and pointed it to the new domain's sitemap.
- [ ] Created `sitemap.xml` and updated the URLs and `lastmod` date.
- [ ] Verified the new domain in Google Search Console.
