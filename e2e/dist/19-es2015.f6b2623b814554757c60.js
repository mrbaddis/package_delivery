(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{"+P1L":function(e,t,r){"use strict";r.r(t),r.d(t,"UsersModule",(function(){return v}));var i=r("ofXK"),n=r("tyNb"),s=r("mrSG"),a=r("D/fu"),o=r("RS3s"),c=r("lJxs"),l=r("H/qo"),d=r("6j+Z"),u=r("UgA8"),m=r("fXoL"),f=r("aceb");function h(e,t){if(1&e){const e=m["\u0275\u0275getCurrentView"]();m["\u0275\u0275elementStart"](0,"ng2-smart-table",6),m["\u0275\u0275listener"]("userRowSelect",(function(t){return m["\u0275\u0275restoreView"](e),m["\u0275\u0275nextContext"]().viewCustomer(t)}))("deleteConfirm",(function(t){return m["\u0275\u0275restoreView"](e),m["\u0275\u0275nextContext"]().onDeleteConfirm(t)}))("createConfirm",(function(t){return m["\u0275\u0275restoreView"](e),m["\u0275\u0275nextContext"]().onCreateConfirm(t)})),m["\u0275\u0275elementEnd"]()}if(2&e){const e=m["\u0275\u0275nextContext"]();m["\u0275\u0275property"]("settings",e.settings)("source",e.source)}}const p=[{path:"",component:(()=>{class e{constructor(e,t,r,i,n,s){this.usersApi=e,this.router=t,this.toast=r,this.roleMapping=i,this.roleApi=n,this.courierService=s,this.settings={add:{inputClass:"text-black",confirmCreate:!0,addButtonContent:'<i class="nb-plus"></i>',createButtonContent:'<i class="nb-checkmark"></i>',cancelButtonContent:'<i class="nb-close"></i>'},edit:{editButtonContent:'<i class="nb-edit"></i>',saveButtonContent:'<i class="nb-checkmark"></i>',cancelButtonContent:'<i class="nb-close"></i>'},actions:{edit:!1,position:"right"},delete:{deleteButtonContent:'<i class="nb-trash"></i>',confirmDelete:!0},columns:{id:{title:"Id",width:"0px",type:"number",filter:!1,editable:!1,addable:!1},role:{title:"Role",type:"string",filter:!1,editor:{type:"list",config:{list:[]}}},name:{title:"Name",type:"string",filter:!1},email:{title:"E-mail",type:"string",filter:!1},phoneNumber:{title:"Phone Number",type:"string",filter:!1}}},this.userListReady=!1,this.userRolesReady=!1,this.source=new o.b}ngOnInit(){this.getUsers(),this.getRoles()}resetSearch(e){(!e||e<=2)&&this.source.setFilter([])}onSearch(e=""){e.length<2||this.source.setFilter([{field:"name",search:e},{field:"mailboxNumber",search:e},{field:"email",search:e}],!1)}pad(e,t=5){let r=""+e;for(;r.length<t;)r="0"+r;return r}getRoles(){this.roleApi.find().pipe(Object(c.a)(e=>e.map(e=>({value:e.id,title:e.name})))).subscribe(e=>{this.userRolesReady=!0,this.settings.columns.role.editor.config.list=e})}getUsers(){this.usersApi.getAdministrators(this.courierService.getRealm()).pipe(Object(c.a)(e=>e.map(e=>({id:e.id,name:`${e.firstName} ${e.lastName}`,email:e.email,phoneNumber:e.contactInformation.mobilePhone,role:e.roles.length>0?e.roles[0].name:""})))).subscribe(e=>{this.userListReady=!0,this.source=new o.b(e)},e=>{this.toast.danger("Oops, something unexpected happened "+e.message,"Failed")})}viewCustomer(e){this.router.navigate(["/pages/customers",e.data.id])}onDeleteConfirm(e){window.confirm("Are you sure you want to revoke admin access for this user?")?this.roleMapping.findOne({where:{principalId:e.data.id}}).subscribe(t=>{this.roleMapping.deleteById(t.id).subscribe(t=>{this.toast.success("User access revoked","Success"),this.getUsers(),e.confirm.resolve()},t=>{this.toast.danger("Failed to delete user role "+t.message,"Failed"),e.confirm.reject()})},t=>{this.toast.danger("Failed to find user role "+t.message,"Failed"),e.confirm.reject()}):e.confirm.reject()}onCreateConfirm(e){return Object(s.a)(this,void 0,void 0,(function*(){if(!e.newData.name)return this.toast.danger("First name is required","Add Customer Failed"),void e.confirm.reject();if(!e.newData.email)return this.toast.danger("Email name is required","Add Customer Failed"),void e.confirm.reject();if(!l.validate(e.newData.email))return this.toast.danger("Email name is invalid","Add Customer Failed"),void e.confirm.reject();if(!e.newData.phoneNumber)return this.toast.danger("Phone number is invalid","Add Customer Failed"),void e.confirm.reject();let t;try{t=yield this.usersApi.findOne({where:{email:e.newData.email}}).toPromise()}catch(r){t=null}t?this.roleMapping.create({principalType:"USER",principalId:t.id,roleId:e.newData.role}).subscribe(t=>{this.toast.success("User was added to the team","Success!"),e.confirm.resolve()},t=>{this.toast.danger("Failed to assign user role","Failed!"),e.confirm.resolve()}):this.usersApi.create({email:e.newData.email,password:Math.random().toString(36).substr(2,11),realm:this.courierService.getRealm()}).subscribe(t=>{this.usersApi.patchAttributes(t.id,{firstName:e.newData.name.substr(0,e.newData.name.indexOf(" ")),lastName:e.newData.name.substr(e.newData.name.indexOf(" "),e.newData.name.length),contactInformation:{mobilePhone:e.newData.phoneNumber}}).subscribe(r=>{this.roleMapping.create({principalType:"USER",principalId:t.id,roleId:e.newData.role}).subscribe(t=>{this.toast.success("User successfully created and assigned to the team","Success!"),e.confirm.resolve()},t=>{this.toast.danger("Failed to assign user role","Failed!"),e.confirm.resolve()})},t=>{this.toast.danger("Failed to update user profile "+t.mesage,"Failed!"),e.confirm.reject()})},t=>{this.toast.danger("Failed to create user "+t.message,"Failed!"),e.confirm.reject()})}))}}return e.\u0275fac=function(t){return new(t||e)(m["\u0275\u0275directiveInject"](a.e),m["\u0275\u0275directiveInject"](n.c),m["\u0275\u0275directiveInject"](f.mb),m["\u0275\u0275directiveInject"](a.n),m["\u0275\u0275directiveInject"](d.a),m["\u0275\u0275directiveInject"](u.a))},e.\u0275cmp=m["\u0275\u0275defineComponent"]({type:e,selectors:[["ngx-users"]],decls:10,vars:1,consts:[[1,"search"],["placeholder","Search... Enter 3 or more characters","type","text","nbInput","",3,"input","keydown.enter"],["search",""],["nbSuffix","","nbButton","","ghost","",3,"click"],["icon","search-outline","pack","eva"],[3,"settings","source","userRowSelect","deleteConfirm","createConfirm",4,"ngIf"],[3,"settings","source","userRowSelect","deleteConfirm","createConfirm"]],template:function(e,t){if(1&e){const e=m["\u0275\u0275getCurrentView"]();m["\u0275\u0275elementStart"](0,"nb-card"),m["\u0275\u0275elementStart"](1,"nb-card-header"),m["\u0275\u0275text"](2," System Users "),m["\u0275\u0275elementEnd"](),m["\u0275\u0275elementStart"](3,"nb-card-body"),m["\u0275\u0275elementStart"](4,"nb-form-field",0),m["\u0275\u0275elementStart"](5,"input",1,2),m["\u0275\u0275listener"]("input",(function(){m["\u0275\u0275restoreView"](e);const r=m["\u0275\u0275reference"](6);return t.resetSearch(r.value.length)}))("keydown.enter",(function(){m["\u0275\u0275restoreView"](e);const r=m["\u0275\u0275reference"](6);return t.onSearch(r.value)})),m["\u0275\u0275elementEnd"](),m["\u0275\u0275elementStart"](7,"button",3),m["\u0275\u0275listener"]("click",(function(){m["\u0275\u0275restoreView"](e);const r=m["\u0275\u0275reference"](6);return t.onSearch(r.value)})),m["\u0275\u0275element"](8,"nb-icon",4),m["\u0275\u0275elementEnd"](),m["\u0275\u0275elementEnd"](),m["\u0275\u0275template"](9,h,1,2,"ng2-smart-table",5),m["\u0275\u0275elementEnd"](),m["\u0275\u0275elementEnd"]()}2&e&&(m["\u0275\u0275advance"](9),m["\u0275\u0275property"]("ngIf",t.userListReady&&t.userRolesReady))},directives:[f.r,f.t,f.q,f.D,f.I,f.o,f.eb,f.F,i.n,o.c],styles:[""]}),e})()}];let g=(()=>{class e{}return e.\u0275mod=m["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=m["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[n.g.forChild(p)],n.g]}),e})();var b=r("3Pt+"),w=r("vTDv");let v=(()=>{class e{}return e.\u0275mod=m["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=m["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[i.c,g,f.u,f.pb,f.H,f.rb,f.R,f.J,w.a,f.E,f.ib,f.p,o.d,b.s]]}),e})()}}]);