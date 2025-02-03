import Loading from '../icons/Loading'

export default function Loader() {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center gap-5 bg-zinc-300 bg-opacity-10 text-slate-800'>
      <Loading />
      <p className='text-slate-700 text-md'>
        El contenido se esta cargando, por favor se paciente ...❤{' '}
      </p>
    </div>
  )
}
