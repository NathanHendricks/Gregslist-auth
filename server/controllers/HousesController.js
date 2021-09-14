import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { logger } from '../utils/Logger'
import { housesService } from '../services/HousesService'
export class HousesController extends BaseController {
  constructor() {
    super('api/houses')
    this.router
      .get('', this.getHouses)
      .get('/:houseId', this.getHouse)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createHouse)
      .delete('/:houseId', this.removeHouse)
      .put('/:housesId', this.editHouse)
  }

  async getHouses(req, res, next) {
    try {
      const houses = await housesService.getHouses(req.query)
      res.send(houses)
    } catch (error) {
      next(error)
    }
  }

  async getHouse(req, res, next) {
    try {
      const house = await housesService.getHouseById(req.params.houseId)
      res.send(house)
    } catch (error) {
      next(error)
    }
  }

  async createHouse(req, res, next) {
    try {
      logger.log('who is the user', req.UserInfo)
      req.body.creatorId = req.userInfo.id
      const house = await housesService.createHouse(req.body)
      res.send(house)
    } catch (error) {
      next(error)
    }
  }

  async removeHouse(req, res, next) {
    try {
      const house = await housesService.removeHouse(req.params.houseId, req.UserInfo.id)
      res.send(house)
    } catch (error) {
      next(error)
    }
  }

  async editHouse(req, res, next) {
    try {
      const house = await housesService.editHouse(req.params.houseId, req.UserInfo.id, req.body)
      res.send(house)
    } catch (error) {
      next(error)
    }
  }
}
