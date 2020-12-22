(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{CXQP:function(t,e,n){"use strict";n.r(e),n.d(e,"ShoppingListModule",(function(){return g}));var i=n("3Pt+"),o=n("tyNb"),s=n("sPvp"),r=n("fXoL"),c=n("7F1V"),b=n("l7P3"),d=n("9rNa");const a=["f"];let u=(()=>{class t{constructor(t){this.store=t,this.editMode=!1}ngOnInit(){this.subscription=this.store.select("shoppingList").subscribe(t=>{t.editedIngredientIndex>-1?(this.editMode=!0,this.editedItem=t.editedIngredient,this.slForm.setValue({name:this.editedItem.name,amount:this.editedItem.amount})):this.editMode=!1})}ngOnDestroy(){this.subscription.unsubscribe(),this.store.dispatch(new s.j)}onSubmit(t){const e=t.value,n=new d.a(e.name,e.amount);this.store.dispatch(this.editMode?new s.l(n):new s.c(n)),this.onClear()}onClear(){this.editMode=!1,this.slForm.reset(),this.store.dispatch(new s.j)}onDelete(){this.store.dispatch(new s.f),this.onClear()}}return t.\u0275fac=function(e){return new(e||t)(r.Hb(b.a))},t.\u0275cmp=r.Bb({type:t,selectors:[["app-shopping-edit"]],viewQuery:function(t,e){var n;1&t&&r.jc(a,!0),2&t&&r.Zb(n=r.Sb())&&(e.slForm=n.first)},decls:21,vars:3,consts:[[1,"row"],[1,"col-xs-12"],[3,"ngSubmit"],["f","ngForm"],[1,"col-sm-5","form-group"],["for","name"],["type","text","id","name","name","name","ngModel","","required","",1,"form-control"],[1,"col-sm-2","form-group"],["for","amount"],["type","number","id","amount","name","amount","ngModel","","required","","pattern","^[1-9]+[0-9]*$",1,"form-control"],["type","submit",1,"btn","btn-success",3,"disabled"],["type","button",1,"btn","btn-danger",3,"disabled","click"],["type","button",1,"btn","btn-primary",3,"click"]],template:function(t,e){if(1&t){const t=r.Lb();r.Kb(0,"div",0),r.Kb(1,"div",1),r.Kb(2,"form",2,3),r.Rb("ngSubmit",(function(){r.bc(t);const n=r.ac(3);return e.onSubmit(n)})),r.Kb(4,"div",0),r.Kb(5,"div",4),r.Kb(6,"label",5),r.fc(7,"Name"),r.Jb(),r.Ib(8,"input",6),r.Jb(),r.Kb(9,"div",7),r.Kb(10,"label",8),r.fc(11,"Amount"),r.Jb(),r.Ib(12,"input",9),r.Jb(),r.Jb(),r.Kb(13,"div",0),r.Kb(14,"div",1),r.Kb(15,"button",10),r.fc(16),r.Jb(),r.Kb(17,"button",11),r.Rb("click",(function(){return e.onDelete()})),r.fc(18,"Delete"),r.Jb(),r.Kb(19,"button",12),r.Rb("click",(function(){return e.onClear()})),r.fc(20,"Clear"),r.Jb(),r.Jb(),r.Jb(),r.Jb(),r.Jb(),r.Jb()}if(2&t){const t=r.ac(3);r.xb(15),r.Wb("disabled",!t.valid),r.xb(1),r.gc(e.editMode?"Update":"Add"),r.xb(1),r.Wb("disabled",!e.editMode)}},directives:[i.u,i.m,i.n,i.a,i.l,i.o,i.s,i.p,i.q],styles:[""]}),t})();var l=n("ofXK");function p(t,e){if(1&t){const t=r.Lb();r.Kb(0,"a",4),r.Rb("click",(function(){r.bc(t);const n=e.index;return r.Tb().onEditItem(n)})),r.fc(1),r.Jb()}if(2&t){const t=e.$implicit;r.xb(1),r.ic(" ",t.name," (",t.amount,") ")}}const m=[{path:"",component:(()=>{class t{constructor(t,e){this.loggingService=t,this.store=e}ngOnInit(){this.ingredients=this.store.select("shoppingList"),this.loggingService.printLog("Hello from ShoppingListComponent ngOnInit")}onEditItem(t){this.store.dispatch(new s.i(t))}}return t.\u0275fac=function(e){return new(e||t)(r.Hb(c.a),r.Hb(b.a))},t.\u0275cmp=r.Bb({type:t,selectors:[["app-shopping-list"]],decls:7,vars:3,consts:[[1,"row"],[1,"col-xs-10"],[1,"list-group"],["class","list-group-item",3,"click",4,"ngFor","ngForOf"],[1,"list-group-item",3,"click"]],template:function(t,e){1&t&&(r.Kb(0,"div",0),r.Kb(1,"div",1),r.Ib(2,"app-shopping-edit"),r.Ib(3,"hr"),r.Kb(4,"ul",2),r.ec(5,p,2,2,"a",3),r.Ub(6,"async"),r.Jb(),r.Jb(),r.Jb()),2&t&&(r.xb(5),r.Wb("ngForOf",r.Vb(6,1,e.ingredients).ingredients))},directives:[u,l.i],pipes:[l.b],styles:[""]}),t})()}];let f=(()=>{class t{}return t.\u0275mod=r.Fb({type:t}),t.\u0275inj=r.Eb({factory:function(e){return new(e||t)},imports:[[o.f.forChild(m)],o.f]}),t})();var h=n("PCNd");let g=(()=>{class t{}return t.\u0275mod=r.Fb({type:t}),t.\u0275inj=r.Eb({factory:function(e){return new(e||t)},imports:[[i.j,f,h.a]]}),t})()}}]);