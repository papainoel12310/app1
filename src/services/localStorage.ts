import FreeTime from 'entities/freeTime'
import Service from './service'

class LocalStorage implements Service {
  async save(freeTimes: FreeTime[]): Promise<void> {
    localStorage.setItem('freeTimes', JSON.stringify(freeTimes))
  }

  getAll(): Promise<FreeTime[]> {
    const freeTimesJson = JSON.parse(localStorage.getItem('freeTimes') || '[]')
    const freeTimes = freeTimesJson.map(({ name, start, end }: FreeTime) => {
      return {
        name,
        start: new Date(start),
        end: new Date(end)
      }
    })
    return freeTimes
  }
}

export default new LocalStorage()
