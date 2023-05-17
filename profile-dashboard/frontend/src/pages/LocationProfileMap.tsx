import React, {useEffect, useRef, useState} from "react";
import {withRouter} from "react-router-dom";
import {KeplerGl} from 'kepler.gl';
import {addDataToMap, updateMap, updateVisData} from 'kepler.gl/actions';
import {store} from '@src/index';
import {useDispatch} from "react-redux";
import {processCsvData, processGeojson} from 'kepler.gl/processors';

interface State {
}

interface Props {
}

const LocationProfileMap = (): React.ReactElement => {
    const dispatch = useDispatch();
    const keplerGlRef = useRef(null);

    const [height, setHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleResize = () => setHeight(window.innerHeight);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const sampleConfig = {
        visState: {
            filters: [
                {
                    id: 'me',
                    dataId: 'test_trip_data',
                    name: 'tpep_pickup_datetime',
                    type: 'timeRange',
                    view: 'enlarged'
                }
            ]
        }
    };

    /*
    맵 최초 위치 설정
     */
    useEffect(() => {
        store.dispatch(updateMap({
            latitude: 37.5658, longitude: 126.9889, // 캐롯 좌표
        }))

        /*
        그냥 초기 데이터 보여주는건데.. 이게 또 없으면 그 add file이 팝업 되서..
        이 부분은 팝업 안되고 내가 만든 조회 화면이 띄워지게 한다거나
        아니면 그냥 디폴트 조회로 오늘날짜 기준 무언가를 보여준다거나 해야 할듯?
         */
        store.dispatch(addDataToMap({
            datasets: {
                info: {
                    label: 'Seoul City',
                    id: 'test_data'
                },
                data: sampleTripData2
            }
        }));

    }, []);



    const sampleTripData = {
        fields: [
            {name: 'tpep_pickup_datetime', format: 'YYYY-M-D H:m:s', type: 'timestamp'},
            {name: 'pickup_longitude', format: '', type: 'real'},
            {name: 'pickup_latitude', format: '', type: 'real'}
        ],
        rows: [
            ['2015-01-15 19:05:39 +00:00', -73.99389648, 40.75011063],
            ['2015-01-15 19:05:39 +00:00', -73.97642517, 40.73981094],
            ['2015-01-15 19:05:40 +00:00', -73.96870422, 40.75424576]
        ]
    };



    const handleDataUpdate = () => {
        store.dispatch(addDataToMap({
            datasets: {
                info: {
                    label: 'Sample Taxi Trips in New York City',
                    id: 'test_trip_data'
                },
                data: sampleTripData
            }
        }));
    };


    const sampleTripData2 = {
        fields: [
            {name: 'datetime', format: 'YYYY-M-D H:m:s', type: 'timestamp'},
            {name: 'trip_longitude', format: '', type: 'real'},
            {name: 'trip_latitude', format: '', type: 'real'}
        ],
        rows: [
            ['2015-01-15 19:05:39 +00:00', 126.6218273, 34.4071537],
            ['2015-01-15 19:05:39 +00:00',126.6226323, 34.4076622],
            ['2015-01-15 19:05:40 +00:00', 126.6226323, 34.4156622]
        ]
    };

    const handleAddDataToMap = () => {

        store.dispatch(addDataToMap({
            datasets: {
                info: {
                    label: 'Seoul City',
                    id: 'test_data'
                },
                data: sampleTripData2
            }
        }));
    };

    const testData = `no,eid,source,target,tunnel,geometry,source_lt,source_ln,target_lt,target_ln,length,reversed,eid_idx
7106,342885007,436745716,436745711,yes,"LINESTRING (126.6218273000000067 34.4071537000000021, 126.6226323000000065 34.4076621999999972)",34.4071537,126.6218273,34.4076622,126.6226323,93.011,False,342885007
7107,342885007,436745711,436745716,yes,"LINESTRING (126.6226323000000065 34.4076621999999972, 126.6218273000000067 34.4071537000000021)",34.4076622,126.6226323,34.4071537,126.6218273,93.011,True,342885007
14281,718021326,437164653,6417305602,yes,"LINESTRING (126.3143184000000048 34.6014630000000025, 126.3141676999999987 34.6012363999999977)",34.601463,126.3143184,34.6012364,126.3141677,28.725,True,718021326
19260,111312619,1268485771,1268485792,yes,"LINESTRING (126.2906196999999935 34.5176286000000019, 126.2906009000000012 34.5211948000000035)",34.5176286,126.2906197,34.5211948,126.2906009,396.548,False,111312619
19283,111312619,1268485792,1268485782,yes,"LINESTRING (126.2906009000000012 34.5211948000000035, 126.2906557000000021 34.5232588000000007)",34.5211948,126.2906009,34.5232588,126.2906557,229.562,False,111312619
19304,111312623,1268494176,1268494194,yes,"LINESTRING (126.2901988999999929 34.5211948000000035, 126.2903071000000068 34.5180221999999972)",34.5211948,126.2901989,34.5180222,126.2903071,352.917,False,111312623
19327,111312623,1268494201,1268494176,yes,"LINESTRING (126.2903179999999992 34.5236942000000013, 126.2901988999999929 34.5211948000000035)",34.5236942,126.290318,34.5211948,126.2901989,278.135,False,111312623
20132,798198744,1781001457,1781001460,yes,"LINESTRING (126.2871860000000055 34.5686254000000019, 126.2874381000000028 34.5688959000000011)",34.5686254,126.287186,34.5688959,126.2874381,37.915,True,798198744
20140,798198744,1781001460,1781001457,yes,"LINESTRING (126.2874381000000028 34.5688959000000011, 126.2871860000000055 34.5686254000000019)",34.5688959,126.2874381,34.5686254,126.287186,37.915,False,798198744
20689,166681831,1781121730,1781121772,yes,"LINESTRING (126.2859336000000070 34.4983530000000016, 126.2855303999999990 34.4987884000000022)",34.498353,126.2859336,34.4987884,126.2855304,60.903,True,166681831
20720,166681831,1781121772,1781121730,yes,"LINESTRING (126.2855303999999990 34.4987884000000022, 126.2859336000000070 34.4983530000000016)",34.4987884,126.2855304,34.498353,126.2859336,60.903,False,166681831
22173,550315177,2678542499,6743633942,yes,"LINESTRING (126.7193527000000017 34.3770679000000001, 126.7196267000000063 34.3762836000000007)",34.3770679,126.7193527,34.3762836,126.7196267,90.763,False,550315177
22579,262304510,2679647534,2679647531,yes,"LINESTRING (126.6566722999999968 34.3845864999999975, 126.6563412999999940 34.3845444999999970)",34.3845865,126.6566723,34.3845445,126.6563413,30.731,True,262304510
22589,262304510,2679647531,2679647534,yes,"LINESTRING (126.6563412999999940 34.3845444999999970, 126.6566722999999968 34.3845864999999975)",34.3845445,126.6563413,34.3845865,126.6566723,30.731,False,262304510
22848,262315647,2679909847,2679909827,yes,"LINESTRING (126.6512249999999966 34.3918227999999999, 126.6512885000000068 34.3916735000000031)",34.3918228,126.651225,34.3916735,126.6512885,17.594,False,262315647
22850,262315647,2679909827,2679909847,yes,"LINESTRING (126.6512885000000068 34.3916735000000031, 126.6512249999999966 34.3918227999999999)",34.3916735,126.6512885,34.3918228,126.651225,17.594,True,262315647
23027,827580518,2681487916,7726182405,yes,"LINESTRING (126.5981124000000051 34.4168645000000026, 126.5979758999999945 34.4173411000000016)",34.4168645,126.5981124,34.4173411,126.5979759,54.455,False,827580518
23090,262494023,2681645902,2681645901,yes,"LINESTRING (126.5771747999999945 34.4273232999999976, 126.5769951000000049 34.4270751999999973)",34.4273233,126.5771748,34.4270752,126.5769951,32.136,False,262494023
23095,262494023,2681645901,2681645902,yes,"LINESTRING (126.5769951000000049 34.4270751999999973, 126.5771747999999945 34.4273232999999976)",34.4270752,126.5769951,34.4273233,126.5771748,32.136,True,262494023
23290,262504889,2681646166,2681646168,yes,"LINESTRING (126.5447273000000052 34.5016006000000033, 126.5432260999999983 34.5069329999999965)",34.5016006,126.5447273,34.506933,126.5432261,608.685,False,262504889
23291,717266456,2681646167,2681646165,yes,"LINESTRING (126.5429445999999984 34.5069099999999978, 126.5443496000000039 34.5017545999999982)",34.50691,126.5429446,34.5017546,126.5443496,587.535,False,717266456
23371,262504851,2681742644,2681742642,yes,"LINESTRING (126.5496270999999950 34.4422062000000011, 126.5492605999999967 34.4421864999999983)",34.4422062,126.5496271,34.4421865,126.5492606,33.68,True,262504851
23373,262504851,2681742642,2681742644,yes,"LINESTRING (126.5492605999999967 34.4421864999999983, 126.5496270999999950 34.4422062000000011)",34.4421865,126.5492606,34.4422062,126.5496271,33.68,False,262504851
23488,262504854,2681742762,2681742761,yes,"LINESTRING (126.5491769000000062 34.4546216999999970, 126.5489050000000049 34.4546048999999996)",34.4546217,126.5491769,34.4546049,126.548905,25.0,True,262504854
23492,262504854,2681742761,2681742762,yes,"LINESTRING (126.5489050000000049 34.4546048999999996, 126.5491769000000062 34.4546216999999970)",34.4546049,126.548905,34.4546217,126.5491769,25.0,False,262504854
23731,262504845,2681742913,2681742912,yes,"LINESTRING (126.5448690000000056 34.4975318999999985, 126.5452896999999979 34.4975282999999990)",34.4975319,126.544869,34.4975283,126.5452897,38.556,False,262504845
23735,262504845,2681742912,2681742913,yes,"LINESTRING (126.5452896999999979 34.4975282999999990, 126.5448690000000056 34.4975318999999985)",34.4975283,126.5452897,34.4975319,126.544869,38.556,True,262504845
23791,262504846,2681742944,2681742945,yes,"LINESTRING (126.5452750999999978 34.4988681999999969, 126.5448947999999945 34.4988732999999996)",34.4988682,126.5452751,34.4988733,126.5448948,34.855,False,262504846
23793,262504846,2681742945,2681742944,yes,"LINESTRING (126.5448947999999945 34.4988732999999996, 126.5452750999999978 34.4988681999999969)",34.4988733,126.5448948,34.4988682,126.5452751,34.855,True,262504846
24620,413997813,2805294769,2805294773,yes,"LINESTRING (126.6108226000000059 34.5634561000000033, 126.6101730999999972 34.5635361000000003)",34.5634561,126.6108226,34.5635361,126.6101731,60.136,True,413997813
24626,413997813,2805294773,2805294769,yes,"LINESTRING (126.6101730999999972 34.5635361000000003, 126.6108226000000059 34.5634561000000033)",34.5635361,126.6101731,34.5634561,126.6108226,60.136,False,413997813
24748,724892482,6798429051,6798429050,yes,"LINESTRING (126.5846114000000000 34.5631690000000020, 126.5849264999999946 34.5630864999999972)",34.563169,126.5846114,34.5630865,126.5849265,30.277,True,724892482
24752,724892482,6798429050,6798429051,yes,"LINESTRING (126.5849264999999946 34.5630864999999972, 126.5846114000000000 34.5631690000000020)",34.5630865,126.5849265,34.563169,126.5846114,30.277,False,724892482
26943,718021326,6417305602,437164653,yes,"LINESTRING (126.3141676999999987 34.6012363999999977, 126.3143184000000048 34.6014630000000025)",34.6012364,126.3141677,34.601463,126.3143184,28.725,False,718021326
34358,718042069,6743378325,6743378324,yes,"LINESTRING (126.6407851000000022 34.3972953000000032, 126.6405656999999962 34.3971550999999991)",34.3972953,126.6407851,34.3971551,126.6405657,25.461,True,718042069
35665,557300095,5374930169,5374930168,yes,"LINESTRING (126.3118453999999957 34.5826084999999992, 126.3120973999999990 34.5825985000000031)",34.5826085,126.3118454,34.5825985,126.3120974,23.097,True,557300095
35666,557300095,5374930168,5374930169,yes,"LINESTRING (126.3120973999999990 34.5825985000000031, 126.3118453999999957 34.5826084999999992)",34.5825985,126.3120974,34.5826085,126.3118454,23.097,False,557300095
35763,557400838,5375755350,5375755349,yes,"LINESTRING (126.2784716999999972 34.4855958999999999, 126.2782930999999991 34.4857404999999986)",34.4855959,126.2784717,34.4857405,126.2782931,22.945,True,557400838
35766,557400838,5375755349,5375755350,yes,"LINESTRING (126.2782930999999991 34.4857404999999986, 126.2784716999999972 34.4855958999999999)",34.4857405,126.2782931,34.4855959,126.2784717,22.945,False,557400838
36403,557417440,5375907887,5375907888,yes,"LINESTRING (126.3144173999999964 34.6149970999999965, 126.3140997999999939 34.6150700999999970)",34.6149971,126.3144174,34.6150701,126.3140998,30.176,False,557417440
36463,557417440,5375907888,5375907887,yes,"LINESTRING (126.3140997999999939 34.6150700999999970, 126.3144173999999964 34.6149970999999965)",34.6150701,126.3140998,34.6149971,126.3144174,30.176,True,557417440
36529,557417446,5375907985,5375907917,yes,"LINESTRING (126.3123097000000001 34.6260113000000018, 126.3121988000000044 34.6259707000000034)",34.6260113,126.3123097,34.6259707,126.3121988,11.106,True,557417446
36531,557417446,5375907917,5375907985,yes,"LINESTRING (126.3121988000000044 34.6259707000000034, 126.3123097000000001 34.6260113000000018)",34.6259707,126.3121988,34.6260113,126.3123097,11.106,False,557417446
36532,557417446,5375907918,5375907985,yes,"LINESTRING (126.3124205999999958 34.6260519000000002, 126.3123097000000001 34.6260113000000018)",34.6260519,126.3124206,34.6260113,126.3123097,11.106,True,557417446
36535,557417446,5375907985,5375907918,yes,"LINESTRING (126.3123097000000001 34.6260113000000018, 126.3124205999999958 34.6260519000000002)",34.6260113,126.3123097,34.6260519,126.3124206,11.106,False,557417446
39410,561833921,5416914168,5416914169,yes,"LINESTRING (126.2745002999999997 34.5724000000000018, 126.2744507999999968 34.5726038999999972)",34.5724,126.2745003,34.5726039,126.2744508,23.121,False,561833921
39412,561833921,5416914169,5416914168,yes,"LINESTRING (126.2744507999999968 34.5726038999999972, 126.2745002999999997 34.5724000000000018)",34.5726039,126.2744508,34.5724,126.2745003,23.121,True,561833921
46662,685641324,6425708269,6425708271,yes,"LINESTRING (126.6255488999999983 34.5652017999999970, 126.6325389000000001 34.5653681000000006)",34.5652018,126.6255489,34.5653681,126.6325389,640.32,False,685641324
46665,685641327,6425708272,6425708270,yes,"LINESTRING (126.6321953000000065 34.5656223000000011, 126.6255098000000032 34.5654911000000027)",34.5656223,126.6321953,34.5654911,126.6255098,612.343,False,685641327
55924,717003433,6734151981,6734151980,yes,"LINESTRING (126.4254391000000055 34.5736714000000021, 126.4256795999999952 34.5738370999999987)",34.5736714,126.4254391,34.5738371,126.4256796,28.711,True,717003433
55925,717003433,6734151980,6734151981,yes,"LINESTRING (126.4256795999999952 34.5738370999999987, 126.4254391000000055 34.5736714000000021)",34.5738371,126.4256796,34.5736714,126.4254391,28.711,False,717003433
56238,717003443,6734160789,6734160788,yes,"LINESTRING (126.4226474000000024 34.5693282000000011, 126.4225016000000039 34.5695247000000023)",34.5693282,126.4226474,34.5695247,126.4225016,25.605,True,717003443
56239,717003443,6734160788,6734160789,yes,"LINESTRING (126.4225016000000039 34.5695247000000023, 126.4226474000000024 34.5693282000000011)",34.5695247,126.4225016,34.5693282,126.4226474,25.605,False,717003443
60018,718042069,6743378324,6743378325,yes,"LINESTRING (126.6405656999999962 34.3971550999999991, 126.6407851000000022 34.3972953000000032)",34.3971551,126.6405657,34.3972953,126.6407851,25.461,False,718042069
62324,719331656,6753104467,6753104468,yes,"LINESTRING (126.5825590000000034 34.5558534999999978, 126.5827282999999994 34.5556947999999977)",34.5558535,126.582559,34.5556948,126.5827283,23.49,False,719331656
64472,720152521,6758990226,6758990225,yes,"LINESTRING (126.5354250000000036 34.5864655000000027, 126.5354454000000004 34.5867118999999974)",34.5864655,126.535425,34.5867119,126.5354454,27.462,True,720152521
64473,720152521,6758990225,6758990226,yes,"LINESTRING (126.5354454000000004 34.5867118999999974, 126.5354250000000036 34.5864655000000027)",34.5867119,126.5354454,34.5864655,126.535425,27.462,False,720152521
72935,724117267,6791116742,6791116741,yes,"LINESTRING (126.5504442000000012 34.4652474999999967, 126.5507056000000006 34.4652091000000027)",34.4652475,126.5504442,34.4652091,126.5507056,24.342,True,724117267
72936,724117267,6791116741,6791116742,yes,"LINESTRING (126.5507056000000006 34.4652091000000027, 126.5504442000000012 34.4652474999999967)",34.4652091,126.5507056,34.4652475,126.5504442,24.342,False,724117267
74039,724310983,6792799874,6792799873,yes,"LINESTRING (126.5451546999999977 34.5119806000000011, 126.5448200000000014 34.5122495999999970)",34.5119806,126.5451547,34.5122496,126.54482,42.839,True,724310983`



    const handleAddDataToMap2 = () => {

        store.dispatch(addDataToMap({
            datasets: {
                info: {
                    label: 'Seoul City CSV',
                    id: 'test_data_csv'
                },
                data: processCsvData(testData)
            }
        }));
    };


    const geojson = {
        "type" : "FeatureCollection",
        "features" : [{
            "type" : "Feature",
            "properties" : {
                "capacity" : "10",
                "type" : "U-Rack"
            },
            "geometry" : {
                "type" : "Point",
                "coordinates" : [ -71.073283, 42.417500 ]
            }
        }]
    };

    const handleAddDataToMap3 = () => {

        store.dispatch(addDataToMap({
            datasets: {
                info: {
                    label: 'Seoul City geojson',
                    id: 'test_data_geojson'
                },
                data: processGeojson(geojson)
            }
        }));
    };


    return (
        <div>
            <button onClick={handleDataUpdate}>Add Data1</button>
            <button onClick={handleAddDataToMap}>Add Data2</button>
            <button onClick={handleAddDataToMap2}>Add Data3</button>
            <button onClick={handleAddDataToMap3}>Add Data4</button>
            <KeplerGl
                id="map"
                width={"100%"}
                height={height}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                // 초기 데이터를 props로 전달

            />
        </div>
    )
};


export default withRouter(LocationProfileMap)