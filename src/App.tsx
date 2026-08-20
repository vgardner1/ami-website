import { lazy, Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import MeetingsPage from "./pages/MeetingsPage";
import MarketPage from "./pages/MarketPage";
import ResourcesPage from "./pages/ResourcesPage";
import OnboardingPage from "./pages/OnboardingPage";
import LeadershipPage from "./pages/LeadershipPage";
import MembershipPage from "./pages/MembershipPage";
import GalleryPage from "./pages/GalleryPage";

// Lazy-load the heavy three.js community page so the homepage stays fast
const CommunityPage = lazy(() => import("./pages/CommunityPage"));

function ScrollToTopOnNav() {
  // Scroll to top on each route change — wrapped in client-side import to avoid SSR issues
  if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  return null;
}

export default function App() {
  return (
    <HashRouter>
      <div className="page">
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<><ScrollToTopOnNav /><HomePage /></>} />
            <Route path="/about" element={<><ScrollToTopOnNav /><AboutPage /></>} />
            <Route path="/meetings" element={<><ScrollToTopOnNav /><MeetingsPage /></>} />
            <Route
              path="/community"
              element={
                <Suspense fallback={<div className="pageLoader">Loading community…</div>}>
                  <ScrollToTopOnNav />
                  <CommunityPage />
                </Suspense>
              }
            />
            <Route path="/market" element={<><ScrollToTopOnNav /><MarketPage /></>} />
            <Route path="/resources" element={<><ScrollToTopOnNav /><ResourcesPage /></>} />
            <Route path="/onboarding" element={<><ScrollToTopOnNav /><OnboardingPage /></>} />
            <Route path="/leadership" element={<><ScrollToTopOnNav /><LeadershipPage /></>} />
            <Route path="/membership" element={<><ScrollToTopOnNav /><MembershipPage /></>} />
            <Route path="/gallery" element={<><ScrollToTopOnNav /><GalleryPage /></>} />
            <Route path="/gallery/:slug" element={<><ScrollToTopOnNav /><GalleryPage /></>} />
            <Route path="*" element={<><ScrollToTopOnNav /><HomePage /></>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}
