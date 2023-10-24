import { Test, TestingModule } from '@nestjs/testing';
import { ImagesService } from '../images/images.service';
import { UtilsService } from '../utils/utils.service';
import { PeopleResponse } from 'src/utils/types';
import { E_PeopleGender } from '../people/people.enums';
import { ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ParamIdPipe } from '../people/pipes/param-id.pipe';

describe('paramIdPipe', () => {
  let pipeId: ParamIdPipe;
  beforeEach(() => {
    pipeId = new ParamIdPipe();
  });
  it('should return number', () => {
    expect(pipeId.transform('1', {} as ArgumentMetadata)).toBe(1);
  });
  it('should return error message when string is not integer', () => {
    try {
      pipeId.transform('1.5', {} as ArgumentMetadata);
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
    }
  });
  it('should return error message when string is not number', () => {
    try {
      pipeId.transform('a', {} as ArgumentMetadata);
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
    }
  });
  it('should return error message when string is number less then 1', () => {
    try {
      pipeId.transform('0', {} as ArgumentMetadata);
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
    }
  });
});
