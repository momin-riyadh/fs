import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateContactDto) {
    return this.prisma.contact.create({ data });
  }

  findAll() {
    return this.prisma.contact.findMany({ orderBy: { id: 'desc' } });
  }

  findOne(id: number) {
    return this.prisma.contact.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateContactDto) {
    return this.prisma.contact.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.contact.delete({ where: { id } });
  }
}
