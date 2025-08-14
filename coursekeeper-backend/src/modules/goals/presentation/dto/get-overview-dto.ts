import { ApiProperty } from "@nestjs/swagger";

export class GoalOverviewDto {
  @ApiProperty()  
  activeGoals: number;

  @ApiProperty()
  goalsCompleted: number;

  @ApiProperty()
  goalsRating: number;

  @ApiProperty()
  totalProgressInHours: number;

  @ApiProperty()
  totalGoalInHours: number;
}
