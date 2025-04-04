import Landing from './(nondashboard)/landing/page'
import Navbar from '@/components/Navbar'

export default function Home() {
	return (
		<>
			<Navbar />
			<main>
				<Landing />
			</main>
		</>
	)
}
