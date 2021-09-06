const scrollElementIntoView = (e, behavior) => {
    let scrollTop = window.pageYOffset || e.scrollTop

    // Furthermore, if you have for example a header outside the iframe
    // you need to factor in its dimensions when calculating the position to scroll to
    const headerHeight = 144
    const finalOffset = e.getBoundingClientRect().top + scrollTop - headerHeight

    window.parent.scrollTo({
        top: finalOffset,
        behavior: behavior || 'auto',
    })
}
export default scrollElementIntoView
