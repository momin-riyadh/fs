import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Prisma client lifecycle integration for NestJS.
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    // Open the Prisma connection when the module initializes.
    async onModuleInit() {
        await this.$connect();
    }

    // Close the Prisma connection on shutdown.
    async onModuleDestroy() {
        await this.$disconnect();
    }
}
