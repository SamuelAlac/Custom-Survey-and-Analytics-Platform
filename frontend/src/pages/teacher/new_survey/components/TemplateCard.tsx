import { Link } from "react-router-dom"

export const TemplateCard = ({ template }: { template: any }) => {
  return (
    <div className="flex flex-col ">
    <div className="card w-80 h-50 bg-base-100 card-md shadow-lg shadow-black/20 flex justify-center items-center
    hover:bg-black/5">
    <Link to={template?.path}>
        <img src={template?.img} alt={template?.name} className='w-20' />
    </Link>
    </div>
    <h1 className='text-lg mt-1 font-semibold'>{template?.name}</h1>
    </div>
  )
}
