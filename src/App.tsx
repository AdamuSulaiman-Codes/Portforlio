import { About } from './components/About'
import { Contact } from './components/Contact'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Toolkit } from './components/Toolkit'
import { Topbar } from './components/Topbar'
import { Work } from './components/Work'

export default function App() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Topbar />
      <main id="main">
        <Hero />
        <Work />
        <About />
        <Experience />
        <Toolkit />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
