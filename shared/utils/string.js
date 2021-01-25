function ellipsis(query, length = 20) {
  if (!query) {
    return;
  }

  if (query.length > length) {
    return `${query.substring(0, length)}...`;
  }

  return query;
}

export default ellipsis;
