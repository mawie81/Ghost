import Ember from 'ember';
import BaseView from 'ghost/views/settings/content-base';

var SettingsNavigationView = BaseView.extend({

    didInsertElement: function () {
        var navContainer = Ember.$('.js-gh-blognav'),
            navElements = '.gh-blognav-item:not(.gh-blognav-item:last-child)',
            self = this;

        navContainer.sortable({
            handle: '.gh-blognav-grab',
            items: navElements,

            start: function (event, ui) {
                Ember.run(function () {
                    ui.item.data('start-index', ui.item.index());
                });
            },

            update: function (event, ui) {
                Ember.run(function () {
                    self.get('controller').send('moveItem', ui.item.data('start-index'), ui.item.index());
                    ui.item.remove();
                });
            }
        });
    },

    willDestroyElement: function () {
        Ember.$('.js-gh-blognav').sortable('destroy');
    }

});

export default SettingsNavigationView;
