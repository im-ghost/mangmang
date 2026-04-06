import { useState, useEffect } from 'react';
import JobListing from './JobListing';
import Spinner from './Spinner';

const JobListings = ({ isHome = false }) => {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([])
  useEffect(()=>{
  
    const fetchJobs = async ()=>{
      const apiUrl = "/api/jobs"
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        console.log(data)
        if(isHome){
          const homeJobs = data.slice(0, 3);
          setJobs(homeJobs);
        } else {
          setJobs(data);
        }
      } catch (error) {
        console.log('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs()
    console.log(jobs)
  },[
       
  ])

  return (
    <section className='bg-blue-50 px-4 py-10'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-bold text-indigo-500 mb-6 text-center'>
          {isHome ? 'Recent Jobs' : 'Browse Jobs'}
        </h2>

 { loading ? (
          <Spinner loading={loading} />
        ) : jobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs available</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {
            jobs.map((job) => (
              <JobListing key={job.id} job={job} />
            ))
            }
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListings;