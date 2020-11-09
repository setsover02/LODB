<template lang="pug">
v-sheet(color="transparent")
	v-timeline(align-top)
		v-timeline-item
			v-card(color="t500")
				v-card-title 2032
				v-card-text.body-1 Humanity succeeded in commercializing Origin Dust
		v-timeline-item
			v-card(color="t500")
				v-card-title 2049
				v-card-text.body-1 Kim Ji Suk and Adam Johns created Saman Industry
		v-timeline-item(v-for="i in 24")
			div.title 2052
			p.body-1 삼안 산업에서 바이오로이드 에바를 선보이다. 생명 윤리에 대한 논쟁이 있었으나 인간의 도구화를 막기 위해 바이오로이드는 공식적인 상품이 된다.
</template>