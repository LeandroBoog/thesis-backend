import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';

import { ArgumentModel } from '../models/argument.model';
import { CookieModel } from '../models/cookie.model';
import { CrawlSessionModel } from '../models/crawl-session.model';
import { FlowModel } from '../models/flow.model';
import { TaintModel } from '../models/taint.model';
import { TaintReportModel } from '../models/taint-report.model';
import { WebsiteModel } from '../models/website.model';

import { ArgumentFactory } from '../factories/argument.factory';
import { CookieFactory } from '../factories/cookie.factory';
import { CrawlSessionFactory } from '../factories/crawl-session.factory';
import { FlowFactory } from '../factories/flow.factory';
import { TaintFactory } from '../factories/taint.factory';
import { TaintReportFactory } from '../factories/taint-report.factory';
import { WebsiteFactory } from '../factories/website.factory';

import { MainSeeder } from './main.seeder';
import { CookieCollisionModel } from '../models/cookie-collision.model';
import { GhostwritingPartnerModel } from '../models/ghostwriting-partner.model';
import { GhostwrittenCookieModel } from '../models/ghostwritten-cookie.model';
import { UrlModel } from '../models/url.model';
import { CookieCollisionFactory } from '../factories/cookie-collision.factory';
import { GhostwritingPartnerFactory } from '../factories/ghostwriting-partner.factory';
import { GhostwrittenCookieFactory } from '../factories/ghostwritten-cookie.factory';
import { UrlFactory } from '../factories/url.factory';

const options: DataSourceOptions & SeederOptions = {
  type: 'better-sqlite3',
  database: 'database/database.sqlite',
  entities: [
    ArgumentModel,
    CookieModel,
    CookieCollisionModel,
    CrawlSessionModel,
    FlowModel,
    GhostwritingPartnerModel,
    GhostwrittenCookieModel,
    TaintModel,
    TaintReportModel,
    UrlModel,
    WebsiteModel,
  ],
  factories: [
    ArgumentFactory,
    CookieFactory,
    CookieCollisionFactory,
    CrawlSessionFactory,
    FlowFactory,
    GhostwritingPartnerFactory,
    GhostwrittenCookieFactory,
    TaintFactory,
    TaintReportFactory,
    UrlFactory,
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
