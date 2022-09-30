import FreeTime from 'entities/freeTime'

interface Service {
    save(freeTimes: FreeTime[]): Promise<void>
    getAll(): Promise<FreeTime[]>
}

export default Service
