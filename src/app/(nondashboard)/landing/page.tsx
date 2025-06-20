import React, { Suspense } from 'react'

import AboutSection from './AboutSection'
import CollaborationOverviewSection from './CollaborationOverviewSection'
import HeroSection from './HeroSection'
import PropertiesDemo from './PropertiesDemo'

export default function Landing() {
	return (
		<Suspense>
			<HeroSection />
			<AboutSection />
			<CollaborationOverviewSection />
			<PropertiesDemo />
		</Suspense>
	)
}
