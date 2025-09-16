import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ChatDto {
  @ApiProperty({ example: 1, description: 'ID do usuário' })
  @IsNumber()
  userId: number;  

  @ApiProperty({ example: 'Quais são minhas metas neste curso?', description: 'Mensagem do usuário' })
  @IsString()
  message: string;
}