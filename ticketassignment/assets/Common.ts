/**
 * Formats a date string into a human-readable format.
 *
 * @param dateString - The date string to format.
 * @param withTime - Optional parameter to include time in the formatted output.
 * @returns The formatted date string.
 */
export const formatDate = (dateString: string, withTime: boolean = false): string => {
  const date = new Date(dateString);
  let structure: any = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  if (withTime) {
    structure = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
  }

  return new Intl.DateTimeFormat("en-US", structure).format(date);
};