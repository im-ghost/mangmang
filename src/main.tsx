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
import type { ActionFunctionArgs } from "react-router";

  // Delete Job
  const deleteJob = async ({ params }: ActionFunctionArgs) => {
    const id = params.id;
    if (!id) {
      throw new Error('Job id is required');
    }
    await fetch(`/api/jobs/${id}`, {
      method: 'DELETE',
    });
    return redirect('/jobs');
  };

  // Update Job
  const updateJob = async ({ request, params }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const formObject = Object.fromEntries(formData) as Record<string, FormDataEntryValue>;
    const id = params.id;
    if (!id) {
      throw new Error('Job id is required');
    }

    const job = {
      id,
      title: String(formObject.title || ''),
      type: String(formObject.type || ''),
      location: String(formObject.location || ''),
      description: String(formObject.description || ''),
      salary: String(formObject.salary || ''),
      company: {
        name: String(formObject.company || ''),
        description: String(formObject.company_description || ''),
        contactEmail: String(formObject.contact_email || ''),
        contactPhone: String(formObject.contact_phone || ''),
      },
    };

    await fetch(`/api/jobs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(job),
    });
    return redirect(`/jobs/${id}`);
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

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(rootElement).render(
  <RouterProvider router={router} />
);