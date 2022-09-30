import FreeTime from 'entities/freeTime'
import grubAcademy from './grubAcademy'
import Service from './service'

class Api {
    private service: Service = grubAcademy

    async saveFreeTimes(freeTimes: FreeTime[]) {
        await this.service.save(freeTimes)
    }

    async getAllFreeTimes() {
        return await this.service.getAll()
    }
}

export default new Api()
