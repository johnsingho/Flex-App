/**
 * @author flex
 * @returns 简单敏感词过滤
 */
function sw_buildMap(){for(var e=["fuck","一夜情","一夜欢","乳交","傻逼","兽交","口交","口爆","叫床","妈逼","屄","屌","强奸","强暴","性交","性奴","情趣用品","操他妈","操你全家","操你大爷","操你妈","操逼","无码","暴乳","松岛枫","法轮","淫","淫妇","淫虫","炮友","爆乳","狗杂种","疆独","肉茎","肏","苍井","草他妈","草你吗","草你妈","藏独","轮奸","迷奸","骚穴"],t={},r=e.length,n=0;n<r;++n)
for(var h=t,a=e[n],p=0;p<a.length;++p){var u=a.charAt(p);if(void 0!==h[u]){if((h=h[u]).empty)break}else h.empty&&delete h.empty,h[u]={empty:!0},h=h[u]}return t}function sw_check(e,t){for(var r=[],n=t.length,h=[],a=e,p=0;p<n;++p){var u=t.charAt(p),f=a[u];void 0===f?(p-=h.length,h=[],a=e):f.empty?(h.push(u),r.push(h.join("")),h=[],a=e):(h.push(u),a=f)}return r.length>0}