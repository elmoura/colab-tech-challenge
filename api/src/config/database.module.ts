import { Module } from "@nestjs/common";
import { getConfig } from "./vars";
import { MongooseModule } from "@nestjs/mongoose/dist/mongoose.module";

@Module({
    imports: [MongooseModule.forRoot(getConfig().mongoUri)],
})
export class DatabaseModule {}