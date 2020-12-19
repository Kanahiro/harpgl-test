/*
 * Copyright (C) 2017-2020 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */

import { Theme } from '@here/harp-datasource-protocol';
import { sphereProjection } from '@here/harp-geoutils';
import { MapControls } from '@here/harp-map-controls';
import { MapView } from '@here/harp-mapview';
import {
    APIFormat,
    VectorTileDataSource,
} from '@here/harp-vectortile-datasource';

const defaultTheme = 'resources/berlin_tilezen_base.json';

export interface ViewParameters {
    theme?: string | Theme;
    canvas: HTMLCanvasElement;
}

export class View {
    readonly canvas: HTMLCanvasElement;
    readonly theme: string | Theme;

    readonly mapView: MapView;

    constructor(args: ViewParameters) {
        this.canvas = args.canvas;
        this.theme = args.theme === undefined ? defaultTheme : args.theme;
        this.mapView = this.initialize();
    }

    protected initialize(): MapView {
        const mapView = new MapView({
            canvas: this.canvas,
            theme: this.theme,
            projection: sphereProjection,
            decoderUrl: 'decoder.bundle.js',
        });

        const dataSource = new VectorTileDataSource({
            baseUrl: 'https://tile.openstreetmap.jp/data/japan',
            apiFormat: APIFormat.TomtomV1,
            styleSetName: 'gsi',
        });
        mapView.addDataSource(dataSource);

        MapControls.create(mapView);

        return mapView;
    }
}
