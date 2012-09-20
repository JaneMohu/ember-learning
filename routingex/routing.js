App = Em.Application.create();

// Define a controller and view for the application
App.ApplicationController = Em.Controller.extend();
App.ApplicationView = Em.View.extend({
	templateName: 'app'
});

// Define a controller and view for the navigation bar
App.NavController = Em.Controller.extend();
App.NavView = Em.View.extend({
	templateName: 'nav'
});

// Define a controller and view for each page
App.MenController = Em.Controller.extend();
App.MenView = Em.View.extend({
	templateName: 'men'
});
App.WomenController = Em.ArrayController.extend();
App.WomenView = Em.View.extend({
	templateName: 'women'
});
App.SubnavController = Em.Controller.extend();
App.SubnavView = Em.View.extend({
	templateName: 'subnav'
});
App.SubAController = Em.Controller.extend();
App.SubAView = Em.View.extend({
	templateName: 'subA'
});
App.SubBController = Em.Controller.extend();
App.SubBView = Em.View.extend({
	templateName: 'subB'
});
App.ArtworkController = Em.ObjectController.extend();
App.ArtworkView = Em.View.extend({
	templateName: "artwork"
});
App.BatchModel = Em.Object.extend({
	id:null,
	name:null
});

App.BatchController = Em.ObjectController.extend();
App.BatchView = Em.View.extend({
	templateName: "batch",
	didInsertElement: function() {
		console.log(this.get('context'));
	}
});

function createBatch(i) {
	var model = App.BatchModel.create({id:i, name:'batch'+i});
	model.artworks = [
		{id:0, name:'artwork0'},
		{id:0, name:'artwork1'},
		{id:0, name:'artwork2'}
	];
	return model;
}

App.Batch = Em.Object.create({
	allBatches: [],
	find: function() {
		this.allBatches.clear();
		for(var i = 0; i < 10; ++i) {
			this.allBatches.pushObject(createBatch(i));
		}
		return this.allBatches;
	},
	findById: function(id) {
		return createBatch(id);
	}
});

// Router

App.Router = Em.Router.extend({
	enableLogging: true,
	root: Em.Route.extend({
		goMen: Em.Route.transitionTo('men'),
		goWomen: Em.Route.transitionTo('women'),
		index: Em.Route.extend({
			route: '/'
		}),

		men: Em.Route.extend({
			route: '/men',
			connectOutlets: function(router, context) {
				router.get('applicationController').connectOutlet({
					name: 'men'
				});

			}
		}),

		women: Em.Route.extend({
			initialState: 'index',

			goSubA: Em.Route.transitionTo('subA'),
			goSubB: Em.Route.transitionTo('subB'),
			goBatch: Em.Route.transitionTo('batch'),

			route: '/women',

			index: Em.Route.extend({
				route: '/',
				connectOutlets: function(router, context) {
					router.get('applicationController').connectOutlet('women', App.Batch.find());
				},
			}),

			subA: Em.Route.extend({
				route: '/subA',
				connectOutlets: function(router, context) {
					router.get('applicationController').connectOutlet({
						name: 'subA'
					});
				}
			}),

            subB: Em.Route.extend({
                route: '/subB',
                connectOutlets: function (router, context) {
                    router.get('applicationController').connectOutlet({
                        name: 'subB'
                    });
                }
            }),

			batch: Em.Route.extend({
				initialState: 'index',
				goArtwork: Em.Route.transitionTo('artwork'),
				route: '/batch/:id',
				deserialize: function(router,params) {
					return App.Batch.findById(params.id);
				},
				connectOutlets: function(router, context) {
					router.get('applicationController').connectOutlet('batch', context);
				},
				index: Em.Route.extend({
					route: '/'
				}),
				artwork: Em.Route.extend({
					route: '/artwork/:id',
					connectOutlets: function(router, context) {
						router.get('applicationController').connectOutlet('artwork', context);
					}
				})
			})
		})
	})
});

App.initialize();