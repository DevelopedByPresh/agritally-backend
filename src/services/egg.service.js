import { EggEntity } from "../data/entities/index.js";
import { EggRepository } from "../data/repository/index.js";
import { EggResponseDto } from "../dtos/egg/egg-response.dto.js";
import { NotFoundException } from "../utils/exceptions/index.js";
import { messages } from "../utils/messages.utils.js";

export class EggService {
  static async create(createEggDto) {
    const eggEntity = EggEntity.make(createEggDto);
    const egg = await EggRepository.save(eggEntity);

    return {
      message: messages.COMMON.fn.CREATED("Business"),
      data: EggResponseDto.from(egg),
    };
  }

  static async showAll() {
    const foundEgg = await EggRepository.getAll();
    if (foundEgg.length === 0) {
      throw new NotFoundException(messages.EXCEPTIONS.fn.NOT_FOUND("Eggs"));
    }

    return {
      message: messages.COMMON.fn.FETCHED("Business"),
      data: EggResponseDto.fromMany(foundEgg),
    };
  }

  static async get(id) {
    const egg = await EggRepository.findById(id);
    if (!egg) {
      throw new NotFoundException(messages.EXCEPTIONS.fn.NOT_FOUND("Egg"));
    }

    return {
      message: messages.COMMON.fn.FETCHED("Business"),
      data: EggResponseDto.from(egg),
    };
  }

  static async update(id, updateEggDto) {
    const egg = await EggRepository.findById(id);
    if (!egg) {
      throw new NotFoundException(messages.EXCEPTIONS.fn.NOT_FOUND("Egg"));
    }

    const eggEntity = EggEntity.make({
      ...egg._doc,
      ...updateEggDto,
    });

    const updateEgg = await EggRepository.updateOne(id, eggEntity);

    return {
      message: messages.COMMON.fn.FETCHED("Business"),
      data: EggResponseDto.from(egg),
    };
  }

  static async delete(id) {
    await EggRepository.deleteOne(id);

    return {
      message: messages.COMMON.fn.DELETED("Egg"),
    };
  }
}
