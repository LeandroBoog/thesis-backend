import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';

import { FlowArgumentModel } from '../models/flow-argument.model';
import { WebsiteCookieModel } from '../models/website-cookie.model';
import { CrawlSessionModel } from '../models/crawl-session.model';
import { FlowModel } from '../models/flow.model';
import { TaintModel } from '../models/taint.model';
import { TaintReportModel } from '../models/taint-report.model';
import { WebsiteModel } from '../models/website.model';

import { FlowArgumentFactory } from '../factories/flow-argument.factory';
import { WebsiteCookieFactory } from '../factories/website-cookie.factory';
import { CrawlSessionFactory } from '../factories/crawl-session.factory';
import { FlowFactory } from '../factories/flow.factory';
import { TaintFactory } from '../factories/taint.factory';
import { TaintReportFactory } from '../factories/taint-report.factory';
import { WebsiteFactory } from '../factories/website.factory';

import { MainSeeder } from './main.seeder';
import { WebsiteCookieCollisionModel } from '../models/website-cookie-collision.model';
import { GhostwritingPartnerModel } from '../models/ghostwriting-partner.model';
import { GhostwritingPartnerCookieModel } from '../models/ghostwriting-partner-cookie.model';
import { WebsiteCookieCollisionUrlModel } from '../models/website-cookie-collision-url.model';
import { WebsiteCookieCollisionFactory } from '../factories/website-cookie-collision.factory';
import { GhostwritingPartnerFactory } from '../factories/ghostwriting-partner.factory';
import { GhostwritingPartnerCookieFactory } from '../factories/ghostwriting-partner-cookie.factory';
import { WebsiteCookieCollisionUrlFactory } from '../factories/website-cookie-collision-url.factory';
import { GhostwritingPartnerUrlFactory } from '../factories/ghostwriting-partner-url.factory';
import { GhostwritingPartnerUrlModel } from '../models/ghostwriting-partner-url.model';

const options: DataSourceOptions & SeederOptions = {
  type: 'better-sqlite3',
  database: 'database/database.sqlite',
  entities: [
    FlowArgumentModel,
    WebsiteCookieModel,
    WebsiteCookieCollisionModel,
    CrawlSessionModel,
    FlowModel,
    GhostwritingPartnerModel,
    GhostwritingPartnerCookieModel,
    GhostwritingPartnerUrlModel,
    TaintModel,
    TaintReportModel,
    WebsiteCookieCollisionUrlModel,
    WebsiteModel,
  ],
  factories: [
    FlowArgumentFactory,
    WebsiteCookieFactory,
    WebsiteCookieCollisionFactory,
    CrawlSessionFactory,
    FlowFactory,
    GhostwritingPartnerFactory,
    GhostwritingPartnerCookieFactory,
    GhostwritingPartnerUrlFactory,
    TaintFactory,
    TaintReportFactory,
    WebsiteCookieCollisionUrlFactory,
    WebsiteFactory,
  ],
  seeds: [MainSeeder],
};

const dataSource = new DataSource(options);

dataSource.initialize().then(async () => {
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
});
