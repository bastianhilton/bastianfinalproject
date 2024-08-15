export const filterNewsfeed = (posts, filters) => {
  const { type, group, author } = filters;

  // Early return if no filters are provided
  if (!type && !group && !author) {
    return posts;
  }

  // Create a Set for efficient author and group lookups
  const authorSet = author ? new Set([author]) : null;
  const groupSet = group ? new Set([group]) : null;

  return posts.filter((post) => {
    // Filter by post type
    if (type && post.type !== type) {
      return false;
    }

    // Filter by group
    if (groupSet && post.group && !groupSet.has(post.group.id)) {
      return false;
    }

    // Filter by author
    if (authorSet && !authorSet.has(post.author.id)) {
      return false;
    }

    return true;
  });
};
