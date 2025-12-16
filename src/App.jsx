
import "./App.css";
import logoImg from "./assets/{8B51C13A-369D-42B3-9534-BB6BD32BC3C3}.png";
function App() {
  return (
    <>
      <div className="min-h-screen bg-base-100 text-secondary">
  
        <nav className="w-full bg-secondary text-base-100 px-10 py-4 flex justify-between items-center">
          <div className="text-3xl font-bold italic">

            <h1 className="text-primary">
              Asset<span className="text-accent">Verse</span>
            </h1>
            <h1 className="text-cyan-400">AssetVerse</h1>
            <h1 className="text-accent">
              Asset<span className="text-primary">Verse</span>
            </h1>
            <h1 className="text-white">
              Asset<span className="text-accent">Verse</span>
            </h1>
            <h1>AssetVerse</h1>
          </div>
          <button className="btn bg-primary text-base-100">Login</button>
        </nav>

        <h1 className="text-primary text-4xl text-center font-semibold">
          Pimary{" "}
        </h1>
        <h1 className="text-secondary text-4xl text-center font-semibold">
          secondary{" "}
        </h1>

   
        <section className="px-10 py-20 bg-base-200">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold text-secondary mb-4">
              Manage Your Assets Effortlessly
            </h2>
            <p className="text-neutral mb-6">
              A smart solution to track, organize, and monitor physical &
              digital assets with real‑time insights.
            </p>
            <button className="btn bg-primary text-base-100 mr-3">
              Get Started
            </button>
            <button className="btn bg-accent text-base-100">Learn More</button>
          </div>
        </section>


        <section className="px-10 py-16 grid md:grid-cols-3 gap-8">
          <div className="card bg-base-100 shadow border border-base-200 p-6">
            <h3 className="text-xl font-semibold text-secondary mb-2">
              Real‑time Tracking
            </h3>
            <p className="text-neutral mb-4">
              Stay updated on every asset movement instantly.
            </p>
            <span className="badge bg-primary text-base-100">primary</span>
          </div>

          <div className="card bg-base-100 shadow border border-base-200 p-6">
            <h3 className="text-xl font-semibold text-secondary mb-2">
              Smart Alerts
            </h3>
            <p className="text-neutral mb-4">
              Get notified for warnings, issues, or required actions.
            </p>
            <span className="badge bg-warning text-base-100">warning</span>
          </div>

          <div className="card bg-base-100 shadow border border-base-200 p-6">
            <h3 className="text-xl font-semibold text-secondary mb-2">
              Status Overview
            </h3>
            <p className="text-neutral mb-4">
              See successes, errors, and system info at a glance.
            </p>
            <div className="flex gap-2">
              <span className="badge bg-success text-base-100">success</span>
              <span className="badge bg-error text-base-100">error</span>
              <span className="badge bg-info text-base-100">info</span>
            </div>
          </div>
        </section>


        <section className="px-10 py-20 bg-accent text-base-100 text-center rounded-t-2xl">
          <h2 className="text-3xl font-bold mb-3">
            Ready to streamline your asset workflow?
          </h2>
          <p className="mb-6 text-base-100/90">
            Join thousands of users managing assets with confidence.
          </p>
          <button className="btn bg-secondary text-base-100">
            Create Account
          </button>
        </section>

        <footer className="px-10 py-6 bg-secondary text-base-100 text-center">
          © {new Date().getFullYear()} AssetVerse — All rights reserved.
        </footer>
      </div>



      

    </>
  );
}

export default App;
