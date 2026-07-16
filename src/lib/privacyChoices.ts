export const PRIVACY_CHOICES_EVENT = 'achari:privacy-choices-open';

export function openAnalyticsChoices() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(PRIVACY_CHOICES_EVENT));
}
