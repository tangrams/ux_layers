(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.UxLayers = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

L.UxLayers = L.Control.extend({
    options: {
        position: 'topleft',
        icon: 'https://tangrams.github.io/ux_layers/ux_layers.png',
        scene: null
    },

    initialize: function initialize(options) {
        L.Util.setOptions(this, options);
    },

    onAdd: function onAdd(map) {
        // GLOBAL VARIABLES
        // -------------------------------------------------------------
        var icon_size = 26;
        var size = 260;

        // CONTAINER
        // -------------------------------------------------------------
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom ux_layers-container');
        container.addEventListener('mousedown', function () {
            map.dragging.disable();
        });

        container.addEventListener('mouseup', function () {
            map.dragging.enable();
        });

        // ICON
        // -------------------------------------------------------------
        var icon = L.DomUtil.create('img', 'ux_layers-icon', container);
        icon.src = this.options.icon;
        icon.addEventListener('click', function () {
            if (state_open) {
                container.style.width = icon_size + 'px';
                container.style.height = icon_size + 'px';
                icon_sc.style.visibility = 'hidden';
            } else {
                container.style.width = size + 20 + 'px';
                container.style.height = size + 20 + toolbar_size + 'px';
                icon_sc.style.visibility = 'visible';
            }
            state_open = !state_open;
        });
    },

    onRemove: function onRemove(map) {
        // when removed
    }
});

L.uxLayers = function (options) {
    return new L.UxLayers(options);
};

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvcGF0cmljaW8vRGVza3RvcC91eF9sYXllcnMvc3JjL1V4TGF5ZXJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxDQUFDLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO0FBQzFCLFdBQU8sRUFBRTtBQUNMLGdCQUFRLEVBQUUsU0FBUztBQUNuQixZQUFJLEVBQUUsb0RBQW9EO0FBQzFELGFBQUssRUFBRSxJQUFJO0tBQ2Q7O0FBRUQsY0FBVSxFQUFFLG9CQUFTLE9BQU8sRUFBRTtBQUMxQixTQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDcEM7O0FBRUQsU0FBSyxFQUFFLGVBQVMsR0FBRyxFQUFFOzs7QUFHakIsWUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO0FBQ25CLFlBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQzs7OztBQUlmLFlBQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSx3RUFBd0UsQ0FBQyxDQUFDO0FBQ2xILGlCQUFTLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFlBQVU7QUFDOUMsZUFBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUMxQixDQUFDLENBQUM7O0FBRUgsaUJBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsWUFBVTtBQUM1QyxlQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3pCLENBQUMsQ0FBQzs7OztBQUlILFlBQUksSUFBSSxHQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUNqRSxZQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO0FBQzdCLFlBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBVTtBQUNyQyxnQkFBSSxVQUFVLEVBQUU7QUFDWix5QkFBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsU0FBUyxHQUFDLElBQUksQ0FBQztBQUN2Qyx5QkFBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsU0FBUyxHQUFDLElBQUksQ0FBQztBQUN4Qyx1QkFBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO2FBQ3ZDLE1BQU07QUFDSCx5QkFBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQUFBQyxJQUFJLEdBQUMsRUFBRSxHQUFFLElBQUksQ0FBQztBQUN2Qyx5QkFBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQUFBQyxJQUFJLEdBQUMsRUFBRSxHQUFDLFlBQVksR0FBRSxJQUFJLENBQUM7QUFDckQsdUJBQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQzthQUN4QztBQUNELHNCQUFVLEdBQUcsQ0FBQyxVQUFVLENBQUM7U0FDNUIsQ0FBQyxDQUFDO0tBQ047O0FBRUQsWUFBUSxFQUFFLGtCQUFVLEdBQUcsRUFBRTs7S0FFeEI7Q0FDSixDQUFDLENBQUM7O0FBRUgsQ0FBQyxDQUFDLFFBQVEsR0FBRSxVQUFTLE9BQU8sRUFBRTtBQUFFLFdBQU8sSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0NBQUUsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJMLlV4TGF5ZXJzID0gTC5Db250cm9sLmV4dGVuZCh7XG4gICAgb3B0aW9uczoge1xuICAgICAgICBwb3NpdGlvbjogJ3RvcGxlZnQnLFxuICAgICAgICBpY29uOiAnaHR0cHM6Ly90YW5ncmFtcy5naXRodWIuaW8vdXhfbGF5ZXJzL3V4X2xheWVycy5wbmcnLFxuICAgICAgICBzY2VuZTogbnVsbFxuICAgIH0sXG5cbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIEwuVXRpbC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuICAgIH0sXG5cbiAgICBvbkFkZDogZnVuY3Rpb24obWFwKSB7XG4gICAgICAgIC8vIEdMT0JBTCBWQVJJQUJMRVNcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICB2YXIgaWNvbl9zaXplID0gMjY7XG4gICAgICAgIHZhciBzaXplID0gMjYwO1xuICAgICAgICBcbiAgICAgICAgLy8gQ09OVEFJTkVSXG4gICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsICdsZWFmbGV0LWJhciBsZWFmbGV0LWNvbnRyb2wgbGVhZmxldC1jb250cm9sLWN1c3RvbSB1eF9sYXllcnMtY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgbWFwLmRyYWdnaW5nLmRpc2FibGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgbWFwLmRyYWdnaW5nLmVuYWJsZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBJQ09OXG4gICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgdmFyIGljb24gPSAgTC5Eb21VdGlsLmNyZWF0ZSgnaW1nJywgJ3V4X2xheWVycy1pY29uJywgY29udGFpbmVyKTtcbiAgICAgICAgaWNvbi5zcmMgPSB0aGlzLm9wdGlvbnMuaWNvbjtcbiAgICAgICAgaWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpZiAoc3RhdGVfb3Blbikge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5zdHlsZS53aWR0aCA9IGljb25fc2l6ZSsncHgnO1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBpY29uX3NpemUrJ3B4JztcbiAgICAgICAgICAgICAgICBpY29uX3NjLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnN0eWxlLndpZHRoID0gKHNpemUrMjApKydweCc7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnN0eWxlLmhlaWdodCA9IChzaXplKzIwK3Rvb2xiYXJfc2l6ZSkrJ3B4JztcbiAgICAgICAgICAgICAgICBpY29uX3NjLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdGF0ZV9vcGVuID0gIXN0YXRlX29wZW47XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBvblJlbW92ZTogZnVuY3Rpb24gKG1hcCkge1xuICAgICAgICAvLyB3aGVuIHJlbW92ZWRcbiAgICB9XG59KTtcblxuTC51eExheWVycz0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gbmV3IEwuVXhMYXllcnMob3B0aW9ucyk7IH07Il19
