import { DateTime } from 'luxon';

export const TODAY_DATE_STRING = DateTime.now().toString().split('T')[0];
export const MS_IN_MONTH = 2629746000;