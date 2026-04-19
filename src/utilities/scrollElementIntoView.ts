const scrollElementIntoView = (e: HTMLElement, behavior?: ScrollBehavior) => {
    const scrollTop = window.pageYOffset || e.scrollTop
    const headerHeight = 144
    const finalOffset = e.getBoundingClientRect().top + scrollTop - headerHeight
    window.parent.scrollTo({ top: finalOffset, behavior: behavior ?? 'auto' })
}

export default scrollElementIntoView
