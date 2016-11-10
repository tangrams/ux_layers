import InspireTree from 'inspire-tree';

L.UxLayers = L.Control.extend({
    options: {
        position: 'topleft',
        icon: 'https://tangrams.github.io/ux_layers/ux_layers.png',
        scene: null
    },

    initialize: function(options) {
        L.Util.setOptions(this, options);
    },

    onAdd: function(map) {
        // GLOBAL VARIABLES
        // -------------------------------------------------------------
        var icon_size = 26;
        var size = 260;
        var state_open = false;
        
        // CONTAINER
        // -------------------------------------------------------------
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom ux_layers-container');
        container.addEventListener('mousedown', function(){
            map.dragging.disable();
        });

        container.addEventListener('mouseup', function(){
            map.dragging.enable();
        });

        // ICON
        // -------------------------------------------------------------
        var icon =  L.DomUtil.create('img', 'ux_layers-icon', container);
        icon.src = this.options.icon;
        icon.addEventListener('click', function(){
            if (state_open) {
                container.style.width = icon_size+'px';
                container.style.height = icon_size+'px';
            } else {
                container.style.width = (size)+'px';
                container.style.height = (size)+'px';
            }
            state_open = !state_open;
        });

        var tree_dom =  L.DomUtil.create('div', 'ux_layers-tree', container);
        var tree_data = [];

        function makeTree(layers) {
            tree_data = [];
            for (let layer in layers) {
                tree_data.push({"text":layer})
            }
            var tree = new InspireTree({
                target: tree_dom,
                selection: {
                    mode: 'checkbox'
                },
                data: tree_data
            });
            window.tree = tree;
            tree.on('node.click', (evt, node) => {
                // node clicked!
                console.log(['node clicked', evt, node]);
            });
        }

        scene.subscribe({
            load: function (e) {
                if (tree_data.length === 0.) {
                    makeTree(e.config.layers);
                    // console.log("scene:",Object.keys(e.config.layers))
                }
            }
        });

        return container;
    },

    onRemove: function (map) {
        // when removed
    }
});

L.uxLayers = function(options) { return new L.UxLayers(options); };
