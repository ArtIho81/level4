import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PeopleModule } from '../people/people.module';
import { PeopleService } from '../people/people.service';
import { AppModule } from '../app.module';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

describe('PeopleController (e2e)', () => {
  let app: INestApplication;
  let result = [];
  let peopleService = { getAllPeople: (i: number) => result };
  let token: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PeopleModule, AppModule, AuthModule, UsersModule],
    })
      .overrideProvider(PeopleService)
      .useValue(peopleService)
      .compile();

    app = module.createNestApplication();
    await app.init();
    
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'admin@admin.com', password: 'admin' });
    token = response.body.accessToken;
  });

  it('/GET people', async () => {
    return request(app.getHttpServer())
      .get('/people')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect({
        data: peopleService.getAllPeople(0),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
