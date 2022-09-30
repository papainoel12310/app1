import FreeTime from "entities/freeTime"
import { useRef } from "react"


interface AddFreeTimeProps {
    setRoute: (route: string) => void
    freeTimes: FreeTime[]
    setFreeTimes: (freeTimes: FreeTime[]) => void
}

function AddFreeTime({ setRoute, freeTimes, setFreeTimes }: AddFreeTimeProps) {
    const inputNameRef = useRef<HTMLInputElement>(null)
    const inputDateStartRef = useRef<HTMLInputElement>(null)
    const inputDateEndRef = useRef<HTMLInputElement>(null)

    function handleAddFreeTime() {
        const name = inputNameRef.current?.value || ''
        const dateStart = inputDateStartRef.current?.value || ''
        const dateEnd = inputDateEndRef.current?.value || ''

        if (name === '') {
            alert('Nome não pode ser vazio')
            return
        }

        if (dateStart === '') {
            alert('Data de início não pode ser vazia')
            return
        }

        if (dateEnd === '') {
            alert('Data de fim não pode ser vazia')
            return
        }

        const start = new Date(dateStart)
        const end = new Date(dateEnd)

        if (start.getTime() >= end.getTime()) {
            alert('Intervalo inválido')
            return
        }

        freeTimes.push({ name, start, end })
        setFreeTimes([...freeTimes])
        setRoute('visualization')
    }


    return (
        <div className="h-full px-4 pt-8">
            <h1 className="text-4xl font-semibold">Adicionar</h1>
            <div className="mt-8 flex flex-col gap-4">
                <div>
                    <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-gray-900"
                    >
                        Nome
                    </label>
                    <input
                        ref={inputNameRef}
                        type="text"
                        id="name"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Nome"
                    />
                </div>

                <div>
                    <label
                        htmlFor="date-start"
                        className="mb-2 block text-sm font-medium text-gray-900"
                    >
                        Data de Início
                    </label>

                    <input
                        ref={inputDateStartRef}
                        id="date-start"
                        type="datetime-local"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label
                        htmlFor="date-end"
                        className="mb-2 block text-sm font-medium text-gray-900"
                    >
                        Data de Fim
                    </label>
                    <input
                        ref={inputDateEndRef}
                        id="date-end"
                        type="datetime-local"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
            </div>
            <button
                onClick={handleAddFreeTime}
                className="mt-16 mr-2 mb-2 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
                Adicionar
            </button>
        </div>
    )
}

export default AddFreeTime