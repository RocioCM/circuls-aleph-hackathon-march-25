import request from '@/common/services/request';
import { RecyclingHistoryItem, Metrics } from './types';

const HomeServices = {
  getMetrics: () => request<Metrics>('/recycling-orders/metrics'),
  getHistory: () =>
    request<RecyclingHistoryItem[]>('/recycling-orders/history'),
};

export default HomeServices;
