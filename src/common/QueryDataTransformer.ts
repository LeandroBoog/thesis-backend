import { SessionEntity } from '../statistics/entities/session.entity';

export class QueryDataTransformer {
  static transformMostUsedSinks(data) {
    const keys = ['sink', 'total'];
    return QueryDataTransformer.transformSessionData(data, keys);
  }

  static transformMostCommonUsedScripts(data) {
    const keys = ['script', 'total'];
    return QueryDataTransformer.transformSessionData(data, keys);
  }

  static transformWebsiteWithMostGhostwriting(data) {
    const keys = ['url', 'total'];
    return QueryDataTransformer.transformSessionData(data, keys);
  }

  static transformTotalFlowsWithRelevantSource(data) {
    return QueryDataTransformer.transformSingleCountData(data);
  }
  static transformTotalGhostwritingReports(data) {
    return QueryDataTransformer.transformSingleCountData(data);
  }

  static transformSingleCountData(data) {
    return data.map((result) => ({
      session: new SessionEntity(result),
      total: result.total,
    }));
  }

  static transformSessionData(queryResults, keysOfDataToAdd) {
    const sessions = {};
    queryResults
      .map((queryResults) => new SessionEntity(queryResults))
      .forEach((session) => {
        const id = session.crawl_id;
        !(id in sessions) && (sessions[id] = { session, data: [] });
        sessions[id].data.push(
          keysOfDataToAdd.reduce(
            (obj, key) => ({ ...obj, [key]: session[key] }),
            {},
          ),
        );
      });

    return Object.values(sessions);
  }
}
