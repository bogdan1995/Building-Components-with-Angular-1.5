/**
 * Created by Bogdan_2 on 11.06.2016.
 */
(function () {
    var module = angular.module('psMovies');

    function accordionCtrl() {
        var vm = this;
        var panels = [];
        
        vm.selectPanel = function (panel) {
            for(var i in panels) {
                if ( panel === panels[i]) {
                    panels[i].turnOn();
                } else {
                    panels[i].turnOff();
                }
            }
        };

        vm.addPanel = function (panel) {
            panels.push(panel);
            if (panels.length) {
                panels[0].turnOn();
            }
        }
    }

    module.component('accordion', {
        template: '<div class="panel-group"><ng-transclude></ng-transclude></div>',
        transclude: true,
        controller: accordionCtrl
    });
    
    function accordionPanelCtrl() {
        var vm = this;

        vm.selected = false;

        vm.$onInit = function () {
            vm.parent.addPanel(vm);
        };

        vm.turnOn = function () {
            vm.selected = true;
        };

        vm.turnOff = function () {
            vm.selected = false;
        };

        vm.select = function () {
            vm.parent.selectPanel(vm);
        }

    }

    module.component('accordionPanel', {
        bindings: {
            heading: '@'
        },
        require: {
            parent: '^accordion'
        },
        controller: accordionPanelCtrl,
        controllerAs: 'vm',
        template:
`<div class="panel panel-default">
    <div class="panel-heading" ng-click="vm.select()">
        <h4 class="panel-title">{{vm.heading}}</h4>
    </div>
    <div ng-if="vm.selected" class="panel-body" ng-transclude></div>
</div>`,
        transclude: true
    })

})();