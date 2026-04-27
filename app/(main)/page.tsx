import Banner from '@/components/Banner'
import AboutSection from '@/components/AboutSection'
import ProjectsSection from '@/components/ProjectsSection'
import ContactForm from '@/components/ContactForm'
import ExperienceSection from '@/components/ExperienceSection'

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <Banner />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactForm />
    </main>
  )
}
