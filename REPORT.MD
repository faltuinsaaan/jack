Render-blocking requests Est savings of 390 ms
Requests are blocking the page's initial render, which may delay LCP. Deferring or inlining can move these network requests out of the critical path.LCPFCPUnscored
URL
Transfer Size
Duration
vercel.app 1st party
10.5 KiB	170 ms
/assets/index-ZJfohXCi.css(jack-q3ya.vercel.app)
10.5 KiB
170 ms


Forced reflow
A forced reflow occurs when JavaScript queries geometric properties (such as offsetWidth) after styles have been invalidated by a change to the DOM state. This can result in poor performance. Learn more about forced reflows and possible mitigations.Unscored
Top function call
Total reflow time
/assets/index-CsaT58xb.js:26:1361(jack-q3ya.vercel.app)
84 ms
Source
Total reflow time
/assets/index-CsaT58xb.js:49:136323(jack-q3ya.vercel.app)
67 ms
/assets/index-CsaT58xb.js:117:18887(jack-q3ya.vercel.app)
17 ms


Optimize LCP by making the LCP image discoverable from the HTML immediately, and avoiding lazy-loadingLCPUnscored
LCP resources should not use loading=lazy
fetchpriority=high should be applied to the image preload request
Request is discoverable in initial document
Priyank Verma - The Jack
<img alt="Priyank Verma - The Jack" width="800" height="1141" class="w-full h-auto block object-cover scale-105 opacity-90 transition-all durat…" referrerpolicy="no-referrer" fetchpriority="high" loading="eager" src="/jack.webp">

Avoid chaining critical requests by reducing the length of chains, reducing the download size of resources, or deferring the download of unnecessary resources to improve page load.LCPUnscored
Maximum critical path latency: 1,063 ms
Initial Navigation
https://jack-q3ya.vercel.app - 331 ms, 2.22 KiB
/assets/index-CsaT58xb.js(jack-q3ya.vercel.app) - 1,063 ms, 126.66 KiB
/assets/index-ZJfohXCi.css(jack-q3ya.vercel.app) - 741 ms, 10.53 KiB

Preconnected origins
preconnect hints help the browser establish a connection earlier in the page load, saving time when the first request for that origin is made. The following are the origins that the page preconnected to.
Origin
Source
https://fonts.googleapis.com/
head > link
<link rel="preconnect" href="https://fonts.googleapis.com">
https://fonts.gstatic.com/
head > link
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
Preconnect candidates
Add preconnect hints to your most important origins, but try to use no more than 4.

Reducing the download time of images can improve the perceived load time of the page and LCP. Learn more about optimizing image sizeLCPFCPUnscored
URL
Resource Size
Est Savings
vercel.app 1st party
241.7 KiB	159.6 KiB
Priyank Verma - The Jack
<img alt="Priyank Verma - The Jack" width="800" height="1141" class="w-full h-auto block object-cover scale-105 opacity-90 transition-all durat…" referrerpolicy="no-referrer" fetchpriority="high" loading="eager" src="/jack.webp">
/jack.webp(jack-q3ya.vercel.app)
120.7 KiB
63.7 KiB
This image file is larger than it needs to be (800x1141) for its displayed dimensions (550x784). Use responsive images to reduce the image download size.
63.7 KiB
Posture Monitor
<img alt="Posture Monitor" referrerpolicy="no-referrer" loading="lazy" width="800" height="600" class="w-full h-full object-cover md:grayscale md:brightness-90 md:group-hover:gr…" src="/assets/posture-CQ2Jwbe9.webp">
/assets/posture-CQ2Jwbe9.webp(jack-q3ya.vercel.app)
55.4 KiB
45.0 KiB
This image file is larger than it needs to be (1591x990) for its displayed dimensions (757x390). Use responsive images to reduce the image download size.
45.0 KiB
ColdStack
<img alt="ColdStack" referrerpolicy="no-referrer" loading="lazy" width="800" height="600" class="w-full h-full object-cover md:grayscale md:brightness-90 md:group-hover:gr…" src="/assets/coldstack-DIIj2NYy.webp">
/assets/coldstack-DIIj2NYy.webp(jack-q3ya.vercel.app)
31.1 KiB
27.6 KiB
This image file is larger than it needs to be (1589x990) for its displayed dimensions (587x303). Use responsive images to reduce the image download size.
27.6 KiB
Priyank Verma - Origins
<img alt="Priyank Verma - Origins" width="1200" height="1200" class="w-full h-full object-cover opacity-100 md:opacity-90 md:group-hover:opacit…" referrerpolicy="no-referrer" loading="lazy" src="/assets/priyank-CG1GkGoy.webp">
/assets/priyank-CG1GkGoy.webp(jack-q3ya.vercel.app)
34.5 KiB
23.3 KiB
This image file is larger than it needs to be (960x1200) for its displayed dimensions (613x613). Use responsive images to reduce the image download size.
23.3 KiB


A large DOM can increase the duration of style calculations and layout reflows, impacting page responsiveness. A large DOM will also increase memory usage. Learn how to avoid an excessive DOM size.Unscored
Statistic
Element
Value
Total elements
257
DOM depth
div.text-app-text-dim > div > svg.lucide > path
<path d="M5 12h14">
14
Most children
I wasn't interested in collecting job titles. I was interested in understandin…
<p>

Each subpart has specific improvement strategies. Ideally, most of the LCP time should be spent on loading the resources, not within delays.LCPUnscored
Subpart
Duration
Time to first byte
0 ms
Resource load delay
330 ms
Resource load duration
250 ms
Element render delay
1,900 ms
Priyank Verma - The Jack
<img alt="Priyank Verma - The Jack" width="800" height="1141" class="w-full h-auto block object-cover scale-105 opacity-90 transition-all durat…" referrerpolicy="no-referrer" fetchpriority="high" loading="eager" src="/jack.webp">
Reduce unused JavaScript and defer loading scripts until they are required to decrease bytes consumed by network activity. Learn how to reduce unused JavaScript.LCPFCPUnscored
URL
Transfer Size
Est Savings
vercel.app 1st party
126.0 KiB	54.0 KiB
/assets/index-CsaT58xb.js(jack-q3ya.vercel.app)
126.0 KiB
54.0 KiB


Lists the longest tasks on the main thread, useful for identifying worst contributors to input delay. Learn how to avoid long main-thread tasksTBTUnscored
URL
Start Time
Duration
vercel.app 1st party
67 ms
/assets/index-CsaT58xb.js(jack-q3ya.vercel.app)
3,510 ms
67 ms
