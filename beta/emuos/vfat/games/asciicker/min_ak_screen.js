"use strict";!function(){/*"use asm";*/var na=null,sa=null;
window.ak_Image=function(X){var Y=X.naturalWidth,V=X.naturalHeight;if(0===Y||0===V)return null;var N=new Uint32Array(Y*V);null===na&&(na=document.createElement("canvas"),sa=na.getContext("2d"),sa.globalCompositeOperation="copy");na.width=Y;na.height=V;sa.drawImage(X,0,0);X=sa.getImageData(0,0,Y,V).data;for(var ja=0,da=0,ka=0;ka<V;ka++)for(var O=0;O<Y;O++)N[da]=X[ja+1]|X[ja+0]<<8|(X[ja+2]&15)<<16|(X[ja+2]>>4&15)<<24,da++,ja+=4;na.width=1;na.height=1;return{getWidth:function(){return Y},getHeight:function(){return V},
getBuffer:function(){return N},getKeyClr:function(){return 11}}};var G=null;
window.ak_Screen=function(X,Y){function V(a,e){return 0<=a?a%e:e-1+(a+1)%e}function N(a,e,d,h,f,n,c,b,C){var m=4,x=J-ea,r=P-ia;C&&(r<<=1);d<=x?--m:a>=x&&(m+=1);h<=r?m-=3:e>=r&&(m+=3);var k=ea,t=ea-J,q=ia,y=ia-P;C&&(q<<=1,y<<=1);switch(m){case 0:return c[b+0]=a+k,c[b+1]=e+q,c[b+2]=d+k,c[b+3]=h+q,c[b+4]=f,c[b+5]=n,1;case 1:return c[b+0]=a+k,c[b+1]=e+q,c[b+2]=x+k,c[b+3]=h+q,c[b+4]=f,c[b+5]=n,c[b+6]=x+t,c[b+7]=e+q,c[b+8]=d+t,c[b+9]=h+q,c[b+10]=f+x-a,c[b+11]=n,2;case 2:return c[b+0]=a+t,c[b+1]=e+q,c[b+
2]=d+t,c[b+3]=h+q,c[b+4]=f,c[b+5]=n,1;case 3:return c[b+0]=a+k,c[b+1]=e+q,c[b+2]=d+k,c[b+3]=r+q,c[b+4]=f,c[b+5]=n,c[b+6]=a+k,c[b+7]=r+y,c[b+8]=d+k,c[b+9]=h+y,c[b+10]=f,c[b+11]=n+r-e,2;case 4:return c[b+0]=a+k,c[b+1]=e+q,c[b+2]=x+k,c[b+3]=r+q,c[b+4]=f,c[b+5]=n,c[b+6]=x+t,c[b+7]=e+q,c[b+8]=d+t,c[b+9]=r+q,c[b+10]=f+x-a,c[b+11]=n,c[b+12]=a+k,c[b+13]=r+y,c[b+14]=x+k,c[b+15]=h+y,c[b+16]=f,c[b+17]=n+r-e,c[b+18]=x+t,c[b+19]=r+y,c[b+20]=d+t,c[b+21]=h+y,c[b+22]=f+x-a,c[b+23]=n+r-e,4;case 5:return c[b+0]=a+
t,c[b+1]=e+q,c[b+2]=d+t,c[b+3]=r+q,c[b+4]=f,c[b+5]=n,c[b+6]=a+t,c[b+7]=r+y,c[b+8]=d+t,c[b+9]=h+y,c[b+10]=f,c[b+11]=n+r-e,2;case 6:return c[b+0]=a+k,c[b+1]=e+y,c[b+2]=d+k,c[b+3]=h+y,c[b+4]=f,c[b+5]=n,1;case 7:return c[b+0]=a+k,c[b+1]=e+y,c[b+2]=x+k,c[b+3]=h+y,c[b+4]=f,c[b+5]=n,c[b+6]=x+t,c[b+7]=e+y,c[b+8]=d+t,c[b+9]=h+y,c[b+10]=f+x-a,c[b+11]=n,2;case 8:return c[b+0]=a+t,c[b+1]=e+y,c[b+2]=d+t,c[b+3]=h+y,c[b+4]=f,c[b+5]=n,1}return 0}function ja(a,e,d,h,f,n,c){var b=G;if(0===Z||0===M)return N(a,e,d,h,
f,n,b,0,c);var C=0<=Z?Z:Z+J,m=0<=M?M:M+P;c&&(m<<=1);if(0<Z){if(a>=C||0<M&&e>=m||0>M&&h<=m)return N(a,e,d,h,f,n,b,0,c);if(d<=C)return 0<M?h<=m?0:N(a,m,d,h,f,n+m-e,b,0,c):e>=m?0:N(a,e,d,m,f,n,b,0,c);if(0>M){if(e>=m)return N(C,e,d,h,f+C-a,n,b,0,c);var x=0+N(a,e,d,m,f,n,b,0,c);x+=N(C,m,d,h,f+C-a,n+m-e,b,0+6*x,c)}else{if(h<=m)return N(C,e,d,h,f+C-a,n,b,0,c);x=0+N(C,e,d,m,f+C-a,n,b,0,c);x+=N(a,m,d,h,f,n+m-e,b,0+6*x,c)}}else{if(d<=C||0<M&&e>=m||0>M&&h<=m)return N(a,e,d,h,f,n,b,0,c);if(a>=C)return 0<M?h<=
m?0:N(a,m,d,h,f,n+m-e,b,0,c):e>=m?0:N(a,e,d,m,f,n,b,0,c);if(0>M){if(e>=m)return N(a,e,C,h,f,n,b,0,c);x=0+N(a,e,d,m,f,n,b,0,c);x+=N(a,m,C,h,f,n+m-e,b,0+6*x,c)}else{if(h<=m)return N(a,e,C,h,f,n,b,0,c);x=0+N(a,e,C,m,f,n,b,0,c);x+=N(a,m,d,h,f,n+m-e,b,0+6*x,c)}}return x}function da(a,e,d,h,f){if(!(d<=ka))if(f){a+=(e>>1)*J;var n=4*a,c=O[a],b=c&255;c=2===f?h&4294901760:(c^b)&(h|65535)|h<<16;e&1?d>=fa[n+2]&&d>=fa[n+3]&&(2===f?223==b?b=219:219!=b&&(b=220):39==b?b=59:59!=b&&(b=44),O[a]=c|b):d>=fa[n+0]&&fa[n+
1]&&(2===f?220==b?b=219:219!=b&&(b=223):44==b?b=59:59!=b&&(b=39),O[a]=c|b)}else a+=e*J,n=4*a,e=0,fa[n]<=d&&e++,fa[n+1]<=d&&e++,fa[n+2]<=d&&e++,fa[n+3]<=d&&e++,1<=e&&(O[a]&=4278190080,O[a]|=176)}var ka=Y,O=new Uint32Array(X),fa=new Uint16Array(4*O.length);null===G&&(G=new Int32Array(36));var J=0,P=0,R=0,aa=0,ba=0,la=0,ma=0,ea=0,ia=0,Z=0,M=0;return{Resize:function(a,e){if(a*e>O.length||0>a||0>e)return!1;M=Z=ia=ea=0;J=a;P=e;return!0},Clear:function(a,e,d,h){h|=0;if(R&1){var f=aa;var n=aa+la;var c=ba;
var b=ba+ma;0>f&&(f=0);0>c&&(c=0);n>J&&(n=J);b>P&&(b=P)}else f=0,n=J,c=0,b=P;if(!(f>=n||c>=b)){var C=O,m=fa;a=(a|0)<<24|(e|0)<<16|d|0;e=R&128?6*ja(f,c,n,b,0,0,!1):6*N(f,c,n,b,0,0,G,0,!1);for(d=0;d<e;d+=6)for(f=G[d+0],c=G[d+1],n=G[d+2],b=G[d+3];c<b;c++)for(var x=n+c*J,r=f+c*J;r<x;r++){C[r]=a;var k=4*r;m[k+0]=h;m[k+1]=h;m[k+2]=h;m[k+3]=h}}},Blend:function(a,e,d,h,f,n,c,b,C){e|=0;d|=0;h|=0;f|=0;n|=0;c|=0;b|=0;C|=0;var m=a.getWidth()|0,x=a.getHeight()|0,r=a.getKeyClr()|0;a=a.getBuffer();0>e&&(h-=e,n+=
e,e=0);0>d&&(f-=d,c+=d,d=0);e+n>m&&(n=m-e);d+c>x&&(c=x-d);R&1&&(h<aa&&(e-=h-aa,n+=h-aa,h=aa),f<ba&&(d-=f-ba,c+=f-ba,f=ba),h+n>aa+la&&(n=aa+la-h),f+c>ba+ma&&(c=ba+ma-f));0>h&&(e-=h,n+=h,h=0);0>f&&(d-=f,c+=f,f=0);h+n>J&&(n=J-h);f+c>P&&(c=P-f);if(!(0>=n||0>=c)){x=R&128?6*ja(h,f,h+n,f+c,e,d,!1):6*N(h,f,h+n,f+c,e,d,G,0,!1);for(var k=0;k<x;k+=6){h=G[k+0];f=G[k+1];n=G[k+2]-h;c=G[k+3]-f;e=G[k+4];d=G[k+5];e+=m*d;h+=J*f;f=O;d=fa;for(var t=C-128,q=0;q<c;q++){for(var y=0;y<n;y++){var A=h+y,g=a[e+y],l=(g>>8&255)+
t,D=g>>24&255,v=g>>16&255,H=g&255,p=4*A;if(!(l<=ka||16<=D||16<=v)){if(b&2){if(0===(f[A]&268435456))continue;0===d[p+0]&&(d[p+0]=32767);0===d[p+1]&&(d[p+1]=32767);0===d[p+2]&&(d[p+2]=32767);0===d[p+3]&&(d[p+3]=32767);D!==r&&(D+=16);v!==r&&(v+=16)}else 0!==(f[A]&268435456)&&(d[p+0]=0,d[p+1]=0,d[p+2]=0,d[p+3]=0);if(D!==r||0===(b&1)){if(R&16)if(g=0,b&2?(l<=d[p+0]&&(g|=1),l<=d[p+1]&&(g|=2),l<=d[p+2]&&(g|=4),l<=d[p+3]&&(g|=8)):(l>=d[p+0]&&(g|=1),l>=d[p+1]&&(g|=2),l>=d[p+2]&&(g|=4),l>=d[p+3]&&(g|=8)),15===
g)f[A]=D<<24|v<<16|H,d[p+0]=l,d[p+1]=l,d[p+2]=l,d[p+3]=l;else{var z=f[A],u=z>>24&255,w=z>>16&255;z&=255;if(b&4&&D!==u){var I=d[p+0]+d[p+1]+d[p+2]+d[p+3]-4*l;switch(I){case 0:case 1:case 2:case 3:case 4:w=D;z=177;break;default:I=-1E3}if(-1E3<I){f[A]=u<<24|w<<16|z;for(A=0;4>A;A++)d[p+A]=d[p+A]>l?d[p+A]:l;continue}}12===(g&12)?(u=223===z||219===z?w:u,w=220===H||219===H?v:D,z=220,f[A]=u<<24|w<<16|z,d[p+2]=l,d[p+3]=l):10===(g&10)?(u=221===z||219===z?w:u,w=222===H||219===H?v:D,z=222,f[A]=u<<24|w<<16|z,
d[p+1]=l,d[p+3]=l):5===(g&5)?(u=222===z||219===z?w:u,w=221===H||219===H?v:D,z=221,f[A]=u<<24|w<<16|z,d[p+0]=l,d[p+2]=l):3===(g&3)&&(u=220===z||219===z?w:u,w=223===H||219===H?v:D,z=223,f[A]=u<<24|w<<16|z,d[p+0]=l,d[p+1]=l)}}else{z=f[A];u=z>>24&255;w=z>>16&255;z&=255;if(H===z){if(R&16&&(l=(g>>8&255)+t,g=0,b&2?(l<=d[p+0]&&g++,l<=d[p+1]&&g++,l<=d[p+2]&&g++,l<=d[p+3]&&g++):(l>=d[p+0]&&g++,l>=d[p+1]&&g++,l>=d[p+2]&&g++,l>=d[p+3]&&g++),4>g))continue;w=v}else switch(H){case 32:continue;case 220:if(R&16){l=
(g>>8&255)+t;g=0;b&2?(l<=d[p+2]&&g++,l<=d[p+3]&&g++):(l>=d[p+2]&&g++,l>=d[p+3]&&g++);if(2>g)continue;d[p+2]=l;d[p+3]=l}223===z?u=v:(z=H,w=v);break;case 221:if(R&16){l=(g>>8&255)+t;g=0;b&2?(l<=d[p+0]&&g++,l<=d[p+2]&&g++):(l>=d[p+0]&&g++,l>=d[p+2]&&g++);if(2>g)continue;d[p+0]=l;d[p+2]=l}222===z?u=v:(z=H,w=v);break;case 222:if(R&16){l=(g>>8&255)+t;g=0;b&2?(l<=d[p+1]&&g++,l<=d[p+3]&&g++):(l>=d[p+1]&&g++,l>=d[p+3]&&g++);if(2>g)continue;d[p+1]=l;d[p+3]=l}221===z?u=v:(z=H,w=v);break;case 223:if(R&16){l=
(g>>8&255)+t;g=0;b&2?(l<=d[p+0]&&g++,l<=d[p+1]&&g++):(l>=d[p+0]&&g++,l>=d[p+1]&&g++);if(2>g)continue;d[p+0]=l;d[p+1]=l}220===z?u=v:(z=H,w=v);break;default:if(R&16&&(l=(g>>8&255)+t,g=0,b&2?(l<=d[p+0]&&g++,l<=d[p+1]&&g++,l<=d[p+2]&&g++,l<=d[p+3]&&g++):(l>=d[p+0]&&g++,l>=d[p+1]&&g++,l>=d[p+2]&&g++,l>=d[p+3]&&g++),4>g))continue;w=v;z=H}f[A]=u<<24|w<<16|z}}}e+=m;h+=J}}}},Line:function(a,e,d,h,f,n,c,b){a|=0;e|=0;h|=0;f|=0;if(0!==(R&1)){var C=aa;var m=aa+la;var x=ba;var r=ba+ma;0>C&&(C=0);m>J&&(m=J);0>x&&
(x=0);r>P&&(r=P)}else x=C=0,m=J,r=P;if(!(C>=m||x>=r)){b&&(x<<=1,r<<=1);var k=a<h?a:h,t=e<f?e:f,q=1+(a>h?a:h),y=1+(e>f?e:f),A=0,g=0,l=h-a,D=f-e;var v=h*d-a*n;var H=n-d;var p=h-a;var z=f*d-e*n;d=n-d;n=f-e;k<C&&(A=C-k,k=C);q>m&&(q=m);t<x&&(g=x-t,t=x);y>r&&(y=r);if(!(q<=k||y<=t))for(C=R&128?6*ja(k,t,q,y,A,g,b):6*N(k,t,q,y,A,g,G,0,b),x=0;x<C;x+=6){k=G[x+0];t=G[x+1];q=G[x+2];y=G[x+3];A=G[x+4];g=G[x+5];0<=l?(a=k-A,h=a+l):(h=k-A,a=h-l);0<=D?(e=t-g,f=e+D):(f=t-g,e=f-D);var u=t;--q;var w=y-1;if(a===h){if(!(a<
k||a>q))if(e<=f){if(!(f<u||e>w))for(e=e>u?e:u,f=f<w?f:w;e<=f;e++)k=Math.ceil((z+e*d)/n),da(a,e,k,c,b)}else if(!(e<u||f>w))for(f=f>u?f:u,e=e<w?e:w;e>=f;e--)k=Math.ceil((z+e*d)/n),da(a,e,k,c,b)}else if(e===f){if(!(e<u||e>w))if(a<=h){if(!(h<k||a>q))for(a=a>k?a:k,h=h<q?h:q;a<h;a++)k=Math.ceil((v+a*H)/p),da(a,e,k,c,b)}else if(!(a<k||h>q))for(h=h>k?h:k,a=a<q?a:q;a>=h;a--)k=Math.ceil((v+a*H)/p),da(a,e,k,c,b)}else{if(a<h){if(a>q||h<k)continue;y=1}else{if(h>q||a<k)continue;y=-1;a=-a;h=-h;var I=k;k=-q;q=-I}if(e<
f){if(e>w||f<u)continue;t=1}else{if(f>w||e<u)continue;t=-1;e=-e;f=-f;I=u;u=-w;w=-I}var O=h-a;var Q=f-e;A=2*O;g=2*Q;m=a;r=e;if(O>=Q){var F=g-O;var K=!1;if(e<u){I=(2*(u-e)-1)*O;var E=I/g|0;m+=E;if(m>q)continue;m>=k&&(E=I-E*g,r=u,F-=E+O,0<E&&(m+=1,F+=g),K=!0)}if(!K&&a<k){I=g*(k-a);E=I/A|0;r+=E;E=I-E*A;if(r>w||r===w&&E>=O)continue;m=k;F+=E;E>=O&&(r+=1,F-=A)}f>w&&(I=A*(w-e)+O,E=I/g|0,h=a+E,0===I-E*g&&--h);h=h<q?h+1:q+1;-1===t&&(r=-r);-1===y&&(m=-m,h=-h);for(A-=g;m!==h;)k=Math.ceil((v+m*H)/p),da(m,r,k,
c,b),0<=F?(r+=t,F-=A):F+=g,m+=y}else{F=A-Q;K=!1;if(a<k){I=(2*(k-a)-1)*Q;E=I/A|0;r+=E;if(r>w)continue;r>=u&&(E=I-E*A,m=k,F-=E+Q,0<E&&(r+=1,F+=A),K=!0)}if(!K&&e<u){I=A*(u-e);E=I/g|0;m+=E;E=I-E*g;if(m>q||m===q&&E>=Q)continue;r=u;F+=E;E>=Q&&(m+=1,F-=g)}h>q&&(I=g*(q-a)+Q,E=I/A|0,f=e+E,0===I-E*A&&--f);f=f<w?f+1:w+1;-1===y&&(m=-m);-1===t&&(r=-r,f=-f);for(g-=A;r!==f;)k=Math.ceil((z+r*d)/n),da(m,r,k,c,b),0<=F?(m+=y,F-=g):F+=A,r+=t}}}}},Triangles:function(a,e,d,h,f){if(0!==(R&1)){var n=aa;var c=aa+la;var b=
ba;var C=ba+ma;0>n&&(n=0);c>J&&(c=J);0>b&&(b=0);C>P&&(C=P)}else b=n=0,c=J,C=P;if(!(n>=c||b>=C))for(var m=0;m<h;m++){var x=d+3*e*m,r=x+e,k=r+e;if(a[x+1]>a[r+1]){var t=x;x=r;r=t}a[r+1]>a[k+1]&&(t=r,r=k,k=t);a[x+1]>a[r+1]&&(t=x,x=r,r=t);t=a[x];var q=a[x+1],y=a[x+2],A=a[r],g=a[r+1],l=a[r+2],D=a[k],v=a[k+1],H=a[k+2];var p=D-t;var z=v-q;var u=A-t;var w=g-q;var I=D-A;var M=v-g;var Q=t<=A?t<=D?t:D:A<=D?A:D,F=q,K=t>=A?t>=D?t:D:A>=D?A:D,E=v;Q=Q<n?n:Q;F=F<b?b:F;K=K>c?c:K;E=E>C?C:E;if(!(Q>=K||F>=E)){var ya=Q,
X=F;var ka=R&128?6*ja(Q,F,K,E,0,0,!1):6*N(Q,F,K,E,0,0,G,0,!1);for(var V=fa,T=O,da=1/(D*(q-g)+t*(g-v)+A*(v-q)),W=0;W<ka;W+=6){Q=G[W+0];F=G[W+1];K=G[W+2];E=G[W+3];D=Q-G[W+4]-ya;v=F-G[W+5]-X;t=a[x]+D;q=a[x+1]+v;A=a[r]+D;g=a[r+1]+v;D=a[k]+D;v=a[k+1]+v;var S=q>F?q:F;var ea=g<E?g:E;var ca=z;var B=w;if(0<ca)var L=p;else L=0,ca=1;if(0<B)var U=u;else U=0,B=1;var pa=t*ca+L*(S-q);var Y=t*B+U*(S-q);for(var Z=0;2>Z;Z++){ca=1/ca;var ia=1/B;if(R&16)for(var ta=I*(S-g),ua=-p*(S-v);S<ea;S++){B=pa*ca|0;var ha=Y*ia|
0;if(B>ha){var oa=B;B=ha;ha=oa}B=B>Q?B:Q;ha=ha<K?ha:K;oa=ta-M*(B-A);for(var va=ua+z*(B-D),wa=ua-w*(B-t);B<ha;B++){var qa=(oa*y+va*l+wa*H)*da|0,xa=B+S*J,ra=xa<<2;V[ra]<=qa&&(T[xa]=f,V[ra+0]=qa,V[ra+1]=qa,V[ra+2]=qa,V[ra+3]=qa);oa-=M;va+=z;wa-=w}ta+=I;ua-=p;pa+=L;Y+=U}else for(;S<ea;S++){B=pa*ca|0;ha=Y*ia|0;B>ha&&(oa=B,B=ha,ha=oa);B=B>Q?B:Q;for(ha=ha<K?ha:K;B<ha;B++)O[B+S*J]=f;pa+=L;Y+=U}if(1==Z)break;S=g>F?g:F;ea=v<E?v:E;ca=M;B=z;0<ca?L=I:(L=0,ca=1);0<B?U=p:(U=0,B=1);pa=A*ca+L*(S-g);Y=t*B+U*(S-q)}}}}},
_Triangles:function(a,e,d,h,f,n){if(0!==(R&1)){var c=aa;var b=aa+la;var C=ba;var m=ba+ma;0>c&&(c=0);b>J&&(b=J);0>C&&(C=0);m>P&&(m=P)}else C=c=0,b=J,m=P;if(!(c>=b||C>=m))for(var x=0;x<h;x++){var r=d+3*e*x;if(n){var k=r+e;var t=k+e}else t=r+e,k=t+e;var q=a[r]|0,y=a[r+1]|0,A=a[r+2]|0,g=a[t]|0,l=a[t+1]|0,D=a[t+2]|0,v=a[k]|0,H=a[k+1]|0,p=a[k+2]|0,z=q<=g?q<=v?q:v:g<=v?g:v,u=y<=l?y<=H?y:H:l<=H?l:H,w=q>=g?q>=v?q:v:g>=v?g:v,I=y>=l?y>=H?y:H:l>=H?l:H;z=z<c?c:z;u=u<C?C:u;w=w>b?b:w;I=I>m?m:I;if(!(z>=w||u>=I)){var M=
z,Q=u;var F=R&128?6*ja(z,u,w,I,0,0,!1):6*N(z,u,w,I,0,0,G,0,!1);for(var K=y-l,E=g-q,V=l-H,Y=v-g,ea=H-y,X=q-v,T=fa,Z=O,W=0;W<F;W+=6){z=G[W+0];u=G[W+1];w=G[W+2];I=G[W+3];v=z-G[W+4]-M;var S=u-G[W+5]-Q;q=(a[r]|0)+v;y=(a[r+1]|0)+S;g=(a[t]|0)+v;l=(a[t+1]|0)+S;v=(a[k]|0)+v;H=(a[k+1]|0)+S;S=(v-g)*(u-l)-(H-l)*(z-g);v=(q-v)*(u-H)-(y-H)*(z-v);for(q=(g-q)*(u-y)-(l-y)*(z-q);u<I;u++){y=S;g=v;l=q;H=u*J;for(var da=z;da<w;da++){if(0<=y&&0<=g&&0<=l){var ca=da+H,B=ca<<2,L=(y*A+g*D+l*p)/(y+g+l)|0;if(n){if(L>=ka){var U=
0;T[B]>=L&&(U|=1);T[B+1]>=L&&(U|=2);T[B+2]>=L&&(U|=4);T[B+3]>=L&&(U|=8);if(0!==(Z[ca]&269484032)&&0!==U||0===T[B])Z[ca]=f|269484032,T[B+0]=L,T[B+1]=L,T[B+2]=L,T[B+3]=L}}else L>=ka&&(U=0,T[B]<=L&&(U|=1),T[B+1]<=L&&(U|=2),T[B+2]<=L&&(U|=4),T[B+3]<=L&&(U|=8),0!==U&&(Z[ca]=f,T[B+0]=L,T[B+1]=L,T[B+2]=L,T[B+3]=L))}y+=V;g+=ea;l+=K}S+=Y;v+=X;q+=E}}}}},_Patch:function(a,e,d,h,f,n){if(0!==(R&1)){var c=aa;var b=aa+la;var C=ba;var m=ba+ma;0>c&&(c=0);b>J&&(b=J);0>C&&(C=0);m>P&&(m=P)}else C=c=0,b=J,m=P;if(!(c>=
b||C>=m))for(var x=0;x<h;x++){var r=d+3*e*x;if(n){var k=r+e;var t=k+e}else t=r+e,k=t+e;var q=a[r]|0,y=a[r+1]|0,A=a[r+2]|0,g=a[r+3],l=a[r+4],D=a[t]|0,v=a[t+1]|0,H=a[t+2]|0,p=a[t+3],z=a[t+4],u=a[k]|0,w=a[k+1]|0,I=a[k+2]|0,O=a[k+3],Q=a[k+4],F=q<=D?q<=u?q:u:D<=u?D:u,K=y<=v?y<=w?y:w:v<=w?v:w,E=q>=D?q>=u?q:u:D>=u?D:u,M=y>=v?y>=w?y:w:v>=w?v:w;F=F<c?c:F;K=K<C?C:K;E=E>b?b:E;M=M>m?m:M;if(!(F>=E||K>=M)){var V=F,Y=K;var Z=R&128?6*ja(F,K,E,M,0,0,!1):6*N(F,K,E,M,0,0,G,0,!1);for(var T=y-v,da=D-q,W=v-w,S=u-D,ea=
w-y,ca=q-u,B=0;B<Z;B+=6){F=G[B+0];K=G[B+1];E=G[B+2];M=G[B+3];u=F-G[B+4]-V;var L=K-G[B+5]-Y;q=(a[r]|0)+u;y=(a[r+1]|0)+L;D=(a[t]|0)+u;v=(a[t+1]|0)+L;u=(a[k]|0)+u;w=(a[k+1]|0)+L;L=(u-D)*(K-v)-(w-v)*(F-D);u=(q-u)*(K-w)-(y-w)*(F-u);q=(D-q)*(K-y)-(v-y)*(F-q);for(y=1/(L+u+q);K<M;K++){D=L;v=u;w=q;for(var U=K*J,X=F;X<E;X++){if(0<=D&&0<=v&&0<=w){var fa=X+U,ia=(D*A+v*H+w*I)*y|0,za=(D*g+v*p+w*O)*y,ta=(D*l+v*z+w*Q)*y;ia>=ka&&f(za,ta,ia,fa)}D+=W;v+=ea;w+=T}L+=S;u+=ca;q+=da}}}}},Enable:function(a){R|=a},Disable:function(a){R&=
~a},Scissor:function(a,e,d,h){d|=0;h|=0;0<=d&&0<=h&&(aa=a|0,ba=e|0,la=d,ma=h)},Scroll:function(a,e){a=-(a|0);e=-(e|0);a>=J||e>=P||-a>=J||-e>=P?M=Z=0:(Z=0>a?-J-a:J-a,M=0>e?-P-e:P-e);0<J?ea=V(ea+a,J):ea=0;0<P?ia=V(ia+e,P):ea=0},getWidth:function(){return J},getHeight:function(){return P},getScissorX:function(){return aa},getScissorY:function(){return ba},getScissorW:function(){return la},getScissorH:function(){return ma},getFlags:function(){return R},getScrollX:function(){return ea},getScrollY:function(){return ia},
getDepthBuf:function(){return fa},getWater:function(){return ka},setWater:function(a){ka=a},SCISSOR_TEST:1,COLOR_TEST:2,COLOR_MASK:4,COLOR_CLEAR:8,DEPTH_TEST:16,DEPTH_MASK:32,DEPTH_CLEAR:64,SCROLL_TEST:128,BBOX_ACCUM:256}};}();