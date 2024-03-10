export const ROLES = [
  { value: "Employer", label: "Employer" },
  { value: "Employee", label: "Employee" },
];

export const routesByRole = {
  Employer: "employees",
  Employee: "jobs",
  Admin: "jobs",
};

export const JOB_TAGS = [
  { value: "House cleaning", label: "House cleaning" },
  { value: "Office cleaning", label: "Office cleaning" },
  { value: "Stairwell cleaning", label: "Stairwell cleaning" },
  { value: "Garden cleaning", label: "Garden cleaning" },
  { value: "Maid services", label: "Maid services" },
];

export const JOB_SCOPES = [
  { value: "Full-time", label: "Full-time" },
  { value: "Part-time", label: "Part-time" },
  { value: "Once a week", label: "Once a week" },
  { value: "Twice a week", label: "Twice a week" },
  { value: "Flexible", label: "Flexible" },
];

export const SORT_BY = [
  { value: "Newest", label: "Newest" },
  { value: "Oldest", label: "Oldest" },
  { value: "Popular", label: "Popular" },
  { value: "a-z", label: "a-z" },
  { value: "z-a", label: "z-a" },
];

export const EXPERIENCE = [
  { label: "1-3 years", value: "1-3 years" },
  { label: "4-6 years", value: "4-6 years" },
  { label: "7+ years", value: "7+ years" },
];

export const RATES = [
  { label: "30-50 ₪ per hour", value: "30-50 ₪ per hour" },
  { label: "50-70 ₪ per hour", value: "50-70 ₪ per hour" },
  { label: "70-90 ₪ per hour", value: "70-90 ₪ per hour" },
  { label: "90-110 ₪ per hour", value: "90-110 ₪ per hour" },
  { label: "110+ ₪ per hour", value: "110+ ₪ per hour" },
];

export const LANGUAGES = [
  { label: "Hebrew", value: "Hebrew" },
  { label: "English", value: "English" },
  { label: "Russian", value: "Russian" },
  { label: "French", value: "French" },
  { label: "Spanish", value: "Spanish" },
  { label: "Arabic", value: "Arabic" },
];
