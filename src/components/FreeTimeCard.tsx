import FreeTime from 'entities/freeTime'
import XMark from 'icons/XMark'

interface FreeTimeCardProps {
    freeTime: FreeTime
    handleDelete: () => void
}

function FreeTimeCard({ freeTime, handleDelete }: FreeTimeCardProps) {
    function formatDate(date: Date) {
        return new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date)
    }

    return (
        <div className="rounded-lg border">
            <div className="flex justify-end">
                <button onClick={handleDelete} className="p-2 text-red-500">
                    <XMark />
                </button>
            </div>
            <div className="px-2 font-medium">{freeTime.name}</div>
            <div className="grid grid-cols-2 p-2 text-gray-400">
                <div>
                    Início
                    <span> {formatDate(freeTime.start)}</span>
                </div>
                <div>
                    Fim
                    <span> {formatDate(freeTime.end)}</span>
                </div>
            </div>
        </div>
    )
}

export default FreeTimeCard
