import express from 'express'
import { Liquid } from 'liquidjs';
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
const engine = new Liquid();
app.engine('liquid', engine.express());
app.set('views', './views')

// Endpoints:
// https://fdnd-agency.directus.app/items/teylers_museum_exhibits/1 | Topstuk
// https://fdnd-agency.directus.app/items/teylers_museum_exhibits_sections | Timeline items
// https://fdnd-agency.directus.app/items/teylers_museum_persons | Creators

// https://fdnd-agency.directus.app/items/teylers_museum_quiz_questions | Quiz questions
// https://fdnd-agency.directus.app/items/teylers_museum_quiz_attempts | Quiz attemps
// https://fdnd-agency.directus.app/items/teylers_museum_quiz_answers| Quiz answers

const baseURL = 'https://fdnd-agency.directus.app/items/'
const detailsURL = 'teylers_museum_exhibits'
const personsURL = 'teylers_museum_persons'
const sectionsURL = 'teylers_museum_exhibits_sections'
const questionsURL = 'teylers_museum_quiz_questions'
const answersURL = 'teylers_museum_quiz_answers'
const attemptsURL = 'teylers_museum_quiz_attempts'

app.get('/', async function (request, response) {
    const { answered, correct, step, screen = 'question', questionId, answerKey, attemptId } = request.query
    const currentStep = Number(step ?? 0)

    // DETAILS
    const detailParams = new URLSearchParams()
    detailParams.set(
        'fields',
        '*.*'
    )
    const detailsResponse = await fetch(
        baseURL + detailsURL + '?' + detailParams.toString()
    )
    const detailsJSON = await detailsResponse.json()

    // PERSONS
    const personParams = new URLSearchParams()
    personParams.set(
        'fields',
        '*.*'
    )
    const personsResponse = await fetch(
        baseURL + personsURL + '?' + personParams.toString()
    )
    const personsJSON = await personsResponse.json()


    // SECTIONS
    const sectionParams = new URLSearchParams()
    sectionParams.set(
        'fields',
        '*,questions.*,questions.options.*,cover.*'
    )
    const sectionsResponse = await fetch(
        baseURL + sectionsURL + '?' + sectionParams.toString()
    )
    const sectionsJSON = await sectionsResponse.json()

    let question = null
    let correctOption = null
    let selectedOption = null

    if (screen === 'result' && questionId) {
        const questionParams = new URLSearchParams()
        questionParams.set('fields', '*,options.*')

        const questionResponse = await fetch(
            baseURL + questionsURL + '/' + questionId + '?' + questionParams.toString()
        )

        const questionJSON = await questionResponse.json()
        question = questionJSON.data

        correctOption = question.options.find(o => o.is_correct)

        selectedOption = question.options.find(
            option => option.key === answerKey
        )
    }

    let score = null
    let totalQuestions = null

    if (screen === 'score' && attemptId) {
        const answersParams = new URLSearchParams()
        answersParams.set('filter', JSON.stringify({ attempt: { _eq: attemptId } }))
        answersParams.set('fields', 'is_correct')

        const answersResponse = await fetch(
            baseURL + answersURL + '?' + answersParams.toString()
        )
        const answersJSON = await answersResponse.json()

        score = answersJSON.data.filter(a => a.is_correct).length
        totalQuestions = sectionsJSON.data.length

        await fetch(baseURL + attemptsURL + '/' + attemptId, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                score,
                total_questions: totalQuestions,
                completed_at: new Date().toISOString()
            })
        })
    }

    const data = {
        sections: sectionsJSON.data,
        step: currentStep,
        answered,
        correct,
        screen,
        question,
        correctOption,
        answerKey,
        selectedOption,
        attemptId,
        score,
        totalQuestions,

        details: detailsJSON.data,
        persons: personsJSON.data,
    }

    // console.log(detailsJSON.data)


    response.render('index.liquid', data)
})

app.post('/quiz/answer', async (request, response) => {
    const { questionId, answerKey, step } = request.body
    let attemptId = request.body.attemptId

    if (!attemptId) {
        const attemptResponse = await fetch(baseURL + attemptsURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                started_at: new Date().toISOString()
            })
        })
        const attemptJSON = await attemptResponse.json()
        attemptId = attemptJSON.data.id
    }

    const questionParams = new URLSearchParams()
    questionParams.set('fields', '*,options.*')

    const questionResponse = await fetch(
        baseURL + questionsURL + '/' + questionId + '?' + questionParams.toString()
        // BIJV: https://fdnd-agency.directus.app/items/teylers_museum_quiz_questions/1?fields=*,options.*
    )

    const questionJSON = await questionResponse.json()

    const selectedOption = questionJSON.data.options.find(
        option => option.key === answerKey
    )

    const isCorrect = selectedOption?.is_correct === true

    await fetch(baseURL + answersURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            attempt: attemptId,
            question: questionId,
            chosen_option: answerKey,
            is_correct: isCorrect,
            answered_at: new Date().toISOString(),
        })
    })

    response.redirect(
        '/?screen=result' +
        '&step=' + step +
        '&questionId=' + questionId +
        '&answerKey=' + answerKey +
        '&correct=' + isCorrect +
        '&attemptId=' + attemptId
    )
})

app.use((req, res, next) => {
    res.status(404).send("Deze pagina bestaat niet")
})
app.set('port', process.env.PORT || 8000)
app.listen(app.get('port'), function () {
    console.log(`Application started on http://localhost:${app.get('port')}`)
})