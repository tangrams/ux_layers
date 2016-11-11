import InspireTree from 'inspire-tree';
import { getAddressSceneContent } from './tangram';

L.UxLayers = L.Control.extend({
    options: {
        position: 'topleft',
        icon: 'https://tangrams.github.io/ux_layers/ux_layers.png',
        icon_picker: 'https://tangrams.github.io/ux_layers/ux_picker.png',
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
        var picker_icon =  L.DomUtil.create('img', 'ux_layers-picker-icon', container);
        icon.picker_icon = this.options.icon_picker;
        var input_dom =  L.DomUtil.create('input', 'ux_layers-search', container);
        input_dom.setAttribute('type','text');
        input_dom.setAttribute('placeholder','Search');
        var tree_container =  L.DomUtil.create('div', 'ux_layers-tree-container', container);
        var tree_dom =  L.DomUtil.create('div', 'ux_layers-tree', tree_container);
        var tree_data = [];

        function isThereOn (element, list) {
            return list.indexOf(element) > -1;
        };

        function addNodes (layers, address, data, last_iter = false) {
            let skip_list = ['data', 'filter','style','font','order'];
            //console.log(layers, address, data, last_iter);
            for (let layer_name in layers) {
                let layer = layers[layer_name];
                if (isThereOn(layer_name,skip_list)) {
                    continue;
                }
                else if (layer_name === "draw") {
                    addNodes(layer, address+':'+layer_name, data, true);
                } else {
                    let visible = ((layer.visible === undefined)? true : layer.visible);
                    let node = {text:layer_name, children:[], address:address+':'+layer_name, visible:visible, itree: { state: { selected: visible } } }
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

            var tree = new InspireTree({
                target: tree_dom,
                selection: {
                    mode: 'checkbox'
                },
                data: tree_data
            });

            function resize_container() {
                if (state_open) {
                    container.style.width = Math.max(tree.dom.$target.offsetWidth,size)+'px';
                    container.style.height = (tree.dom.$target.offsetHeight+25)+'px';
                }
            }

            container.addEventListener('click', function(){
                resize_container();
            });

            input_dom.addEventListener('keyup', function(event) {
                tree.search(event.target.value);
                resize_container();
            });

            window.tree = tree;
            tree.on('node.click', (evt, node) => {
                let layer = getAddressSceneContent(scene,node.address);
                console.log(node.address,node,layer);
                layer.visible = !node.selected();
                scene.rebuild();
            });

            tree.on('node.collapsed', (evt, node) => {
                resize_container();
            });

            tree.on('node.expanded', (evt, node) => {
                resize_container();
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
