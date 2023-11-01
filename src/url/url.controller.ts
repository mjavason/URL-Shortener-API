import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Query,
  UseGuards,
  Get,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { URLService } from './url.service';
import { CreateURLDto, UpdateURLDto, GetURLsDto, URLIdDto } from './url.dto';
import {
  ApiResponse,
  ApiOperation,
  ApiTags,
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { ResponseDto } from 'src/dto';
import { SuccessResponse } from 'src/helpers/response.helper';
import { IURL } from './url.interface';
import { MESSAGES } from 'src/constants';
import { ResponseData } from 'src/interfaces/response.interface';

@Controller('urls')
@ApiTags('URLs')
// @ApiBearerAuth('jwt')
@ApiResponse({
  status: HttpStatus.OK,
  type: ResponseDto,
  description: 'Successful response with data',
})
@ApiInternalServerErrorResponse({ description: MESSAGES.INTERNAL_ERROR })
@ApiBadRequestResponse({ description: MESSAGES.BAD_PARAMETERS })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
// @UseGuards(JwtAuthGuard)
export class URLController {
  constructor(private readonly urlService: URLService) {}

  // Create a new URL
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new URL' })
  @ApiBody({ type: CreateURLDto })
  async create(@Body() body: CreateURLDto): Promise<ResponseData<IURL>> {
    const data = await this.urlService.create(body);

    if (!data) throw new InternalServerErrorException();

    return SuccessResponse(data);
  }

  // Get a list of all URLs with optional pagination
  @Get('all/:pagination')
  @ApiOperation({ summary: 'Get a list of all URLs with optional pagination' })
  async getAll(@Param() param: GetURLsDto): Promise<ResponseData<IURL[]>> {
    let { pagination } = param;
    if (!pagination) pagination = 1;

    pagination = (pagination - 1) * 10;
    const data = await this.urlService.getAll(pagination);

    if (!data) throw new InternalServerErrorException();
    if (data.length === 0) throw new NotFoundException();

    return SuccessResponse(data);
  }

  // Update an existing URL
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing URL' })
  @ApiBody({ type: UpdateURLDto })
  @ApiOkResponse({ type: URL })
  async update(
    @Param() param: URLIdDto,
    @Body() body: UpdateURLDto,
  ): Promise<ResponseData<IURL>> {
    const { id } = param;

    const data = await this.urlService.update({ _id: id }, body);

    if (!data) throw new NotFoundException();

    return SuccessResponse(data, MESSAGES.UPDATED);
  }

  // Soft delete a URL
  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a URL' })
  @ApiOkResponse({ type: URL })
  async softDelete(@Param() param: URLIdDto): Promise<ResponseData<IURL>> {
    const { id } = param;

    const data = await this.urlService.softDelete({ _id: id });

    if (!data) throw new NotFoundException();

    return SuccessResponse(data, MESSAGES.DELETED);
  }

  // Hard delete a URL (for admins only)
  @Delete(':id/hard')
  @ApiOperation({ summary: 'Hard delete a URL (for admins only)' })
  @ApiOkResponse({ type: URL })
  async hardDelete(@Param() param: URLIdDto): Promise<ResponseData<IURL>> {
    const { id } = param;

    const data = await this.urlService.hardDelete({ _id: id });

    if (!data) throw new NotFoundException();

    return SuccessResponse(data, MESSAGES.DELETED);
  }

  // Check if URLs exist based on search criteria
  @Get('exists')
  @ApiOperation({ summary: 'Check if URLs exist based on search criteria' })
  @ApiOkResponse({ type: URL })
  async exists(@Query() query: GetURLsDto): Promise<ResponseData<any>> {
    const data = await this.urlService.exists(query);

    // If nothing exists, return 'false'
    if (!data) return SuccessResponse(false);

    return SuccessResponse(data);
  }

  // Get the count of URLs based on search criteria
  @Get('count')
  @ApiOperation({ summary: 'Get the count of URLs based on search criteria' })
  @ApiOkResponse({ type: URL })
  async getCount(@Query() query: GetURLsDto): Promise<ResponseData<number>> {
    const data = await this.urlService.getCount(query);

    // If nothing exists, return 0 as the count
    if (!data) return SuccessResponse(0);

    return SuccessResponse(data);
  }

  // Redirect to the original URL
  @Get(':shortCode')
  @ApiOperation({ summary: 'Redirect to the original URL' })
  @ApiOkResponse({ type: URL })
  async redirect(
    @Param('shortCode') shortCode: string,
    @Res() res: Response,
  ): Promise<void> {
    const shortenedURL = await this.urlService.findOne({
      short_code: shortCode,
    });
    if (!shortenedURL) throw new NotFoundException('Short URL not found');

    // shortenedURL.click_count++;
    // await shortenedURL.save;

    // Update the click count (issue. This increases the click count by 2)
    await this.urlService.update({ _id: shortenedURL._id }, { $inc: { click_count: 1 } });

    // Perform redirection to the original URL
    res.redirect(302, shortenedURL.original_url); // 302 is the HTTP status code for temporary redirection
  }
}
