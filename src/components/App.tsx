import FreeTime from "entities/freeTime"
import { useEffect, useState } from "react"
import api from "services/api"
import Navbar from "./Navbar"
import Pages from "./Pages"

function App() {
  const [freeTimes, setFreeTimes] = useState<FreeTime[]>([])
  const [route, setRoute] = useState<string>('visualization')

  useEffect(() => {
    async function load() {
      setFreeTimes(await api.getAllFreeTimes())
    }
    load()
  }, [])

  async function save(freeTimes: FreeTime[]) {
    await api.saveFreeTimes(freeTimes)
    const data = await api.getAllFreeTimes()
    setFreeTimes(data)
  }


  return (
    <div className='h-screen flex flex-col'>
      <div className='grow'>
        <Pages 
          route={route} 
          setRoute={setRoute}
          freeTimes={freeTimes}
          setFreeTimes={(freeTimes) => {
            setFreeTimes(freeTimes)
            save(freeTimes)
          }}
        />
      </div>
      <div className='h-12'>
        <Navbar route={route} setRoute={setRoute} />
      </div>
    </div>
  )
}

export default App
