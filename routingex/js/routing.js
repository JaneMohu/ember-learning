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
App.SectionAController = Em.Controller.extend();
App.SectionAView = Em.View.extend({
	templateName: 'sectionA'
});
App.SectionBController = Em.ArrayController.extend();
App.SectionBView = Em.View.extend({
	templateName: 'sectionB'
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
	root: Em.Route.extend({
		goA: Em.Route.transitionTo('sectionA'),
		goB: Em.Route.transitionTo('sectionB'),
		index: Em.Route.extend({
			route: '/'
		}),

		sectionA: Em.Route.extend({
			route: '/sectionA',
			connectOutlets: function(router, context) {
				router.get('applicationController').connectOutlet({
					name: 'sectionA'
				});
			}
		}),

		sectionB: Em.Route.extend({
			initialState: 'index',

			goSubA: Em.Route.transitionTo('subA'),
			goSubB: Em.Route.transitionTo('subB'),
			goBatch: Em.Route.transitionTo('batch'),

			route: '/sectionB',

			index: Em.Route.extend({
				route: '/',
				connectOutlets: function(router, context) {
					router.get('applicationController').connectOutlet('sectionB', App.Batch.find());
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