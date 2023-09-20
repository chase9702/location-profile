import * as React from 'react';
import Typography from 'antd/lib/typography';

import './page-title.css';

const { Title } = Typography;

interface Props {
    title: string;
    description?: string[];
    extraDescription?: React.ReactNode | React.ReactNode[];
    extra?: React.ReactNode | React.ReactNode[];
}

const descFormat = (description: string[]) => {
    return description
        .slice(1)
        .reduce((acc, curr, index) => [...acc, <br key={index} />, '- ' + curr], ['- ' + description[0]]);
};

const PageTitle = (props: Props): React.ReactElement => {
    return (
        <Typography>
            <Title>
                {props.title}
                {props.extra && <span className="page-extra">{props.extra}</span>}
            </Title>
            {props.description && <div className="page-description">{descFormat(props.description)}</div>}
            {props.extraDescription && <div className="page-extra-description">{props.extraDescription}</div>}
        </Typography>
    );
};

export default PageTitle;
