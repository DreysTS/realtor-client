import React from 'react'

import AboutSection from './AboutSection'
import CollaborationOverviewSection from './CollaborationOverviewSection'
import HeroSection from './HeroSection'
import PropertiesDemo from './PropertiesDemo'

export default function Landing() {
	return (
		<>
			<HeroSection />
			<AboutSection />
			<CollaborationOverviewSection />
			<PropertiesDemo />
		</>
	)
}
