import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TaintReportEntity } from './entities/taint-report.entity';
import { WebsiteEntity } from './entities/website.entity';
import { CookieEntity } from './entities/cookie.entity';

import { CreateWebsiteDto } from './dto/create-website.dto';

@Injectable()
export class TaintReportService {
  constructor(
    @InjectRepository(TaintReportEntity)
    private taintReportRepository: Repository<TaintReportEntity>,
    @InjectRepository(WebsiteEntity)
    private websiteRepository: Repository<WebsiteEntity>,
    @InjectRepository(CookieEntity)
    private cookieRepository: Repository<CookieEntity>,
  ) {}

  async create(createWebsiteDto: CreateWebsiteDto) {
    try {
      const website = await this.findOne({ url: createWebsiteDto.url });
      const newTaintReports = await this.taintReportRepository.save(
        createWebsiteDto.taintReports,
      );
      website.taintReports.push(...newTaintReports);
      const newCookies = await this.cookieRepository.save(
        createWebsiteDto.cookies,
      );
      website.cookies.push(...newCookies);
      return await this.websiteRepository.save(website);
    } catch (_) {
      return await this.websiteRepository.save({
        url: createWebsiteDto.url,
        taintReports: createWebsiteDto.taintReports,
        cookies: createWebsiteDto.cookies,
      });
    }
  }

  findAll() {
    return `This action returns all taintReport`;
  }

  async findOne(query) {
    return await this.websiteRepository.findOneOrFail(query);
  }

  remove(id: number) {
    return `This action removes a #${id} taintReport`;
  }
}
