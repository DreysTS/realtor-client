import { Container, Section, SectionTitling } from "@/components"

const aboutList = [
	{
		text: 'Я являюсь опытным специалистом компании «Этажи» и обладаю обширными знаниями в области вторичного жилья.'
	},
	{
		text: 'За годы работы я успешно совмещала обязанности риэлтора и специалиста по сопровождению сделок. Это позволило мне глубже понять все аспекты процесса и научиться быстро находить решения даже для самых сложных ситуаций.'
	},
	{
		text: 'Моя главная цель — сделать так, чтобы каждый клиент получил именно то, что ищет, и остался доволен результатом.'
	},
	{
		text: 'Я ценю доверие моих клиентов и строю свою работу на принципах профессионализма и честности.'
	},
	{
		text: 'Моё стремление — не просто выполнить свою задачу, но и превзойти ожидания, чтобы вы с удовольствием рекомендовали меня своим друзьям и близким. Ведь рефералы — это главный показатель доверия и успеха.'
	},
	{
		text: 'Если вы хотите, чтобы ваша сделка прошла быстро, безопасно и комфортно, обращайтесь! Я с радостью помогу вам воплотить вашу мечту о новой недвижимости в реальность.'
	}
]

export default function AboutSection() {
	return (
		<Section>
			<Container>
				<div className='grid gap-6 lg:grid-cols-2'>
					<div>
						<SectionTitling title='Обо мне' className='!mb-0' />
						{aboutList.slice(0, 3).map((item, index) => (
							<p className='my-4 pr-6 leading-7' key={index}>
								{item.text}
							</p>
						))}
						<div className='flex flex-col items-center justify-center gap-6 sm:flex-row'>
							<div className='bg-primary/50 aspect-[3/5] w-full rounded-lg'></div>
							<div className='flex w-full flex-col gap-6'>
								<div className='bg-primary/50 aspect-[3/4] w-full rounded-lg'></div>
								<div className='bg-primary/50 aspect-[1] w-full rounded-lg'></div>
							</div>
						</div>
					</div>
					<div className='flex flex-col-reverse lg:flex-col'>
						<div className='flex flex-col items-center justify-center gap-6 sm:flex-row-reverse lg:flex-row'>
							<div className='bg-primary/50 relative aspect-[3/4] w-full overflow-hidden rounded-lg'></div>
							<div className='flex w-full flex-col gap-6'>
								<div className='bg-primary/50 aspect-[1] w-full rounded-lg'></div>
								<div className='bg-primary/50 aspect-[3/4] w-full rounded-lg'></div>
							</div>
						</div>
						{aboutList.slice(3).map((item, index) => (
							<p
								className='my-4 pr-6 leading-7 lg:px-6'
								key={index}
							>
								{item.text}
							</p>
						))}
					</div>
				</div>
			</Container>
		</Section>
	)
}
