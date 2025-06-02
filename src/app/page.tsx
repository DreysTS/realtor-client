import Landing from './(nondashboard)/landing/page'
import { Footer } from '@/components'
import { Navbar } from '@/components'

export default function Home() {
	return (
		<>
			<Navbar />
			<main>
				<Landing />
				<Footer />
			</main>
		</>
	)
}
