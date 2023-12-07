"use strict";(self.webpackChunkdocs_openc3_com=self.webpackChunkdocs_openc3_com||[]).push([[461],{362:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>r,contentTitle:()=>l,default:()=>d,frontMatter:()=>i,metadata:()=>a,toc:()=>c});var s=t(5893),o=t(1151);const i={title:"Host Install"},l=void 0,a={id:"development/host-install",title:"Host Install",description:"Installing COSMOS Directly onto a Host (No Containers)",source:"@site/docs/development/host-install.md",sourceDirName:"development",slug:"/development/host-install",permalink:"/docs/development/host-install",draft:!1,unlisted:!1,editUrl:"https://github.com/OpenC3/cosmos/tree/main/docs.openc3.com/docs/development/host-install.md",tags:[],version:"current",frontMatter:{title:"Host Install"},sidebar:"defaultSidebar",previous:{title:"Developing COSMOS",permalink:"/docs/development/developing"},next:{title:"JSON API",permalink:"/docs/development/json-api"}},r={},c=[{value:"Installing COSMOS Directly onto a Host (No Containers)",id:"installing-cosmos-directly-onto-a-host-no-containers",level:2}];function h(n){const e={a:"a",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",...(0,o.a)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.h2,{id:"installing-cosmos-directly-onto-a-host-no-containers",children:"Installing COSMOS Directly onto a Host (No Containers)"}),"\n",(0,s.jsx)(e.p,{children:"Note: THIS IS NOT A RECOMMENDED CONFIGURATION."}),"\n",(0,s.jsx)(e.p,{children:"COSMOS 5 is released as containers and intended to be run as containers. However, for various reasons someone might want to run COSMOS directly on a host. These instructions will walk through getting COSMOS 5 installed and running directly on RHEL 7 or Centos 7. This configuration will create a working install, but falls short of the ideal in that it does not setup the COSMOS processes as proper services on the host OS (that restart themselves on boot, and maintain themselves running in case of errors). Contributions that add that functionality are welcome."}),"\n",(0,s.jsx)(e.p,{children:"Let's get started."}),"\n",(0,s.jsxs)(e.ol,{children:["\n",(0,s.jsxs)(e.li,{children:["\n",(0,s.jsx)(e.p,{children:"The starting assumption is that you have a fresh install of either RHEL 7 or Centos 7. You are running as a normal user that has sudo permissions, and has git installed."}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\n",(0,s.jsx)(e.p,{children:"Start by downloading the latest working version of COSMOS from Github"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"cd ~\ngit clone https://github.com/openc3/cosmos.git\n"})}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\n",(0,s.jsx)(e.p,{children:"Run the COSMOS installation script"}),"\n",(0,s.jsx)(e.p,{children:"If you are feeling brave, you can run the one large installer script that installs everything in one step:"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"cd cosmos/examples/hostinstall/centos7\n./openc3_install.sh\n"})}),"\n",(0,s.jsx)(e.p,{children:"Or, you may want to break it down to the same steps that are in that script, and make sure each individual step is successful:"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"cd cosmos/examples/hostinstall/centos7\n./openc3_install_packages.sh\n./openc3_install_ruby.sh\n./openc3_install_redis.sh\n./openc3_install_minio.sh\n./openc3_install_traefik.sh\n./openc3_install_openc3.sh\n./openc3_start_services.sh\n./openc3_first_init.sh\n"})}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\n",(0,s.jsxs)(e.p,{children:["If all was successful, you should be able to open Firefox, and goto: ",(0,s.jsx)(e.a,{href:"http://localhost:2900",children:"http://localhost:2900"}),". Congrats you have COSMOS running directly on a host."]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\n",(0,s.jsx)(e.p,{children:"As stated at the beginning, this is not currently a supported configuration. Contributions that help to improve it are welcome."}),"\n"]}),"\n"]})]})}function d(n={}){const{wrapper:e}={...(0,o.a)(),...n.components};return e?(0,s.jsx)(e,{...n,children:(0,s.jsx)(h,{...n})}):h(n)}},1151:(n,e,t)=>{t.d(e,{Z:()=>a,a:()=>l});var s=t(7294);const o={},i=s.createContext(o);function l(n){const e=s.useContext(i);return s.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function a(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(o):n.components||o:l(n.components),s.createElement(i.Provider,{value:e},n.children)}}}]);