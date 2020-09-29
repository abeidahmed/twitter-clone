import { format } from 'date-fns';

export function detailedDate(dateTime) {
  return format(new Date(dateTime), 'MMM dd, yyyy');
}

export function withPartialMonth(dateTime) {
  return format(new Date(dateTime), 'MMM dd');
}

export function withFullMonth(dateTime) {
  return format(new Date(dateTime), 'MMMM yyyy');
}

export function time12format(dateTime) {
  return format(new Date(dateTime), 'h:m a');
}
