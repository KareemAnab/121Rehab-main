export type InsuranceRegion = {
  key: string;
  label: string;
  heading: string;
  blurb: string;
  plans: string[];
};

export const insuranceRegions: InsuranceRegion[] = [
  {
    key: "ca",
    label: "California",
    heading: "California Plans",
    blurb:
      "We accept many commercial and government insurance plans in California. Coverage varies by plan, so our team will verify your benefits before starting care.",
    plans: [
      "Aetna",
      "Anthem Blue Cross",
      "Blue Shield of California",
      "Cigna",
      "First Health",
      "Health Net",
      "Humana",
      "Medicare",
      "Medi-Cal (select managed care plans)",
      "Tricare",
      "UnitedHealthcare",
      "Workers’ Compensation plans (case-by-case)",
      "Self-pay / cash-pay packages",
    ],
  },
  {
    key: "nv",
    label: "Nevada",
    heading: "Nevada Plans",
    blurb:
      "We work with many local and national insurance plans in Nevada. Our team will confirm eligibility, visit limits, and any prior authorization requirements before you begin treatment.",
    plans: [
      "Access HealthNet",
      "Aetna",
      "Alignment Health",
      "Ambetter (through SilverSummit)",
      "Blue Cross Blue Shield",
      "Cigna",
      "Clark County School District plans",
      "Health Plan of Nevada",
      "Humana",
      "Medicaid (select managed care plans)",
      "Medicare",
      "Sierra Health & Life",
      "UnitedHealthcare",
      "Workers’ Compensation plans (case-by-case)",
      "Self-pay / cash-pay packages",
    ],
  },
];
