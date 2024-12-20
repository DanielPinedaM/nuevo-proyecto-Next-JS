import { create } from 'zustand'

interface useContentState {
    count: number,
    text: string,
    increment: (value: number) => void
}

export const contentState = create<useContentState>((set) => ({
    count: 10,
    text: "Hola Mundo",
    increment: (value: number) => set(state => ({
        count: state.count + value
    }))
}))