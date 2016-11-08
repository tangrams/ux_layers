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
                icon_sc.style.visibility = 'hidden';
            } else {
                container.style.width = (size+20)+'px';
                container.style.height = (size+20+toolbar_size)+'px';
                icon_sc.style.visibility = 'visible';
            }
            state_open = !state_open;
        });
    },

    onRemove: function (map) {
        // when removed
    }
});

L.uxLayers= function(options) { return new L.UxLayers(options); };