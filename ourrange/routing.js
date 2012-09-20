App = Em.Application.create();

// Define a controller and view for the application
App.ApplicationController = Em.Controller.extend();
App.ApplicationView = Em.View.extend({
	templateName: 'app'
});

// Define a controller and view for each page
App.ChoicesController = Em.ArrayController.extend();
App.ChoicesView = Em.View.extend({
	templateName: 'choices'
});

	App.Choice = Em.Object.extend();
	App.Choice.reopenClass({
		allChoices: [],
		find: function() {
			this.allChoices.clear();
			for(var i = 1; i < 3; ++i) {
				this.allChoices.pushObject(createChoice(i));
			}
			return this.allChoices;
		}
	})

	App.ChoiceModel = Em.Object.extend({
		id:null,
		name:null
	})

	function createChoice (i) {
		var model = App.ChoiceModel.create({id:i, name:'choice'+i});
		return model;
	}

App.OptionsController = Em.ArrayController.extend();
App.OptionsView = Em.View.extend({
	templateName: 'options'
});

	App.Option = Em.Object.extend();
	App.Option.reopenClass({
		allOptions: [],
		find: function() {
			this.allOptions.clear();
			for(var i = 1; i < 4; ++i) {
				this.allOptions.pushObject(createOption(i));
			}
			return this.allOptions;
		}
	})

	App.OptionModel = Em.Object.extend({
		id:null,
		name:null
	})

	function createOption (i) {
		var model = App.OptionModel.create({id:i, name:'option'+i});
		return model;
	}

App.ProductsController = Em.ArrayController.extend();
App.ProductsView = Em.View.extend({
	templateName: 'products'
});

	App.Product = Em.Object.extend();
	App.Product.reopenClass({
		allProducts: [],
		find: function() {
			this.allProducts.clear();
			for(var i = 1; i < 12; ++i) {
				this.allProducts.pushObject(createProduct(i));
			}
			return this.allProducts;
		}
	})

	App.ProductModel = Em.Object.extend({
		id:null,
		name:null
	})

	function createProduct (i) {
		var model = App.ProductModel.create({id:i, name:'product'+i});
		return model;
	}

App.ProductController = Em.ObjectController.extend();
App.ProductView = Em.View.extend({
	templateName: 'product'
});

// Router
App.Router = Em.Router.extend({
	enableLogging: true,
	root: Em.Route.extend({
		index: Em.Route.extend({
			route: '/',
			redirectsTo: 'choices'
		}),
		choices: Em.Route.extend({
			route: '/choices',
			showChoice: Em.Route.transitionTo('choice'),
			connectOutlets: function(router) {
				router.get('applicationController').connectOutlet('choices', App.Choice.find());
			}
		}),
		choice: Em.Route.extend({
			route: '/choices/:name',
			showOption: Em.Route.transitionTo('option'),
			connectOutlets: function(router) {
				router.get('applicationController').connectOutlet('options', App.Option.find());
			}
		}),
		option: Em.Route.extend({
			route: '/options/:name',
			showProduct: Em.Route.transitionTo('product'),
			connectOutlets: function(router) {
				router.get('applicationController').connectOutlet('products', App.Product.find());
			}
		}),
		product: Em.Route.extend({
			route: '/products/:name',
			connectOutlets: function(router, product) {
				router.get('applicationController').connectOutlet('product', product);
			}
		})
	})
});

App.initialize();