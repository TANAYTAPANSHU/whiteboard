import Image from 'next/image'
import Menu from "../components/Menu"
import Toolbox from "../components/Toolbox"
import Board from "../components/Board"

export default function Home() {
  return (
    <div className='flex flex-col  w-screen'>
    <Menu />
    <Toolbox />
    <Board />
    </div>
  ) 
}
