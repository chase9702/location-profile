import axios from 'axios';
import { NotifyError } from '@src/components/common/Notification';

export const downloadFile = (blob: Blob, filename: string): void => {
  const nav = window.navigator as any;
  if (nav.msSaveOrOpenBlob) {
    nav.msSaveBlob(blob, filename);
  } else {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
};

export const downloadFileFromFrontendData = async (
  url: string,
  data
): Promise<void> => {
  const response = await axios.post(url, data, {
    responseType: 'arraybuffer',
    headers: {
      'Content-type': 'application/json',
      Accept:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    },
  });
  const filename = response.headers['content-disposition']
    .split(';')[1]
    .replace(' filename=', '');
  const blob = new Blob([response.data], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  downloadFile(blob, decodeURI(filename));
};

export const downloadChartData = async (
  columns: string[],
  chartData: any[],
  fileName: string
) => {
  const values = chartData.map((data) => {
    return Object.values(data);
  });
  try {
    await downloadFileFromFrontendData('/api/file/summary/data', {
      chartName: fileName,
      columns: columns,
      values: values,
    });
  } catch (e) {
    NotifyError(e);
  }
};
