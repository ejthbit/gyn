const scrollElementIntoView = (e: any, behavior: 'auto' | 'instant' | 'smooth') => {
    let scrollTop = window.scrollY || e.scrollTop

    // Furthermore, if you have for example a header outside the iframe
    // you need to factor in its dimensions when calculating the position to scroll to
    const headerHeight = 144
    const finalOffset = e.getBoundingClientRect().top + scrollTop - headerHeight

    window.scrollTo({
        top: finalOffset,
        behavior: 'smooth',
    })
}
export default scrollElementIntoView
