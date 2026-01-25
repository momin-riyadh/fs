import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

/**
 * Encapsulates contacts persistence with Prisma.
 */
@Injectable()
export class ContactsService {
  // Inject the Prisma client wrapper.
  constructor(private readonly prisma: PrismaService) {}

  // Create a contact record.
  create(data: CreateContactDto) {
    return this.prisma.contact.create({ data });
  }

  // Fetch all contacts ordered by newest first.
  findAll() {
    return this.prisma.contact.findMany({ orderBy: { id: 'desc' } });
  }

  // Fetch one contact by id.
  findOne(id: number) {
    return this.prisma.contact.findUnique({ where: { id } });
  }

  // Update a contact by id.
  update(id: number, data: UpdateContactDto) {
    return this.prisma.contact.update({ where: { id }, data });
  }

  // Remove a contact by id.
  remove(id: number) {
    return this.prisma.contact.delete({ where: { id } });
  }
}
