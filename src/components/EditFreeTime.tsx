import FreeTime from 'entities/freeTime'
import FreeTimeCard from './FreeTimeCard'

interface EditFreeTimeProps {
    freeTimes: FreeTime[]
    setFreeTimes: (freeTimes: FreeTime[]) => void
}

function EditFreeTime({ freeTimes, setFreeTimes }: EditFreeTimeProps) {
    function handleDeleteFreeTime(index: number) {
        setFreeTimes(freeTimes.filter((_, i) => i !== index))
    }

    return (
        <div className="h-full px-4 pt-8">
            <h1 className="text-4xl font-semibold">Editar</h1>
            <div className="mt-8 grid grid-cols-1 gap-4">
                {freeTimes.map((freeTime, index) => (
                    <FreeTimeCard
                        handleDelete={() => handleDeleteFreeTime(index)}
                        freeTime={freeTime}
                        key={index}
                    />
                ))}
            </div>
        </div>
    )
}

export default EditFreeTime
