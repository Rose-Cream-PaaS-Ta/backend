import { Controller, Get } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { AwardeeService } from './awardee.service';
import { Awardee } from './classes/awardee.class';

@ApiUseTags('Awardee')
@Controller('api/awardee')
export class AwardeeController {
  constructor(private readonly awardeeService: AwardeeService) {
  }

  @Get()
  public root(): Promise<Awardee[]> {
    return this.awardeeService.getAwardee({});
  }
}
