import { checkCourseExpiry } from './jobs/checkCourseExpiry.js';

export const initCronJobs = () => {
  checkCourseExpiry();
};
