import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import Layout from './layout/mainlayout';
import Jobspages from './pages/jobspage';
import Addjob ,{addJob} from './pages/Addjobpage';
import Editjob from './pages/Editjobpage';
import Jobpage, { jobLoader } from './pages/jobpage';
import Notfoundpage from './pages/Notfoundpage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
  // Delete Job
  const deleteJob = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: 'DELETE',
    });
    return;
  };

  // Update Job
  const updateJob = async (job) => {
    const res = await fetch(`/api/jobs/${job.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(job),
    });
    return;
  };
const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: App,
      },
      {
        path: "jobs",
        Component: Jobspages,
      },
      {
        path: "jobs/:id",
        Component: Jobpage,
        loader: jobLoader,
      },
      {
        path: "add-job",
        Component: Addjob,
        action: addJob, // ✅ THIS is correct
      },
      {
        path: "edit-job/:id",
        Component: Editjob,
        loader: jobLoader,   // fetch existing job
        action: updateJob,   // update job
      },
      {
        path: "*",
        Component: Notfoundpage,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);