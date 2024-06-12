import KeplerGl from '@kepler.gl/components';
import React, {useEffect, useState} from "react";


interface State {
}

interface Props {
    id: string,
    heightRatio?: number | null,
    height?: number | null
}

const CustomKeplerMap = (props: Props): React.ReactElement => {

    const [height, setHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleResize = () => setHeight(window.innerHeight - 100);
        window.addEventListener('resize', handleResize);
        if (props.height) {
            setHeight(props.height);
        } else if (props.heightRatio) {
            setHeight((window.innerHeight - 100) * (props.heightRatio * 0.01));
        }
        return () => window.removeEventListener('resize', handleResize);

    }, []);

    return (
        <div>
            <KeplerGl
                id={props.id}
                width={"100%"}
                height={height}
            />

        </div>
    )
}
export default CustomKeplerMap;