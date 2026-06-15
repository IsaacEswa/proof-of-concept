document.documentElement.classList.add('js');

document.addEventListener('submit', async (event) => {
    const form = event.target.closest('.question-answer-form')
    if (!form) return
    event.preventDefault()

    const submitButton = form.querySelector('.quiz-btn')
    submitButton.classList.add('loading')
    submitButton.textContent = 'Aan het controleren...'
    submitButton.disabled = true

    const formData = new FormData(form)
    const response = await fetch(form.action, { method: form.method, body: new URLSearchParams(formData) })
    const responseData = await response.text()

    const parser = new DOMParser()
    const responseDOM = parser.parseFromString(responseData, 'text/html')
    const newQuiz = responseDOM.querySelector('.quiz-component')

    swapQuiz(newQuiz, 'down')
})

document.addEventListener('click', async (event) => {
    const nextQuizBtn = event.target.closest('.next-question')
    if (!nextQuizBtn) return
    event.preventDefault()

    nextQuizBtn.textContent = 'Laden...'

    const response = await fetch(nextQuizBtn.href)
    const responseHTML = await response.text()

    const parser = new DOMParser()
    const responseDOM = parser.parseFromString(responseHTML, 'text/html')
    const newQuiz = responseDOM.querySelector('.quiz-component')

    swapQuiz(newQuiz, 'down')
})

async function swapQuiz(newQuiz, animateDirection = 'right') {
    const currentQuiz = document.querySelector('.quiz-component')
    const quizWrapper = document.querySelector('.quiz')
    if (!newQuiz || !currentQuiz) return

    if (!document.startViewTransition) {
        currentQuiz.replaceWith(newQuiz)
        initStacked()
        newQuiz.scrollIntoView({ behavior: 'smooth', block: 'center' })
        return
    }

    quizWrapper.classList.add('shifting')

    const transition = document.startViewTransition(() => {
        currentQuiz.replaceWith(newQuiz)
        initStacked()
    })

    await transition.finished

    newQuiz.scrollIntoView({ behavior: 'smooth', block: 'center' })

    setTimeout(() => quizWrapper.classList.remove('shifting'), 5)
}
