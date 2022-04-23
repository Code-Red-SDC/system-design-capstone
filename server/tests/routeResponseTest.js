import http from 'k6/http';
import { Trend } from 'k6/metrics';

const getProductsTrend = new Trend('Get Products');
const getProductTrend = new Trend('Get Product by ID');
const getStylesTrend = new Trend('Get Styles by ID');
const getRelatedTrend = new Trend('Get Related by ID');

export const options = {
  InsecureSkipTLSVerify: true,
  noConnectionReuse: false,
};

export default () => {
  const API = 'http://127.0.0.1:5000/products';
  const productId = Math.floor(Math.random() * 1000011);

  const requests = {
    'Get Products': {
      method: 'GET',
      url: API,
    },
    'Get Product by ID': {
      method: 'GET',
      url: `${API}/${productId}`,
    },
    'Get Styles by ID': {
      method: 'GET',
      url: `${API}/${productId}/styles`,
    },
    'Get Related by ID': {
      method: 'GET',
      url: `${API}/${productId}/related`,
    },
  };

  const responses = http.batch(requests);
  const getProductsResp = responses['Get Products'];
  const getProductResp = responses['Get Product by ID'];
  const getStylesResp = responses['Get Styles by ID'];
  const getRelatedResp = responses['Get Related by ID'];

  getProductsTrend.add(getProductsResp.timings.duration);
  getProductTrend.add(getProductResp.timings.duration);
  getStylesTrend.add(getStylesResp.timings.duration);
  getRelatedTrend.add(getRelatedResp.timings.duration);
};
