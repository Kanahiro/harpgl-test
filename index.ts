/*
 * Copyright (C) 2017-2020 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeoCoordinates } from '@here/harp-geoutils';

import { View } from './View';

const app = new View({
    canvas: document.getElementById('map') as HTMLCanvasElement,
    theme: {
        lights: [
            {
                type: 'directional',
                color: '#CCCBBB',
                name: 'light1',
                intensity: 1,
                direction: {
                    x: 1,
                    y: 5,
                    z: 0.5,
                },
            },
        ],
        sky: {
            type: 'gradient',
            topColor: '#002299',
            bottomColor: '#00aaff',
            groundColor: '#88aadd',
            monomialPower: 1,
        },
        styles: {
            gsi: [
                {
                    id: 'waterarea',
                    technique: 'fill',
                    layer: 'water',
                    color: '#aaccff',
                },
                {
                    id: 'road',
                    technique: 'solid-line',
                    layer: 'transportation',
                    color: '#000000',
                    lineWidth: [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        5,
                        1000,
                        10,
                        100,
                        14,
                        5,
                    ],
                },
                {
                    id: 'road2',
                    technique: 'solid-line',
                    layer: 'transportation',
                    color: '#ffffff',
                    lineWidth: [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        5,
                        500,
                        10,
                        50,
                        14,
                        2,
                    ],
                },
                {
                    id: 'boundary',
                    technique: 'dashed-line',
                    layer: 'boundary',
                    color: '#ff0000',
                    lineWidth: [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        5,
                        500,
                        10,
                        50,
                        14,
                        2,
                    ],
                },
                {
                    id: 'extrudedBuildings',
                    description: 'extruded buildings',
                    technique: 'extruded-polygon',
                    layer: 'building',
                    minZoomLevel: 14,
                    renderOrder: 2000,
                    height: ['get', 'render_height'],
                    color: '#ffffff',
                    roughness: 1,
                    metalness: 0.8,
                    emissive: '#78858C',
                    emissiveIntensity: 0.85,
                    footprint: true,
                    maxSlope: 0.8799999999999999,
                    lineWidth: 1,
                    lineColor: '#ffffff',
                    lineColorMix: 0.6,
                    fadeNear: 0.9,
                    fadeFar: 1,
                    lineFadeNear: -0.75,
                    lineFadeFar: 1,
                },
            ],
            geojson: [
                {
                    id: 'extrudedBuildings',
                    description: 'extruded buildings',
                    technique: 'extruded-polygon',
                    layer: 'star',
                    minZoomLevel: 14,
                    renderOrder: 2000,
                    height: 300,
                    color: '#ffffff',
                    roughness: 1,
                    metalness: 0.8,
                    emissive: '#ffff00',
                    emissiveIntensity: 0.85,
                    footprint: true,
                    maxSlope: 0.8799999999999999,
                    lineWidth: 1,
                    lineColor: '#000000',
                    lineColorMix: 0.6,
                    fadeNear: 0.9,
                    fadeFar: 1,
                    lineFadeNear: -0.75,
                    lineFadeFar: 1,
                },
            ],
        },
    },
});

const mapView = app.mapView;

// make map full-screen
mapView.resize(window.innerWidth, window.innerHeight);

// react on resize events from the browser.
window.addEventListener('resize', () => {
    mapView.resize(window.innerWidth, window.innerHeight);
});

// center the camera to New York
mapView.lookAt({
    target: new GeoCoordinates(35.6809591, 139.7673068),
    zoomLevel: 15,
    tilt: 65,
});

// make sure the map is rendered
mapView.update();
