import React, {useEffect} from "react";
import {useState} from "react/index";
import KeplerGl from 'kepler.gl';

interface State {}

interface Props {
}

const LocationProfileDashBoard = (): React.ReactElement => {

    const [height, setHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleResize = () => setHeight(window.innerHeight);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const data = {
        fields: [
            { name: 'pickup_latitude', format: '', type: 'real' },
            { name: 'pickup_longitude', format: '', type: 'real' },
            { name: 'dropoff_latitude', format: '', type: 'real' },
            { name: 'dropoff_longitude', format: '', type: 'real' }
        ],
        rows: [
            [40.7316, -73.9867, 40.765, -73.975],
            [40.7321, -73.9888, 40.7653, -73.987],
            [40.7318, -73.9845, 40.7594, -73.982],
            [40.7586, -73.9724, 40.7586, -73.9724]
        ]
    };

    const [mapConfig, setMapConfig] = useState({
        mapState: {
            latitude: 40.7316,
            longitude: -73.9867,
            zoom: 11
        }
    });

        return (
            <div>
                <KeplerGl
                    id="map"
                    width="100%"
                    height={height}
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                    // mapboxApiUrl="https://api.mapbox.com"
                    // 초기 데이터를 props로 전달
                    data={{datasets: [{data}]}}
                    // 초기 맵 설정을 props로 전달
                    mapConfig={mapConfig}
                    // 맵 설정이 변경될 때 호출될 함수를 props로 전달
                    onMapConfigChange={setMapConfig}
                />
            </div>
        )

};

export default LocationProfileDashBoard