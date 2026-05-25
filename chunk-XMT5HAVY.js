import{D as bt,E as _t,G as Mt,I as L,J as G,K as M,L as Dt,M as Pt,N as St,b as pt,c as _,d as gt,e as ft,f as Ct,g as W,h as vt,i as ht,j as yt,k as xt}from"./chunk-LP4XO4S4.js";import{e as lt,f as x,g as b}from"./chunk-ZAK55HXJ.js";import{a as h}from"./chunk-LJZKYW37.js";import{Aa as nt,Bb as V,Da as g,Ea as f,Ha as at,Ia as it,J as B,Ja as y,Jb as ct,K as Q,Ka as o,L as Y,La as i,Lb as ut,Ma as d,N as l,Na as rt,Nb as dt,Oa as ot,P as E,Q as w,Qa as q,Rb as st,Sa as s,T as Z,U as N,Ua as C,Va as X,Wa as I,Y as H,a as P,b as S,db as U,fb as m,gb as v,ha as tt,hb as O,ia as c,ib as mt,j as A,kb as j,l as $,lb as z,ra as p,sa as et,ta as F}from"./chunk-KNDHW2GR.js";var k=class e{articlesStorageKey="articles";commentsStorageKey="article-comments";getPostWithComments(n){return A(this.getPostDetails(n))}addComment(n,t){let a=this.getCommentsFromStorage(),r={id:this.getNextCommentId(a),articleId:n,author:t.author,text:t.text,date:new Date().toISOString().slice(0,10),rating:0};return this.saveCommentsToStorage([r,...a]),A(this.getPostDetails(n))}changeArticleRating(n,t){let r=this.getArticlesFromStorage().map(u=>u.id!==n?u:S(P({},u),{rating:(u.rating??0)+t}));return this.saveArticlesToStorage(r),A(this.getPostDetails(n))}changeCommentRating(n,t,a){let u=this.getCommentsFromStorage().map(D=>D.id!==t||D.articleId!==n?D:S(P({},D),{rating:(D.rating??0)+a}));return this.saveCommentsToStorage(u),A(this.getPostDetails(n))}getPostDetails(n){let t=this.getArticlesFromStorage().find(r=>r.id===n)??null,a=this.getCommentsFromStorage().filter(r=>r.articleId===n).sort((r,u)=>u.id-r.id);return{article:t,comments:a}}getArticlesFromStorage(){let n=localStorage.getItem(this.articlesStorageKey);return n?JSON.parse(n).map(t=>this.normalizeArticle(t)):[]}saveArticlesToStorage(n){localStorage.setItem(this.articlesStorageKey,JSON.stringify(n))}getCommentsFromStorage(){let n=localStorage.getItem(this.commentsStorageKey);return n?JSON.parse(n).map(t=>this.normalizeComment(t)):[]}saveCommentsToStorage(n){localStorage.setItem(this.commentsStorageKey,JSON.stringify(n))}getNextCommentId(n){return n.reduce((a,r)=>Math.max(a,r.id),0)+1}normalizeArticle(n){return S(P({},n),{rating:n.rating??0})}normalizeComment(n){return S(P({},n),{rating:n.rating??0})}static \u0275fac=function(t){return new(t||e)};static \u0275prov=B({token:e,factory:e.\u0275fac})};var R=class e{article=H(null);comments=H([]);saveResponse(n){this.article.set(n.article),this.comments.set(n.comments)}clear(){this.article.set(null),this.comments.set([])}static \u0275fac=function(t){return new(t||e)};static \u0275prov=B({token:e,factory:e.\u0275fac})};var jt=["*"];var zt=[[["","mat-card-avatar",""],["","matCardAvatar",""]],[["mat-card-title"],["mat-card-subtitle"],["","mat-card-title",""],["","mat-card-subtitle",""],["","matCardTitle",""],["","matCardSubtitle",""]],"*"],Vt=["[mat-card-avatar], [matCardAvatar]",`mat-card-title, mat-card-subtitle,
      [mat-card-title], [mat-card-subtitle],
      [matCardTitle], [matCardSubtitle]`,"*"],Lt=new Y("MAT_CARD_CONFIG"),At=(()=>{class e{appearance;constructor(){let t=l(Lt,{optional:!0});this.appearance=t?.appearance||"raised"}static \u0275fac=function(a){return new(a||e)};static \u0275cmp=p({type:e,selectors:[["mat-card"]],hostAttrs:[1,"mat-mdc-card","mdc-card"],hostVars:8,hostBindings:function(a,r){a&2&&U("mat-mdc-card-outlined",r.appearance==="outlined")("mdc-card--outlined",r.appearance==="outlined")("mat-mdc-card-filled",r.appearance==="filled")("mdc-card--filled",r.appearance==="filled")},inputs:{appearance:"appearance"},exportAs:["matCard"],ngContentSelectors:jt,decls:1,vars:0,template:function(a,r){a&1&&(X(),I(0))},styles:[`.mat-mdc-card {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
  border-style: solid;
  border-width: 0;
  background-color: var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low));
  border-color: var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low));
  border-radius: var(--mat-card-elevated-container-shape, var(--mat-sys-corner-medium));
  box-shadow: var(--mat-card-elevated-container-elevation, var(--mat-sys-level1));
}
.mat-mdc-card::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: solid 1px transparent;
  content: "";
  display: block;
  pointer-events: none;
  box-sizing: border-box;
  border-radius: var(--mat-card-elevated-container-shape, var(--mat-sys-corner-medium));
}

.mat-mdc-card-outlined {
  background-color: var(--mat-card-outlined-container-color, var(--mat-sys-surface));
  border-radius: var(--mat-card-outlined-container-shape, var(--mat-sys-corner-medium));
  border-width: var(--mat-card-outlined-outline-width, 1px);
  border-color: var(--mat-card-outlined-outline-color, var(--mat-sys-outline-variant));
  box-shadow: var(--mat-card-outlined-container-elevation, var(--mat-sys-level0));
}
.mat-mdc-card-outlined::after {
  border: none;
}

.mat-mdc-card-filled {
  background-color: var(--mat-card-filled-container-color, var(--mat-sys-surface-container-highest));
  border-radius: var(--mat-card-filled-container-shape, var(--mat-sys-corner-medium));
  box-shadow: var(--mat-card-filled-container-elevation, var(--mat-sys-level0));
}

.mdc-card__media {
  position: relative;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.mdc-card__media::before {
  display: block;
  content: "";
}
.mdc-card__media:first-child {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}
.mdc-card__media:last-child {
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
}

.mat-mdc-card-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  min-height: 52px;
  padding: 8px;
}

.mat-mdc-card-title {
  font-family: var(--mat-card-title-text-font, var(--mat-sys-title-large-font));
  line-height: var(--mat-card-title-text-line-height, var(--mat-sys-title-large-line-height));
  font-size: var(--mat-card-title-text-size, var(--mat-sys-title-large-size));
  letter-spacing: var(--mat-card-title-text-tracking, var(--mat-sys-title-large-tracking));
  font-weight: var(--mat-card-title-text-weight, var(--mat-sys-title-large-weight));
}

.mat-mdc-card-subtitle {
  color: var(--mat-card-subtitle-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-card-subtitle-text-font, var(--mat-sys-title-medium-font));
  line-height: var(--mat-card-subtitle-text-line-height, var(--mat-sys-title-medium-line-height));
  font-size: var(--mat-card-subtitle-text-size, var(--mat-sys-title-medium-size));
  letter-spacing: var(--mat-card-subtitle-text-tracking, var(--mat-sys-title-medium-tracking));
  font-weight: var(--mat-card-subtitle-text-weight, var(--mat-sys-title-medium-weight));
}

.mat-mdc-card-title,
.mat-mdc-card-subtitle {
  display: block;
  margin: 0;
}
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-title,
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-subtitle {
  padding: 16px 16px 0;
}

.mat-mdc-card-header {
  display: flex;
  padding: 16px 16px 0;
}

.mat-mdc-card-content {
  display: block;
  padding: 0 16px;
}
.mat-mdc-card-content:first-child {
  padding-top: 16px;
}
.mat-mdc-card-content:last-child {
  padding-bottom: 16px;
}

.mat-mdc-card-title-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.mat-mdc-card-avatar {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-bottom: 16px;
  object-fit: cover;
}
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-subtitle,
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-title {
  line-height: normal;
}

.mat-mdc-card-sm-image {
  width: 80px;
  height: 80px;
}

.mat-mdc-card-md-image {
  width: 112px;
  height: 112px;
}

.mat-mdc-card-lg-image {
  width: 152px;
  height: 152px;
}

.mat-mdc-card-xl-image {
  width: 240px;
  height: 240px;
}

.mat-mdc-card-subtitle ~ .mat-mdc-card-title,
.mat-mdc-card-title ~ .mat-mdc-card-subtitle,
.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-title,
.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-subtitle,
.mat-mdc-card-title-group .mat-mdc-card-title,
.mat-mdc-card-title-group .mat-mdc-card-subtitle {
  padding-top: 0;
}

.mat-mdc-card-content > :last-child:not(.mat-mdc-card-footer) {
  margin-bottom: 0;
}

.mat-mdc-card-actions-align-end {
  justify-content: flex-end;
}
`],encapsulation:2,changeDetection:0})}return e})(),Et=(()=>{class e{static \u0275fac=function(a){return new(a||e)};static \u0275dir=F({type:e,selectors:[["mat-card-title"],["","mat-card-title",""],["","matCardTitle",""]],hostAttrs:[1,"mat-mdc-card-title"]})}return e})();var wt=(()=>{class e{static \u0275fac=function(a){return new(a||e)};static \u0275dir=F({type:e,selectors:[["mat-card-content"]],hostAttrs:[1,"mat-mdc-card-content"]})}return e})(),Ft=(()=>{class e{static \u0275fac=function(a){return new(a||e)};static \u0275dir=F({type:e,selectors:[["mat-card-subtitle"],["","mat-card-subtitle",""],["","matCardSubtitle",""]],hostAttrs:[1,"mat-mdc-card-subtitle"]})}return e})(),It=(()=>{class e{align="start";static \u0275fac=function(a){return new(a||e)};static \u0275dir=F({type:e,selectors:[["mat-card-actions"]],hostAttrs:[1,"mat-mdc-card-actions","mdc-card__actions"],hostVars:2,hostBindings:function(a,r){a&2&&U("mat-mdc-card-actions-align-end",r.align==="end")},inputs:{align:"align"},exportAs:["matCardActions"]})}return e})(),Ot=(()=>{class e{static \u0275fac=function(a){return new(a||e)};static \u0275cmp=p({type:e,selectors:[["mat-card-header"]],hostAttrs:[1,"mat-mdc-card-header"],ngContentSelectors:Vt,decls:4,vars:0,consts:[[1,"mat-mdc-card-header-text"]],template:function(a,r){a&1&&(X(zt),I(0),rt(1,"div",0),I(2,1),ot(),I(3,2))},encapsulation:2,changeDetection:0})}return e})();var kt=(()=>{class e{static \u0275fac=function(a){return new(a||e)};static \u0275mod=et({type:e});static \u0275inj=Q({imports:[lt]})}return e})();var J=class e{comment;ratingChange=new N;decreaseRating(){this.ratingChange.emit({comment:this.comment,delta:-1})}increaseRating(){this.ratingChange.emit({comment:this.comment,delta:1})}static \u0275fac=function(t){return new(t||e)};static \u0275cmp=p({type:e,selectors:[["app-post-comment-card"]],inputs:{comment:"comment"},outputs:{ratingChange:"ratingChange"},decls:18,vars:7,consts:[[1,"comment-card"],["align","end"],[1,"comment-rating"],["mat-icon-button","","type","button","aria-label","\u0423\u043C\u0435\u043D\u044C\u0448\u0438\u0442\u044C \u0440\u0435\u0439\u0442\u0438\u043D\u0433 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u044F",3,"click"],["svgIcon","rating-minus"],["mat-icon-button","","type","button","aria-label","\u0423\u0432\u0435\u043B\u0438\u0447\u0438\u0442\u044C \u0440\u0435\u0439\u0442\u0438\u043D\u0433 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u044F",3,"click"],["svgIcon","rating-plus"]],template:function(t,a){t&1&&(o(0,"mat-card",0)(1,"mat-card-header")(2,"mat-card-title"),m(3),i(),o(4,"mat-card-subtitle"),m(5),j(6,"date"),i()(),o(7,"mat-card-content")(8,"p"),m(9),i()(),o(10,"mat-card-actions",1)(11,"div",2)(12,"span"),m(13),i(),o(14,"button",3),s("click",function(){return a.decreaseRating()}),d(15,"mat-icon",4),i(),o(16,"button",5),s("click",function(){return a.increaseRating()}),d(17,"mat-icon",6),i()()()()),t&2&&(c(3),v(a.comment.author),c(2),O(" ",z(6,4,a.comment.date,"dd.MM.yyyy")," "),c(4),v(a.comment.text),c(4),O("\u0420\u0435\u0439\u0442\u0438\u043D\u0433: ",a.comment.rating))},dependencies:[M,L,kt,At,It,wt,Ot,Ft,Et,b,x,V],styles:[".comment-card[_ngcontent-%COMP%]{border-radius:18px}.comment-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;color:var(--common-text-color);line-height:1.6}.comment-rating[_ngcontent-%COMP%]{display:flex;align-items:center;gap:10px;flex-wrap:wrap}"],changeDetection:0})};function Jt(e,n){e&1&&(o(0,"mat-error"),m(1,"\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0438\u043C\u044F \u0438\u043B\u0438 \u043D\u0438\u043A"),i())}function Kt(e,n){e&1&&(o(0,"mat-error"),m(1,"\u0418\u043C\u044F \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u043D\u0435 \u0434\u043B\u0438\u043D\u043D\u0435\u0435 40 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432"),i())}function Ht(e,n){e&1&&(o(0,"mat-error"),m(1,"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0435\u043A\u0441\u0442 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u044F"),i())}function qt(e,n){e&1&&(o(0,"mat-error"),m(1,"\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439 \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043D\u0435 \u043A\u043E\u0440\u043E\u0447\u0435 3 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432"),i())}function Xt(e,n){e&1&&(o(0,"mat-error"),m(1,"\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439 \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043D\u0435 \u0434\u043B\u0438\u043D\u043D\u0435\u0435 500 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432"),i())}var K=class e{commentAdd=new N;commentForm=new Ct({author:new W("",{nonNullable:!0,validators:[_.required,_.maxLength(40)]}),text:new W("",{nonNullable:!0,validators:[_.required,_.minLength(3),_.maxLength(500)]})});addComment(){if(this.commentForm.invalid){this.commentForm.markAllAsTouched();return}let n=this.commentForm.getRawValue();this.commentAdd.emit({author:n.author.trim(),text:n.text.trim()}),this.commentForm.reset()}static \u0275fac=function(t){return new(t||e)};static \u0275cmp=p({type:e,selectors:[["app-post-comment-form"]],outputs:{commentAdd:"commentAdd"},decls:17,vars:7,consts:[[1,"comment-form",3,"ngSubmit","formGroup"],["appearance","outline"],["matInput","","formControlName","author","placeholder","\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043C\u044F"],["matInput","","rows","5","formControlName","text","placeholder","\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439"],["mat-flat-button","","color","primary","type","submit",3,"disabled"],["svgIcon","add-comment"]],template:function(t,a){t&1&&(o(0,"form",0),s("ngSubmit",function(){return a.addComment()}),o(1,"mat-form-field",1)(2,"mat-label"),m(3,"\u0418\u043C\u044F \u0438\u043B\u0438 \u043D\u0438\u043A"),i(),d(4,"input",2),g(5,Jt,2,0,"mat-error"),g(6,Kt,2,0,"mat-error"),i(),o(7,"mat-form-field",1)(8,"mat-label"),m(9,"\u0422\u0435\u043A\u0441\u0442 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u044F"),i(),d(10,"textarea",3),g(11,Ht,2,0,"mat-error"),g(12,qt,2,0,"mat-error"),g(13,Xt,2,0,"mat-error"),i(),o(14,"button",4),d(15,"mat-icon",5),m(16," \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439 "),i()()),t&2&&(y("formGroup",a.commentForm),c(5),f(a.commentForm.controls.author.hasError("required")?5:-1),c(),f(a.commentForm.controls.author.hasError("maxlength")?6:-1),c(5),f(a.commentForm.controls.text.hasError("required")?11:-1),c(),f(a.commentForm.controls.text.hasError("minlength")?12:-1),c(),f(a.commentForm.controls.text.hasError("maxlength")?13:-1),c(),y("disabled",a.commentForm.invalid))},dependencies:[xt,vt,pt,gt,ft,yt,ht,M,G,Dt,Mt,bt,_t,b,x,St,Pt],styles:[".comment-form[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:16px;max-width:680px;padding:24px;border-radius:20px;background-color:#fff;box-shadow:0 18px 50px #1e212814}.comment-form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{align-self:flex-start}"],changeDetection:0})};var Ut=(e,n)=>n.id;function Wt(e,n){if(e&1){let t=q();o(0,"app-post-comment-card",22),s("ratingChange",function(r){E(t);let u=C(3);return w(u.onCommentRatingChange(r))}),i()}if(e&2){let t=n.$implicit;y("comment",t)}}function $t(e,n){if(e&1&&(o(0,"div",17),at(1,Wt,1,1,"app-post-comment-card",21,Ut),i()),e&2){let t=C(2);c(),it(t.comments())}}function Qt(e,n){e&1&&(o(0,"p",18),m(1,"\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0435\u0432 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442. \u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u043F\u0435\u0440\u0432\u044B\u0439 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439."),i())}function Yt(e,n){if(e&1){let t=q();o(0,"article",5)(1,"div",6),d(2,"img",7),i(),o(3,"div",8)(4,"time",9),m(5),j(6,"date"),i(),o(7,"h1"),m(8),i(),o(9,"p"),m(10),i(),o(11,"div",10)(12,"span",11),m(13,"\u0420\u0435\u0439\u0442\u0438\u043D\u0433 \u0441\u0442\u0430\u0442\u044C\u0438:"),i(),o(14,"button",12),s("click",function(){E(t);let r=C();return w(r.changeArticleRating(-1))}),d(15,"mat-icon",13),i(),o(16,"strong"),m(17),i(),o(18,"button",14),s("click",function(){E(t);let r=C();return w(r.changeArticleRating(1))}),d(19,"mat-icon",15),i()()()(),o(20,"section",16)(21,"h2"),m(22,"\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0438"),i(),g(23,$t,3,0,"div",17)(24,Qt,2,0,"p",18),i(),o(25,"section",19)(26,"h2"),m(27,"\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439"),i(),o(28,"app-post-comment-form",20),s("commentAdd",function(r){E(t);let u=C();return w(u.addComment(r))}),i()()}if(e&2){let t=n,a=C();c(2),y("src",t.imageUrl,tt)("alt",t.title),c(2),nt("datetime",t.date),c(),O(" ",z(6,8,t.date,"dd.MM.yyyy")," "),c(3),v(t.title),c(2),v(t.text),c(7),v(t.rating),c(6),f(a.comments().length>0?23:24)}}function Zt(e,n){e&1&&(o(0,"section",4)(1,"h1"),m(2,"\u0421\u0442\u0430\u0442\u044C\u044F \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430"),i(),o(3,"p"),m(4,"\u0412\u043E\u0437\u043C\u043E\u0436\u043D\u043E, \u0441\u0442\u0430\u0442\u044C\u044F \u0431\u044B\u043B\u0430 \u0443\u0434\u0430\u043B\u0435\u043D\u0430 \u0438\u043B\u0438 \u0443\u043A\u0430\u0437\u0430\u043D \u043D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0430\u0434\u0440\u0435\u0441."),i(),o(5,"a",23),m(6," \u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043A \u0441\u043F\u0438\u0441\u043A\u0443 \u0441\u0442\u0430\u0442\u0435\u0439 "),i()())}var Nt=class e{destroyRef=l(Z);route=l(ut);titleService=l(ct);articlesService=l(st);postPageService=l(k);postPageStore=l(R);article=this.postPageStore.article;comments=this.postPageStore.comments;constructor(){this.route.paramMap.pipe($(n=>n.get("id")??""),h(this.destroyRef)).subscribe(n=>{this.loadPost(n)})}changeArticleRating(n){let t=this.article();t&&this.articlesService.changeArticleRating(t.id,n).pipe(h(this.destroyRef)).subscribe(a=>{a&&this.postPageStore.saveResponse({article:a,comments:this.comments()})})}onCommentRatingChange(n){this.changeCommentRating(n.comment,n.delta)}addComment(n){let t=this.article();t&&this.postPageService.addComment(t.id,n).pipe(h(this.destroyRef)).subscribe(a=>{this.postPageStore.saveResponse({article:t,comments:a.comments})})}changeCommentRating(n,t){let a=this.article();a&&this.postPageService.changeCommentRating(a.id,n.id,t).pipe(h(this.destroyRef)).subscribe(r=>{this.postPageStore.saveResponse({article:a,comments:r.comments})})}loadPost(n){if(!n){this.postPageStore.clear(),this.titleService.setTitle("\u0421\u0442\u0430\u0442\u044C\u044F \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430");return}this.articlesService.getArticleById(n).pipe(h(this.destroyRef)).subscribe(t=>{if(!t){this.postPageStore.clear(),this.titleService.setTitle("\u0421\u0442\u0430\u0442\u044C\u044F \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430");return}this.postPageService.getPostWithComments(t.id).pipe(h(this.destroyRef)).subscribe(a=>{this.postPageStore.saveResponse({article:t,comments:a.comments}),this.titleService.setTitle(t.title)})})}static \u0275fac=function(t){return new(t||e)};static \u0275cmp=p({type:e,selectors:[["app-post-page"]],features:[mt([k,R])],decls:7,vars:1,consts:[[1,"post-page"],[1,"container"],["routerLink","/blog",1,"back-link"],["svgIcon","arrow-back"],[1,"not-found"],[1,"post"],[1,"post-image-wrapper"],[3,"src","alt"],[1,"post-content"],[1,"post-date"],[1,"rating"],[1,"rating-label"],["mat-icon-button","","type","button","aria-label","\u0423\u043C\u0435\u043D\u044C\u0448\u0438\u0442\u044C \u0440\u0435\u0439\u0442\u0438\u043D\u0433 \u0441\u0442\u0430\u0442\u044C\u0438",3,"click"],["svgIcon","rating-minus"],["mat-icon-button","","type","button","aria-label","\u0423\u0432\u0435\u043B\u0438\u0447\u0438\u0442\u044C \u0440\u0435\u0439\u0442\u0438\u043D\u0433 \u0441\u0442\u0430\u0442\u044C\u0438",3,"click"],["svgIcon","rating-plus"],[1,"comments-section"],[1,"comments-list"],[1,"empty-comments"],[1,"comment-form-section"],[3,"commentAdd"],[3,"comment"],[3,"ratingChange","comment"],["mat-flat-button","","color","primary","routerLink","/blog"]],template:function(t,a){if(t&1&&(o(0,"main",0)(1,"div",1)(2,"a",2),d(3,"mat-icon",3),m(4," \u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043A \u0441\u0442\u0430\u0442\u044C\u044F\u043C "),i(),g(5,Yt,29,11)(6,Zt,7,0,"section",4),i()()),t&2){let r;c(5),f((r=a.article())?5:6,r)}},dependencies:[dt,M,G,L,b,x,J,K,V],styles:[".post-page[_ngcontent-%COMP%]{padding:48px 0 72px}.back-link[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:6px;margin-bottom:24px;color:var(--common-text-color);text-decoration:none;font-weight:500}.back-link[_ngcontent-%COMP%]:hover{color:#4f6bed}.post[_ngcontent-%COMP%]{display:grid;grid-template-columns:minmax(260px,420px) 1fr;gap:32px;align-items:start;padding:32px;border-radius:24px;background-color:#fff;box-shadow:0 18px 50px #1e212814}.post-image-wrapper[_ngcontent-%COMP%]{overflow:hidden;border-radius:20px;background-color:#f3f5f8}.post-image-wrapper[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{display:block;width:100%;height:320px;object-fit:cover}.post-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:16px}.post-date[_ngcontent-%COMP%]{color:#79808f;font-size:14px}.post-content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin:0;color:var(--heading-text-color);font-size:34px;line-height:1.2}.post-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;color:var(--common-text-color);font-size:17px;line-height:1.7}.rating[_ngcontent-%COMP%]{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:8px}.rating-label[_ngcontent-%COMP%]{font-weight:600}.comments-section[_ngcontent-%COMP%], .comment-form-section[_ngcontent-%COMP%]{margin-top:40px}.comments-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .comment-form-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0 0 20px;color:var(--heading-text-color);font-size:26px}.comments-list[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:16px}.empty-comments[_ngcontent-%COMP%]{color:#79808f}.not-found[_ngcontent-%COMP%]{padding:40px;border-radius:24px;background-color:#fff;box-shadow:0 18px 50px #1e212814}.not-found[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin:0 0 12px;color:var(--heading-text-color)}.not-found[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0 0 24px;color:var(--common-text-color)}@media(max-width:768px){.post[_ngcontent-%COMP%]{grid-template-columns:1fr;padding:20px}.post-image-wrapper[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:240px}.post-content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:26px}}"],changeDetection:0})};export{Nt as PostPage};
