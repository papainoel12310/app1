import axios from 'axios'
import FreeTime from 'entities/freeTime'
import Service from './service'

interface State {
    code: {
        source_code: string
        language_id: number
        stdin: string
    }
    id: string
    message: string
    parent_commit: string
    timestamp: number
    username: string
}

interface Commit {
    name: string
    states: State[]
}

class GrubAcademy implements Service {
    private BASE_URL = 'https://backend-coding-platform.herokuapp.com'
    private ENV_ID = '63366a34728dbe39cb0ec900'
    private commit: Commit = { name: '', states: [] }

    async save(freeTimes: FreeTime[]) {
        await this.loadCommits()
        const lastState = this.commit.states[this.commit.states.length - 1]
        await axios.post(
            `${this.BASE_URL}/code-environments/${this.ENV_ID}/states`,
            {
                message: 'Add free time',
                code: {
                    source_code: JSON.stringify(freeTimes),
                    language_id: 71,
                    stdin: ''
                },
                username: 'App',
                parent_commit: lastState.id
            }
        )
    }

    async getAll(): Promise<FreeTime[]> {
        await this.loadCommits()
        const lastState = this.commit.states[this.commit.states.length - 1]
        const freeTimes: FreeTime[] = JSON.parse(lastState.code.source_code)
        return freeTimes.map((freeTime) => {
            return {
                name: freeTime.name,
                start: new Date(freeTime.start),
                end: new Date(freeTime.end)
            }
        })
    }

    private async loadCommits() {
        const { data } = await axios.get(
            `${this.BASE_URL}/code-environments/${this.ENV_ID}`
        )
        this.commit = data
    }
}

export default new GrubAcademy()
