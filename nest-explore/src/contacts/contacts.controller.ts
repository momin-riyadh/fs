import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import type { CreateContactDto } from './dto/create-contact.dto';
import type { UpdateContactDto } from './dto/update-contact.dto';

/**
 * REST endpoints for contacts CRUD.
 */
@Controller('contacts')
export class ContactsController {
  // Inject the contacts service.
  constructor(private readonly contactsService: ContactsService) {}

  // Create a new contact.
  @Post()
  create(@Body() body: CreateContactDto) {
    return this.contactsService.create(body);
  }

  // List all contacts in descending order.
  @Get()
  findAll() {
    return this.contactsService.findAll();
  }

  // Retrieve a single contact by id.
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.contactsService.findOne(id);
  }

  // Update an existing contact by id.
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateContactDto,
  ) {
    return this.contactsService.update(id, body);
  }

  // Delete a contact by id.
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.contactsService.remove(id);
  }
}
