// import { PartialType } from '@nestjs/mapped-types';

// export class CreateUrlDto {}

// export class UpdateUrlDto extends PartialType(CreateUrlDto) {}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsUrl,
  IsOptional,
  IsInt,
} from 'class-validator';
import { IsObjectIdOrHexString } from 'src/decorators/is_object_id.decorator';

export class CreateURLDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  original_url: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  short_code: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  expires_in: number;
}

export class UpdateURLDto {
  @ApiProperty()
  @IsOptional()
  @IsUrl()
  original_url: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  short_code: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  expires_in: number;
}

export class GetURLsDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  pagination: number;
}

export class URLIdDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsObjectIdOrHexString()
  id: string;
}
