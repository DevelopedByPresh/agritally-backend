import { FishEntity } from "../data/entities/index.js";
import { FishRepository } from "../data/repository/index.js";
import { FishResponseDto } from "../dtos/fish/fish-response.dto.js";
import { NotFoundException } from "../utils/exceptions/index.js";
import { queryFilter } from "../utils/index.js";
import { messages } from "../utils/messages.utils.js";

export class FishService {
  static async create(createFishDto) {
    const fishEntity = FishEntity.make(createFishDto);
    const fish = await FishRepository.save(fishEntity);

    return {
      message: messages.COMMON.fn.CREATED("Fish"),
      data: FishResponseDto.from(fish),
    };
  }

  static async showAll(filter) {
    const query = queryFilter(filter);
    const foundFish = await FishRepository.getAll(query);
    if (foundFish.length === 0) {
      throw new NotFoundException(messages.EXCEPTIONS.fn.NOT_FOUND("Fish"));
    }

    return {
      message: messages.COMMON.fn.FETCHED("Fish"),
      data: FishResponseDto.fromMany(foundFish),
    };
  }

  static async get(id) {
    const fish = await FishRepository.findById(id);
    if (!fish) {
      throw new NotFoundException(messages.EXCEPTIONS.fn.NOT_FOUND("Fish"));
    }

    return {
      message: messages.COMMON.fn.FETCHED("Fish"),
      data: FishResponseDto.from(fish),
    };
  }

  static async statistics(filter) {
    const fish = await FishRepository.getStatistics(filter);
    
    if (!fish) {
      throw new NotFoundException(messages.EXCEPTIONS.fn.NOT_FOUND("Fish"));
    }

    return {
      message: messages.COMMON.fn.FETCHED("Fish stats"),
      data: FishResponseDto.from(fish),
    };
  }

  static async update(id, updateFishDto) {
    const fish = await FishRepository.findById(id);
    if (!fish) {
      throw new NotFoundException(messages.EXCEPTIONS.fn.NOT_FOUND("Fish"));
    }

    const fishEntity = FishEntity.make({
      ...fish._doc,
      ...updateFishDto,
    });

    const updateFish = await FishRepository.updateOne(id, fishEntity);

    return {
      message: messages.COMMON.fn.UPDATED("Fish"),
      data: FishResponseDto.from(updateFish),
    };
  }

  static async delete(id) {
    await FishRepository.deleteOne(id);

    return {
      message: messages.COMMON.fn.DELETED("Fish"),
    };
  }
}
