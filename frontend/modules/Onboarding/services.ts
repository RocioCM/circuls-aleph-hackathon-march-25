import request from '@/common/services/request';
import { Onboarding } from './types';

const OnboardingServices = {
  get: () => request<Onboarding>('/Onboarding'),
};

export default OnboardingServices;
