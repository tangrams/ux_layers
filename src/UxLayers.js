import InspireTree from 'inspire-tree';
import TreeNodes from 'inspire-tree';
import { getAddressSceneContent } from './tangram';

L.UxLayers = L.Control.extend({
    options: {
        position: 'topleft',
        icon: 'https://tangrams.github.io/ux_layers/ux_layers.png',
        icon_picker: 'https://tangrams.github.io/ux_layers/ux_picker.png',
        scene: null,
        layer: null
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
        var scene = this.options.scene;
        var tangram = this.options.layer;
        
        // CONTAINER
        // -------------------------------------------------------------
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom ux_layers-container');
        container.addEventListener('mousedown', function(e) {
            map.dragging.disable();
            e.stopPropagation();
        });

        container.addEventListener('mouseup', function(e) {
            map.dragging.enable();
        });

        // ICON
        // -------------------------------------------------------------
        // var toolbar_dom =  L.DomUtil.create('div', 'ux_layers-toolbar', container);

        var icon =  L.DomUtil.create('img', 'ux_layers-icon', container);
        icon.src = this.options.icon;

        var input_dom =  L.DomUtil.create('input', 'ux_layers-search', container);
        input_dom.setAttribute('type','text');
        input_dom.setAttribute('placeholder','Search');


        var picker_icon = undefined;
        if (tangram) {
            picker_icon = L.DomUtil.create('img', 'ux_layers-picker-icon', container);
            picker_icon.src = this.options.icon_picker;
        }

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
                    container.style.width = (Math.max(tree.dom.$target.offsetWidth,size))+'px';
                    container.style.height = (tree.dom.$target.offsetHeight+26)+'px';
                } else {
                    container.style.width = icon_size+'px';
                    container.style.height = icon_size+'px';
                }
            }

            container.addEventListener('click', function(){
                resize_container();
            });

            input_dom.addEventListener('keyup', function(event) {
                tree.search(event.target.value);
                resize_container();
            });

            tree.on('node.click', (event, node) => {
                let layer = getAddressSceneContent(scene,node.address);
                console.log(node.address,node,layer);
                layer.visible = !node.selected();
                scene.rebuild();
                event.stopPropagation();
            });

            tree.on('node.collapsed', (evt, node) => {
                resize_container();
            });

            tree.on('node.expanded', (evt, node) => {
                resize_container();
            });

            icon.addEventListener('click', function(event) {
                state_open = !state_open;
                resize_container();
                event.stopPropagation();
            });

            if (tangram && picker_icon) {
                picker_icon.addEventListener('click', function(event) {
                    tree.showDeep();
                    tree.collapse();
                    picker_icon.style.backgroundColor = "red";
                    console.log('Instrospection ON');
                    scene.canvas.style.cursor = "crosshair";
                    scene.setIntrospection(true);
                    tangram.setSelectionEvents({
                        //hover: function(selection) { console.log('Hover!', selection); },
                        click: function (selection) { 
                            if (selection.feature) {
                                console.log('Click!', selection);

                                tree.dom.batch();
                                tree.model.recurseDown(function(node) {
                                    if (!node.removed()) {
                                        var match = new RegExp("layers:"+selection.feature.layers[0], 'i').test(node.address);
                                        var wasHidden = node.hidden();
                                        node.state('hidden', !match);

                                        // If hidden state will change
                                        if (wasHidden !== node.hidden()) {
                                            node.markDirty();
                                        }

                                        if (match) {
                                            node.expandParents();
                                        } else {
                                            node.collapse();
                                        }
                                    }
                                });
                                tree.dom.end();
                                resize_container();
                            }
                            scene.setIntrospection(false);
                            picker_icon.style.backgroundColor = "white";
                            scene.canvas.style.cursor = "auto";
                            console.log('Instrospection OFF');
                        }
                    });
                    event.stopPropagation();
                });
            }

            resize_container();
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
