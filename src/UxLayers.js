import InspireTree from 'inspire-tree';
import { getAddressSceneContent } from './tangram';

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
        var tree_dom =  L.DomUtil.create('div', 'ux_layers-tree', container);
        var tree_data = [];

        function isThereOn (element, list) {
            return list.indexOf(element) > -1;
        };

        function addNodes (layers, address, data, last_iter = false) {
            let skip_list = ['data', 'filter','style','font','order'];

            console.log(layers, address, data, last_iter);

            for (let layer_name in layers) {
                let layer = layers[layer_name];
                if (isThereOn(layer_name,skip_list)) {
                    continue;
                }
                else if (layer_name === "draw") {
                    addNodes(layer, address+':'+layer_name, data, true);
                } else {
                    let node = {text:layer_name, children:[], address:address+':'+layer_name, visible:((layer.visible === undefined)? true : layer.visible), itree: { state: { selected: true } } }
                    if (!last_iter) {
                        addNodes(layer, address+':'+layer_name, node.children);
                    }
                    data.push(node);
                }
                
            }

        }
        function makeTree(layers) {
            tree_data = [];
            addNodes(layers, "layers", tree_data);
            // for (let layer_name in layers) {
            //     let layer = layers[layer_name];
            //     let address = 'layers:'+layer;
            //     let node = {text:layer_name, children:[], address:address, visible:((layers.visible === undefined)? true : layers.visible), itree: { state: { selected: true } } }
                
            //     for (let sublayer_name in layer.draw) {
            //         let sublayer = layer.draw[sublayer_name];
            //         node.children.push({text:sublayer_name, address:'layers:'+layer_name+':draw:'+sublayer_name, visible:((sublayer.visible === undefined)? true : sublayer.visible), itree: { state: { selected: true } } })
            //     }
            //     tree_data.push(node);
            // }

            var tree = new InspireTree({
                target: tree_dom,
                selection: {
                    mode: 'checkbox'
                },
                data: tree_data
            });

            window.tree = tree;
            tree.on('node.click', (evt, node) => {
                let layer = getAddressSceneContent(scene,node.address);
                console.log(node.address,node,layer);
                layer.visible = !node.selected();
                scene.rebuild();
                container.style.height = tree.dom.$target.scrollHeight+'px';
            });

            tree.on('node.collapsed', (evt, node) => {
                container.style.height = tree.dom.$target.scrollHeight+'px';
            });

            tree.on('node.expanded', (evt, node) => {
                container.style.height = tree.dom.$target.scrollHeight+'px';
            });

            icon.addEventListener('click', function(){
                if (state_open) {
                    container.style.width = icon_size+'px';
                    container.style.height = icon_size+'px';
                } else {
                    container.style.width = size+'px';
                    container.style.height = (tree.dom.$target.scrollHeight+25)+'px';
                }
                state_open = !state_open;
            });
        }

        scene.subscribe({
            load: function (e) {
                if (tree_data.length === 0.) {
                    makeTree(e.config.layers);
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
