"use strict";(self.webpackChunknewdocs_openc_3_com=self.webpackChunknewdocs_openc_3_com||[]).push([[5689],{3905:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>h});var n=a(7294);function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){o(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,n,o=function(e,t){if(null==e)return{};var a,n,o={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(o[a]=e[a]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}var l=n.createContext({}),p=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):s(s({},t),e)),a},c=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},m="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var a=e.components,o=e.mdxType,r=e.originalType,l=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),m=p(a),u=o,h=m["".concat(l,".").concat(u)]||m[u]||d[u]||r;return a?n.createElement(h,s(s({ref:t},c),{},{components:a})):n.createElement(h,s({ref:t},c))}));function h(e,t){var a=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=a.length,s=new Array(r);s[0]=u;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[m]="string"==typeof e?e:o,s[1]=i;for(var p=2;p<r;p++)s[p]=a[p];return n.createElement.apply(null,s)}return n.createElement.apply(null,a)}u.displayName="MDXCreateElement"},6919:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>d,frontMatter:()=>r,metadata:()=>i,toc:()=>p});var n=a(7462),o=(a(7294),a(3905));const r={sidebar_position:5,title:"Podman"},s=void 0,i={unversionedId:"getting-started/podman",id:"getting-started/podman",title:"Podman",description:"OpenC3 COSMOS Using Rootless Podman and Docker-Compose",source:"@site/docs/getting-started/podman.md",sourceDirName:"getting-started",slug:"/getting-started/podman",permalink:"/docs/getting-started/podman",draft:!1,editUrl:"https://github.com/OpenC3/cosmos/tree/main/docs.openc3.com/docs/getting-started/podman.md",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5,title:"Podman"},sidebar:"defaultSidebar",previous:{title:"Requirements and Design",permalink:"/docs/getting-started/requirements"},next:{title:"Configuration",permalink:"/docs/configuration"}},l={},p=[{value:"OpenC3 COSMOS Using Rootless Podman and Docker-Compose",id:"openc3-cosmos-using-rootless-podman-and-docker-compose",level:3},{value:"MacOS Instructions",id:"macos-instructions",level:2}],c={toc:p},m="wrapper";function d(e){let{components:t,...a}=e;return(0,o.kt)(m,(0,n.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h3",{id:"openc3-cosmos-using-rootless-podman-and-docker-compose"},"OpenC3 COSMOS Using Rootless Podman and Docker-Compose"),(0,o.kt)("admonition",{title:"Optional Installation Option",type:"info"},(0,o.kt)("p",{parentName:"admonition"},"These directions are for installing and running COSMOS using Podman instead of Docker. If you have Docker available, that is a simpler method.")),(0,o.kt)("p",null,"Podman is an alternative container technology to Docker that is actively promoted by RedHat. The key benefit is that Podman can run without a root-level daemon service, making it significantly more secure by design, over standard Docker. However, it is a little more complicated to use. These directions will get you up and running with Podman. The following directions have been tested against RHEL 8.8, and RHEL 9.2, but should be similar on other operating systems."),(0,o.kt)("admonition",{title:"Rootless Podman Does Not Work (Directly) with NFS Home Directories",type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"NFS does not work for holding container storage due to issues with user ids and group ids. There are workarounds available but they all involve moving container storage to another location: either a different partition on the host local disk, or into a special mounted disk image. See: ","[https://www.redhat.com/sysadmin/rootless-podman-nfs]",(0,o.kt)("a",{parentName:"p",href:"https://www.redhat.com/sysadmin/rootless-podman-nfs"},"https://www.redhat.com/sysadmin/rootless-podman-nfs"),"). Note that there is also a newish Podman setting that allows you to more easily change where the storage location is in /etc/containers/storage.conf called rootless_storage_path. See ",(0,o.kt)("a",{parentName:"p",href:"https://www.redhat.com/sysadmin/nfs-rootless-podman"},"https://www.redhat.com/sysadmin/nfs-rootless-podman"))),(0,o.kt)("h1",{id:"redhat-88-and-92-instructions"},"Redhat 8.8 and 9.2 Instructions"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Install Prerequisite Packages"),(0,o.kt)("p",{parentName:"li"},"Note: This downloads and installs docker-compose from the latest 2.x release on Github. If your operating system has a docker-compose package, it will be easier to install using that instead. RHEL8 does not have a docker-compose package."),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"sudo yum update\nsudo yum install git podman-docker netavark\ncurl -SL https://github.com/docker/compose/releases/download/v2.16.0/docker-compose-linux-x86_64 -o docker-compose\nsudo mv docker-compose /usr/local/bin/docker-compose\nsudo chmod +x /usr/local/bin/docker-compose\nsudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose\n"))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Configure Host OS for Redis"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"sudo su\necho never > /sys/kernel/mm/transparent_hugepage/enabled\necho never > /sys/kernel/mm/transparent_hugepage/defrag\nsysctl -w vm.max_map_count=262144\nexit\n"))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Configure Podman to use Netavark for DNS"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"sudo cp /usr/share/containers/containers.conf /etc/containers/.\nsudo vi /etc/containers/containers.conf\n")),(0,o.kt)("p",{parentName:"li"},'Then edit the network_backend line to be "netavark" instead of "cni"')),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Start rootless podman socket service"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"systemctl enable --now --user podman.socket\n"))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Put the following into your .bashrc file (or .bash_profile or whatever)"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},'export DOCKER_HOST="unix://$XDG_RUNTIME_DIR/podman/podman.sock"\n'))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Source the profile file for your current terminal"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"source .bashrc\n"))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Get COSMOS - A release or the current main branch (main branch shown)"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"git clone https://github.com/OpenC3/cosmos.git\n"))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Optional - Set Default Container Registry"),(0,o.kt)("p",{parentName:"li"},"If you don't want podman to keep querying you for which registry to use, you can create a $HOME/.config/containers/registries.conf and modify to just have the main docker registry (or modify the /etc/containers/registries.conf file directly)"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"mkdir -p $HOME/.config/containers\ncp /etc/containers/registries.conf $HOME/.config/containers/.\nvi $HOME/.config/containers/registries.conf\n")),(0,o.kt)("p",{parentName:"li"},"Then edit the unqualified-search-registries = line to just have the registry you care about (probably docker.io)")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Edit cosmos/compose.yaml"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"cd cosmos\nvi compose.yaml\n")),(0,o.kt)("p",{parentName:"li"},'Edit compose.yaml and uncomment the user: 0:0 lines and comment the user: "${OPENC3_USER_ID}:${OPENC3_GROUP_ID}" lines.\nYou may also want to update the traefik configuration to allow access from the internet by removing 127.0.0.1 and probably switching to either an SSL config file, or the allow http one. Also make sure your firewall allows\nwhatever port you choose to use in. Rootless podman will need to use a higher numbered port (not 1-1023).')),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Run COSMOS"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"./openc3.sh run\n"))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Wait until everything is built and running and then goto http://localhost:2900 in your browser"))),(0,o.kt)("admonition",{title:"Podman on MacOS",type:"info"},(0,o.kt)("p",{parentName:"admonition"},"Podman can also be used on MacOS, though we still generally recommend Docker Desktop")),(0,o.kt)("h2",{id:"macos-instructions"},"MacOS Instructions"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Install podman"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"brew install podman\n"))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Start the podman virtual machine"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"podman machine init\npodman machine start\n# Note: update to your username in the next line or copy paste from what 'podman machine start' says\nexport DOCKER_HOST='unix:///Users/ryanmelt/.local/share/containers/podman/machine/qemu/podman.sock'\n"))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Install docker-compose"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"brew install docker-compose # Optional if you already have Docker Desktop\n"))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Edit cosmos/compose.yaml"),(0,o.kt)("p",{parentName:"li"},'Edit compose.yaml and uncomment the user: 0:0 lines and comment the user: "${OPENC3_USER_ID}:${OPENC3_GROUP_ID}" lines.'),(0,o.kt)("p",{parentName:"li"},"Important: on MacOS you must also remove all :z from the volume mount lines"),(0,o.kt)("p",{parentName:"li"},"You may also want to update the traefik configuration to allow access from the internet.")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Run COSMOS"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"cd cosmos\n./openc3.sh run\n")))))}d.isMDXComponent=!0}}]);