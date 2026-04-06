import Homecards from '../components/homecards'
import Hero from '../components/hero'
import JobListings from '../components/joblistings'
import ViewAllJobs from '../components/viewalljobs'
function Home() {

  return (
    <>
     <Hero/>
     <Homecards/>
     <JobListings isHome={true}/>
     <ViewAllJobs/>   
    </>
  )
}

export default Home