import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { faker } from '@faker-js/faker';

import { FlowArgumentModel } from '../models/flow-argument.model';
import { WebsiteCookieModel } from '../models/website-cookie.model';
import { CrawlSessionModel } from '../models/crawl-session.model';
import { FlowModel } from '../models/flow.model';
import { TaintModel } from '../models/taint.model';
import { TaintReportModel } from '../models/taint-report.model';
import { WebsiteModel } from '../models/website.model';
import { WebsiteCookieCollisionUrlModel } from '../models/website-cookie-collision-url.model';
import { WebsiteCookieCollisionModel } from '../models/website-cookie-collision.model';
import { GhostwritingPartnerModel } from '../models/ghostwriting-partner.model';
import { GhostwritingPartnerCookieModel } from '../models/ghostwriting-partner-cookie.model';
import { GhostwritingPartnerUrlModel } from '../models/ghostwriting-partner-url.model';

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ) {
    const amountOfSessions = 5;
    const amountOfWebsites = amountOfSessions * 5;
    const amountOfCookies = amountOfWebsites * 10;
    const amountOfCookieCollisions = amountOfWebsites * 3;
    const amountOfUrls = amountOfCookieCollisions * 2;
    const amountOfTaintReports = amountOfWebsites * 5;
    const amountOfTaints = amountOfTaintReports * 2;
    const amountOfFlows = amountOfTaints * 10;
    const amountOfArguments = amountOfFlows * 3;
    const amountOfGhostwrittenPartners = amountOfTaintReports * 2;
    const amountOfGhostwrittenCookies = amountOfGhostwrittenPartners * 3;

    const sessions = await factoryManager
      .get(CrawlSessionModel)
      .saveMany(amountOfSessions);

    const websites = await this.createAndAddToRelation({
      amount: amountOfWebsites,
      foreignKey: 'crawlSession',
      associateTo: sessions,
      factory: await factoryManager.get(WebsiteModel),
      repository: dataSource.getRepository(WebsiteModel),
    });

    const cookies = await this.createAndAddToRelation({
      amount: amountOfCookies,
      foreignKey: 'website',
      associateTo: websites,
      factory: await factoryManager.get(WebsiteCookieModel),
      repository: dataSource.getRepository(WebsiteCookieModel),
    });

    const cookieCollisions = await this.createAndAddToRelation({
      amount: amountOfCookieCollisions,
      foreignKey: 'website',
      associateTo: websites,
      factory: await factoryManager.get(WebsiteCookieCollisionModel),
      repository: dataSource.getRepository(WebsiteCookieCollisionModel),
    });

    const cookieCollisionUrls = await this.createAndAddToRelation({
      amount: amountOfUrls,
      foreignKey: 'cookieCollision',
      associateTo: cookieCollisions,
      factory: await factoryManager.get(WebsiteCookieCollisionUrlModel),
      repository: dataSource.getRepository(WebsiteCookieCollisionUrlModel),
    });

    const taintReports = await this.createAndAddToRelation({
      amount: amountOfTaintReports,
      foreignKey: 'website',
      associateTo: websites,
      factory: await factoryManager.get(TaintReportModel),
      repository: dataSource.getRepository(TaintReportModel),
    });

    const taints = await this.createAndAddToRelation({
      amount: amountOfTaints,
      foreignKey: 'taintReport',
      associateTo: taintReports,
      factory: await factoryManager.get(TaintModel),
      repository: dataSource.getRepository(TaintModel),
    });

    const flows = await this.createAndAddToRelation({
      amount: amountOfFlows,
      foreignKey: 'taint',
      associateTo: taints,
      factory: await factoryManager.get(FlowModel),
      repository: dataSource.getRepository(FlowModel),
    });

    await this.createAndAddToRelation({
      amount: amountOfArguments,
      foreignKey: 'flow',
      associateTo: flows,
      factory: await factoryManager.get(FlowArgumentModel),
      repository: dataSource.getRepository(FlowArgumentModel),
    });

    const ghostwritingPartners = await this.createAndAddToRelation({
      amount: amountOfGhostwrittenPartners,
      foreignKey: 'taintReport',
      associateTo: taintReports,
      factory: await factoryManager.get(GhostwritingPartnerModel),
      repository: dataSource.getRepository(GhostwritingPartnerModel),
    });

    const ghostwritingPartnerCookies = await this.createAndAddToRelation({
      amount: amountOfGhostwrittenCookies,
      foreignKey: 'ghostwritingPartner',
      associateTo: ghostwritingPartners,
      factory: await factoryManager.get(GhostwritingPartnerCookieModel),
      repository: dataSource.getRepository(GhostwritingPartnerCookieModel),
    });

    const ghostwritingPartnerUrls = await this.createAndAddToRelation({
      amount: amountOfGhostwrittenCookies * 2,
      foreignKey: 'ghostwritingPartner',
      associateTo: ghostwritingPartners,
      factory: await factoryManager.get(GhostwritingPartnerUrlModel),
      repository: dataSource.getRepository(GhostwritingPartnerUrlModel),
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
