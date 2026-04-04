import type { Language } from "./types"

type Translation = {
	copyright: string
	inputPlaceholder: string
	buttonAdd: string
	promotionText: ( countOfPrizes: number ) => string
}

export const T: Record<Language, Translation> = {
	en: {
		copyright: "All rights reserved.",
		inputPlaceholder: "Type task name",
		buttonAdd: "Add",
		promotionText: ( countOfPrizes ) => `Win one of ${ countOfPrizes } prizes.`,
	},
	uz: {
		copyright: "Barcha huquqlar himoyalangan.",
		inputPlaceholder: "Topshiriq nomini kiriting",
		buttonAdd: "Qo'shish",
		promotionText: ( countOfPrizes ) => `${ countOfPrizes } ta yutuqdan birini yutib oling.`,
	},
}
