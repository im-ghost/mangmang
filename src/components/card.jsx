import { Link } from "react-router";
const Card = ({ children = {
    title: 'For Developers',
    description: 'Browse our  jobs and start your career today',
    link: '/jobs',
    linkText: 'Browse Jobs',
}, bg = 'bg-gray-100' }) => {
  return (
    <div className={`${bg} p-6 rounded-lg shadow-md text-center`}>
   <h2 className='text-2xl font-bold'>{children.title}</h2>
              <p className='mt-2 mb-4'>
                {children.description}
              </p>
              <Link
                to={children.link}
                className='inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700'
              >
                {children.linkText}
              </Link>
    </div>
);
};
export default Card;