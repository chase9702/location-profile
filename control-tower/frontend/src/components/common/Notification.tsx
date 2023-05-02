import * as React from 'react';
import {notification, Result, Typography} from 'antd';
// import { NotificationPlacement, IconType } from 'antd/es/notification';

export interface NotifyMessage {
    status?: number;
    error?: string;
    message: string;
    description?: string;
}

export interface NotifyArgs {
    btn?: React.ReactNode;
    key?: string;
    onClose?: () => void;
    duration?: number | null;
    icon?: React.ReactNode;
    // placement?: NotificationPlacement;
    style?: React.CSSProperties;
    prefixCls?: string;
    className?: string;
    // readonly type?: IconType;
    onClick?: () => void;
    top?: number;
    bottom?: number;
    getContainer?: () => HTMLElement;
}

export const Notify = (message: NotifyMessage, args?: NotifyArgs): void => {
    notification.open({ ...message, ...args });
};

const openNotification = (type: string, message: NotifyMessage, args?: NotifyArgs) => {
    notification[type]({ message: message.message, description: message.description, ...args });
};

export const NotifySuccess = (message: NotifyMessage, args?: NotifyArgs): void => {
    openNotification('success', message, args);
};

export const NotifyInfo = (message: NotifyMessage, args?: NotifyArgs): void => {
    openNotification('info', message, args);
};

export const NotifyWarning = (message: NotifyMessage, args?: NotifyArgs): void => {
    openNotification('warning', message, args);
};

const isString = (message): message is string => typeof message === 'string';

const makeErrorMessage = (message: NotifyMessage | string): NotifyMessage => {
    if (isString(message)) {
        return {
            message: '오류 발생',
            description: message,
        };
    }

    if (message.description == undefined) {
        return {
            message: message.error,
            description: message.message,
        };
    }

    return message;
};

export const NotifyError = (message: NotifyMessage | string, duration = 4.5, args?: NotifyArgs): void => {
    const errorMessage = makeErrorMessage(message);

    notification['error']({
        message: errorMessage.message,
        description: (
            <Typography.Paragraph copyable ellipsis={{ rows: 10, expandable: true }}>
                {errorMessage.description}
            </Typography.Paragraph>
        ),
        duration: duration,
        ...args,
    });
};

export const PageNotFound: React.FC = () => (
    <Result status="404" title="페이지 없음" subTitle="존재하지 않는 페이지입니다." />
);