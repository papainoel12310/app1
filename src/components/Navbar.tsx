import ChartBar from "icons/ChartBar"
import Pencil from "icons/Pencil"
import Plus from "icons/Plus"


interface NavbarProps {
    route: string
    setRoute: (route: string) => void
}

function Navbar({ route, setRoute }: NavbarProps) {
    return (
        <div className="grid h-full grid-flow-col gap-4 bg-gray-100">
            <div>
                <button
                    onClick={() => setRoute('add')}
                    className={`flex h-full w-full items-center justify-center ${route !== 'add' ? 'text-gray-400' : ''}`}
                >
                    <Plus />
                </button>
            </div>
            <div>
                <button
                    onClick={() => setRoute('visualization')}
                    className={`flex h-full w-full items-center justify-center ${route !== 'visualization' ? 'text-gray-400' : ''}`}
                >
                    <ChartBar />
                </button>
            </div>
            <div>
                <button
                    onClick={() => setRoute('edit')}
                    className={`flex h-full w-full items-center justify-center ${route !== 'edit' ? 'text-gray-400' : ''}`}
                >
                    <Pencil />
                </button>
            </div>
        </div >
    )
}

export default Navbar