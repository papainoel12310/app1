import FreeTime from "entities/freeTime"
import { useCallback, useEffect, useState } from "react"

function getOverlap(freeTimes: FreeTime[]) {
    if (freeTimes.length === 0) {
        return {
            start: 0,
            end: 0,
            error: true
        }
    }

    const overlap = {
        start: 0,
        end: 1e18,
        error: false
    }

    freeTimes.sort((a, b) => a.start.getTime() - b.start.getTime())

    freeTimes.forEach((freeTime) => {
        if (overlap.start < freeTime.start.getTime()) {
            overlap.start = freeTime.start.getTime()
        }

        if (overlap.end > freeTime.end.getTime()) {
            overlap.end = freeTime.end.getTime()
        }

        if (overlap.start > overlap.end) {
            overlap.error = true
        }
    })

    return overlap
}

interface VisualizationProps {
    freeTimes: FreeTime[]
    setFreeTimes: (freeTimes: FreeTime[]) => void
}


function Visualization({ freeTimes, setFreeTimes }: VisualizationProps) {
    const startHour = 8
    const endHour = 23
    const hourInRem = 1

    const users = Array.from(new Set(freeTimes.map(({ name }) => name)))
    const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex']
    const [selectedUsers, setSelectedUsers] = useState<string[]>([])
    const [overlaps, setOverlaps] = useState<
        { start: number; end: number; error: boolean }[]
    >([])

    function toggleUser(name: string) {
        if (selectedUsers.includes(name)) {
            setSelectedUsers(selectedUsers.filter((user) => user !== name))
        } else {
            setSelectedUsers([...selectedUsers, name])
        }
    }

    const getOverlapByWeekDay = useCallback(
        (weekDay: number) => {
            const freeTimesTmp = freeTimes.filter(
                (freeTime) =>
                    selectedUsers.includes(freeTime.name) &&
                    freeTime.start.getDay() === weekDay
            )

            const usersFreeTime = freeTimesTmp.map(({ name }) => name)

            if (selectedUsers.some(user => !usersFreeTime.includes(user))) {
                return {
                    start: 0,
                    end: 0,
                    error: true
                }
            }

            const result = getOverlap(freeTimesTmp)
            const startTime = new Date(result.start).getHours()
            const endTime = new Date(result.end).getHours()
            return {
                start: startTime,
                end: endTime,
                error: result.error
            }
        },
        [freeTimes, selectedUsers]
    )

    useEffect(() => {
        setOverlaps([
            getOverlapByWeekDay(1),
            getOverlapByWeekDay(2),
            getOverlapByWeekDay(3),
            getOverlapByWeekDay(4),
            getOverlapByWeekDay(5)
        ])
    }, [getOverlapByWeekDay])


    return (
        <div>
            <div className="h-full px-4 pt-8">
                <h1 className="text-4xl font-semibold">Visualizar</h1>

                <div className="mt-8 grid grid-cols-4 gap-4">
                    {users.map((user, index) => (
                        <button
                            onClick={() => toggleUser(user)}
                            key={index}
                            className={`rounded-xl py-1 px-4 font-medium ${selectedUsers.includes(user) ? 'bg-gray-400' : 'bg-gray-100'
                                }`}
                        >
                            {user}
                        </button>
                    ))}
                </div>

                <div className="mt-8 rounded-lg border p-4 shadow-md">
                    <div
                        style={{ height: `${(endHour - startHour + 1) * hourInRem}rem` }}
                        className="grid grid-cols-5 gap-4"
                    >
                        {overlaps.map(({ start, end, error }, index) =>
                            !error ? (
                                <div
                                    key={index}
                                    className="flex flex-col justify-between rounded-md bg-lime-300/80 p-2 shadow-md"
                                    style={{
                                        marginBottom: `${(endHour - end) * hourInRem}rem`,
                                        marginTop: `${(start - startHour) * hourInRem}rem`
                                    }}
                                >
                                    <div className="text-center text-xs font-medium text-lime-900">
                                        {start}:00
                                    </div>
                                    <div className="text-center text-xs font-medium text-lime-900">
                                        {end}:00
                                    </div>
                                </div>
                            ) : (
                                <div key={index}></div>
                            )
                        )}
                    </div>
                    <div className="mt-4 grid grid-cols-5 gap-4">
                        {days.map((day, index) => (
                            <div className="text-center text-xs font-medium" key={index}>
                                {day}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Visualization    