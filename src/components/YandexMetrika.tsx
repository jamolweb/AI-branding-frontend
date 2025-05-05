'use client'

import Script from 'next/script'
import Image from 'next/image'

export default function YandexMetrika() {
  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

          ym(101578668, "init", {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true
          });
        `}
      </Script>
      <noscript>
        <div>
          <Image 
            src="https://mc.yandex.ru/watch/101578668" 
            width={1} 
            height={1} 
            alt="Yandex Metrika" 
            style={{ position: 'absolute', left: '-9999px' }} 
            unoptimized 
          />
        </div>
      </noscript>
    </>
  )
}
