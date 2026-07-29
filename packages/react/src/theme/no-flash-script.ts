/**
 * no-flash-script.ts — Pre-hydration theme inline script
 *
 * Consumers inject this string verbatim into the document <head> BEFORE any
 * React hydration so the correct theme, accent, density, and glass settings
 * are applied on the first paint — preventing a flash of wrong theme (FWWT).
 *
 * Security: this string contains NO interpolated dynamic data.
 * It reads from localStorage inside a try/catch so a corrupt localStorage
 * value (injection attempt) falls back silently to defaults.
 *
 * Usage:
 *   // Next.js App Router (layout.tsx):
 *   import { noFlashScript } from '@lucent/react/theme';
 *   export default function RootLayout({ children }) {
 *     return (
 *       <html>
 *         <head>
 *           <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
 *         </head>
 *         <body>{children}</body>
 *       </html>
 *     );
 *   }
 *
 * The script sets these on <html>:
 *   data-theme     "dark" | "light"          (default: "dark")
 *   data-accent    "cyan" | "violet" | "teal" (default: "cyan")
 *   data-density   "airy" | "balanced" | "compact" (default: "airy")
 *   --lucent-glass-opacity  (persisted value, clamped to [0.60, 1.0])
 *   --lucent-glass-blur     (persisted value, clamped to [0, 24px])
 */

export const noFlashScript: string = `(function(){try{
  var root=document.documentElement;
  var s=localStorage.getItem("lucent-theme");
  if(s==="dark"||s==="light")root.setAttribute("data-theme",s);
  else root.setAttribute("data-theme","dark");
  var a=localStorage.getItem("lucent-accent");
  if(a==="cyan"||a==="violet"||a==="teal")root.setAttribute("data-accent",a);
  else root.setAttribute("data-accent","cyan");
  var d=localStorage.getItem("lucent-density");
  if(d==="airy"||d==="balanced"||d==="compact")root.setAttribute("data-density",d);
  else root.setAttribute("data-density","airy");
  var op=parseFloat(localStorage.getItem("lucent-glass-opacity")||"");
  if(!isNaN(op))root.style.setProperty("--lucent-glass-opacity",String(Math.min(1,Math.max(0.60,op))));
  var bl=parseFloat(localStorage.getItem("lucent-glass-blur")||"");
  if(!isNaN(bl))root.style.setProperty("--lucent-glass-blur",Math.min(24,Math.max(0,bl))+"px");
}catch(e){}})();`;
