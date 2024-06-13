import React, {lazy, Suspense, useEffect, useState} from "react";
import {Card} from "antd";
import PageTitle from "@src/components/common/PageTitle";
import {addDataToMap, updateMap} from "@kepler.gl/actions";
import {store} from "@src/index";
import {processCsvData} from "@kepler.gl/processors";

const CustomKeplerMap = lazy(() => import("@src/components/common/CustomKeplerMap"));


interface State {
}

interface Props {

}

const PlugProfileMap = (props: Props): React.ReactElement => {

    const [data, setData] = useState([]);

    const testData = `no,eid,source,target,tunnel,geometry,source_lt,source_ln,target_lt,target_ln,length,reversed,eid_idx     
20720,166681831,1781121772,1781121730,yes,"LINESTRING (126.9889 37.5658, 126.9889 37.5658)",37.5658,126.9889,37.5658,126.9889,60.903,False,166681831 
20720,166681831,1781121772,1781121730,yes,"LINESTRING (126.9889 37.5658, 126.9889 37.5658)",37.5658,126.9889,37.5658,126.9889,60.903,False,166681831`


    useEffect(() => {

        store.dispatch(updateMap({
            latitude: 37.5658, longitude: 126.9889, // 캐롯 좌표
        }))

        store.dispatch(addDataToMap({
            datasets: {
                info: {
                    label: 'Seoul City CSV',
                    id: 'test_data_csv'
                },
                data: processCsvData(testData)
            }
        }));

    }, []);


    return (
        <div>
            <PageTitle
                title="Plug Profile Map"
                description={[

                ]}

            />
            <Card>
                <Suspense fallback={<div>Loading Map...</div>}>
                    <CustomKeplerMap
                        heightRatio={70}
                        id={"plugMap"}
                    />
                </Suspense>

            </Card>

        </div>
    )


};

export default PlugProfileMap