export class QueryDataTransformer {
  static transformSingleCountData(data) {
    return data.map((result) => ({
      sessionId: result.crawl_id,
      total: result.total,
    }));
  }

  static transformQueryWithDoubleGroupByKeys(keys, query) {
    const sessions = {};
    query.forEach((session) => {
      const id = session.crawl_id;
      !(id in sessions) && (sessions[id] = { sessionId: id, data: [] });
      sessions[id].data.push(
        keys.reduce((obj, key) => ({ ...obj, [key]: session[key] }), {}),
      );
    });

    return Object.values(sessions);
  }
}
