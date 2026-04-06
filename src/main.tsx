import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Layout from './layout/mainlayout.jsx';
import Jobspages from './pages/jobspage.jsx';
import Addjob ,{addJob} from './pages/Addjobpage.jsx';
import Editjob from './pages/Editjobpage.jsx';
import Jobpage, { jobLoader } from './pages/jobpage.jsx';
import Notfoundpage from './pages/Notfoundpage.jsx';
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router";

  // Delete Job
  const deleteJob = async ({ params }) => {
    const id = params.id;
    await fetch(`/api/jobs/${id}`, {
      method: 'DELETE',
    });
    return;
  };

  // Update Job
  const updateJob = async ({ request, params }) => {
    const formData = await request.formData();
    const job = Object.fromEntries(formData);
    job.id = params.id;
    job.company = {
      name: job.company,
      description: job.company_description,
      contactEmail: job.contact_email,
      contactPhone: job.contact_phone,
    };
    job.location = job.location;
    job.title = job.title;
    job.description = job.description;
    job.salary = job.salary;
    job.type = job.type;
    delete job.company_description;
    delete job.contact_email;
    delete job.contact_phone;
    await fetch(`/api/jobs/${job.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(job),
    });
    return redirect(`/jobs/${job.id}`);
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
        action: deleteJob,
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