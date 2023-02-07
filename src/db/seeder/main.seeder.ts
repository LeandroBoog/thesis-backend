import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { faker } from '@faker-js/faker';

import { ArgumentModel } from '../models/argument.model';
import { CookieModel } from '../models/cookie.model';
import { CrawlSessionModel } from '../models/crawl-session.model';
import { FlowModel } from '../models/flow.model';
import { TaintModel } from '../models/taint.model';
import { TaintReportModel } from '../models/taint-report.model';
import { WebsiteModel } from '../models/website.model';

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ) {
    const sessions = await factoryManager.get(CrawlSessionModel).saveMany(5);

    const websites = await this.createAndAddToRelation({
      amount: 100,
      foreignKey: 'crawlSession',
      associateTo: sessions,
      factory: await factoryManager.get(WebsiteModel),
      repository: dataSource.getRepository(WebsiteModel),
    });

    const cookies = await this.createAndAddToRelation({
      amount: 100,
      foreignKey: 'website',
      associateTo: websites,
      factory: await factoryManager.get(CookieModel),
      repository: dataSource.getRepository(CookieModel),
    });

    const taintReports = await this.createAndAddToRelation({
      amount: 50,
      foreignKey: 'website',
      associateTo: websites,
      factory: await factoryManager.get(TaintReportModel),
      repository: dataSource.getRepository(TaintReportModel),
    });

    const taints = await this.createAndAddToRelation({
      amount: 70,
      foreignKey: 'taintReport',
      associateTo: taintReports,
      factory: await factoryManager.get(TaintModel),
      repository: dataSource.getRepository(TaintModel),
    });

    const flows = await this.createAndAddToRelation({
      amount: 1000,
      foreignKey: 'taint',
      associateTo: taints,
      factory: await factoryManager.get(FlowModel),
      repository: dataSource.getRepository(FlowModel),
    });

    await this.createAndAddToRelation({
      amount: 10000,
      foreignKey: 'flow',
      associateTo: flows,
      factory: await factoryManager.get(ArgumentModel),
      repository: dataSource.getRepository(ArgumentModel),
    });
  }

  async createAndAddToRelation({
    amount,
    foreignKey,
    associateTo,
    factory,
    repository,
  }) {
    const madeEntries = await Promise.all(
      Array(amount)
        .fill('')
        .map(() => faker.helpers.arrayElement(associateTo))
        .map(async (randomAssociate) => {
          const params = {};
          params[foreignKey] = randomAssociate;
          return await factory.make(params);
        }),
    );
    return await repository.save(madeEntries);
  }
}
