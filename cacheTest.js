import {localCache, sessionCache} from "./FkCache.js"
const btns = document.querySelectorAll("button")
for( let i=0; i<btns.length; i++) {
  btns[i].onclick = function() {
    switch(i)
    {
      case 0:
        localCache.setItem('name', 'kobe')
        break
      case 1:
        sessionCache.setItem('name', 'curry')
        break
    }
  }
}

