import {
	ArrayNotEmpty,
	IsArray,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	IsUUID,
	IsUrl,
} from 'class-validator';

export class CreateProductDto {
	@IsString()
	@IsNotEmpty()
	name!: string;

	@IsString()
	@IsOptional()
	description?: string;

	@IsNumber()
	price!: number;

	@IsString()
	@IsNotEmpty()
	@IsUrl()
	thumbnail!: string;

	@IsArray()
	@ArrayNotEmpty()
	@IsUrl({}, { each: true })
	images!: string[];

	@IsUUID()
	categoryId!: string;
}
