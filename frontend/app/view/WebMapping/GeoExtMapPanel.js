var counties_wms, conservancies_wms, surface_water, lakes, rivers, towns, kenya_lulc;

Ext.define('LandCover.view.WebMapping.GeoExtMapPanel',
{
	extend: 'GeoExt.panel.Map',
	alias: 'widget.GeoExtMapPanel',
	id: 'GeoExtMapPanelId',
	border: 'false',
	layout: 'fit',
	region: 'center',
	width: '100%',
	height:'100%',
	center: '29.577899,3.443310',
	zoom: 11,
	initComponent: function() 
	{
		var me = this,
		items = [],
		ctrl;

		map = new OpenLayers.Map('map', options);
		map.addControl(new OpenLayers.Control.LayerSwitcher());
		map.addControl(new OpenLayers.Control.Navigation({dragPanOptions: {enableKinetic: true}})); 
		map.addControl(new OpenLayers.Control.Scale());
		map.addControl(new OpenLayers.Control.LoadingPanel()); 

       
        ///Baselayers
        var gphy = new OpenLayers.Layer.Google(
            "Google Physical Terrain",
            {isBaseLayer: true, type: google.maps.MapTypeId.TERRAIN, visibility:false, transitionEffect: 'resize'}
            );

        var gmap = new OpenLayers.Layer.Google(
                    "Google Streets", // the default
                    {isBaseLayer: true,numZoomLevels: 20,visibility:false, transitionEffect: 'resize'}
                    );

        var ghyb = new OpenLayers.Layer.Google(
            "Google Hybrid",
            {isBaseLayer: true,type: google.maps.MapTypeId.HYBRID, numZoomLevels: 22,visibility:false, transitionEffect: 'resize'}
            );

        var gsat = new OpenLayers.Layer.Google(
            "Google Satellite",
            {isBaseLayer: true,type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 20,visibility:false, transitionEffect: 'resize'}
            );

        var mapbox_street = new OpenLayers.Layer.XYZ("Mapbox Street",
            ["http://a.tiles.mapbox.com/v4/mapbox.streets/${z}/${x}/${y}.png?access_token=pk.eyJ1Ijoid29uZGllIiwiYSI6InlKcXpXT1UifQ.BQ3hMXdyffGusTRN8JnWOg"], {
                sphericalMercator: true,
                wrapDateLine: true,
                numZoomLevels: 20,
                transitionEffect: 'resize'
            });

        var esri_topo_map = new OpenLayers.Layer.XYZ( "ESRI",
            "http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/${z}/${y}/${x}",
            {sphericalMercator: true} );

        var mapquest = new OpenLayers.Layer.XYZ(
            "Imagery",
            [
                "http://otile1.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.png",
                "http://otile2.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.png",
                "http://otile3.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.png",
                "http://otile4.mqcdn.com/tiles/1.0.0/sat/${z}/${x}/${y}.png"
            ],
            {
                sphericalMercator: true,
                wrapDateLine: true,
                numZoomLevels: 20,
                //attribution: "Tiles Courtesy of <a href='http://open.mapquest.co.uk/' target='_blank'>MapQuest</a>. Portions Courtesy NASA/JPL-Caltech '>",
                transitionEffect: "resize"
            }
        );

        

        conservancies_wms = new OpenLayers.Layer.WMS("Conservancies",
                    "http://tools.rcmrd.org/geoserver/wms",
                    {
                        layers: 'rangelands:conservancies',
                        transparent: true,
                        format: "image/png"
                    }, {
                           buffer: 0,
                            visibility: false,
                            displayOutsideMaxExtent: true,
                            displayInLayerSwitcher: true,
                            isBaseLayer: false,
                            yx : {'EPSG:4326' : true}
                    }
                    
                );

        counties_wms = new OpenLayers.Layer.WMS("Counties",
                    "http://tools.rcmrd.org/geoserver/wms",
                    {
                        layers: 'rangelands:counties',
                        transparent: true,
                        format: "image/png"
                    }, {
                           buffer: 0,
                            visibility: false,
                            displayOutsideMaxExtent: true,
                            displayInLayerSwitcher: true,
                            isBaseLayer: false,
                            yx : {'EPSG:4326' : true}
                    }
                    
                );
        /*
        surface_water = new OpenLayers.Layer.WMS("Surface Water",
                    "http://192.168.100.186:8080/geoserver/wms",
                    {
                        layers: 'servir:ke_surfacewaterC',
                        transparent: true,
                        format: "image/png"
                    }, {
                           buffer: 0,
                            visibility: false,
                            displayOutsideMaxExtent: true,
                            displayInLayerSwitcher: true,
                            isBaseLayer: false,
                            yx : {'EPSG:4326' : true}
                    }
                    
                ); */

        invasive_species = new OpenLayers.Layer.WMS("Invasive Species",
                    "http://tools.rcmrd.org/geoserver/wms",
                    {
                        layers: 'servir:invasive_species',
                        transparent: true,
                        format: "image/png"
                    }, {
                           buffer: 0,
                            visibility: false,
                            displayOutsideMaxExtent: true,
                            displayInLayerSwitcher: true,
                            isBaseLayer: false,
                            yx : {'EPSG:4326' : true}
                    }
                    
                );

        lakes = new OpenLayers.Layer.WMS("Lakes",
                    "http://tools.rcmrd.org/geoserver/wms",
                    {
                        layers: 'rangelands:lakes',
                        transparent: true,
                        format: "image/png"
                    }, {
                           buffer: 0,
                            visibility: false,
                            displayOutsideMaxExtent: true,
                            displayInLayerSwitcher: true,
                            isBaseLayer: false,
                            yx : {'EPSG:4326' : true}
                    }
                    
                );
        
        rivers = new OpenLayers.Layer.WMS("Rivers",
                    "http://tools.rcmrd.org/geoserver/wms",
                    {
                        layers: 'rangelands:rivers',
                        transparent: true,
                        format: "image/png"
                    }, {
                           buffer: 0,
                            visibility: false,
                            displayOutsideMaxExtent: true,
                            displayInLayerSwitcher: true,
                            isBaseLayer: false,
                            yx : {'EPSG:4326' : true}
                    }
                    
                );

        towns = new OpenLayers.Layer.WMS("Towns",
                    "http://tools.rcmrd.org/geoserver/wms",
                    {
                        layers: 'rangelands:towns',
                        transparent: true,
                        format: "image/png"
                    }, {
                           buffer: 0,
                            visibility: false,
                            displayOutsideMaxExtent: true,
                            displayInLayerSwitcher: true,
                            isBaseLayer: false,
                            yx : {'EPSG:4326' : true}
                    }
                    
                );
        /*
        kenya_lulc = new OpenLayers.Layer.WMS("Land Cover",
                    "http://192.168.100.186:8080/geoserver/wms",
                    {
                        layers: 'servir:Kenya_Lulc_2010',
                        transparent: true,
                        format: "image/png"
                    }, {
                           buffer: 0,
                            visibility: false,
                            displayOutsideMaxExtent: true,
                            displayInLayerSwitcher: true,
                            isBaseLayer: false,
                            yx : {'EPSG:4326' : true}
                    }
                    
                ); */

        var maxExtent = new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508),
        restrictedExtent = maxExtent.clone();
        maxResolution = 156543.0339;

        var options = {
            projection: new OpenLayers.Projection("EPSG:900913"),
            displayProjection: new OpenLayers.Projection("EPSG:4326"),
            units: "m",
            numZoomLevels: 20,
            maxResolution: maxResolution,
			//maxExtent: maxExtent,
			sphericalMercator: true,
			restrictedExtent: restrictedExtent
		};

		map.addControl(new OpenLayers.Control.MousePosition
			(	{
				id:'MousePosition_id',
			
				numDigits: 6,
				prefix: '(Lon/Lat)',
				emptyString: '',
				displayProjection: "EPSG:4326"
			}
			));
		
		zoomInCtrl = new OpenLayers.Control.ZoomIn();
		map.addControl(zoomInCtrl);

		zoomOutCtrl = new OpenLayers.Control.ZoomOut();
		map.addControl(zoomOutCtrl);
		
		navigationHistoryCtrl = new OpenLayers.Control.NavigationHistory();
		map.addControl(navigationHistoryCtrl);



        //When there is internet use this
        map.addLayers([towns, invasive_species, rivers, lakes, conservancies_wms, counties_wms, 
            esri_topo_map, mapbox_street]);

        

		map.setCenter(new OpenLayers.LonLat(37.833516, 0.259953).transform(
			new OpenLayers.Projection("EPSG:4326"),
			map.getProjectionObject()
			), 6 );


    Ext.apply(me, 
    {
    	map: map

    });


    me.callParent(arguments);
}
});
