import { format } from 'date-fns';

export const formatDateTime = (isoString: string, pattern = 'dd/MM/yyyy hh:mm') => {
  return format(new Date(isoString), pattern);
};
