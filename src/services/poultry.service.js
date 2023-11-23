import { PoultryEntity } from "../data/entities/index.js";
import { PoultryRepository } from "../data/repository/index.js";
import { PoultryResponseDto } from "../dtos/poultry/poultry-response.dto.js";
import { NotFoundException } from "../utils/exceptions/index.js";
import { queryFilter } from "../utils/index.js";
import { messages } from "../utils/messages.utils.js";

export class PoultryService {
  static async create(createPoultryDto) {
    const poultryEntity = PoultryEntity.make(createPoultryDto);
    const poultry = await PoultryRepository.save(poultryEntity);

    return {
      message: messages.COMMON.fn.CREATED("Poultry"),
      data: PoultryResponseDto.from(poultry),
    };
  }

  static async showAll(filter) {
    const query = queryFilter(filter);
    const foundPoultry = await PoultryRepository.getAll(query);
    if (foundPoultry.length === 0) {
      throw new NotFoundException(messages.EXCEPTIONS.fn.NOT_FOUND("Poultry"));
    }

    return {
      message: messages.COMMON.fn.FETCHED("Poultry"),
      data: PoultryResponseDto.fromMany(foundPoultry),
    };
  }

  static async get(id) {
    const poultry = await PoultryRepository.findById(id);
    if (!poultry) {
      throw new NotFoundException(messages.EXCEPTIONS.fn.NOT_FOUND("Poultry"));
    }

    return {
      message: messages.COMMON.fn.FETCHED("Poultry"),
      data: PoultryResponseDto.from(poultry),
    };
  }

  static async update(id, updatePoultryDto) {
    const poultry = await PoultryRepository.findById(id);
    if (!poultry) {
      throw new NotFoundException(messages.EXCEPTIONS.fn.NOT_FOUND("Poultry"));
    }

    const poultryEntity = PoultryEntity.make({
      ...poultry._doc,
      ...updatePoultryDto,
    });

    const updatePoultry = await PoultryRepository.updateOne(id, poultryEntity);

    return {
      message: messages.COMMON.fn.UPDATED("Poultry"),
      data: PoultryResponseDto.from(updatePoultry),
    };
  }

  static async getStatistics(filter) {
    const query = queryFilter(filter);

    const statistics = await PoultryRepository.getStatistics(query);
    return {
      message: messages.COMMON.fn.FETCHED("Poultry Statistics"),
      data: statistics,
    };
  }

  static async delete(id) {
    await PoultryRepository.deleteOne(id);

    return {
      message: messages.COMMON.fn.DELETED("Poultry"),
    };
  }
}
