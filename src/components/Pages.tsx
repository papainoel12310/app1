import FreeTime from "entities/freeTime"
import AddFreeTime from "./AddFreeTime"
import EditFreeTime from "./EditFreeTime"
import Visualization from "./Visualization"

interface PagesProps {
    route: string
    setRoute: (route: string) => void
    freeTimes: FreeTime[],
    setFreeTimes: (freeTimes: FreeTime[]) => void
}

function Pages({ route, setRoute, freeTimes, setFreeTimes }: PagesProps) {
    switch (route) {
        case 'visualization':
            return <Visualization freeTimes={freeTimes} setFreeTimes={setFreeTimes} />
        case 'add':
            return <AddFreeTime setRoute={setRoute} freeTimes={freeTimes} setFreeTimes={setFreeTimes} />
        case 'edit':
            return <EditFreeTime freeTimes={freeTimes} setFreeTimes={setFreeTimes} />
        default:
            return null
    }
}

export default Pages