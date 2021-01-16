exports.ids=[3],exports.modules={"7Lvj":function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"RecipesModule",(function(){return RecipesModule}));var fesm2015_forms=__webpack_require__("3Pt+"),ngrx_store=__webpack_require__("l7P3"),fesm2015_router=__webpack_require__("tyNb"),take=__webpack_require__("IzEk"),map=__webpack_require__("lJxs"),core=__webpack_require__("fXoL");class auth_guard_AuthGuard{constructor(store,router){this.store=store,this.router=router}canActivate(route,router){return this.store.select("auth").pipe(Object(take.a)(1),Object(map.a)(user=>!!user||this.router.createUrlTree(["/auth"])))}}auth_guard_AuthGuard.\u0275fac=function AuthGuard_Factory(t){return new(t||auth_guard_AuthGuard)(core.Nc(ngrx_store.h),core.Nc(fesm2015_router.g))},auth_guard_AuthGuard.\u0275prov=core.Cc({token:auth_guard_AuthGuard,factory:auth_guard_AuthGuard.\u0275fac,providedIn:"root"});var ngrx_effects=__webpack_require__("9jGm"),of=__webpack_require__("LRne"),switchMap=__webpack_require__("eIep"),recipe_actions=__webpack_require__("g0Sx");class recipe_resolver_service_RecipeResolverService{constructor(store,actions$){this.store=store,this.actions$=actions$}resolve(route,state){return this.store.select("recipes").pipe(Object(take.a)(1),Object(map.a)(recipesState=>recipesState.recipes),Object(switchMap.a)(recipes=>0===recipes.length?(this.store.dispatch(recipe_actions.c()),this.actions$.pipe(Object(ngrx_effects.d)(recipe_actions.d),Object(take.a)(1))):Object(of.a)(recipes)))}}recipe_resolver_service_RecipeResolverService.\u0275fac=function RecipeResolverService_Factory(t){return new(t||recipe_resolver_service_RecipeResolverService)(core.Nc(ngrx_store.h),core.Nc(ngrx_effects.a))},recipe_resolver_service_RecipeResolverService.\u0275prov=core.Cc({token:recipe_resolver_service_RecipeResolverService,factory:recipe_resolver_service_RecipeResolverService.\u0275fac,providedIn:"root"});var shopping_list_actions=__webpack_require__("sPvp"),dropdown_directive=__webpack_require__("3V6w"),common=__webpack_require__("ofXK");function RecipeDetailComponent_li_29_Template(rf,ctx){if(1&rf&&(core.Jc(0,"li",11),core.ed(1),core.Ic()),2&rf){const ingredient_r1=ctx.$implicit;core.wc(1),core.hd(" ",ingredient_r1.name," - ",ingredient_r1.amount," ")}}class recipe_detail_component_RecipeDetailComponent{constructor(route,router,store){this.route=route,this.router=router,this.store=store}ngOnInit(){this.route.params.pipe(Object(map.a)(params=>+params.id),Object(switchMap.a)(id=>(this.id=id,this.store.select("recipes"))),Object(map.a)(recipesState=>recipesState.recipes.find((recipe,index)=>index===this.id))).subscribe(recipe=>{this.recipe=recipe})}addToShoppingList(){this.store.dispatch(shopping_list_actions.b({ingredients:this.recipe.ingredients}))}onEditRecipe(){this.router.navigate(["edit"],{relativeTo:this.route})}onDeleteRecipe(){this.store.dispatch(recipe_actions.b({index:this.id})),this.router.navigate(["/recipes"])}}function RecipeEditComponent_div_33_Template(rf,ctx){if(1&rf){const _r5=core.Kc();core.Jc(0,"div",17),core.Jc(1,"div",18),core.Hc(2,"input",19),core.Ic(),core.Jc(3,"div",20),core.Hc(4,"input",21),core.Ic(),core.Jc(5,"div",20),core.Jc(6,"button",22),core.Qc("clivk",(function RecipeEditComponent_div_33_Template_button_clivk_6_listener(){core.ad(_r5);const i_r3=ctx.index;return core.Sc().onDeleteIngredient(i_r3)})),core.ed(7,"X"),core.Ic(),core.Ic(),core.Ic()}if(2&rf){const i_r3=ctx.index;core.Vc("formGroupName",i_r3)}}recipe_detail_component_RecipeDetailComponent.\u0275fac=function RecipeDetailComponent_Factory(t){return new(t||recipe_detail_component_RecipeDetailComponent)(core.Gc(fesm2015_router.a),core.Gc(fesm2015_router.g),core.Gc(ngrx_store.h))},recipe_detail_component_RecipeDetailComponent.\u0275cmp=core.Ac({type:recipe_detail_component_RecipeDetailComponent,selectors:[["app-recipe-detail"]],decls:30,vars:5,consts:[[1,"row"],[1,"col-xs-12"],[1,"img-responsive",2,"max-height","300px",3,"src","alt"],["appDropdown","",1,"btn-group"],["type","button",1,"btn","btn-primary","dropdown-toggle"],[1,"caret"],[1,"dropdown-menu"],[2,"cursor","pointer",3,"click"],[1,"col-md-12"],[1,"list-group"],["class","list-group-item",4,"ngFor","ngForOf"],[1,"list-group-item"]],template:function RecipeDetailComponent_Template(rf,ctx){1&rf&&(core.Jc(0,"div",0),core.Jc(1,"div",1),core.Hc(2,"img",2),core.Ic(),core.Ic(),core.Jc(3,"div",0),core.Jc(4,"div",1),core.Jc(5,"h1"),core.ed(6),core.Ic(),core.Ic(),core.Ic(),core.Jc(7,"div",0),core.Jc(8,"div",1),core.Jc(9,"div",3),core.Jc(10,"button",4),core.ed(11," Manage Recipe "),core.Hc(12,"span",5),core.Ic(),core.Jc(13,"ul",6),core.Jc(14,"li"),core.Jc(15,"a",7),core.Qc("click",(function RecipeDetailComponent_Template_a_click_15_listener(){return ctx.addToShoppingList()})),core.ed(16,"To shopping list"),core.Ic(),core.Ic(),core.Jc(17,"li"),core.Jc(18,"a",7),core.Qc("click",(function RecipeDetailComponent_Template_a_click_18_listener(){return ctx.onEditRecipe()})),core.ed(19,"Edit Recipe"),core.Ic(),core.Ic(),core.Jc(20,"li"),core.Jc(21,"a",7),core.Qc("click",(function RecipeDetailComponent_Template_a_click_21_listener(){return ctx.onDeleteRecipe()})),core.ed(22,"Delete Recipe"),core.Ic(),core.Ic(),core.Ic(),core.Ic(),core.Ic(),core.Ic(),core.Jc(23,"div",0),core.Jc(24,"div",8),core.ed(25),core.Ic(),core.Ic(),core.Jc(26,"div",0),core.Jc(27,"div",8),core.Jc(28,"ul",9),core.dd(29,RecipeDetailComponent_li_29_Template,2,2,"li",10),core.Ic(),core.Ic(),core.Ic()),2&rf&&(core.wc(2),core.Wc("alt",ctx.recipe.name),core.Vc("src",ctx.recipe.imagePath,core.bd),core.wc(4),core.fd(ctx.recipe.name),core.wc(19),core.gd(" ",ctx.recipe.description," "),core.wc(4),core.Vc("ngForOf",ctx.recipe.ingredients))},directives:[dropdown_directive.a,common.i],styles:[""]});class recipe_edit_component_RecipeEditComponent{constructor(route,router,store){this.route=route,this.router=router,this.store=store,this.editMode=!1}ngOnDestroy(){this.storeSub&&this.storeSub.unsubscribe()}get controls(){return this.recipeForm.get("ingredients").controls}ngOnInit(){this.route.params.subscribe(params=>{this.id=+params.id,this.editMode=null!=params.id,this.initForm()})}onSubmit(){this.editMode?this.store.dispatch(recipe_actions.f({index:this.id,recipe:this.recipeForm.value})):this.store.dispatch(recipe_actions.a({recipe:this.recipeForm.value})),this.returnBack()}onAddIngredient(){this.recipeForm.get("ingredients").push(new fesm2015_forms.g({name:new fesm2015_forms.e(null,fesm2015_forms.t.required),amount:new fesm2015_forms.e(null,[fesm2015_forms.t.required,fesm2015_forms.t.pattern(/^[1-9]+[0-9]*$/)])}))}returnBack(){this.router.navigate(["../"],{relativeTo:this.route})}onDeleteIngredient(index){this.recipeForm.get("ingredients").removeAt(index)}onDeleteAllIngredients(){this.recipeForm.get("ingredients").clear()}initForm(){let recipeName="",recipeImagePath="",recipeDescription="";const recipeIngredients=new fesm2015_forms.c([]);this.editMode&&(this.storeSub=this.store.select("recipes").pipe(Object(map.a)(recipeState=>recipeState.recipes.find((recipe,index)=>this.id===index))).subscribe(recipe=>{if(recipeName=recipe.name,recipeImagePath=recipe.imagePath,recipeDescription=recipe.description,recipe.ingredients)for(const ingredient of recipe.ingredients)recipeIngredients.push(new fesm2015_forms.g({name:new fesm2015_forms.e(ingredient.name,fesm2015_forms.t.required),amount:new fesm2015_forms.e(ingredient.amount,[fesm2015_forms.t.required,fesm2015_forms.t.pattern(/^[1-9]+[0-9]*$/)])}))})),this.recipeForm=new fesm2015_forms.g({name:new fesm2015_forms.e(recipeName,fesm2015_forms.t.required),imagePath:new fesm2015_forms.e(recipeImagePath,fesm2015_forms.t.required),description:new fesm2015_forms.e(recipeDescription,fesm2015_forms.t.required),ingredients:recipeIngredients})}}recipe_edit_component_RecipeEditComponent.\u0275fac=function RecipeEditComponent_Factory(t){return new(t||recipe_edit_component_RecipeEditComponent)(core.Gc(fesm2015_router.a),core.Gc(fesm2015_router.g),core.Gc(ngrx_store.h))},recipe_edit_component_RecipeEditComponent.\u0275cmp=core.Ac({type:recipe_edit_component_RecipeEditComponent,selectors:[["app-recipe-edit"]],decls:41,vars:4,consts:[[1,"row"],[1,"col-xs-12"],[3,"formGroup","ngSubmit"],["type","submit",1,"btn","btn-success",2,"margin-right","10px",3,"disabled"],["type","button",1,"btn","btn-danger",3,"click"],[1,"form-group"],["for","name"],["type","text","id","name","formControlName","name",1,"form-control"],["for","imagePath"],["type","text","id","imagePath","formControlName","imagePath",1,"form-control"],["imagePath",""],[1,"img-responsive",3,"src"],["for","description"],["type","text","id","description","rows","6","formControlName","description",1,"form-control"],["formArrayName","ingredients",1,"col-xs-12"],["class","row","style","margin-top: 10px;",3,"formGroupName",4,"ngFor","ngForOf"],["type","button",1,"btn","btn-success",2,"margin-right","10px",3,"click"],[1,"row",2,"margin-top","10px",3,"formGroupName"],[1,"col-xs-8"],["type","text","formControlName","name",1,"form-control"],[1,"col-xs-2"],["type","number","formControlName","amount",1,"form-control"],["type","button",1,"btn","btn-danger",3,"clivk"]],template:function RecipeEditComponent_Template(rf,ctx){if(1&rf&&(core.Jc(0,"div",0),core.Jc(1,"div",1),core.Jc(2,"form",2),core.Qc("ngSubmit",(function RecipeEditComponent_Template_form_ngSubmit_2_listener(){return ctx.onSubmit()})),core.Jc(3,"div",0),core.Jc(4,"div",1),core.Jc(5,"button",3),core.ed(6,"Save"),core.Ic(),core.Jc(7,"button",4),core.Qc("click",(function RecipeEditComponent_Template_button_click_7_listener(){return ctx.returnBack()})),core.ed(8,"Cancel"),core.Ic(),core.Ic(),core.Ic(),core.Jc(9,"div",0),core.Jc(10,"div",1),core.Jc(11,"div",5),core.Jc(12,"label",6),core.ed(13,"Name"),core.Ic(),core.Hc(14,"input",7),core.Ic(),core.Ic(),core.Ic(),core.Jc(15,"div",0),core.Jc(16,"div",1),core.Jc(17,"div",5),core.Jc(18,"label",8),core.ed(19,"Image URL"),core.Ic(),core.Hc(20,"input",9,10),core.Ic(),core.Ic(),core.Ic(),core.Jc(22,"div",0),core.Jc(23,"div",1),core.Hc(24,"img",11),core.Ic(),core.Ic(),core.Jc(25,"div",0),core.Jc(26,"div",1),core.Jc(27,"div",5),core.Jc(28,"label",12),core.ed(29,"Description"),core.Ic(),core.Hc(30,"textarea",13),core.Ic(),core.Ic(),core.Ic(),core.Jc(31,"div",0),core.Jc(32,"div",14),core.dd(33,RecipeEditComponent_div_33_Template,8,1,"div",15),core.Hc(34,"hr"),core.Jc(35,"div",0),core.Jc(36,"div",1),core.Jc(37,"button",16),core.Qc("click",(function RecipeEditComponent_Template_button_click_37_listener(){return ctx.onAddIngredient()})),core.ed(38,"Add Ingredient"),core.Ic(),core.Jc(39,"button",4),core.Qc("click",(function RecipeEditComponent_Template_button_click_39_listener(){return ctx.onDeleteAllIngredients()})),core.ed(40,"Delete all Ingredients"),core.Ic(),core.Ic(),core.Ic(),core.Ic(),core.Ic(),core.Ic(),core.Ic(),core.Ic()),2&rf){const _r0=core.Zc(21);core.wc(2),core.Vc("formGroup",ctx.recipeForm),core.wc(3),core.Vc("disabled",!ctx.recipeForm.valid),core.wc(19),core.Vc("src",_r0.value,core.bd),core.wc(9),core.Vc("ngForOf",ctx.controls)}},directives:[fesm2015_forms.u,fesm2015_forms.m,fesm2015_forms.h,fesm2015_forms.a,fesm2015_forms.l,fesm2015_forms.f,fesm2015_forms.d,common.i,fesm2015_forms.i,fesm2015_forms.p],styles:["input.ng-invalid.ng-touched[_ngcontent-%COMP%], textarea.ng-invalid.ng-touched[_ngcontent-%COMP%]{border:1px solid red}"]});class RecipeStartComponent{}RecipeStartComponent.\u0275fac=function RecipeStartComponent_Factory(t){return new(t||RecipeStartComponent)},RecipeStartComponent.\u0275cmp=core.Ac({type:RecipeStartComponent,selectors:[["app-recipe-start"]],decls:2,vars:0,template:function RecipeStartComponent_Template(rf,ctx){1&rf&&(core.Jc(0,"h3"),core.ed(1,"Please select a Recipe!"),core.Ic())},styles:[""]});const _c0=function(a0){return[a0]};class RecipeItemComponent{constructor(){}}function RecipeListComponent_app_recipe_item_7_Template(rf,ctx){if(1&rf&&core.Hc(0,"app-recipe-item",4),2&rf){const recipeItem_r1=ctx.$implicit,i_r2=ctx.index;core.Vc("recipe",recipeItem_r1)("index",i_r2)}}RecipeItemComponent.\u0275fac=function RecipeItemComponent_Factory(t){return new(t||RecipeItemComponent)},RecipeItemComponent.\u0275cmp=core.Ac({type:RecipeItemComponent,selectors:[["app-recipe-item"]],inputs:{recipe:"recipe",index:"index"},decls:8,vars:7,consts:[["routerLinkActive","active",1,"list-group-item","clearfix",2,"cursor","pointer",3,"routerLink"],[1,"col-md-8"],[1,"list-group0item-heading"],[1,"list-group-item-text"],[1,"col-md-4","text-center"],[1,"rounded",2,"max-height","80px",3,"src","alt"]],template:function RecipeItemComponent_Template(rf,ctx){1&rf&&(core.Jc(0,"a",0),core.Jc(1,"div",1),core.Jc(2,"h4",2),core.ed(3),core.Ic(),core.Jc(4,"p",3),core.ed(5),core.Ic(),core.Ic(),core.Jc(6,"div",4),core.Hc(7,"img",5),core.Ic(),core.Ic()),2&rf&&(core.Vc("routerLink",core.Xc(5,_c0,ctx.index)),core.wc(3),core.fd(ctx.recipe.name),core.wc(2),core.fd(ctx.recipe.description),core.wc(2),core.Wc("alt",ctx.recipe.name),core.Vc("src",ctx.recipe.imagePath,core.bd))},directives:[fesm2015_router.i,fesm2015_router.h],styles:[""]});class recipe_list_component_RecipeListComponent{constructor(router,route,store){this.router=router,this.route=route,this.store=store}ngOnDestroy(){this.subscription.unsubscribe()}ngOnInit(){this.subscription=this.store.select("recipes").pipe(Object(map.a)(recipesState=>recipesState.recipes)).subscribe(recipes=>{this.recipeList=recipes})}onNewRecipe(){this.router.navigate(["new"],{relativeTo:this.route})}}recipe_list_component_RecipeListComponent.\u0275fac=function RecipeListComponent_Factory(t){return new(t||recipe_list_component_RecipeListComponent)(core.Gc(fesm2015_router.g),core.Gc(fesm2015_router.a),core.Gc(ngrx_store.h))},recipe_list_component_RecipeListComponent.\u0275cmp=core.Ac({type:recipe_list_component_RecipeListComponent,selectors:[["app-recipe-list"]],decls:8,vars:1,consts:[[1,"row"],[1,"col-md-12"],[1,"btn","btn-success",3,"click"],[3,"recipe","index",4,"ngFor","ngForOf"],[3,"recipe","index"]],template:function RecipeListComponent_Template(rf,ctx){1&rf&&(core.Jc(0,"div",0),core.Jc(1,"div",1),core.Jc(2,"button",2),core.Qc("click",(function RecipeListComponent_Template_button_click_2_listener(){return ctx.onNewRecipe()})),core.ed(3,"New Recipe"),core.Ic(),core.Ic(),core.Ic(),core.Hc(4,"hr"),core.Jc(5,"div",0),core.Jc(6,"div",1),core.dd(7,RecipeListComponent_app_recipe_item_7_Template,1,2,"app-recipe-item",3),core.Ic(),core.Ic()),2&rf&&(core.wc(7),core.Vc("ngForOf",ctx.recipeList))},directives:[common.i,RecipeItemComponent],styles:[""]});class RecipesComponent{}RecipesComponent.\u0275fac=function RecipesComponent_Factory(t){return new(t||RecipesComponent)},RecipesComponent.\u0275cmp=core.Ac({type:RecipesComponent,selectors:[["app-recipes"]],decls:5,vars:0,consts:[[1,"row"],[1,"col-lg-5"],[1,"col-lg-7"]],template:function RecipesComponent_Template(rf,ctx){1&rf&&(core.Jc(0,"div",0),core.Jc(1,"div",1),core.Hc(2,"app-recipe-list"),core.Ic(),core.Jc(3,"div",2),core.Hc(4,"router-outlet"),core.Ic(),core.Ic())},directives:[recipe_list_component_RecipeListComponent,fesm2015_router.k],styles:[""]});const routes=[{path:"",component:RecipesComponent,canActivate:[auth_guard_AuthGuard],children:[{path:"",component:RecipeStartComponent},{path:"new",component:recipe_edit_component_RecipeEditComponent},{path:":id",component:recipe_detail_component_RecipeDetailComponent,resolve:[recipe_resolver_service_RecipeResolverService]},{path:":id/edit",component:recipe_edit_component_RecipeEditComponent,resolve:[recipe_resolver_service_RecipeResolverService]}]}];class RecipesRoutingModule{}RecipesRoutingModule.\u0275mod=core.Ec({type:RecipesRoutingModule}),RecipesRoutingModule.\u0275inj=core.Dc({factory:function RecipesRoutingModule_Factory(t){return new(t||RecipesRoutingModule)},imports:[[fesm2015_router.j.forChild(routes)],fesm2015_router.j]});var shared_module=__webpack_require__("PCNd");const recipeReducerPrivate=Object(ngrx_store.o)({recipes:[]},Object(ngrx_store.q)(recipe_actions.a,(state,action)=>Object.assign(Object.assign({},state),{recipes:state.recipes.concat(Object.assign({},action.recipe))})),Object(ngrx_store.q)(recipe_actions.f,(state,action)=>Object.assign(Object.assign({},state),{recipes:state.recipes.map((recipe,index)=>index===action.index?Object.assign({},action.recipe):recipe)})),Object(ngrx_store.q)(recipe_actions.b,(state,action)=>Object.assign(Object.assign({},state),{recipes:state.recipes.filter((_,index)=>index!==action.index)})),Object(ngrx_store.q)(recipe_actions.d,(state,action)=>Object.assign(Object.assign({},state),{recipes:[...action.recipes]})));class RecipesModule{}RecipesModule.\u0275mod=core.Ec({type:RecipesModule}),RecipesModule.\u0275inj=core.Dc({factory:function RecipesModule_Factory(t){return new(t||RecipesModule)},imports:[[fesm2015_forms.r,RecipesRoutingModule,shared_module.a,ngrx_store.j.forFeature("recipes",(function recipeReducer(state,action){return recipeReducerPrivate(state,action)}))]]})},sPvp:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return addIngredient})),__webpack_require__.d(__webpack_exports__,"b",(function(){return addIngredients})),__webpack_require__.d(__webpack_exports__,"f",(function(){return updateIngredient})),__webpack_require__.d(__webpack_exports__,"c",(function(){return deleteIngredient})),__webpack_require__.d(__webpack_exports__,"d",(function(){return startEdit})),__webpack_require__.d(__webpack_exports__,"e",(function(){return stopEdit}));var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("l7P3");const addIngredient=Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.n)("[Shopping List] Add Ingredient",Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.r)()),addIngredients=Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.n)("[Shopping List] Add Ingredients",Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.r)()),updateIngredient=Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.n)("[Shopping List] Update Ingredient",Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.r)()),deleteIngredient=Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.n)("[Shopping List] Delete Ingredient"),startEdit=Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.n)("[Shopping List] Start Edit",Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.r)()),stopEdit=Object(_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.n)("[Shopping List] Stop Edit")}};