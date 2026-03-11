/**
 * Template URL mappings for Next.js rewrites
 * Add your template configurations here
 */

export interface TemplateConfig {
  name: string;
  url: string;
}

export const templates: TemplateConfig[] = [
  {
    name: "fractional-ai-website-template",
    url: "https://fractional.oneupai.com",
  },
  {
    name: "lawncare-ai-website-template",
    url: "https://lawncare.oneupai.com",
  },
  {
    name: "movers-ai-website-template",
    url: "https://moving.oneupai.com",
  },
  {
    name: "hvac-ai-website-template",
    url: "https://hvac.oneupai.com",
  },
  {
    name: "contractor-ai-website-template",
    url: "https://contractor.oneupai.com",
  },
  {
    name: "cleaning-ai-website-template",
    url: "https://cleaning.oneupai.com",
  },
  // Add more templates here:
  // {
  //   name: "template-slug",
  //   url: "https://example.com",
  // },
];
