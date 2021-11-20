(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{235:function(e,t,a){},521:function(e,t,a){"use strict";a.r(t);var n,r,s,i,c,l,j,o,u,d,b,h,O=a(1),x=a(66),p=a.n(x),m=a(582),v=(a(235),a(42)),f=a(55),g=a(614),k=a(26),y=a(200),w=a.n(y),S=a(594),C=a(201),T=a.n(C),$=a(17),F=a.n($),I=a(43),z=a(13),A=a(587),P=a(611),N=a(32),q=a(90),B=Object(q.d)(n||(n=Object(N.a)(["\n  mutation($email: String, $password: String) {\n    updateUser(email: $email, password: $password)\n  }\n"]))),D=Object(q.d)(r||(r=Object(N.a)(["\n  mutation($userId: ID!) {\n    activateUser(userId: $userId)\n  }\n"]))),M=Object(q.d)(s||(s=Object(N.a)(["\n  mutation ($minPlayersForMatch: Int, $minPlayersForHc: Int, $ignoreHcBefore: Date, $ignoreMatchBefore: Date) {\n    setSetup(\n      minPlayersForMatch: $minPlayersForMatch,\n      minPlayersForHc: $minPlayersForHc,\n      ignoreHcBefore: $ignoreHcBefore,\n      ignoreMatchBefore: $ignoreMatchBefore\n    )\n  }\n"]))),E=Object(q.d)(i||(i=Object(N.a)(["\n  mutation($file: Upload!) {\n    uploadCsvFile(file: $file) {\n      filename\n      mimetype\n      encoding\n    }\n  }\n"]))),L=Object(q.d)(c||(c=Object(N.a)(["\n  mutation($name: String!, $password: String!, $email: String) {\n    addUser(name: $name, password: $password, email: $email) {\n      id\n    }\n  }\n"]))),V=Object(q.d)(l||(l=Object(N.a)(["\nmutation($name: String!, $password: String!) {\n  login(name: $name, password: $password)\n  \n}\n"]))),H=Object(q.d)(j||(j=Object(N.a)(["\nmutation ($alias: String!) {\n  addAlias(alias: $alias)\n}\n"]))),W=Object(q.d)(o||(o=Object(N.a)(["\nmutation ($aliasId: Int!) {\n  deleteAlias(aliasId: $aliasId)\n}\n"]))),R=Object(q.d)(u||(u=Object(N.a)(["\n  query {\n    getLogs {\n      date\n      process\n      type\n      message\n    }\n  }\n"]))),U=Object(q.d)(d||(d=Object(N.a)(["\nquery ($fetchFromDatabase: Boolean) {\n  getMe (fetchFromDatabase: $fetchFromDatabase) {\n    id\n    name\n    rooli\n    email\n  }\n}\n"]))),K=Object(q.d)(b||(b=Object(N.a)(["\nquery {\n  getCourseStats {\n    rata\n    layout\n    par\n    min\n    max\n    avg\n    games\n    tenLatestRounds\n    hc\n  }\n}\n"]))),Q=Object(q.d)(h||(h=Object(N.a)(["\nquery {\n  getAliases {\n    id\n    alias\n  }\n}\n"]))),J=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:void 0,t=Object(O.useState)(null),a=Object(z.a)(t,2),n=a[0],r=a[1],s=Object(A.a)(U,{variables:{fetchFromDatabase:e}}),i=s.loading,c=s.data,l=Object(P.a)(B,{refetchQueries:[U,{variables:{fetchFromDatabase:e}}]}),j=Object(z.a)(l,1),o=j[0];Object(O.useEffect)((function(){i||((null===c||void 0===c?void 0:c.getMe)?r(c.getMe):r(void 0))}),[i,c]);var u=function(){var e=Object(I.a)(F.a.mark((function e(t){var a;return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o({variables:t});case 2:return a=e.sent,e.abrupt("return",a);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),d=function(){r(null)};return{me:n,update:u,clear:d}},G=a(0),_=Object(O.createContext)(),X=function(){return Object(O.useContext)(_)},Y=function(e){var t=e.children,a=J();return Object(G.jsx)(_.Provider,{value:a,children:t})},Z=a(8),ee=a(44),te=a(588),ae=a(593),ne=a(591),re=a(583),se=a(596);var ie=function(){var e,t=Object(P.a)(L),a=Object(z.a)(t,2),n=a[0],r=a[1],s=Object(v.b)().enqueueSnackbar,i=Object(O.useState)({tunnus:"",password:"",password2:"",email:"",valid:!1}),c=Object(z.a)(i,2),l=c[0],j=c[1],o=function(e){var t=Object(ee.a)(Object(ee.a)({},l),{},Object(Z.a)({},e.target.name,e.target.value));t.valid=""!==t.tunnus&&""!==t.password&&t.password===t.password2,j(t)},u=function(){var e=Object(I.a)(F.a.mark((function e(t){return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,n({variables:{name:l.tunnus,password:l.password,email:l.email}});case 4:s("Tunnus luotiin onnistuneesti!",{variant:"success"}),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(1),s("Virhe tunnuksen luomisessa!",{variant:"error"});case 10:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(t){return e.apply(this,arguments)}}();return r.loading?Object(G.jsx)(te.a,{open:!0,children:Object(G.jsx)(ae.a,{})}):(null===(e=r.data)||void 0===e?void 0:e.addUser.id)?Object(G.jsxs)(G.Fragment,{children:[Object(G.jsx)(S.a,{variant:"h4",children:"Tunnus luotu"}),Object(G.jsx)(S.a,{paragraph:!0,children:"Tunnus luotiin onnistuneesti! Voit kirjautua sill\xe4 sis\xe4\xe4n jahka se ensin aktivoidaan."})]}):Object(G.jsxs)(G.Fragment,{children:[r.error&&Object(G.jsxs)("div",{className:"div-error",children:["Virhe tunnuksen luomisessa! (",r.error.message,")"]}),Object(G.jsx)("form",{onSubmit:u,children:Object(G.jsxs)(ne.a,{container:!0,spacing:1,alignItems:"center",columns:5,children:[Object(G.jsx)(ne.a,{item:!0,md:1,xs:3,children:"Tunnus:"}),Object(G.jsx)(ne.a,{item:!0,md:4,xs:3,children:Object(G.jsx)(re.a,{name:"tunnus",style:{minWidth:"50%"},required:!0,onChange:o})}),Object(G.jsx)(ne.a,{item:!0,md:1,xs:3,children:"Salasana:"}),Object(G.jsx)(ne.a,{item:!0,md:4,xs:3,children:Object(G.jsx)(re.a,{style:{minWidth:"50%"},name:"password",required:!0,type:"password",onChange:o})}),Object(G.jsx)(ne.a,{item:!0,md:1,xs:3,children:"Vahvista salasana:"}),Object(G.jsx)(ne.a,{item:!0,md:4,xs:3,children:Object(G.jsx)(re.a,{style:{minWidth:"50%"},name:"password2",required:!0,type:"password",onChange:o})}),Object(G.jsx)(ne.a,{item:!0,md:1,xs:3,children:"Email:"}),Object(G.jsx)(ne.a,{item:!0,md:4,xs:3,children:Object(G.jsx)(re.a,{style:{minWidth:"50%"},name:"email",placeholder:"Iimeil",onChange:o})}),Object(G.jsx)(ne.a,{item:!0,md:5,xs:3,children:Object(G.jsx)(se.a,{size:"large",variant:"contained",disabled:!l.valid,type:"submit",children:"Luo tunnukset"})})]})})]})},ce=a(615),le=a(579);var je=function(){var e=Object(P.a)(V),t=Object(z.a)(e,2),a=t[0],n=t[1].loading,r=Object(v.b)().enqueueSnackbar,s=Object(le.a)(),i=function(){var e=Object(I.a)(F.a.mark((function e(t){var n;return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,a({variables:{name:t.target.tunnus.value,password:t.target.password.value}});case 4:return n=e.sent,window.scrollTo(0,0),window.sessionStorage.setItem("suklaaJuna",n.data.login),e.next=9,s.refetchQueries({include:[U]});case 9:e.next=14;break;case 11:e.prev=11,e.t0=e.catch(1),r("V\xe4\xe4r\xe4 tunnus tai salasana!",{variant:"error"});case 14:return e.prev=14,t.target.tunnus.value="",t.target.password.value="",e.finish(14);case 18:case"end":return e.stop()}}),e,null,[[1,11,14,18]])})));return function(t){return e.apply(this,arguments)}}();return Object(G.jsx)("div",{style:{margin:"8px 0px"},children:Object(G.jsx)("form",{onSubmit:i,children:Object(G.jsxs)(ne.a,{container:!0,columns:1,spacing:1,children:[Object(G.jsx)(ne.a,{item:!0,xs:1,children:Object(G.jsx)(re.a,{name:"tunnus",placeholder:"Tunnus..."})}),Object(G.jsx)(ne.a,{item:!0,xs:1,children:Object(G.jsx)(re.a,{name:"password",type:"password",variant:"outlined",placeholder:"Salasana..."})}),Object(G.jsx)(ne.a,{item:!0,xs:1,children:Object(G.jsx)(ce.a,{loading:n,type:"submit",size:"large",children:" Kirjaudu"})})]})})})},oe=function(){var e=Object(le.a)(),t=X(),a=function(){var a=Object(I.a)(F.a.mark((function a(){return F.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.clearStore();case 2:return a.next=4,e.resetStore();case 4:return a.next=6,e.refetchQueries({include:[U]});case 6:window.sessionStorage.clear(),t.clear();case 8:case"end":return a.stop()}}),a)})));return function(){return a.apply(this,arguments)}}();return Object(G.jsx)(se.a,{onClick:a,children:"Logout"})},ue=function(){var e=X();return Object(G.jsxs)(G.Fragment,{children:[Object(G.jsxs)("div",{className:"wideContainer wideContainerTop",children:[Object(G.jsx)(S.a,{variant:"h2",children:"Olet kirjautunut sis\xe4\xe4n"}),Object(G.jsxs)(S.a,{paragraph:!0,children:["Olet kirjautunut sis\xe4\xe4n tunnuksella\xa0",Object(G.jsx)("b",{children:null===e||void 0===e?void 0:e.me.name})]}),Object(G.jsxs)(S.a,{paragraph:!0,children:["Jos haluat kirjautua ulos, voit erota v\xe4litt\xf6m\xe4sti ryhm\xe4st\xe4 klikkaamalla\xa0",Object(G.jsx)(oe,{}),"\xa0-nappia"]})]}),Object(G.jsxs)("div",{className:"wideContainer splitContainer",children:[Object(G.jsxs)("div",{className:"darkContainer",children:[Object(G.jsx)(S.a,{variant:"h2",children:"Aliakset"}),Object(G.jsxs)(S.a,{paragraph:!0,children:["Aliaskset yhdist\xe4v\xe4t Udiscin csv-tiedoston nimet k\xe4ytt\xe4j\xe4tunnuksiin. Aliaksia voi lis\xe4t\xe4\xa0",Object(G.jsx)(f.b,{to:"/settings",children:"asetuksissa"})]})]}),Object(G.jsx)("div",{children:"\xa0"})]}),Object(G.jsxs)("div",{className:"wideContainer splitContainer",children:[Object(G.jsx)("div",{children:"\xa0"}),Object(G.jsxs)("div",{className:"darkContainer",children:[Object(G.jsx)(S.a,{variant:"h2",children:"CSV-tiedosto"}),Object(G.jsxs)(S.a,{paragraph:!0,children:["Udiscist\xe4 saatavan csv-tiedoston voi l\xe4hett\xe4\xe4\xa0",Object(G.jsx)(f.b,{to:"/upload",children:"Upload"}),"\xa0 -sivun kautta!"]})]})]})]})},de=function(){return X().me?Object(G.jsx)(ue,{}):Object(G.jsxs)(G.Fragment,{children:[Object(G.jsxs)("div",{className:"wideContainer wideContainerTop",children:[Object(G.jsx)(S.a,{variant:"h1",children:Object(G.jsx)(T.a,{strings:["fRisbeegolfkerh","Fisbeego","RFisbeegolf","Risbeegomfkerho"],typeSpeed:50,backSpeed:40,backDelay:10,onComplete:function(e){e.cursor.remove()}})}),Object(G.jsx)(S.a,{paragraph:!0,children:"Olet eksynyt Risbeegomfkerhon sivuille."}),Object(G.jsxs)(S.a,{paragraph:!0,children:["Omistatko jo tunnukset?\xa0",Object(G.jsx)("a",{href:"#login",children:"Kirjaudu sis\xe4\xe4n!"})]})]}),Object(G.jsxs)("div",{className:"wideContainer splitContainer",id:"login",children:[Object(G.jsxs)("div",{className:"darkContainer",children:[Object(G.jsx)(S.a,{variant:"h3",children:"Ei turvallinen!?"}),Object(G.jsx)(S.a,{paragraph:!0,children:'Voit huoletta ottaa foliohatun pois p\xe4\xe4st\xe4. Kaikki "arkaluontoinen" data (salasanat, tilastot yms.) kulkevat https-yhteyden kautta.'}),Object(G.jsxs)(S.a,{paragraph:!0,children:["Koska sovellus jo toimitettiin Teille salaamattomana, on turha en\xe4\xe4 siirty\xe4",Object(G.jsx)("a",{href:"https://risbeegomfkerho-env.eba-bw33rqyj.us-east-2.elasticbeanstalk.com/",children:"\xa0salatulle sivulle\xa0"}),", varsinkin kun Risbeegomfkerho on niin k\xf6yh\xe4, ettei edes varmistettuun sertifikaattiin ole varaa."]})]}),Object(G.jsxs)("div",{children:[Object(G.jsx)(S.a,{variant:"h3",children:"Kirjaudu sis\xe4\xe4n"}),Object(G.jsx)(S.a,{paragraph:!0,children:"Sy\xf6t\xe4 tunnuksesi ja salasanasi alla oleviin kenttiin kirjautuaksesi sis\xe4\xe4n."}),Object(G.jsx)(je,{})]})]}),Object(G.jsxs)("div",{className:"wideContainer",children:[Object(G.jsx)(S.a,{variant:"h3",children:"Luo tunnuket"}),Object(G.jsx)(S.a,{paragraph:!0,children:"Luo tunnukset t\xe4ytt\xe4m\xe4ll\xe4 alla oleva lomake. S\xe4hk\xf6postiosoite ei ole pakollinen."}),Object(G.jsx)(S.a,{paragraph:!0,children:"Tunnukset eiv\xe4t ole k\xe4ytett\xe4viss\xe4 heti luomisen j\xe4lkeen, vaan jonkun t\xe4ytyy aktivoida ne ensin."}),Object(G.jsx)(ie,{})]})]})},be=a(599),he=a(600),Oe=a(601),xe=a(602),pe=a(597),me=a(598),ve=a(603),fe=function(){return Object(G.jsx)(te.a,{open:!0,children:Object(G.jsx)(ae.a,{size:100})})};var ge=function(e){var t=new Date(e.getTime()+60*e.getTimezoneOffset()*1e3),a=e.getTimezoneOffset()/60,n=e.getHours();return t.setHours(n-a),t},ke=function(e){var t=e.log,a=t.date,n=t.process,r=t.type,s=t.message,i=ge(new Date(+a));return Object(G.jsxs)(pe.a,{children:[Object(G.jsx)(me.a,{children:i.toLocaleString()}),Object(G.jsx)(me.a,{children:n}),Object(G.jsx)(me.a,{children:r}),Object(G.jsx)(me.a,{children:s})]})},ye=function(){var e=Object(A.a)(R),t=Object(O.useState)(null),a=Object(z.a)(t,2),n=a[0],r=a[1];return Object(O.useEffect)((function(){e.data&&!e.loading&&r(e.data.getLogs)}),[e]),n?Object(G.jsxs)(be.a,{children:[Object(G.jsx)(S.a,{variant:"h3",children:"Captain's log"}),Object(G.jsx)(he.a,{children:Object(G.jsxs)(Oe.a,{children:[Object(G.jsx)(xe.a,{children:Object(G.jsxs)(pe.a,{children:[Object(G.jsx)(me.a,{children:"P\xe4iv\xe4"}),Object(G.jsx)(me.a,{children:"Prosessi"}),Object(G.jsx)(me.a,{children:"Tyyppi"}),Object(G.jsx)(me.a,{children:"Viesti"})]})}),Object(G.jsx)(ve.a,{children:n.map((function(e,t){return Object(G.jsx)(ke,{log:e},e.date+t)}))})]})})]}):Object(G.jsx)(fe,{})},we=a(604),Se=a(605),Ce=a(606),Te=a(607),$e=a(210),Fe=a(589),Ie=a(203),ze=a.n(Ie),Ae=a(15),Pe=a.n(Ae),Ne=function(e){var t=e.children,a=e.rooli,n=X().me;return!n||""!==a&&n.rooli!==a?Object(G.jsx)(G.Fragment,{}):Object(G.jsx)(G.Fragment,{children:t})};Ne.defaultProps={rooli:""},Ne.propTypes={children:Pe.a.oneOfType([Pe.a.arrayOf(Pe.a.object),Pe.a.shape()]).isRequired,rooli:Pe.a.string};var qe=Ne,Be=function(e){var t=e.Wrap;return Object(G.jsxs)(G.Fragment,{children:[Object(G.jsx)(De,{to:"/",text:"Etusivu",Wrap:t}),Object(G.jsx)(De,{to:"/competitions",Wrap:t,text:"Kisat"}),Object(G.jsxs)(qe,{children:[Object(G.jsx)(De,{to:"/stats",Wrap:t,text:"Stats"}),Object(G.jsx)(De,{to:"/settings",Wrap:t,text:"Settings"}),Object(G.jsx)(De,{to:"/upload",Wrap:t,text:"Upload"}),Object(G.jsx)(De,{to:"/logs",Wrap:t,text:"Logs"})]})]})},De=function(e){var t=e.to,a=e.text,n=e.Wrap;return n?Object(G.jsx)(n,{children:Object(G.jsx)(f.c,{className:"navilinkki",to:t,children:a})}):Object(G.jsx)(f.c,{className:"navilinkki",to:t,children:a})};De.defaultProps={Wrap:null},Be.defaultProps={Wrap:null};var Me,Ee,Le,Ve=Be,He=function(){var e=Object(O.useState)(null),t=Object(z.a)(e,2),a=t[0],n=t[1],r=Boolean(a);return Object(G.jsx)(we.a,{position:"sticky",sx:{minHeight:{md:"100px"}},style:{justifyContent:"center"},children:Object(G.jsxs)(Se.a,{children:[Object(G.jsxs)(Ce.a,{sx:{display:{xs:"inline",md:"none"}},children:[Object(G.jsx)(Te.a,{edge:"start",color:"inherit","aria-label":"menu",sx:{mr:2},onClick:function(e){return n(e.currentTarget)},children:Object(G.jsx)(ze.a,{fontSize:"large"})}),Object(G.jsx)($e.a,{open:r,anchorEl:a,onClose:function(){return n(null)},children:Object(G.jsx)(Ve,{Wrap:Fe.a})})]}),Object(G.jsx)(Ce.a,{style:{flexGrow:1},children:Object(G.jsx)(S.a,{variant:"h3",component:"span",children:"Risbeegomfkerho"})}),Object(G.jsx)(Ce.a,{sx:{display:{xs:"none",md:"inline"}},children:Object(G.jsx)(Ve,{})})]})})},We=a(580),Re=a(608),Ue=a(609),Ke=a(610),Qe=a(592),Je=a(206),Ge=a.n(Je),_e=a(584),Xe=function(e,t){var a=t-e;return a>5?"red":a<=0?"green":"orange"},Ye=function(e){return e>=0?"+".concat(e):e},Ze=Object(_e.a)({latest:{color:function(e){var t=e.par,a=e.latest;return Xe(t,a)}},best:{color:function(e){var t=e.par,a=e.best;return Xe(t,a)}},avg:{color:function(e){var t=e.par,a=e.avg;return Xe(t,a)}}}),et=function(e){var t=e.data,a=Ze({par:t.par,latest:t.latest,best:t.min,avg:t.avg}),n=Object(O.useState)(!1),r=Object(z.a)(n,2),s=r[0],i=r[1];return Object(G.jsxs)(Re.a,{style:{marginBottom:"15px"},children:[Object(G.jsx)(Ue.a,{title:t.rata,subheader:t.layout,action:Object(G.jsx)(Te.a,{onClick:function(){return i(!s)},children:Object(G.jsx)(Ge.a,{fontSize:"large"})})}),Object(G.jsxs)(Ke.a,{children:[Object(G.jsx)(he.a,{children:Object(G.jsxs)(Oe.a,{className:"stats-table",children:[Object(G.jsx)(xe.a,{children:Object(G.jsxs)(pe.a,{children:[Object(G.jsx)(me.a,{children:"Radan par"}),Object(G.jsx)(me.a,{children:"Pelattuja pelej\xe4"}),Object(G.jsx)(me.a,{children:"KA"}),Object(G.jsx)(me.a,{children:"Paras"}),Object(G.jsx)(me.a,{children:"HC"})]})}),Object(G.jsx)(ve.a,{children:Object(G.jsxs)(pe.a,{children:[Object(G.jsx)(me.a,{children:t.par}),Object(G.jsx)(me.a,{children:t.games}),Object(G.jsx)(me.a,{className:a.avg,children:Ye(Math.round(10*(t.avg-t.par))/10)}),Object(G.jsx)(me.a,{className:a.best,children:Ye(t.min-t.par)}),Object(G.jsx)(me.a,{children:t.hc})]})})]})}),Object(G.jsxs)(Qe.a,{in:s,mountOnEnter:!1,children:[Object(G.jsx)(S.a,{variant:"h5",children:"10 viimeisint\xe4 kierrosta"}),t.tenLatestRounds.map((function(e,a){var n="".concat(t.rata).concat(t.layout).concat(a);return Object(G.jsx)("span",{className:"largeFont",style:{marginRight:"5%"},children:e-t.par},n)}))]})]})]})},tt=function(){var e=Object(A.a)(K),t=Object(O.useState)(""),a=Object(z.a)(t,2),n=a[0],r=a[1];return e.loading?Object(G.jsx)(fe,{}):e.data?Object(G.jsxs)("div",{className:"wideContainer wideContainerTop wideContainerSmallPadding",children:[Object(G.jsx)(S.a,{variant:"h2",children:"Ratadataa"}),e.data.getCourseStats.length>0?Object(G.jsx)("p",{children:"\xa0"}):Object(G.jsxs)(S.a,{paragraph:!0,children:["Ei n\xe4ytett\xe4v\xe4\xe4 dataa!? Tarkista, ett\xe4 olet lis\xe4nnyt\xa0",Object(G.jsx)(f.b,{to:"/settings/#alias",children:"aliaksia"})]}),Object(G.jsxs)(ne.a,{container:!0,spacing:5,alignItems:"center",children:[Object(G.jsx)(ne.a,{item:!0,children:"Suodata"}),Object(G.jsx)(ne.a,{item:!0,children:Object(G.jsx)(re.a,{label:"Radan nimi",value:n,onChange:function(e){return r(e.target.value)}})})]}),Object(G.jsx)(We.a,{}),e.data.getCourseStats.filter((function(e){return e.rata.includes(n)})).map((function(e){return Object(G.jsx)(et,{data:e},e.rata+e.layout)}))]}):Object(G.jsx)("div",{className:"div-error",children:"Ei dataa, olethan kirjautunut?"})},at=function(){var e=Object(P.a)(E),t=Object(z.a)(e,1)[0],a=Object(v.b)().enqueueSnackbar;return Object(G.jsxs)(be.a,{children:[Object(G.jsx)(S.a,{variant:"h2",children:"CSV-tiedoston l\xe4hetys"}),Object(G.jsx)(S.a,{paragraph:!0,children:"Valitse UDiscist\xe4 saatava csv-tiedosto ja paina l\xe4het\xe4-nappia"}),Object(G.jsxs)(S.a,{paragraph:!0,children:["Kun tiedosto on l\xe4hetetty, parsii palvelin sit\xe4 kasaan ja tunkee sen sittne tietokantaan. Etenemist\xe4 voi seurata\xa0",Object(G.jsx)(f.b,{to:"/logs",children:"kapteenin lokista"}),"."]}),Object(G.jsxs)("form",{encType:"multipart/form-data",onSubmit:function(e){e.preventDefault(),t({variables:{file:e.target.tiedosto.files[0]}}).then((function(){a("Tiedosto l\xe4hetetty!",{variant:"info"})})).catch((function(){a("Jokin meni vikaan :(",{variant:"error"})})),e.target.tiedosto.value=null},children:[Object(G.jsx)("input",{type:"file",name:"tiedosto",id:"raised-button-file",accept:".csv",style:{fontSize:"1.2rem"}}),Object(G.jsx)(S.a,{children:Object(G.jsx)(se.a,{variant:"contained",type:"submit",children:"L\xe4het\xe4 nappi"})})]})]})},nt=a(207),rt=a.n(nt),st=function(){var e=Object(O.useState)([]),t=Object(z.a)(e,2),a=t[0],n=t[1],r=Object(P.a)(H,{refetchQueries:[Q]}),s=Object(z.a)(r,1)[0],i=Object(P.a)(W,{refetchQueries:[Q]}),c=Object(z.a)(i,1)[0],l=Object(A.a)(Q);Object(O.useEffect)((function(){!l.loading&&l&&l.data&&n(l.data.getAliases)}),[l.data]);var j=function(){var e=Object(I.a)(F.a.mark((function e(t,a){var n;return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s({variables:{alias:t}});case 2:n=e.sent,a(n.data.addAlias);case 4:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),o=function(){var e=Object(I.a)(F.a.mark((function e(t,a){var n;return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c({variables:{aliasId:t}});case 2:n=e.sent,a(n.data.deleteAlias);case 4:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}();return{aliakset:a,addAlias:j,deleteAlias:o}},it=function(e){var t=e.alias,a=e.del;return Object(G.jsxs)(G.Fragment,{children:[Object(G.jsx)(ne.a,{item:!0,xs:4,children:t.alias}),Object(G.jsx)(ne.a,{item:!0,xs:8,children:Object(G.jsx)(Te.a,{onClick:function(){return a(t.id)},children:Object(G.jsx)(rt.a,{color:"error"})})})]})},ct=function(){var e=st(),t=e.aliakset,a=e.addAlias,n=e.deleteAlias,r=Object(v.b)().enqueueSnackbar,s=function(){var e=Object(I.a)(F.a.mark((function e(t){return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,a(t.target.alias.value,(function(){r("Alias lis\xe4tty!",{variant:"success"})}));case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(1),r("Aliasta ei lis\xe4tty (".concat(e.t0.message,")"),{variant:"error"});case 9:t.target.alias.value="";case 10:case"end":return e.stop()}}),e,null,[[1,6]])})));return function(t){return e.apply(this,arguments)}}(),i=function(){var e=Object(I.a)(F.a.mark((function e(t){return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n(+t,(function(e){!0===e?r("Alias poistettu!",{variant:"success"}):r("Aliasta ei poistettu :P",{variant:"warning"})}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return t?Object(G.jsxs)("div",{children:[Object(G.jsx)("h2",{children:"Aliaksesi"}),Object(G.jsx)(ne.a,{container:!0,alignItems:"center",width:"600px",children:t.map((function(e){return Object(G.jsx)(it,{alias:e,del:i},e.id)}))}),Object(G.jsx)("h3",{children:"Lis\xe4\xe4 alias"}),Object(G.jsxs)("form",{onSubmit:s,children:[Object(G.jsx)(re.a,{name:"alias",placeholder:"Lis\xe4\xe4 alias",size:"small"}),"\xa0",Object(G.jsx)(se.a,{type:"submit",variant:"contained",children:"Lis\xe4\xe4"})]})]}):Object(G.jsx)("div",{children:"Loading..."})},lt=Object(q.d)(Me||(Me=Object(N.a)(["\nquery {\n  getCompetitions {\n    game\n    paivays\n    name\n    layout\n    playerName\n    total\n    hc\n    par\n  }\n}\n"]))),jt=Object(q.d)(Ee||(Ee=Object(N.a)(["\nquery {\n  getUsers (active: false) {\n    id\n    name\n    email\n  }\n}\n"]))),ot=Object(q.d)(Le||(Le=Object(N.a)(["\nquery {\n  getSetup {\n    ignoreHcBefore\n    ignoreMatchBefore\n    minPlayersForHc\n    minPlayersForMatch\n  }\n}\n"]))),ut=function(){var e=Object(O.useState)({}),t=Object(z.a)(e,2),a=t[0],n=t[1],r=Object(A.a)(ot),s=Object(P.a)(M),i=Object(z.a)(s,1)[0];Object(O.useEffect)((function(){r&&!r.loading&&n(r.data.getSetup)}),[r]);return{setup:a,setSetup:n,saveSetup:function(){return i({variables:a})}}},dt=function(){var e=Object(O.useState)([]),t=Object(z.a)(e,2),a=t[0],n=t[1],r=Object(A.a)(jt),s=Object(P.a)(D,{refetchQueries:[jt]}),i=Object(z.a)(s,1)[0],c=Object(v.b)().enqueueSnackbar;Object(O.useEffect)((function(){(null===r||void 0===r?void 0:r.data)&&!r.loading&&n(r.data.getUsers)}));var l=function(){var e=Object(I.a)(F.a.mark((function e(t){return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,i({variables:{userId:t}});case 3:c("Tunnus ".concat(t," aktivoitu!"),{variant:"success"}),e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),c("Tunnusta ".concat(t," ei aktivoitu (").concat(e.t0.message,")"),{variant:"error"});case 9:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(t){return e.apply(this,arguments)}}();return a.map((function(e){return Object(G.jsxs)(ne.a,{container:!0,sx:{width:{md:"50%",xs:"100%"},marginBottom:"10px"},children:[Object(G.jsx)(ne.a,{item:!0,xs:6,children:e.name}),Object(G.jsx)(ne.a,{item:!0,xs:6,children:Object(G.jsx)(se.a,{onClick:function(){return l(e.id)},children:"Aktivoi"})})]},e.id)}))},bt=function(){var e=ut(),t=e.setup,a=e.setSetup,n=e.saveSetup,r=Object(v.b)().enqueueSnackbar,s=function(e){var n=e.target.value;"number"===typeof t[e.target.name]&&(n=+n),a(Object(ee.a)(Object(ee.a)({},t),{},Object(Z.a)({},e.target.name,n)))};return Object(G.jsxs)(G.Fragment,{children:[Object(G.jsx)(S.a,{variant:"h3",children:"Lis\xe4asetukset"}),Object(G.jsx)(S.a,{variant:"h4",children:"Ei-aktivoidut k\xe4ytt\xe4j\xe4t"}),Object(G.jsx)(dt,{}),Object(G.jsx)(S.a,{variant:"h4",children:"Kisa-asetukset"}),Object(G.jsxs)(ne.a,{container:!0,spacing:2,children:[Object.keys(t).map((function(e){return e.startsWith("__")?"":Object(G.jsx)(ne.a,{item:!0,xs:12,md:6,children:Object(G.jsx)(re.a,{name:e,value:t[e],label:e,onChange:s,style:{width:"80%"}})},e)})),Object(G.jsx)(ne.a,{item:!0,xs:12,children:Object(G.jsx)(se.a,{type:"submit",onClick:function(){n().then((function(){r("Asetukset tallennettiin onnistuneesti",{variant:"success"})})).catch((function(){r("Virhe asetuksia tallennettaessa",{variant:"error"})}))},children:"Tallenna"})})]})]})},ht=function(){var e=J(!0),t=e.me,a=e.update,n=Object(v.b)().enqueueSnackbar;return t?Object(G.jsxs)(be.a,{children:[Object(G.jsx)(S.a,{variant:"h3",gutterBottom:!0,children:"Asetukset"}),Object(G.jsxs)(ne.a,{container:!0,spacing:2,justifyContent:"flex-start",alignItems:"center",sx:{width:{xs:"100%",md:"50%"}},children:[Object(G.jsx)(ne.a,{item:!0,xs:6,children:"Tunnus"}),Object(G.jsx)(ne.a,{item:!0,xs:6,children:t.name}),Object(G.jsx)(ne.a,{item:!0,xs:6,children:"S\xe4hk\xf6posti"}),Object(G.jsx)(ne.a,{item:!0,xs:6,children:t.email||"Ei asetettu"})]}),Object(G.jsx)(We.a,{}),Object(G.jsx)(S.a,{variant:"h4",gutterBottom:!0,children:"Vaihda email"}),Object(G.jsxs)("form",{onSubmit:function(e){e.preventDefault(),a({email:e.target.email.value}).then((function(){n("S\xe4hk\xf6posti vaihdettu!",{variant:"success"})})).catch((function(e){n("Virhe s\xe4hk\xf6postia vaihtaessa! (".concat(e,")"),{variant:"error"})})),e.target.email.value=""},children:[Object(G.jsx)(re.a,{name:"email",label:"Uusi s\xe4hk\xf6postiosoite"}),"\xa0",Object(G.jsx)(se.a,{variant:"contained",type:"submit",children:"Vaihda"})]}),Object(G.jsx)(We.a,{}),Object(G.jsxs)("form",{onSubmit:function(e){e.preventDefault();var t=e.target,r=t.salasana1,s=t.salasana2;r.value!==s.value?n("Salasanat eiv\xe4t t\xe4sm\xe4\xe4!",{variant:"error"}):a({password:r.value}).then((function(){n("Salasana vaihdettu",{variant:"info"})})).catch((function(){n("Virhe salasanaa vaihtaessa!",{variant:"error"})})),r.value="",s.value=""},children:[Object(G.jsx)(S.a,{variant:"h4",gutterBottom:!0,children:"Vaihda salasana"}),Object(G.jsxs)(ne.a,{container:!0,spacing:2,children:[Object(G.jsx)(ne.a,{item:!0,xs:12,children:Object(G.jsx)(re.a,{name:"salasana1",type:"password",label:"Uusi salasana"})}),Object(G.jsx)(ne.a,{item:!0,xs:12,children:Object(G.jsx)(re.a,{name:"salasana2",type:"password",label:"Vahvista salasana"})}),Object(G.jsx)(ne.a,{item:!0,xs:12,children:Object(G.jsx)(se.a,{type:"submit",variant:"contained",children:"Vaihda"})})]})]}),Object(G.jsx)(We.a,{}),Object(G.jsx)(S.a,{variant:"h4",gutterBottom:!0,children:"Aliakset"}),Object(G.jsx)(S.a,{paragraph:!0,children:"Aliakset yhdist\xe4v\xe4t csv-tiedostossa olevat pelaajat tunnuksiin."}),Object(G.jsx)(ct,{}),Object(G.jsx)(We.a,{}),Object(G.jsx)(qe,{rooli:"admin",children:Object(G.jsx)(bt,{})})]}):Object(G.jsx)(fe,{})};var Ot=function(){var e=Object(A.a)(lt),t=Object(O.useState)(null),a=Object(z.a)(t,2),n=a[0],r=a[1];return Object(O.useEffect)((function(){if(e&&!e.loading){var t=e.data.getCompetitions;t=(t=function(e){return e.reduce((function(e,t){var a=e.find((function(e){return e.gameId===t.game}));return a||(a={gameId:t.game,date:new Date(+t.paivays).toLocaleString(),course:{name:t.name,layout:t.layout,par:t.par},players:[]},e.push(a)),a.players.push({name:t.playerName,total:t.total,plusminus:t.total-t.par,hc:t.hc,hcTotal:t.total-t.hc,hcPlusminus:t.total-t.hc-t.par}),e}),[])}(t)).map((function(e){return function(e){var t=e.players;t.sort((function(e,t){return e.hcTotal-t.hcTotal}));var a=1,n=t.map((function(e,n){return 0===n?Object(ee.a)(Object(ee.a)({},e),{},{rank:1,points:5}):(e.hcTotal>t[n-1].hcTotal&&(a+=1),Object(ee.a)(Object(ee.a)({},e),{},{rank:a,points:a<=5?6-a:0}))}));return Object(ee.a)(Object(ee.a)({},e),{},{players:n})}(e)})),r(t)}}),[e]),n},xt=function(e){var t=e.competition,a=t.course,n=t.date,r=t.players,s=t.gameId;return Object(G.jsxs)(Re.a,{style:{marginBottom:"20px"},children:[Object(G.jsx)(Ue.a,{title:a.name,subheader:"".concat(n," @ ").concat(a.layout)}),Object(G.jsx)(Ke.a,{children:Object(G.jsx)(he.a,{children:Object(G.jsxs)(Oe.a,{className:"kisataulu",children:[Object(G.jsx)(xe.a,{children:Object(G.jsxs)(pe.a,{children:[Object(G.jsx)(me.a,{children:"Rank"}),Object(G.jsx)(me.a,{children:"Nimi"}),Object(G.jsx)(me.a,{children:"Total"}),Object(G.jsx)(me.a,{children:"+/-"}),Object(G.jsx)(me.a,{children:"HC"}),Object(G.jsx)(me.a,{children:"HC +/-"}),Object(G.jsx)(me.a,{children:"HC total"}),Object(G.jsx)(me.a,{children:"Points"})]})}),Object(G.jsx)(ve.a,{children:r.map((function(e){return Object(G.jsxs)(pe.a,{children:[Object(G.jsx)(me.a,{children:e.rank}),Object(G.jsx)(me.a,{children:e.name}),Object(G.jsx)(me.a,{children:e.total}),Object(G.jsx)(me.a,{children:e.plusminus}),Object(G.jsx)(me.a,{children:e.hc}),Object(G.jsx)(me.a,{children:e.hcPlusminus}),Object(G.jsx)(me.a,{children:e.hcTotal}),Object(G.jsx)(me.a,{children:e.points})]},s+e.name)}))})]})})})]})},pt=function(){var e=Ot();return e?Object(G.jsxs)(be.a,{children:[Object(G.jsx)(S.a,{variant:"h3",children:"Kilpailut"}),e.length<1&&Object(G.jsx)(S.a,{paragraph:!0,children:"Ei yht\xe4\xe4n kilpailua? Erotkaa ryhm\xe4st\xe4 v\xe4litt\xf6m\xe4sti!"}),e.map((function(e){return Object(G.jsx)(xt,{competition:e},e.gameId)}))]}):Object(G.jsx)(fe,{})};var mt=function(){return Object(G.jsxs)(Y,{children:[Object(G.jsx)(He,{}),Object(G.jsxs)(k.c,{children:[Object(G.jsx)(k.a,{path:"/",element:Object(G.jsx)(de,{})}),Object(G.jsx)(k.a,{path:"/competitions",element:Object(G.jsx)(pt,{})}),Object(G.jsx)(k.a,{path:"/stats",element:Object(G.jsx)(tt,{})}),Object(G.jsx)(k.a,{path:"/upload",element:Object(G.jsx)(at,{})}),Object(G.jsx)(k.a,{path:"/settings",element:Object(G.jsx)(ht,{})}),Object(G.jsx)(k.a,{path:"/logs",element:Object(G.jsx)(ye,{})})]}),Object(G.jsx)(w.a,{options:{particles:{color:{value:"#5f5f5f"},size:{random:!0,value:3},move:{enable:!0},zIndex:1e4},interactivity:{events:{onHover:{enable:!0,mode:"repulse"}}}}})]})},vt=a(155),ft=a(586),gt=a(581),kt=a.n(gt),yt=a(208),wt=Object(yt.a)((function(e,t){var a=t.headers,n=window.sessionStorage.getItem("suklaaJuna");return{headers:Object(ee.a)(Object(ee.a)({},a),{},{authorization:n})}})),St=new vt.a({cache:new ft.a,link:wt.concat(kt()({uri:"https://risbeegomfkerho-env.eba-bw33rqyj.us-east-2.elasticbeanstalk.com/graphql",credentials:"include"}))}),Ct=a(211),Tt="@media screen and (min-width: 900px)",$t=Object(Ct.a)({typography:{fontFamily:"Quicksand"},palette:{mode:"dark",primary:{main:"#34568B"}},components:{MuiCard:{styleOverrides:{root:{borderRadius:"15px",paddingLeft:"10px"}}},MuiCardHeader:{styleOverrides:{title:Object(Z.a)({},Tt,{fontSize:"1.7vw",margin:"0px"}),subheader:{margin:"0px"}}},MuiGrid:{styleOverrides:{root:Object(Z.a)({},Tt,{fontSize:"1.2rem"})}},MuiTextField:{styleOverrides:{root:{}},defaultProps:{color:"info"}},MuiTypography:{styleOverrides:{root:{margin:"10px 0px"},paragraph:Object(Z.a)({margin:"4rem 0px",fontSize:"1.2em"},Tt,{fontSize:"1.2vw"}),h1:Object(Z.a)({fontSize:"2.5rem"},Tt,{fontSize:"4vw"}),h2:Object(Z.a)({fontSize:"2.3rem"},Tt,{fontSize:"3vw"}),h3:Object(Z.a)({fontSize:"1.6rem"},Tt,{fontSize:"2vw"})}},MuiButton:{defaultProps:{variant:"contained"}},MuiDivider:{styleOverrides:{root:{margin:"20px 0px"}}},MuiTableCell:{styleOverrides:{root:Object(Z.a)({fontSize:".6em"},Tt,{fontSize:"1.2em"})}}}});p.a.render(Object(G.jsx)(m.a,{client:St,children:Object(G.jsx)(v.a,{maxSnack:5,children:Object(G.jsx)(g.a,{theme:$t,children:Object(G.jsx)(f.a,{children:Object(G.jsx)(mt,{})})})})}),document.getElementById("root"))}},[[521,1,2]]]);
//# sourceMappingURL=main.1f878488.chunk.js.map