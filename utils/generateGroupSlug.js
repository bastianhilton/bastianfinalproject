import { slugify } from './slugify';

export const generateGroupSlug = (name, existingSlugMap) => {
  let slug = slugify(name);

  // Check if the slug already exists
  if (existingSlugMap[slug]) {
    let counter = 1;
    let uniqueSlug = `${slug}-${counter}`;

    while (existingSlugMap[uniqueSlug]) {
      counter++;
      uniqueSlug = `${slug}-${counter}`;
    }

    slug = uniqueSlug;
  }

  return slug;
};
