import { PigEntity } from "../data/entities/index.js";
import { PigRepository } from "../data/repository/index.js";
import { PigResponseDto } from "../dtos/pig/pig-response.dto.js";
import { NotFoundException } from "../utils/exceptions/index.js";
import { queryFilter } from "../utils/index.js";
import { messages } from "../utils/messages.utils.js";

export class PigService {
  static async create(createPigDto) {
    const pigEntity = PigEntity.make(createPigDto);
    const pig = await PigRepository.save(pigEntity);

    return {
      message: messages.COMMON.fn.CREATED("Pig"),
      data: PigResponseDto.from(pig),
    };
  }

  static async showAll(filter) {
    const query = queryFilter(filter);
    const foundPigs = await PigRepository.getAll(query);
    if (foundPigs.length === 0) {
      throw new NotFoundException(messages.EXCEPTIONS.fn.NOT_FOUND("Pigs"));
    }

    return {
      message: messages.COMMON.fn.FETCHED("Pigs"),
      data: PigResponseDto.fromMany(foundPigs),
    };
  }

  static async get(id) {
    const pig = await PigRepository.findById(id);
    if (!pig) {
      throw new NotFoundException(messages.EXCEPTIONS.fn.NOT_FOUND("Pig"));
    }

    return {
      message: messages.COMMON.fn.FETCHED("Pig"),
      data: PigResponseDto.from(pig),
    };
  }

  static async update(id, updatePigDto) {
    const pig = await PigRepository.findById(id);
    if (!pig) {
      throw new NotFoundException(messages.EXCEPTIONS.fn.NOT_FOUND("Pig"));
    }

    const pigEntity = PigEntity.make({
      ...pig._doc,
      ...updatePigDto,
    });

    const updatedPig = await PigRepository.updateOne(id, pigEntity);

    return {
      message: messages.COMMON.fn.UPDATED("Pig"),
      data: PigResponseDto.from(updatedPig),
    };
  }

  static async getStatistics(filter) {
    const query = queryFilter(filter);

    const statistics = await PigRepository.getStatistics(query);
    return {
      message: messages.COMMON.fn.FETCHED("Pig Statistics"),
      data: statistics,
    };
  }

  static async delete(id) {
    await PigRepository.deleteOne(id);

    return {
      message: messages.COMMON.fn.DELETED("Pig"),
    };
  }
}
