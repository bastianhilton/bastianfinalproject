export const sortNewsfeed = (posts, sortBy = 'date', order = 'desc') => {
    return posts.slice().sort((a, b) => {
      const valueA = typeof a[sortBy] === 'string' ? a[sortBy].toLowerCase() : a[sortBy];
      const valueB = typeof b[sortBy] === 'string' ? b[sortBy].toLowerCase() : b[sortBy];
  
      if (valueA < valueB) {
        return order === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };
  