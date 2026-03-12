import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

class OriginalReport {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;
}

class Address {
  @Prop({ required: true })
  zipCode!: string;

  @Prop({ required: true })
  neighborhood!: string;

  @Prop({ required: true })
  street!: string;
}

export enum SeverityLevel {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

@Schema({ timestamps: true })
export class Report extends Document {
  @Prop({ required: true })
  category!: string;

  @Prop({
    required: true,
    enum: SeverityLevel,
  })
  severity!: SeverityLevel;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true })
  originalReport: OriginalReport;

  @Prop({ required: true })
  address!: Address;
}

export const ReportSchema = SchemaFactory.createForClass(Report);
