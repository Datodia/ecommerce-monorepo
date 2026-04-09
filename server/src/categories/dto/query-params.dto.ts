import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString, Max, Min } from "class-validator";


export class QueryParamsDto{
    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    @Min(1)
    page: number = 1;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    @Max(30)
    limit: number = 30;

    @IsOptional()
    @IsString()
    category?: string 
}